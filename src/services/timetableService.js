import { getCurrentUser } from './authService';
import { createDocument, deleteDocument, listDocuments, updateDocument } from './databaseService';

const collectionId = import.meta.env.VITE_APPWRITE_TIMETABLE_COLLECTION_ID || 'timetable';

export async function getClasses() {
    const user = await getCurrentUser();
    const response = await listDocuments(collectionId, user);
    return response.documents || [];
}

export async function createClass(entry) {
    const user = await getCurrentUser();
    return createDocument(collectionId, entry, user);
}

export async function updateClass(id, data) {
    const user = await getCurrentUser();
    return updateDocument(collectionId, id, data, user);
}

export async function deleteClass(id) {
    const user = await getCurrentUser();
    return deleteDocument(collectionId, id, user);
}
