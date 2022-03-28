module.exports = {
  swcMinify: true,
  images: {
    domains: [`${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`],
  }
};
