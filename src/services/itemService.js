
import { mockItems } from '../data/items';

const STORAGE_KEY = 'lostAndFoundDemoItems';

export function getItems() {
    let savedItems = [];

    try {
        const stored = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        );

        if (Array.isArray(stored)) {
            savedItems = stored;
        }
    } catch (error) {
        console.error('Unable to load demo items:', error);
    }

    return [...savedItems, ...mockItems];
}

export function getItemById(id) {
    return getItems().find(
        (item) => String(item.id) === String(id)
    );
}

export function saveItem(report) {
    const savedItems = getSavedItems();

    const newItem = {
        id: crypto.randomUUID(),
        type: report.type,
        title: report.title.trim(),
        category: report.category,
        desc: report.description.trim(),
        loc: report.location.trim(),
        date: report.date,
        time: report.date,
        img: null,
        isNew: true
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([newItem, ...savedItems])
    );

    return newItem;
}

function getSavedItems() {
    try {
        const stored = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        );

        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}
