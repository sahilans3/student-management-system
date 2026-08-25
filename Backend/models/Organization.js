import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      line1: {
        type: String,
        trim: true,
      },
      line2: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      pincode: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
        default: "India",
      },
    },

    logoUrl: {
      type: String,
      trim: true,
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    plan: {
      type: String,
      enum: ["free", "basic", "premium"],
      default: "free",
    },

    planExpiresAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "suspended", "trial", "cancelled"],
      default: "trial",
    },

    settings: {
      academicYearStart: {
        type: Number,
        default: 4,
      },

      currency: {
        type: String,
        default: "INR",
      },

      locale: {
        type: String,
        default: "en-IN",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model(
  "Organization",
  organizationSchema
);

export default Organization;