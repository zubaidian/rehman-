import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import type { AchievementCategory } from '../data/studentAchievementsData';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: 'contact_page' | 'quick_modal';
  status: 'new' | 'reviewed' | 'resolved';
  createdAt: Timestamp | null;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  createdAt: Timestamp | null;
}

export interface AlumnaRegistrationRecord {
  id: string;
  name: string;
  batch: string;
  email: string;
  profession: string;
  message: string;
  status: 'pending' | 'verified';
  createdAt: Timestamp | null;
}

export interface StudentAchievementRecord {
  id: string;
  studentName: string;
  program: string;
  achievementTitle: string;
  category: AchievementCategory;
  dateLabel: string;
  metric: string;
  details: string;
  published: boolean;
  createdBy: string;
  createdAt: Timestamp | null;
}

function sanitizeText(value: string, maxLength: number): string {
  return value.trim().slice(0, maxLength);
}

export async function submitInquiry(input: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source: 'contact_page' | 'quick_modal';
}): Promise<string> {
  const name = sanitizeText(input.name, 120);
  const email = sanitizeText(input.email, 160).toLowerCase();
  const phone = sanitizeText(input.phone || '', 30);
  const subject = sanitizeText(input.subject || 'General Inquiry', 120);
  const message = sanitizeText(input.message, 2000);

  if (!name || !EMAIL_PATTERN.test(email) || !subject || !message) {
    throw new Error('Please provide a valid name, email address, topic, and message.');
  }

  const path = 'inquiries';
  try {
    const docRef = await addDoc(collection(db, path), {
      name,
      email,
      phone,
      subject,
      message,
      source: input.source,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function subscribeNewsletter(rawEmail: string): Promise<string> {
  const email = sanitizeText(rawEmail, 160).toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    throw new Error('Please enter a valid email address.');
  }

  const path = 'newsletter_subscribers';
  try {
    const docRef = await addDoc(collection(db, path), {
      email,
      status: 'active',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function submitAlumnaRegistration(input: {
  name: string;
  batch: string;
  email: string;
  profession?: string;
  message?: string;
}): Promise<string> {
  const name = sanitizeText(input.name, 120);
  const batch = sanitizeText(input.batch || 'Zubaida College', 40);
  const email = sanitizeText(input.email, 160).toLowerCase();
  const profession = sanitizeText(input.profession || '', 160);
  const message = sanitizeText(input.message || '', 1500);

  if (!name || !batch || !EMAIL_PATTERN.test(email)) {
    throw new Error('Please provide your full name, passing year, and a valid email address.');
  }

  const path = 'alumnae_registrations';
  try {
    const docRef = await addDoc(collection(db, path), {
      name,
      batch,
      email,
      profession,
      message,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeAdminInquiries(
  onData: (items: InquiryRecord[]) => void,
  onError: (err: Error) => void
) {
  const path = 'inquiries';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      onData(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<InquiryRecord, 'id'>),
        }))
      );
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    }
  );
}

export function subscribeAdminSubscribers(
  onData: (items: SubscriberRecord[]) => void,
  onError: (err: Error) => void
) {
  const path = 'newsletter_subscribers';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      onData(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<SubscriberRecord, 'id'>),
        }))
      );
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    }
  );
}

export function subscribeAdminAlumnae(
  onData: (items: AlumnaRegistrationRecord[]) => void,
  onError: (err: Error) => void
) {
  const path = 'alumnae_registrations';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      onData(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<AlumnaRegistrationRecord, 'id'>),
        }))
      );
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    }
  );
}

export async function updateInquiryStatus(
  id: string,
  status: 'new' | 'reviewed' | 'resolved'
): Promise<void> {
  const path = `inquiries/${id}`;
  try {
    await updateDoc(doc(db, 'inquiries', id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  const path = `inquiries/${id}`;
  try {
    await deleteDoc(doc(db, 'inquiries', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function updateSubscriberStatus(
  id: string,
  status: 'active' | 'unsubscribed'
): Promise<void> {
  const path = `newsletter_subscribers/${id}`;
  try {
    await updateDoc(doc(db, 'newsletter_subscribers', id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteSubscriber(id: string): Promise<void> {
  const path = `newsletter_subscribers/${id}`;
  try {
    await deleteDoc(doc(db, 'newsletter_subscribers', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function updateAlumnaStatus(
  id: string,
  status: 'pending' | 'verified'
): Promise<void> {
  const path = `alumnae_registrations/${id}`;
  try {
    await updateDoc(doc(db, 'alumnae_registrations', id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteAlumnaRegistration(id: string): Promise<void> {
  const path = `alumnae_registrations/${id}`;
  try {
    await deleteDoc(doc(db, 'alumnae_registrations', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribePublishedStudentAchievements(
  onData: (items: StudentAchievementRecord[]) => void,
  onError: (err: Error) => void
) {
  const path = 'student_achievements';
  const q = query(collection(db, path), where('published', '==', true));
  return onSnapshot(
    q,
    (snapshot) => {
      const records = snapshot.docs
        .map((d) => ({
          id: d.id,
          ...(d.data() as Omit<StudentAchievementRecord, 'id'>),
        }))
        .sort((a, b) => {
          const aTime = a.createdAt ? a.createdAt.toMillis() : 0;
          const bTime = b.createdAt ? b.createdAt.toMillis() : 0;
          return bTime - aTime;
        });
      onData(records);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (err) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    }
  );
}

export async function createStudentAchievement(input: {
  studentName: string;
  program: string;
  achievementTitle: string;
  category: AchievementCategory;
  dateLabel: string;
  metric?: string;
  details: string;
}): Promise<string> {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error('Administrator sign-in required to add a student achievement.');
  }

  const studentName = sanitizeText(input.studentName, 120);
  const program = sanitizeText(input.program, 120);
  const achievementTitle = sanitizeText(input.achievementTitle, 160);
  const dateLabel = sanitizeText(input.dateLabel, 60);
  const metric = sanitizeText(input.metric || '', 80);
  const details = sanitizeText(input.details, 1500);

  if (!studentName || !program || !achievementTitle || !dateLabel || !details) {
    throw new Error('Please fill in all required student achievement fields.');
  }

  const path = 'student_achievements';
  try {
    const docRef = await addDoc(collection(db, path), {
      studentName,
      program,
      achievementTitle,
      category: input.category,
      dateLabel,
      metric,
      details,
      published: true,
      createdBy: uid,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteStudentAchievement(id: string): Promise<void> {
  const path = `student_achievements/${id}`;
  try {
    await deleteDoc(doc(db, 'student_achievements', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
