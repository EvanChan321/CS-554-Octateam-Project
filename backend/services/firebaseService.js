const admin = require('../config/firebaseConfig');

/**
 * Get user details using Firebase Admin SDK.
 * @param {string} uid - Firebase User ID
 */
const getUserById = async (uid) => {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord;
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

/**
 * Create a custom token for a user.
 * @param {string} uid - Firebase User ID
 */
const createCustomToken = async (uid) => {
  try {
    const token = await admin.auth().createCustomToken(uid);
    return token;
  } catch (error) {
    throw new Error('Error creating custom token: ' + error.message);
  }
};

module.exports = { getUserById, createCustomToken };
