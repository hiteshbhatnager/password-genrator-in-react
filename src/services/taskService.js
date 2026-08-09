import { getCurrentUser } from './authService';
import { createDocument, deleteDocument, listDocuments, updateDocument } from './databaseService';

const collectionId = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID || 'tasks';

export async function getTasks() {
    const user = await getCurrentUser();
    const response = await listDocuments(collectionId, user);
    return response.documents || [];
}

export async function createTask(task) {
    const user = await getCurrentUser();
    return createDocument(collectionId, task, user);
}

export async function updateTask(id, data) {
    const user = await getCurrentUser();
    return updateDocument(collectionId, id, data, user);
}

export async function deleteTask(id) {
    const user = await getCurrentUser();
    return deleteDocument(collectionId, id, user);
}
