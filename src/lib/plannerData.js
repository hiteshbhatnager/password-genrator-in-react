import { readUserResource, writeUserResource } from './storage';

const DEFAULT_SETTINGS = {
    collegeName: 'College Planner',
    theme: 'dark',
    notifications: true,
    studyGoal: 'Stay consistent.'
};

export function getPlannerData(userId) {
    return {
        subjects: readUserResource(userId, 'subjects', []),
        timetable: readUserResource(userId, 'timetable', []),
        tasks: readUserResource(userId, 'tasks', []),
        events: readUserResource(userId, 'events', []),
        settings: readUserResource(userId, 'settings', DEFAULT_SETTINGS)
    };
}

export function savePlannerData(userId, resource, data) {
    writeUserResource(userId, resource, data);
}

export function getDefaultSettings() {
    return { ...DEFAULT_SETTINGS };
}
