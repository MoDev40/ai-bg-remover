import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.SERVER_PORT || 8000;

export const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
export const apiKey = process.env.CLOUDINARY_CLOUD_API_KEY;
export const secretKey = process.env.CLOUDINARY_CLOUD_API_SECRET;

export const replicateToken = process.env.REPLICATE_API_TOKEN;

