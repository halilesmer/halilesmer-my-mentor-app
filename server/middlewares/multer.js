import multer from "multer";
import path from "path";

const multerUploads = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (
      extension !== ".jpg" &&
      extension !== ".jpeg" &&
      extension !== ".png" &&
      extension !== ".webp" &&
      extension !== ".svg"  &&
      extension !== ".HEIC" 

    ) {
      cb(new Error("File extension not supported"), false);
      return;
    } else {
      cb(null, true);
    }
    
  },
});


export { multerUploads };
