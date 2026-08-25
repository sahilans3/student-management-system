import mongoose from "mongoose";

const organizationMembershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    roles: {
      type: [
        {
          type: String,
          enum: [
            "owner",
            "admin",
            "teacher",
            "staff",
            "student",
          ],
        },
      ],
      required: true,
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "invited", "suspended", "removed"],
      default: "invited",
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    invitedAt: {
      type: Date,
      default: null,
    },

    joinedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

organizationMembershipSchema.index(
  {
    userId: 1,
    organizationId: 1,
  },
  {
    unique: true,
  }
);

const OrganizationMembership = mongoose.model(
  "OrganizationMembership",
  organizationMembershipSchema
);

export default OrganizationMembership;