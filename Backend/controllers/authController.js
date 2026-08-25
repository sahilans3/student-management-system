import { loginUser } from "../services/authService.js";
import { generateToken } from "../utils/generateToken.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required login fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Verify email and password
    const result = await loginUser({
      email,
      password,
    });

    // Generate JWT for the authenticated user
    const token = generateToken(result.user._id);

    // Convert Mongoose document to a normal object
    const userObject = result.user.toObject();

    // Never send password or password hash to the client
    const { passwordHash, password: _, ...safeUser } = userObject;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: safeUser,
        memberships: result.memberships,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(401).json({
      success: false,
      message: error.message || "Invalid email or password",
    });
  }
};