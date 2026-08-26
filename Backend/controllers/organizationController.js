import { createOrganization } from "../services/organizationService.js";

// Create a new organization with its owner
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

    // Convert Mongoose document to a normal object
    const userObject = result.user.toObject();

    // Never send password or password hash to the client
    delete userObject.passwordHash;
    delete userObject.password;

    return res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: {
        organization: result.organization,
        user: userObject,
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

// Get organization details for an authorized member
export const getOrganization = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Organization access verified",
      data: {
        organizationId: req.membership.organizationId,
        roles: req.membership.roles,
        status: req.membership.status,
      },
    });
  } catch (error) {
    console.error("Get organization error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get organization",
    });
  }
};

// Get organization data for admin users
export const getAdminOrganization = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Admin access verified",
      data: {
        organizationId: req.membership.organizationId,
        roles: req.membership.roles,
        status: req.membership.status,
      },
    });
  } catch (error) {
    console.error("Admin organization error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to access admin organization data",
    });
  }
};