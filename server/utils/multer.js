import multer from 'multer';

const storage = multer.memoryStorage(); // Optional: or keep disk storage if needed

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // ✅ Limit file size to 5 MB
    files: 1                   // ✅ Accept only 1 file per request
  }
});

export default upload;
