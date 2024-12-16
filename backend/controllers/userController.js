/**
 * Get the current user's profile
 */
const getUserProfile = (req, res) => {
    try {
      const user = req.user; // Retrieved from authMiddleware
      res.status(200).json({
        message: 'User profile retrieved successfully',
        user: {
          email: user.email,
          uid: user.uid
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
  };
  
  module.exports = { getUserProfile };
  