import OrganizationMembership from "../models/OrganizationMembership.js";

// Check if the logged-in user belongs to the requested organization
export const requireOrganization = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      // Get organization ID from route params
      const organizationId = req.params.organizationId;

      if (!organizationId) {
        return res.status(400).json({
          success: false,
          message: "Organization ID is required",
        });
      }

      // authMiddleware must run before this middleware
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      // Find the user's active membership in this organization
      const membership = await OrganizationMembership.findOne({
        userId: req.user._id,
        organizationId,
        status: "active",
      });

      if (!membership) {
        return res.status(403).json({
          success: false,
          message: "You do not have access to this organization",
        });
      }

      // Check role if specific roles are required
      if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some((role) =>
          membership.roles.includes(role)
        );

        if (!hasRequiredRole) {
          return res.status(403).json({
            success: false,
            message: "You do not have permission for this action",
          });
        }
      }

      // Store membership for controllers that need it
      req.membership = membership;

      next();
    } catch (error) {
      console.error("Organization authorization error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to verify organization access",
      });
    }
  };
};