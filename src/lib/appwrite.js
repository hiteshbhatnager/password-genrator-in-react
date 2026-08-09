import { Client, Account } from 'appwrite';

const client = new Client();

client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT?.trim() || 'https://cloud.appwrite.io/v1');
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID?.trim() || '');

export const account = new Account(client);
export { client };
