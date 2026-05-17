import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  runTransaction,
  writeBatch,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';
import { app } from './config';

export const db = getFirestore(app);

export {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  runTransaction,
  writeBatch,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
};

export const COLLECTIONS = {
  users: 'users',
  offers: 'offers',
  bookings: 'bookings',
  travelers: 'travelers',
  reviews: 'reviews',
  destinations: 'destinations',
  articles: 'articles',
  promoCodes: 'promoCodes',
  pages: 'pages',
  settings: 'settings',
  auditLogs: 'auditLogs',
  notifications: 'notifications',
} as const;
