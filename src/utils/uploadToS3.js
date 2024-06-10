import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadToS3 = async (file, fileName) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: 'video/webm',
  };
  try {
    const response = await s3.upload(params).promise();
    console.log('Upload successful', response);
    return response; // Return the response to check status
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Upload failed');
  }
  
};
