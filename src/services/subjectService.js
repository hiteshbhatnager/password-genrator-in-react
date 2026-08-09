import { getCurrentUser } from './authService';
import { createDocument, deleteDocument, listDocuments, updateDocument } from './databaseService';

const collectionId = import.meta.env.VITE_APPWRITE_SUBJECTS_COLLECTION_ID || 'subjects';

export async function getSubjects() {
    const user = await getCurrentUser();
    const response = await listDocuments(collectionId, user);
    return response.documents || [];
}

export async function createSubject(subject) {
    const user = await getCurrentUser();
    return createDocument(collectionId, subject, user);
}

export async function updateSubject(id, data) {
    const user = await getCurrentUser();
    return updateDocument(collectionId, id, data, user);
}

export async function deleteSubject(id) {
    const user = await getCurrentUser();
    return deleteDocument(collectionId, id, user);
}
