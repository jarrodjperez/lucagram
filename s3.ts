import aws from "aws-sdk";

const region = "us-east-1";
const bucketName = "lucagram";
const accessKeyId = process.env.S3_UPLOAD_KEY;
const secretAccessKey = process.env.S3_UPLOAD_SECRET;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});
