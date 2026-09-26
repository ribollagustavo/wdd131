document.getElementById("currentyear").textContent =
new Date().getFullYear();

document.getElementById("lastModified").textContent =
document.lastModified;

const temp = 10;
const wind = 5;

function calculateWindChill(t, v){
return 13.12 + 0.6215*t - 11.37*Math.pow(v,0.16) + 0.3965*t*Math.pow(v,0.16);
}

let windChill = "N/A";

if (temp <= 10 && wind > 4.8){
windChill = calculateWindChill(temp, wind).toFixed(1) + " °C";
}

document.getElementById("temp").textContent = temp + " °C";
document.getElementById("wind").textContent = wind + " km/h";
document.getElementById("windchill").textContent = windChill;