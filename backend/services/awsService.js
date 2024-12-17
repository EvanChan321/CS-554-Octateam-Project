import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadFile = async (fileBuffer, fileName, mimeType) => {
  console.log('Uploading file to S3:', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    ContentType: mimeType
  });
  
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
