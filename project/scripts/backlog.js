// Hamburger menu
const menu = document.querySelector("#menu");
const navigation = document.querySelector(".nav-links");

// ✅ Achievements data
let gameAchievements = [];
let achievementsLoaded = false;

async function loadAchievements() {
    if (achievementsLoaded) return;

    try {
        const response = await fetch("data/achievements.json");
        gameAchievements = await response.json();
        achievementsLoaded = true;
    } catch (error) {
        console.error("Error loading achievements:", error);
    }
}

// State
let backlog = JSON.parse(localStorage.getItem("backlog")) || [];
let activeGameIndex = null;

// Elements
const addGameBtn = document.querySelector("#addGameBtn");
const gameList = document.querySelector("#gameList");
const filterStatus = document.querySelector("#filterStatus");
const filterGenre = document.querySelector("#filterGenre");
const achievementSection = document.querySelector("#achievementSection");
const achievementGameName = document.querySelector("#achievementGameName");
const achievementInput = document.querySelector("#achievementInput");
const autocompleteList = document.querySelector("#autocompleteList");
const addAchievementBtn = document.querySelector("#addAchievementBtn");
const achievementProgress = document.querySelector("#achievementProgress");
const achievementList = document.querySelector("#achievementList");

// Add game
if (addGameBtn) {
    addGameBtn.addEventListener("click", () => {
        const title = document.querySelector("#gameTitle").value;
        const genre = document.querySelector("#gameGenre").value;
        const platform = document.querySelector("#gamePlatform").value;
        const status = document.querySelector("#gameStatus").value;
        const hours = document.querySelector("#hoursPlayed").value || 0;

        if (!title || !genre || !platform || !status) {
            alert("Please fill in all fields.");
            return;
        }

        if (backlog.find(g => g.title === title)) {
            alert(`${title} is already in your backlog.`);
            return;
        }

        backlog.push({
            title,
            genre,
            platform,
            status,
            hours: Number(hours),
            achievements: []
        });

        saveBacklog();
        renderGameList();

        document.querySelector("#gameTitle").value = "";
        document.querySelector("#gameGenre").value = "";
        document.querySelector("#gamePlatform").value = "";
        document.querySelector("#gameStatus").value = "";
        document.querySelector("#hoursPlayed").value = "";
    });
}

// Save
function saveBacklog() {
    localStorage.setItem("backlog", JSON.stringify(backlog));
}

// Render list
function renderGameList() {
    if (!gameList) return;

    const statusFilter = filterStatus ? filterStatus.value : "all";
    const genreFilter = filterGenre ? filterGenre.value : "all";

    const filtered = backlog.filter(game =>
        (statusFilter === "all" || game.status === statusFilter) &&
        (genreFilter === "all" || game.genre === genreFilter)
    );

    gameList.innerHTML = "";

    if (filtered.length === 0) {
        gameList.innerHTML = `<p class="hint">No games found. Add one above!</p>`;
        return;
    }

    filtered.forEach(game => {
        const realIndex = backlog.indexOf(game);

        const card = document.createElement("div");
        card.classList.add("game-card");

        card.innerHTML = `
            <div class="game-card-header">
                <span class="game-title">${game.title}</span>
                <span class="game-status status-${game.status.toLowerCase()}">${game.status}</span>
            </div>
            <div class="game-card-details">
                <span>🎮 ${game.platform}</span>
                <span>🏷️ ${game.genre}</span>
                <span>⏱️ ${game.hours}h</span>
            </div>
            <div class="game-card-actions">
                <button class="btn-small btn-track" data-index="${realIndex}">Track Achievements</button>
                <button class="btn-small btn-delete" data-index="${realIndex}">Remove</button>
            </div>
        `;

        gameList.appendChild(card);
    });

    // Track achievements
    document.querySelectorAll(".btn-track").forEach(btn => {
        btn.addEventListener("click", async () => {
            activeGameIndex = Number(btn.dataset.index);

            if (gameAchievements.length === 0) {
                await loadAchievements();
            }

            openAchievementTracker();
        });
    });

    // Delete
    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = Number(btn.dataset.index);
            backlog.splice(index, 1);

            if (activeGameIndex === index && achievementSection) {
                achievementSection.style.display = "none";
                activeGameIndex = null;
            }

            saveBacklog();
            renderGameList();
        });
    });
}

// Open tracker
function openAchievementTracker() {
    if (!achievementSection) return;

    const game = backlog[activeGameIndex];

    achievementSection.style.display = "block";
    if (achievementGameName) achievementGameName.textContent = game.title;
    if (achievementInput) achievementInput.value = "";
    if (autocompleteList) {
        autocompleteList.innerHTML = "";
        autocompleteList.classList.remove("open");
    }

    updateAchievementDisplay();
    achievementSection.scrollIntoView({ behavior: "smooth" });
}

// Update achievements
function updateAchievementDisplay() {
    if (!achievementProgress || !achievementList) return;

    const game = backlog[activeGameIndex];
    const gameData = gameAchievements.find(g => g.name === game.title);
    if (!gameData) return;

    const totalAch = gameData.achievements.length;
    const completedAch = game.achievements.length;

    achievementProgress.innerHTML = `
        <p>Achievements: <strong>${completedAch}/${totalAch}</strong></p>
    `;

    achievementList.innerHTML = "";

    game.achievements.forEach(title => {
        const li = document.createElement("li");
        li.textContent = `✅ ${title}`;
        achievementList.appendChild(li);
    });
}

// Autocomplete
if (achievementInput) {
    achievementInput.addEventListener("input", () => {
        if (activeGameIndex === null) return;

        const game = backlog[activeGameIndex];
        const gameData = gameAchievements.find(g => g.name === game.title);
        const query = achievementInput.value.toLowerCase().trim();

        autocompleteList.innerHTML = "";

        if (!query || !gameData) {
            autocompleteList.classList.remove("open");
            return;
        }

        const matches = gameData.achievements.filter(ach =>
            ach.title.toLowerCase().includes(query) &&
            !game.achievements.includes(ach.title)
        );

        if (matches.length === 0) {
            autocompleteList.classList.remove("open");
            return;
        }

        matches.forEach(ach => {
            const li = document.createElement("li");
            li.textContent = ach.title;

            li.addEventListener("click", () => {
                achievementInput.value = ach.title;
                autocompleteList.classList.remove("open");
            });

            autocompleteList.appendChild(li);
        });

        autocompleteList.classList.add("open");
    });
}

// Close autocomplete
document.addEventListener("click", (e) => {
    if (autocompleteList && !e.target.closest(".autocomplete-wrapper")) {
        autocompleteList.classList.remove("open");
    }
});

// Add achievement
if (addAchievementBtn) {
    addAchievementBtn.addEventListener("click", () => {
        if (activeGameIndex === null) return;

        const game = backlog[activeGameIndex];
        const gameData = gameAchievements.find(g => g.name === game.title);
        const input = achievementInput.value.trim();

        if (!input) return;

        const found = gameData.achievements.find(
            a => a.title.toLowerCase() === input.toLowerCase()
        );

        if (!found) {
            alert(`"${input}" is not valid.`);
            return;
        }

        if (game.achievements.includes(found.title)) {
            alert("Already added.");
            return;
        }

        game.achievements.push(found.title);

        achievementInput.value = "";
        saveBacklog();
        updateAchievementDisplay();
        renderGameList();
    });
}

// Filters
if (filterStatus) filterStatus.addEventListener("change", renderGameList);
if (filterGenre) filterGenre.addEventListener("change", renderGameList);

// Menu
if (menu) {
    menu.addEventListener("click", () => {
        navigation.classList.toggle("open");
        menu.classList.toggle("open");
    });
}

// Footer
const year = document.getElementById("currentyear");
const modified = document.getElementById("lastModified");

if (year) year.textContent = new Date().getFullYear();
if (modified) modified.textContent = document.lastModified;

// Initial render
renderGameList();