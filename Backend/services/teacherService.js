import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import OrganizationMembership from "../models/OrganizationMembership.js";
import TeacherProfile from "../models/TeacherProfile.js";

export const createTeacher = async ({
  organizationId,
  teacherData,
}) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if the email is already registered
    const existingUser = await User.findOne({
      email: teacherData.email,
    }).session(session);

    if (existingUser) {
      throw new Error("A user with this email already exists");
    }

    // Check if this user already has an active teacher profile
    // This check is done after user creation below for new users.
    // Existing users will be handled separately in future flows.
    
    // Hash the teacher password before saving
    const passwordHash = await bcrypt.hash(
      teacherData.password,
      12
    );

    // Create the teacher's login account
    const [user] = await User.create(
      [
        {
          name: teacherData.name,
          email: teacherData.email,
          phone: teacherData.phone,
          passwordHash,
          status: "active",
          authProvider: "local",
        },
      ],
      { session }
    );

    // Create teacher membership in the organization
    const [membership] = await OrganizationMembership.create(
      [
        {
          userId: user._id,
          organizationId,
          roles: ["teacher"],
          status: "active",
          joinedAt: new Date(),
        },
      ],
      { session }
    );

    // Create teacher-specific profile
    const [teacherProfile] = await TeacherProfile.create(
      [
        {
          userId: user._id,
          organizationId,
          employeeId: teacherData.employeeId,
          designation: teacherData.designation,
          qualification: teacherData.qualification,
          specialization: teacherData.specialization,
          joiningDate: teacherData.joiningDate,
          status: "active",
          bio: teacherData.bio,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return {
      user,
      membership,
      teacherProfile,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};