const STORAGE_PREFIX = 'college-planner';

function resolveKey(userId, resource) {
    return `${STORAGE_PREFIX}:${userId || 'guest'}:${resource}`;
}

export function readUserResource(userId, resource, fallback = null) {
    if (!userId) return fallback;

    try {
        const raw = localStorage.getItem(resolveKey(userId, resource));
        return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
        console.warn(`Unable to read ${resource}:`, error);
        return fallback;
    }
}

export function writeUserResource(userId, resource, value) {
    if (!userId) return;

    try {
        localStorage.setItem(resolveKey(userId, resource), JSON.stringify(value));
    } catch (error) {
        console.warn(`Unable to save ${resource}:`, error);
    }
}

export function removeUserResource(userId, resource) {
    if (!userId) return;

    localStorage.removeItem(resolveKey(userId, resource));
}
