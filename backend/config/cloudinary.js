import cloudinary from "cloudinary";
import { apiKey, cloudName, secretKey } from "./initialConfig.js";

cloudinary.v2.config({
    api_key:apiKey,
    api_secret:secretKey,
    cloud_name:cloudName,
})

export default cloudinary.v2;