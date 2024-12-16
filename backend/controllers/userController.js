export const getUserProfile = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: 'User profile retrieved successfully',
      user: {
        uid: user.uid,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
  }
};
