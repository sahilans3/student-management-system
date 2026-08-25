import bcrypt from "bcrypt";

import User from "../models/User.js";
import OrganizationMembership from "../models/OrganizationMembership.js";

export const loginUser = async ({ email, password }) => {
  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check if the password matches the stored hash
  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Find all organizations where the user is a member
  const memberships = await OrganizationMembership.find({
    userId: user._id,
    status: "active",
  }).populate("organizationId", "name slug");

  return {
    user,
    memberships,
  };
};