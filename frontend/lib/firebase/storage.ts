import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type UploadTask,
} from 'firebase/storage';
import { app } from './config';

export const storage = getStorage(app);

export {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type UploadTask,
};

export function getStorageRef(path: string) {
  return ref(storage, path);
}

export async function uploadFile(path: string, file: File): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
