import {
    createTeacher,
    getTeachers,
    getTeacher,
    updateTeacher,
    deactivateTeacher,
  } from "../services/teacherService.js";
  
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
      if (!name || !email || !password || !employeeId) {
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
  
      delete userObject.passwordHash;
      delete userObject.password;
  
      return res.status(201).json({
        success: true,
        message: "Teacher created successfully",
        data: {
          user: userObject,
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
  
  // Get all teachers from the organization
  export const getTeachersController = async (req, res) => {
    try {
      const { organizationId } = req.params;
  
      const teachers = await getTeachers(organizationId);
  
      return res.status(200).json({
        success: true,
        message: "Teachers fetched successfully",
        data: {
          teachers,
        },
      });
    } catch (error) {
      console.error("Get teachers error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to fetch teachers",
      });
    }
  };
  
  // Get a single teacher from the organization
  export const getTeacherController = async (req, res) => {
    try {
      const { organizationId, teacherId } = req.params;
  
      const teacher = await getTeacher({
        organizationId,
        teacherId,
      });
  
      return res.status(200).json({
        success: true,
        message: "Teacher fetched successfully",
        data: {
          teacher,
        },
      });
    } catch (error) {
      console.error("Get teacher error:", error);
  
      if (error.message === "Teacher not found") {
        return res.status(404).json({
          success: false,
          message: "Teacher not found",
        });
      }
  
      return res.status(500).json({
        success: false,
        message: "Failed to fetch teacher",
      });
    }
  };
  
  // Update teacher profile information
  export const updateTeacherController = async (req, res) => {
    try {
      const { organizationId, teacherId } = req.params;
  
      const allowedFields = [
        "employeeId",
        "designation",
        "qualification",
        "specialization",
        "joiningDate",
        "bio",
      ];
  
      // Only allow profile fields to be updated
      const updateData = {};
  
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      }
  
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No valid fields provided for update",
        });
      }
  
      const teacher = await updateTeacher({
        organizationId,
        teacherId,
        updateData,
      });
  
      return res.status(200).json({
        success: true,
        message: "Teacher updated successfully",
        data: {
          teacher,
        },
      });
    } catch (error) {
      console.error("Update teacher error:", error);
  
      if (error.message === "Teacher not found") {
        return res.status(404).json({
          success: false,
          message: "Teacher not found",
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
        message: "Failed to update teacher",
      });
    }
  };
  
  // Deactivate a teacher
  export const deactivateTeacherController = async (req, res) => {
    try {
      const { organizationId, teacherId } = req.params;
      const { leavingDate } = req.body;
  
      const result = await deactivateTeacher({
        organizationId,
        teacherId,
        leavingDate,
      });
  
      return res.status(200).json({
        success: true,
        message: "Teacher deactivated successfully",
        data: {
          teacher: result.teacher,
          membership: result.membership,
        },
      });
    } catch (error) {
      console.error("Deactivate teacher error:", error);
  
      if (
        error.message === "Teacher not found" ||
        error.message === "Active teacher membership not found"
      ) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
  
      if (error.message === "Teacher is already inactive") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
  
      return res.status(500).json({
        success: false,
        message: "Failed to deactivate teacher",
      });
    }
  };