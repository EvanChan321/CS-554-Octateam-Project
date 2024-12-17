import admin from '../config/firebaseConfig.js';
import { uploadFile } from '../services/awsService.js';
import formatResponse from '../utils/formatResponse.js';

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName
    });

    // Send email verification
    const userToken = await admin.auth().createCustomToken(userRecord.uid);
    res.status(201).json(formatResponse('User registered successfully', { uid: userRecord.uid, email, token: userToken }));
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(user.uid);
    res.status(200).json(formatResponse('Login successful', { email, token: customToken }));
  } catch (error) {
    next(error);
  }
};

export const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = `profile-pictures/${Date.now()}-${req.file.originalname}`;
    const uploadResult = await uploadFile(fileBuffer, fileName, req.file.mimetype);

    res.status(200).json(formatResponse('Profile picture uploaded successfully', { url: uploadResult.Location }));
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
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
    next(error);
  }
};
