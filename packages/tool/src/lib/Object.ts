export const isObjectEmpty = (obj: any) => !Object.values(obj).some(x => x !== null && x !== '');
