import { loginUser } from "../services/authService.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate login fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Authenticate the user
    const result = await loginUser({
      email,
      password,
    });

    // Convert Mongoose user document to a normal object
    const userObject = result.user.toObject();

    // Never send the password hash to the client
    const { passwordHash, password: _, ...safeUser } = userObject;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
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