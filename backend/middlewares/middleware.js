import multer from "multer";

const storage = multer.memoryStorage();

const MulterUpload = multer({
    storage,
    limits: {
        fileSize:7*1024*1024, 
    }
});

export default MulterUpload;