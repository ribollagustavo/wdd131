const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
];

// 1. Populate Product Name Select
const select = document.querySelector("#productName");

if (select) {
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id; // Requirement: id is the value
        option.textContent = product.name; // Requirement: name is the display
        select.appendChild(option);
    });
}

// 2. Review Counter (localStorage)
const countDisplay = document.querySelector("#review-count");

if (countDisplay) {
    // Only increments when on review.html
    let reviewCount = Number(window.localStorage.getItem("reviewCount-ls")) || 0;
    reviewCount++;
    localStorage.setItem("reviewCount-ls", reviewCount);
    countDisplay.textContent = reviewCount;
}

// 3. Footer Dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;