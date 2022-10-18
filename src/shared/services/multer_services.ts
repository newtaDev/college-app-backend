import multer from 'multer';

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
export * as multerServices from './multer_services';
