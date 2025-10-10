function isEmptyValue(v) {
    return v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0);
}

function formatDateTime(date) {
    if (!(date instanceof Date)) return String(date);
    return date.toLocaleString();
}

class EncyclopediaEntry {
    constructor({ id, title, author, shortMessage, readersDay1, readersDay2, publishedAt }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.shortMessage = shortMessage;
        this.symbolCount = (typeof shortMessage === "string") ? shortMessage.length : 0;
        this.readersDay1 = Number(readersDay1) || 0;
        this.readersDay2 = Number(readersDay2) || 0;
        this.publishedAt = (publishedAt instanceof Date) ? publishedAt : new Date(publishedAt);
    }

    _isPublishedInSummer() {
        const m = this.publishedAt.getMonth();
        return m === 5 || m === 6 || m === 7;
    }

    _isPublishedInWinter() {
        const m = this.publishedAt.getMonth();
        return m === 11 || m === 0 || m === 1;
    }

    computeAuthorPay() {
        const rate = (this._isPublishedInSummer() || this._isPublishedInWinter()) ? 0.95 : 1.1;
        return Number((this.symbolCount * rate).toFixed(2));
    }
}

// -----------------------------
// 1.a) Впорядкування за датою
// -----------------------------
function sortByPublishedAt(entries, ascending = true) {
    const sorted = [...entries].sort((a, b) => a.publishedAt - b.publishedAt);
    return ascending ? sorted : sorted.reverse();
}

// -----------------------------
// 1.a) Середня довжина повідомлення у певний час
// -----------------------------
function averageSymbolCountAtTime(entries, hour, minute = 0) {
    const filtered = entries.filter(e => e.publishedAt.getHours() === hour && e.publishedAt.getMinutes() === minute);
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((s, e) => s + e.symbolCount, 0);
    return sum / filtered.length;
}

// -----------------------------
// 1.b) Мінімальні readersDay2
// -----------------------------
function findEntriesWithMinReadersDay2(entries) {
    if (!entries || entries.length === 0) return [];
    const minVal = Math.min(...entries.map(e => e.readersDay2));
    return entries.filter(e => e.readersDay2 === minVal).map(e => ({ id: e.id, readersDay2: e.readersDay2 }));
}

// -----------------------------
// 1.c) Додавання нового запису
// -----------------------------
function addOrInsertEntry(entries, rawObj) {
    const required = ["id", "title", "author", "shortMessage", "readersDay1", "readersDay2", "publishedAt"];
    const hasAll = required.every(k => rawObj.hasOwnProperty(k) && !isEmptyValue(rawObj[k]));
    const newEntry = new EncyclopediaEntry(rawObj);

    if (!hasAll) {
        entries.push(newEntry);
        return { action: "pushed", entry: newEntry };
    } else {
        const idx = entries.findIndex(e => e.symbolCount > newEntry.symbolCount);
        if (idx === -1) {
            entries.push(newEntry);
            return { action: "pushed_at_end_sorted", entry: newEntry };
        } else {
            entries.splice(idx, 0, newEntry);
            return { action: "inserted_at_index", index: idx, entry: newEntry };
        }
    }
}

// -----------------------------
// 1.d) Загальна оплата авторам
// -----------------------------
function totalPaymentsPerAuthor(entries) {
    const map = new Map();
    for (const e of entries) {
        const pay = e.computeAuthorPay();
        map.set(e.author, (map.get(e.author) || 0) + pay);
    }
    return map;
}

function generateTestEntries() {
    const base = [
        { id: 1, title: "Про природу", author: "Іванов", shortMessage: "Коротко про природу.", readersDay1: 10, readersDay2: 5, publishedAt: "2025-06-15T09:30:00" },
        { id: 2, title: "Техно-новина", author: "Петрів", shortMessage: "Огляд нових гаджетів.", readersDay1: 25, readersDay2: 30, publishedAt: "2025-12-01T18:05:00" },
        { id: 3, title: "Історія міста", author: "Сидоренко", shortMessage: "Довга історична розповідь...", readersDay1: 5, readersDay2: 1, publishedAt: "2025-03-03T07:20:00" },
        { id: 4, title: "Культура", author: "Коваленко", shortMessage: "Афіша подій у місті.", readersDay1: 50, readersDay2: 40, publishedAt: "2025-08-10T14:00:00" },
        { id: 5, title: "Наука", author: "Гнатюк", shortMessage: "Нове дослідження", readersDay1: 0, readersDay2: 0, publishedAt: "2025-10-31T23:59:00" },
        { id: 6, title: "Мистецтво", author: "Орлова", shortMessage: "", readersDay1: 3, readersDay2: 2, publishedAt: "2025-02-01T11:11:00" },
        { id: 7, title: "Спорт", author: "Шевчук", shortMessage: "Матчі тижня", readersDay1: 100, readersDay2: 120, publishedAt: "2025-05-20T21:45:00" },
        { id: 8, title: "Подорожі", author: "Мельник", shortMessage: "Маршрути та поради", readersDay1: 7, readersDay2: 2, publishedAt: "2025-07-01T06:00:00" },
        { id: 9, title: "Кулінарія", author: "Бондар", shortMessage: "Рецепти на швидку руку", readersDay1: 12, readersDay2: 12, publishedAt: "2025-11-11T12:00:00" },
        { id: 10, title: "Економіка", author: "Левченко", shortMessage: "Аналіз ринку", readersDay1: 40, readersDay2: 8, publishedAt: "2025-04-04T09:00:00" }
    ];
    return base.map(obj => new EncyclopediaEntry(obj));
}

(function runDemoPart1() {
    const entries = generateTestEntries();

    console.log("=== Сортування за датою ===");
    sortByPublishedAt(entries).forEach(e => console.log(e.id, formatDateTime(e.publishedAt)));

    console.log("=== Середня довжина повідомлень @09:30 ===");
    console.log(averageSymbolCountAtTime(entries, 9, 30));

    console.log("=== Мінімальні readersDay2 ===");
    console.log(findEntriesWithMinReadersDay2(entries));

    console.log("=== Додавання запису ===");
    console.log(addOrInsertEntry(entries, { id: 11, title: "Тест", author: "Новий" }));

    console.log("=== Оплата авторам ===");
    totalPaymentsPerAuthor(entries).forEach((v, k) => console.log(k, v.toFixed(2) + " грн"));
})();