import { getCurrentUser } from './authService';
import { createDocument, deleteDocument, listDocuments, updateDocument } from './databaseService';

const collectionId = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID || 'events';

export async function getEvents() {
    const user = await getCurrentUser();
    const response = await listDocuments(collectionId, user);
    return response.documents || [];
}

export async function createEvent(event) {
    const user = await getCurrentUser();
    return createDocument(collectionId, event, user);
}

export async function updateEvent(id, data) {
    const user = await getCurrentUser();
    return updateDocument(collectionId, id, data, user);
}

export async function deleteEvent(id) {
    const user = await getCurrentUser();
    return deleteDocument(collectionId, id, user);
}
