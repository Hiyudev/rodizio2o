export const isObjectEmpty = (obj: any) => !Object.values(obj).some(x => x !== null && x !== '');

export const isObjectSame = (obj1: any, obj2: any) => Object.entries(obj1).toString() === Object.entries(obj2).toString();
