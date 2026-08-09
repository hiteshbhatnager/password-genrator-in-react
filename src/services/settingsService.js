import { getCurrentUser } from './authService';
import { createDocument, listDocuments, updateDocument } from './databaseService';

const collectionId = import.meta.env.VITE_APPWRITE_SETTINGS_COLLECTION_ID || 'settings';

export async function getSettings() {
    const user = await getCurrentUser();
    const response = await listDocuments(collectionId, user);
    return response.documents?.[0] || null;
}

export async function saveSettings(settings) {
    const user = await getCurrentUser();
    const existing = await getSettings();
    if (existing) {
        return updateDocument(collectionId, existing.$id, settings, user);
    }

    return createDocument(collectionId, settings, user);
}
