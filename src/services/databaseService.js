import { databases, databaseId } from '../lib/appwrite';
import { ID, Permission, Query, Role } from 'appwrite';

function getUserId(user) {
    return user?.$id || null;
}

export async function createDocument(collectionId, data, user) {
    const userId = getUserId(user);
    if (!userId) throw new Error('You must be signed in to save data.');
    if (!databaseId || !collectionId) throw new Error('Missing Appwrite database configuration.');

    try {
        return await databases.createDocument(
            databaseId,
            collectionId,
            ID.unique(),
            { ...data, userId },
            [
                Permission.read(Role.user(userId)),
                Permission.write(Role.user(userId))
            ]
        );
    } catch (error) {
        console.error('Failed to create document:', error);
        throw error;
    }
}

export async function listDocuments(collectionId, user) {
    const userId = getUserId(user);
    if (!userId) return { documents: [] };
    if (!databaseId || !collectionId) throw new Error('Missing Appwrite database configuration.');

    try {
        return await databases.listDocuments(databaseId, collectionId, [Query.equal('userId', userId)]);
    } catch (error) {
        console.error(`Failed to list documents for ${collectionId}:`, error);
        throw error;
    }
}

export async function getDocument(collectionId, documentId, user) {
    const userId = getUserId(user);
    if (!userId) throw new Error('You must be signed in to view data.');
    if (!databaseId || !collectionId) throw new Error('Missing Appwrite database configuration.');

    try {
        const document = await databases.getDocument(databaseId, collectionId, documentId);
        if (document.userId !== userId) {
            throw new Error('You are not authorized to access this document.');
        }
        return document;
    } catch (error) {
        console.error(`Failed to get document ${documentId} from ${collectionId}:`, error);
        throw error;
    }
}

export async function updateDocument(collectionId, documentId, data, user) {
    const userId = getUserId(user);
    if (!userId) throw new Error('You must be signed in to update data.');
    if (!databaseId || !collectionId) throw new Error('Missing Appwrite database configuration.');

    try {
        const document = await databases.getDocument(databaseId, collectionId, documentId);
        if (document.userId !== userId) {
            throw new Error('You are not authorized to update this document.');
        }

        return await databases.updateDocument(databaseId, collectionId, documentId, {
            ...data,
            userId
        });
    } catch (error) {
        console.error(`Failed to update document ${documentId} in ${collectionId}:`, error);
        throw error;
    }
}

export async function deleteDocument(collectionId, documentId, user) {
    const userId = getUserId(user);
    if (!userId) throw new Error('You must be signed in to delete data.');
    if (!databaseId || !collectionId) throw new Error('Missing Appwrite database configuration.');

    try {
        const document = await databases.getDocument(databaseId, collectionId, documentId);
        if (document.userId !== userId) {
            throw new Error('You are not authorized to delete this document.');
        }

        return await databases.deleteDocument(databaseId, collectionId, documentId);
    } catch (error) {
        console.error(`Failed to delete document ${documentId} from ${collectionId}:`, error);
        throw error;
    }
}
