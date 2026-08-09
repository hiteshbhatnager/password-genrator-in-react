import { getCurrentUser } from './authService';
import { createDocument, deleteDocument, listDocuments, updateDocument } from './databaseService';

const collectionId = import.meta.env.VITE_APPWRITE_ATTENDANCE_COLLECTION_ID || 'attendance';

export async function getAttendanceRecords() {
    const user = await getCurrentUser();
    const response = await listDocuments(collectionId, user);
    return response.documents || [];
}

export async function createAttendanceRecord(record) {
    const user = await getCurrentUser();
    return createDocument(collectionId, record, user);
}

export async function updateAttendanceRecord(id, data) {
    const user = await getCurrentUser();
    return updateDocument(collectionId, id, data, user);
}

export async function deleteAttendanceRecord(id) {
    const user = await getCurrentUser();
    return deleteDocument(collectionId, id, user);
}
