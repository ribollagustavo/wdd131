// Hamburger menu
const menu = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menu.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menu.classList.toggle("open");
});

// Array of temple data
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Brasilia",
        location: "Brasilia, Brazil",
        dedicated: "2019, November, 10",
        area: 37420,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/brasilia-brazil-temple/brasilia-brazil-temple-34346.jpg"
    },
    {
        templeName: "Curitiba",
        location: "Curitiba, Brazil",
        dedicated: "2008, June, 1",
        area: 28500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/curitiba-brazil-temple/curitiba-brazil-temple-48285.jpg"
    },
    {
        templeName: "São Paulo",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-46580.jpg"
    },
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

// Create temple cards

createTempleCards(temples);

function createTempleCards(filteredTemples) {
    document.querySelector(".res-grid").innerHTML = "";    
    filteredTemples.forEach(temple => {
        let card = document.createElement("section");
        let name = document.createElement("h3");
        let location = document.createElement("p");
        let dedicated = document.createElement("p");
        let area = document.createElement("p");
        let img = document.createElement("img");
        

        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">Area:</span> ${temple.area} sq ft`;
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `${temple.templeName} Temple`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
        img.width = 400;
        img.height = 250;


        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        
        document.querySelector(".res-grid").appendChild(card);
    });
}

const oldLink = document.querySelector('a[data-filter="old"]');
const newLink = document.querySelector('a[data-filter="new"]');
const largeLink = document.querySelector('a[data-filter="large"]');
const smallLink = document.querySelector('a[data-filter="small"]');
const homeLink = document.querySelector('a[data-filter="home"]');

oldLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#gallery-heading").textContent = "Old";
    const oldTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(", ")[0]);
        return year < 1900;
    });
    createTempleCards(oldTemples);
});

newLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#gallery-heading").textContent = "New";
    
    const newTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(", ")[0]);
        return year >= 2000;
    });
    createTempleCards(newTemples);
});

largeLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#gallery-heading").textContent = "Large";
    
    const largeTemples = temples.filter(temple => temple.area > 90000);
    createTempleCards(largeTemples);
});

smallLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#gallery-heading").textContent = "Small";

    const smallTemples = temples.filter(temple => temple.area < 10000);
    createTempleCards(smallTemples);
});

homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#gallery-heading").textContent = "Home";

    createTempleCards(temples);
});

// Footer
let d = new Date();
document.querySelector("#currentyear").innerHTML = `&copy;${d.getFullYear()}`;
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;