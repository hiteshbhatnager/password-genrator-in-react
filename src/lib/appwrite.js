import { Account, Client, Databases } from 'appwrite';

const client = new Client();

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT?.trim();
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID?.trim();
const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID?.trim();

if (!endpoint || !projectId || !dbId) {
    throw new Error('Missing Appwrite configuration. Ensure VITE_APPWRITE_ENDPOINT, VITE_APPWRITE_PROJECT_ID, and VITE_APPWRITE_DATABASE_ID are set.');
}

client.setEndpoint(endpoint);
client.setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const databaseId = dbId;
export { client }; 
