// =========================
// PERMISSION ACCESS
// =========================

function allowAccess(button, source) {

    let selectedSources =
        JSON.parse(localStorage.getItem("selectedSources")) || [];

    if (selectedSources.includes(source)) {

        // UNSELECT
        selectedSources = selectedSources.filter(function(item) {
            return item !== source;
        });

        button.innerHTML = "Allow Access";
        button.classList.remove("allowed");

    } else {

        // SELECT
        selectedSources.push(source);

        button.innerHTML = "✓ Allowed";
        button.classList.add("allowed");
    }

    localStorage.setItem(
        "selectedSources",
        JSON.stringify(selectedSources)
    );
}


// =========================
// STORAGE OVERVIEW
// =========================

function showStorageOverview() {

    let selectedSources = [];

    document.querySelectorAll(".allow-button").forEach(function(button) {

        if (button.classList.contains("allowed")) {

            const source = button.getAttribute("onclick")
                .match(/'([^']+)'/)[1];

            selectedSources.push(source);
        }

    });

    if (selectedSources.length === 0) {
        alert("Please select at least one category to continue.");
        return;
    }

    // Save selected permissions in browser
    localStorage.setItem(
        "selectedSources",
        JSON.stringify(selectedSources)
    );

    // =========================
    // SEND PERMISSIONS TO BACKEND
    // =========================

    fetch("http://localhost:5000/api/permissions", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            permissions: selectedSources
        })

    })

    .then(function(response) {

        if (!response.ok) {
            throw new Error("Backend connection failed");
        }

        return response.json();

    })

    .then(function(data) {

        console.log("Backend response:", data);

        // Move to Storage Overview only after backend responds
        document.getElementById("accessPage").style.display = "none";
        document.getElementById("storageOverviewPage").style.display = "block";

        const storageBoxes =
            document.getElementById("storageBoxes");

        storageBoxes.innerHTML = "";

        const updatedStorage =
    JSON.parse(localStorage.getItem("updatedStorage"));

const storageData = {

    "Google Photos": {

        used: updatedStorage
            ? parseFloat(updatedStorage.googlePhotos.used)
            : 86,

        total: 100,

        percentage: updatedStorage
            ? (
                parseFloat(updatedStorage.googlePhotos.used) / 100
            ) * 100
            : 86,

        photos: updatedStorage
            ? parseFloat(updatedStorage.googlePhotos.photos)
            : 42,

        videos: updatedStorage
            ? parseFloat(updatedStorage.googlePhotos.videos)
            : 18,

        files: updatedStorage
            ? parseFloat(updatedStorage.googlePhotos.files)
            : 14,

        other: updatedStorage
            ? parseFloat(updatedStorage.googlePhotos.other)
            : 12
    },


    "Gallery": {

        used: updatedStorage
            ? parseFloat(updatedStorage.gallery.used)
            : 60,

        total: 100,

        percentage: updatedStorage
            ? (
                parseFloat(updatedStorage.gallery.used) / 100
            ) * 100
            : 60,

        photos: updatedStorage
            ? parseFloat(updatedStorage.gallery.photos)
            : 30,

        videos: updatedStorage
            ? parseFloat(updatedStorage.gallery.videos)
            : 15,

        files: updatedStorage
            ? parseFloat(updatedStorage.gallery.files)
            : 8,

        other: updatedStorage
            ? parseFloat(updatedStorage.gallery.other)
            : 7
    },


    "Files & Documents": {

        used: updatedStorage
            ? parseFloat(updatedStorage.files.used)
            : 45,

        total: 100,

        percentage: updatedStorage
            ? (
                parseFloat(updatedStorage.files.used) / 100
            ) * 100
            : 45,

        photos: updatedStorage
            ? parseFloat(updatedStorage.files.photos)
            : 5,

        videos: updatedStorage
            ? parseFloat(updatedStorage.files.videos)
            : 3,

        files: updatedStorage
            ? parseFloat(updatedStorage.files.files)
            : 30,

        other: updatedStorage
            ? parseFloat(updatedStorage.files.other)
            : 7
    },


    "Gmail": {

        used: updatedStorage
            ? parseFloat(updatedStorage.mails.used)
            : 25,

        total: 100,

        percentage: updatedStorage
            ? (
                parseFloat(updatedStorage.mails.used) / 100
            ) * 100
            : 25,

        photos: updatedStorage
            ? parseFloat(updatedStorage.mails.photos)
            : 2,

        videos: updatedStorage
            ? parseFloat(updatedStorage.mails.videos)
            : 1,

        files: updatedStorage
            ? parseFloat(updatedStorage.mails.files)
            : 18,

        other: updatedStorage
            ? parseFloat(updatedStorage.mails.other)
            : 4
    }
};

        selectedSources.forEach(function(source) {

            const data = storageData[source];

            if (!data) {
                return;
            }

            const box = document.createElement("div");

            box.className = "individual-storage-box";

            box.innerHTML = `

                <div class="individual-storage-header">

                    <h2>${source}</h2>

                    <p>${data.used} GB / ${data.total} GB</p>

                    <strong>${data.percentage}% Used</strong>

                    <div class="individual-storage-bar">

                        <div style="width: ${data.percentage}%"></div>

                    </div>

                </div>

                <div class="individual-storage-categories">

                    <div class="individual-storage-category">

                        <div class="category-icon">
                            🖼️
                        </div>

                        <h3>Photos</h3>

                        <p>${data.photos} GB</p>

                    </div>

                    <div class="individual-storage-category">

                        <div class="category-icon">
                            🎥
                        </div>

                        <h3>Videos</h3>

                        <p>${data.videos} GB</p>

                    </div>

                    <div class="individual-storage-category">

                        <div class="category-icon">
                            📄
                        </div>

                        <h3>Files</h3>

                        <p>${data.files} GB</p>

                    </div>

                    <div class="individual-storage-category">

                        <div class="category-icon">
                            📦
                        </div>

                        <h3>Other</h3>

                        <p>${data.other} GB</p>

                    </div>

                </div>

            `;

            storageBoxes.appendChild(box);

        });

    })

    .catch(function(error) {

        console.error("Error connecting to backend:", error);

        alert(
            "Unable to connect to SMART CLEAN backend. Please make sure the backend is running on port 5000."
        );

    });
}
// =========================
// SPLASH SCREEN
// =========================

window.addEventListener("load", function () {

    const splashPage = document.getElementById("splashPage");
    const accessPage = document.getElementById("accessPage");

    // Start with Slide 1
    if (splashPage) {
        splashPage.style.display = "flex";
    }

    if (accessPage) {
        accessPage.style.display = "none";
    }

    // After 2.5 seconds, go to Slide 2
    setTimeout(function () {

        if (splashPage) {
            splashPage.style.display = "none";
        }

        if (accessPage) {
            accessPage.style.display = "block";
        }

    }, 2500);

});
// =========================
// SMART SCAN
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const smartScanBtn =
        document.getElementById("smartScanBtn");

    if (!smartScanBtn) {
        return;
    }

    smartScanBtn.addEventListener("click", function () {

        // Hide Storage Overview
        document.getElementById("storageOverviewPage").style.display =
            "none";

        // Show Smart Scan
        document.getElementById("smartScanPage").style.display =
            "flex";

        let progress = 0;
        let scanCompleted = false;

        // =========================
        // CONNECT TO BACKEND
        // =========================

        fetch("http://localhost:5000/api/scan", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                sources:
                    JSON.parse(localStorage.getItem("selectedSources")) || []
            })

        })

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Scan API connection failed");
            }

            return response.json();

        })

        .then(function (data) {

            console.log("Smart Scan Backend Response:", data);

            // Save scan results for the next page
            localStorage.setItem(
                "scanResults",
                JSON.stringify(data.results)
            );

            scanCompleted = true;

        })

        .catch(function (error) {

            console.error(
                "Smart Scan Backend Error:",
                error
            );

            document.getElementById("scanStatus").innerHTML =
                "❌ Unable to connect to Smart Scan";

            clearInterval(scanInterval);

            setTimeout(function () {

                alert(
                    "SMART CLEAN could not connect to the backend. Please make sure the backend is running on port 5000."
                );

                document.getElementById("smartScanPage").style.display =
                    "none";

                document.getElementById("storageOverviewPage").style.display =
                    "block";

            }, 1000);

        });


        // =========================
        // SCAN PROGRESS ANIMATION
        // =========================

        const scanInterval = setInterval(function () {

            progress += 10;

            // Update progress bar
            document.getElementById("scanProgressBar").style.width =
                progress + "%";

            // Update percentage
            document.getElementById("scanPercentage").innerHTML =
                progress + "%";


            // Update scanning message

            if (progress <= 30) {

                document.getElementById("scanStatus").innerHTML =
                    "Reading your files...";

            }

            else if (progress <= 60) {

                document.getElementById("scanStatus").innerHTML =
                    "Analyzing your files...";

            }

            else if (progress < 100) {

                document.getElementById("scanStatus").innerHTML =
                    "Checking for unnecessary files...";

            }

            else {

                clearInterval(scanInterval);

                // Scan completed
                document.getElementById("scanStatus").innerHTML =
                    "✓ Scan Completed";

                document.getElementById("scanPercentage").innerHTML =
                    "100%";


                // =========================
                // MOVE TO NEXT PAGE
                // =========================

                if (scanCompleted) {

                    setTimeout(function () {

                        window.location.href =
                            "unnecessary.html";

                    }, 1500);

                }

            }

        }, 300);

    });

});