import { createTeacher } from "../services/teacherService.js";

// Create a new teacher in the organization
export const createTeacherController = async (req, res) => {
  try {
    const { organizationId } = req.params;

    const {
      name,
      email,
      phone,
      password,
      employeeId,
      designation,
      qualification,
      specialization,
      joiningDate,
      bio,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !employeeId
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and employee ID are required",
      });
    }

    // Create user, membership and teacher profile
    const result = await createTeacher({
      organizationId,
      teacherData: {
        name,
        email,
        phone,
        password,
        employeeId,
        designation,
        qualification,
        specialization,
        joiningDate,
        bio,
      },
    });

    // Never send password or password hash to the client
    const userObject = result.user.toObject();

    const {
      passwordHash,
      password: _,
      ...safeUser
    } = userObject;

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: {
        user: safeUser,
        membership: result.membership,
        teacherProfile: result.teacherProfile,
      },
    });
  } catch (error) {
    console.error("Create teacher error:", error);

    // Handle duplicate email
    if (error.message === "A user with this email already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    // Handle duplicate employee ID
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Employee ID already exists in this organization",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create teacher",
    });
  }
};