import { v4 as uuid } from 'uuid';
import multer from 'multer';
import sharp from 'sharp';

export const docFileFormats = [
  'application/pdf', // .pdf
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.ms-excel', // xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.ms-excel', // .csv
  'application/vnd.ms-powerpoint', // .ppt
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
];
export const imgFileFormats = ['image/jpeg', 'image/png', 'image/webp'];
export const videoFileFormats = [
  'video/mp4', // .mp4
];
export const audioFileFormats = [
  'audio/x-wav', //.wav
  'audio/mpeg', // .mp3
];

export const multerClient = (): multer.Multer => {
  const storage = multer.memoryStorage();
  return multer({ storage: storage });
};

/*
* Reference

*from:
const arr = [
    {
        sid: 123,
        name: 'aaa'
    },
    {
        sid: 123,
        name: 'bbb'
    },
    {
        sid: 789,
        name: 'ccc'
    }
];

* to:
{
  '123':[
          { sid: 123, name: 'aaa' },
          { sid: 123, name: 'bbb' }
        ]
  '789': [
    { sid: 789, name: 'ccc' }
  ]
}
* use
const result = arr.reduce((obj, cur) => ({...obj, [cur.sid]: cur}), {})

*/
export const convertListOfFilesToObjectWithKeyValues = (
  files: Express.Multer.File[]
) =>
  files?.reduce(
    (initialAndPreviousObj, cur) => {
      /// if [key] aldready exists then pushs existing item to its [key]
      if (cur.fieldname in initialAndPreviousObj) {
        const matchedItem = initialAndPreviousObj[cur.fieldname];
        // if (Array.isArray(matchedItem)) {
        return {
          ...initialAndPreviousObj,
          [cur.fieldname]: [...matchedItem, cur],
        };
        //   } else {
        //     return {
        //       ...initialAndPreviousObj,
        //       [cur.fieldname]: [matchedItem, cur],
        //     };
        //   }
      }
      return {
        ...initialAndPreviousObj,
        [cur.fieldname]: [cur],
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as any /// {} is initial value
  );
export const generatedFileName = (fileName: string, folderName?: string) => {
  if (folderName) return `${folderName}/${uuid()}-${fileName}`;
  return `${uuid()}-${fileName}`;
};

export const resizeImage = (imageFile: Express.Multer.File | undefined) => {
  const sizeInMb = (imageFile?.size || 0) / (1024 * 1024);
  let resizeImageQuality = 40;
  if (sizeInMb >= 2) {
    resizeImageQuality = 25;
  }
  return sharp(imageFile?.buffer)
    .rotate()
    .jpeg({ force: false, quality: resizeImageQuality })
    .png({ force: false, quality: resizeImageQuality })
    .webp({ force: false, quality: resizeImageQuality })
    .toBuffer();
};
export * as fileServices from './file.services';
