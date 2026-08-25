import { createOrganization } from "../services/organizationService.js";

export const createOrganizationController = async (req, res) => {
  try {
    const { organization, owner } = req.body;

    // Validate request body
    if (!organization || !owner) {
      return res.status(400).json({
        success: false,
        message: "Organization and owner details are required",
      });
    }

    // Validate owner password
    if (!owner.password) {
      return res.status(400).json({
        success: false,
        message: "Owner password is required",
      });
    }

    // Create organization, user and membership
    const result = await createOrganization({
      organizationData: organization,
      ownerData: owner,
    });

    // Convert Mongoose document to plain object
    const userObject = result.user.toObject();

    // Remove sensitive fields
    const { passwordHash, password, ...safeUser } = userObject;

    return res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: {
        organization: result.organization,
        user: safeUser,
        membership: result.membership,
      },
    });
  } catch (error) {
    console.error("Organization onboarding error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create organization",
    });
  }
};