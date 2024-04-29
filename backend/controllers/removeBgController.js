import cloudinary from "../config/cloudinary.js";
import Replicate from "replicate";
import { replicateToken } from "../config/initialConfig.js";

const replicate = new Replicate({
  auth: replicateToken,
});

export const removeBG = async (req, res) => {
  try {
    let cloudinaryResponse;

    if(req.file){
      const encodedFile = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
      cloudinaryResponse = await cloudinary.uploader.upload(encodedFile,{
        folder:'AiBGR',
        resource_type:'image',
        transformation:{
          width:768,
          height:768,
          crop:'limit',
        },
        encoding:'base64',
      })
    }

    const model = "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003";

    const input = {
      image: cloudinaryResponse.url,
    };

    const output = await replicate.run(model, { input });    

    res.status(200).json({oldOne:cloudinaryResponse.url,newOne:output});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
