import { account } from '../lib/appwrite';
import { ID } from 'appwrite';

export async function signup({ name, email, password }) {
    await account.create(ID.unique(), email, password, name);
    return login({ email, password });
}

export async function login({ email, password }) {
    await account.createEmailPasswordSession(email, password);
    return account.get();
}

export async function logout() {
    await account.deleteSession('current');
}

export async function getCurrentUser() {
    return account.get();
}

export async function updateProfile(name) {
    return account.updateName(name);
}
