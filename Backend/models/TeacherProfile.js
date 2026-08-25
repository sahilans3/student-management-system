import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema(
  {
    // User account linked to this teacher
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Organization where the teacher currently works
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    // Unique employee ID inside the organization
    employeeId: {
      type: String,
      required: true,
      trim: true,
    },

    // Teacher's job designation
    designation: {
      type: String,
      trim: true,
      default: "Teacher",
    },

    // Teacher's educational qualification
    qualification: {
      type: String,
      trim: true,
      default: null,
    },

    // Main subject or teaching specialization
    specialization: {
      type: String,
      trim: true,
      default: null,
    },

    // Date when the teacher joined the organization
    joiningDate: {
      type: Date,
      default: null,
    },

    // Date when the teacher left the organization
    leavingDate: {
      type: Date,
      default: null,
    },

    // Current employment status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // Optional teacher bio
    bio: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// A user cannot have two teacher profiles in the same organization
teacherProfileSchema.index(
  {
    userId: 1,
    organizationId: 1,
  },
  {
    unique: true,
  }
);

// Employee ID must be unique inside an organization
teacherProfileSchema.index(
  {
    organizationId: 1,
    employeeId: 1,
  },
  {
    unique: true,
  }
);

const TeacherProfile = mongoose.model(
  "TeacherProfile",
  teacherProfileSchema
);

export default TeacherProfile;