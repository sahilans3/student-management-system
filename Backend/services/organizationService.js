import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Organization from "../models/Organization.js";
import User from "../models/User.js";
import OrganizationMembership from "../models/OrganizationMembership.js";

export const createOrganization = async ({
  organizationData,
  ownerData,
}) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create organization
    const [organization] = await Organization.create(
      [organizationData],
      { session }
    );

    // Validate password
    if (!ownerData.password) {
      throw new Error("Owner password is required");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      ownerData.password,
      12
    );

    // Create user
    const [user] = await User.create(
      [
        {
          name: ownerData.name,
          email: ownerData.email,
          phone: ownerData.phone,
          passwordHash: hashedPassword,
          status: "active",
          authProvider: "local",
        },
      ],
      { session }
    );

    // Create membership
    const [membership] = await OrganizationMembership.create(
      [
        {
          userId: user._id,
          organizationId: organization._id,
          roles: ["owner", "admin"],
          status: "active",
          joinedAt: new Date(),
        },
      ],
      { session }
    );

    // Commit transaction
    await session.commitTransaction();

    return {
      organization,
      user,
      membership,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};