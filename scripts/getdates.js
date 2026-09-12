const copyrightYearElement = document.getElementById("currentyear");
const lastModifiedElement = document.getElementById("lastModified");

const currentYear = new Date().getFullYear();
copyrightYearElement.textContent = currentYear;

lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;