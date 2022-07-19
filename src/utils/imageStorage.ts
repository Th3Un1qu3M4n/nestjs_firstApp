import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
// import { fileTypeFromFile } from 'file-type';
import * as path from 'path';
import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common';
import { join } from 'path';

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
const validMimeTypes: validMimeType[] = ['image/png', 'image/jpg', 'image/jpeg'];

export const saveImageToStorage = {
  storage: diskStorage({
    destination: './images',

    filename: (req, file, cb) => {
      console.log(file.originalname);
      const fileExt: string = path.extname(file.originalname);
      const fileName: string = uuidv4() + fileExt;

      cb(null, fileName);
    },
  }),
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};

// export const isSafeFile = (fullFilePath: string) => {
//   return fileTypeFromFile(fullFilePath).then((fileExtAndMimeType) => {
//     console.log(fileExtAndMimeType);
//     return null;
//   });
// };

export const removeFile = (filename: string) => {
  try {
    const imageFolderPath = join(process.cwd(), 'images');
    const fullFileName = join(imageFolderPath + '/' + filename);
    fs.unlinkSync(fullFileName);
    return 'File Deleted Successfuly';
  } catch (error) {
    console.error(error);
    throw new BadRequestException('File Cannot be deleted');
  }
};
