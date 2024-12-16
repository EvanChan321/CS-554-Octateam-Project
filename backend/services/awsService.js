import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

/**
 * Uploads a file to AWS S3
 * @param {Buffer} fileContent - The file content to upload
 * @param {string} key - The S3 object key (file name)
 * @returns {Promise}
 */
export const uploadFile = async (fileBuffer, fileName, mimeType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: 'public-read',
  };
  const data = await s3.upload(params).promise();
  return data;
};
