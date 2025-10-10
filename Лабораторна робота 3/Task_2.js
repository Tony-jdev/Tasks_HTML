class UserRecord {
    constructor({ lastName, firstName, age, education, feedbackGoal, contactDate, contactTime }) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = Number(age) || 0;
        this.education = education;
        this.feedbackGoal = feedbackGoal;
        const datePart = (contactDate instanceof Date) ? contactDate.toISOString().slice(0,10) : String(contactDate);
        const timePart = contactTime || "00:00";
        this.contactDateTime = new Date(datePart + "T" + timePart + ":00");
    }
}

// -----------------------------
// 2.a) Користувачі у певний місяць і час
// -----------------------------
function usersContactedInMonthAtTime(users, month, hour = null, minute = null) {
    const m = month - 1;
    return users.filter(u => {
        const d = u.contactDateTime;
        if (d.getMonth() !== m) return false;
        if (hour === null) return true;
        return d.getHours() === hour && (minute === null ? true : d.getMinutes() === minute);
    });
}

// -----------------------------
// 2.b) Максимальний вік користувача
// -----------------------------
function userWithMaxAge(users) {
    if (!users || users.length === 0) return null;
    let max = users[0];
    for (const u of users) {
        if (u.age > max.age) max = u;
    }
    return { age: max.age, education: max.education, contactDateTime: max.contactDateTime };
}

// -----------------------------
// 2.c) Класифікація користувачів
// -----------------------------
function classifyUsers(users) {
    const groups = { "претензійні сови": [], "доброзичливі жайворонки": [], "інші": [] };
    const positiveGoals = ["прохання", "відгук", "порада", "інформація"];

    for (const u of users) {
        const h = u.contactDateTime.getHours();
        const goal = (u.feedbackGoal || "").toLowerCase();
        const isOwl = (h >= 21 || h <= 4);
        const isLark = (h >= 5 && h <= 9);

        if (isOwl && goal.includes("скарг")) groups["претензійні сови"].push(u);
        else if (isLark && positiveGoals.includes(goal)) groups["доброзичливі жайворонки"].push(u);
        else groups["інші"].push(u);
    }
    return groups;
}

// -----------------------------
// 2.d) Сортування користувачів
// -----------------------------
function sortUsersAlphabetically(users) {
    return [...users].sort((a, b) => {
        if (a.lastName === b.lastName) return a.firstName.localeCompare(b.firstName);
        return a.lastName.localeCompare(b.lastName);
    }).map(u => ({ fullName: `${u.lastName} ${u.firstName}`, feedbackGoal: u.feedbackGoal }));
}

function generateTestUsers() {
    const base = [
        { lastName: "Іваненко", firstName: "Олег", age: 28, education: "Bachelor", feedbackGoal: "скарга", contactDate: "2025-06-05", contactTime: "09:15" },
        { lastName: "Петренко", firstName: "Марія", age: 45, education: "Master", feedbackGoal: "прохання", contactDate: "2025-06-12", contactTime: "22:30" },
        { lastName: "Сидорчук", firstName: "Андрій", age: 34, education: "PhD", feedbackGoal: "порада", contactDate: "2025-07-01", contactTime: "06:05" },
        { lastName: "Коваленко", firstName: "Наталя", age: 52, education: "Secondary", feedbackGoal: "скарга", contactDate: "2025-07-15", contactTime: "23:45" },
        { lastName: "Гнатюк", firstName: "Петро", age: 19, education: "Student", feedbackGoal: "відгук", contactDate: "2025-06-10", contactTime: "05:50" },
        { lastName: "Шевчук", firstName: "Олексій", age: 60, education: "Bachelor", feedbackGoal: "прохання", contactDate: "2025-06-21", contactTime: "20:10" },
        { lastName: "Бондар", firstName: "Ірина", age: 37, education: "Master", feedbackGoal: "інформація", contactDate: "2025-05-30", contactTime: "08:00" },
        { lastName: "Мельник", firstName: "Юрій", age: 29, education: "Bachelor", feedbackGoal: "відгук", contactDate: "2025-07-03", contactTime: "04:30" },
        { lastName: "Левченко", firstName: "Тетяна", age: 46, education: "PhD", feedbackGoal: "скарга", contactDate: "2025-06-02", contactTime: "13:40" },
        { lastName: "Орлова", firstName: "Світлана", age: 31, education: "Bachelor", feedbackGoal: "порада", contactDate: "2025-06-12", contactTime: "22:30" }
    ];
    return base.map(obj => new UserRecord(obj));
}

(function runDemoPart2() {
    const users = generateTestUsers();

    console.log("=== Користувачі, що звертались у червні о 22:30 ===");
    console.dir(usersContactedInMonthAtTime(users, 6, 22, 30));

    console.log("=== Користувач з найбільшим віком ===");
    console.log(userWithMaxAge(users));

    console.log("=== Класифікація користувачів ===");
    const classes = classifyUsers(users);
    console.log("претензійні сови:", classes["претензійні сови"].length);
    console.log("доброзичливі жайворонки:", classes["доброзичливі жайворонки"].length);
    console.log("інші:", classes["інші"].length);

    console.log("=== Алфавітне сортування ===");
    console.dir(sortUsersAlphabetically(users));
})();