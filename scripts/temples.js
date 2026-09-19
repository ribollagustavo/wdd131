// Hamburger menu
const menu = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menu.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menu.classList.toggle("open");
});

// Temple data
const temples = [
    {
        templeName: "Brasilia",
        location: "Brasilia, Brazil",
        dedicated: "2019, November, 10",
        area: 37420,
        imageUrl: "images/temples/brasilia_temple.webp"
    },
    {
        templeName: "Curitiba",
        location: "Curitiba, Brazil",
        dedicated: "2008, June, 1",
        area: 28500,
        imageUrl: "images/temples/curitiba_temple.webp"
    },
    {
        templeName: "São Paulo",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl: "images/temples/sp_temple.webp"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 40000,
        imageUrl: "images/temples/rome_temple.webp"
    },
    {
        templeName: "Salt Lake City",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "images/temples/salt_lake_temple.webp"
    },
    {
        templeName: "Payson",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "images/temples/payson_temple.webp"
    },
    {
        templeName: "Grand Junction Colorado",
        location: "Grand Junction, Colorado, United States",
        dedicated: "2021, May, 30",
        area: 10000,
        imageUrl: "images/temples/gj_colorado_temple.webp"
    },
    {
        templeName: "Manti",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "images/temples/manti_temple.webp"
    },
    {
        templeName: "Mesa Arizona",
        location: "Mesa, Arizona, United States",
        dedicated: "1927, October, 23",
        area: 113916,
        imageUrl: "images/temples/mesa_ar_temple.webp"
    }
];

// Create temple cards
function createTempleCards(templeList, heading = "Home") {
    const container = document.querySelector("main");

    // update heading
    document.querySelector("#gallery-heading").textContent = heading;

    // remove existing cards
    const existingCards = container.querySelectorAll(".temple-card");
    existingCards.forEach(card => card.remove());

    templeList.forEach((temple, index) => {
        const figure = document.createElement("figure");
        figure.classList.add("temple-card");

        const img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = `The ${temple.templeName} Temple`;
        img.width = 400;
        img.height = 300;

        if (index === 0) {
            img.fetchPriority = "high";
            img.loading = "eager";
        } else {
            img.loading = "lazy";
        }

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = `The ${temple.templeName} Temple`;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        container.appendChild(figure);
    });
}

// Filter navigation
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const filterType = e.target.getAttribute("data-filter");
        let filteredTemples;
        let heading;

        switch (filterType) {
            case "old":
                filteredTemples = temples.filter(temple =>
                    Number(temple.dedicated.split(", ")[0]) < 1900);
                heading = "Old Temples";
                break;
            case "new":
                filteredTemples = temples.filter(temple =>
                    Number(temple.dedicated.split(", ")[0]) >= 2000);
                heading = "New Temples";
                break;
            case "large":
                filteredTemples = temples.filter(temple =>
                    temple.area > 90000);
                heading = "Large Temples";
                break;
            case "small":
                filteredTemples = temples.filter(temple =>
                    temple.area <= 10000);   // was: < 10000
                heading = "Small Temples";
            break;
            default:
                filteredTemples = temples;
                heading = "Home";
                break;
        }
        createTempleCards(filteredTemples, heading);
    });
});

// Footer
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;