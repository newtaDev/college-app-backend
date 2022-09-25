import multer from 'multer';

export const multerStore = (): multer.Multer => {
  const storage = multer.memoryStorage();
  return multer({ storage: storage });
};
