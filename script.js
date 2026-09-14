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

    localStorage.setItem(
        "selectedSources",
        JSON.stringify(selectedSources)
    );

    document.getElementById("accessPage").style.display = "none";
    document.getElementById("storageOverviewPage").style.display = "block";

    
    const storageBoxes =
        document.getElementById("storageBoxes");

    storageBoxes.innerHTML = "";

    const storageData = {

        "Google Photos": {
            used: 86,
            total: 100,
            percentage: 86,
            photos: 42,
            videos: 18,
            files: 14,
            other: 12
        },

        "Gallery": {
            used: 60,
            total: 100,
            percentage: 60,
            photos: 30,
            videos: 15,
            files: 8,
            other: 7
        },

        "Files & Documents": {
            used: 45,
            total: 100,
            percentage: 45,
            photos: 5,
            videos: 3,
            files: 30,
            other: 7
        },

        "Gmail": {
            used: 25,
            total: 100,
            percentage: 25,
            photos: 2,
            videos: 1,
            files: 18,
            other: 4
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


                // Move to Slide 5
                setTimeout(function () {

                    window.location.href =
                        "unnecessary.html";

                }, 1500);

            }

        }, 300);

    });

});