// =========================
// LOAD SMART SCAN RESULTS
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const scanResults =
        JSON.parse(localStorage.getItem("scanResults"));

    if (!scanResults) {
        console.log("No scan results found.");
        return;
    }

    console.log("Scan results loaded:", scanResults);

    // =========================
    // CALCULATE ITEM COUNTS
    // =========================

    const duplicateFiles =
        scanResults.files.duplicateFiles;

    const oldScreenshots =
        scanResults.photos.screenshots;

    const largeFiles =
        scanResults.files.largeFiles;

    const emailAttachments =
        scanResults.mails.largeAttachments;

    // =========================
    // UPDATE CATEGORY CARDS
    // =========================

    const cards =
        document.querySelectorAll(".cleanup-category-card");

    if (cards.length >= 4) {

        cards[0].querySelector("p").innerHTML =
            duplicateFiles + " items found";

        cards[1].querySelector("p").innerHTML =
            oldScreenshots + " items found";

        cards[2].querySelector("p").innerHTML =
            largeFiles + " items found";

        cards[3].querySelector("p").innerHTML =
            emailAttachments + " items found";
    }

});


// =========================
// GO TO REVIEW PAGE
// =========================

function goToReview() {

    window.location.href = "review.html";

}