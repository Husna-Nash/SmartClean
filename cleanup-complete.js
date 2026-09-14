// =========================
// GET CLEANUP INFORMATION
// =========================

const cleanupFiles =
    JSON.parse(
        localStorage.getItem("cleanupFiles")
    ) || [];

const freedStorage =
    localStorage.getItem("freedStorage") || "0";


// =========================
// SHOW STORAGE FREED
// =========================

document.getElementById(
    "freedStorage"
).innerHTML =
    freedStorage + " GB";


// =========================
// SHOW FILE COUNT
// =========================

document.getElementById(
    "cleanedFiles"
).innerHTML =
    cleanupFiles.length;


// =========================
// START AGAIN
// =========================

function startAgain() {

    localStorage.removeItem("selectedSource");

    localStorage.removeItem("selectedCategory");

    localStorage.removeItem("cleanupFiles");

    localStorage.removeItem("cleanupConfirmed");

    localStorage.removeItem("freedStorage");

    window.location.href =
        "index.html";
}
// =========================
// AUTOMATICALLY OPEN RECOVERY BIN
// =========================

window.addEventListener("load", function () {

    setTimeout(function () {

        window.location.href =
            "recovery-bin.html";

    }, 3000);

});