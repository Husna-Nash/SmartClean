// =========================
// CHECK CLEANUP STATUS
// =========================

const cleanupDone =
    localStorage.getItem("cleanupConfirmed") === "true";


// =========================
// GET SELECTED SOURCES
// =========================

let selectedSources =
    JSON.parse(
        localStorage.getItem("selectedSources")
    ) || [];


// =========================
// GET UPDATED STORAGE
// =========================

const updatedStorage =
    JSON.parse(
        localStorage.getItem("updatedStorage")
    );


// =========================
// GET PAGE ELEMENTS
// =========================

const categoryArea =
    document.getElementById(
        "organizationCategories"
    );

const organizationContent =
    document.getElementById(
        "organizationContent"
    );

const organizationMessage =
    document.getElementById(
        "organizationMessage"
    );


// =========================
// BEFORE CLEANUP
// =========================

if (!cleanupDone) {

    organizationMessage.innerHTML =
        "Organization can be done only after cleanup.";

    categoryArea.innerHTML = "";

    organizationContent.innerHTML = "";

}


// =========================
// AFTER CLEANUP
// =========================

else {

    // No sources selected
    if (selectedSources.length === 0) {

        organizationMessage.innerHTML =
            "No source was selected for organization.";

        categoryArea.innerHTML = "";

        organizationContent.innerHTML = "";

    }


    // ONE SOURCE SELECTED
    else if (selectedSources.length === 1) {

        organizationMessage.innerHTML =
            "Your remaining files are now neatly organized.";

        categoryArea.innerHTML = "";

        showOrganization(
            selectedSources[0]
        );

    }


    // MORE THAN ONE SOURCE SELECTED
    else {

        organizationMessage.innerHTML =
            "Choose a source to organize the remaining items.";

        categoryArea.innerHTML = "";

        organizationContent.innerHTML = "";


        selectedSources.forEach(
            function(source) {

                const button =
                    document.createElement("button");

                button.type = "button";

                button.className =
                    "organization-category-button";

                button.innerHTML =
                    source;

                button.onclick =
                    function() {

                        showOrganization(source);

                    };

                categoryArea.appendChild(button);

            }
        );

    }

}


// =========================
// SHOW SELECTED ORGANIZATION
// =========================

function showOrganization(source) {

    if (!updatedStorage) {

        organizationContent.innerHTML = `

            <div class="organization-box">

                <h2>
                    ${source} Organization
                </h2>

                <p>
                    Storage information is not available yet.
                </p>

            </div>

        `;

        return;

    }


    // =========================
    // SELECT STORAGE DATA
    // =========================

    let sourceData;


    if (source === "Google Photos") {

        sourceData =
            updatedStorage.googlePhotos;

    }

    else if (source === "Gallery") {

        sourceData =
            updatedStorage.gallery;

    }

    else if (source === "Files & Documents") {

        sourceData =
            updatedStorage.files;

    }

    else if (source === "Gmail") {

        sourceData =
            updatedStorage.mails;

    }


    // Safety check
    if (!sourceData) {

        organizationContent.innerHTML = `

            <div class="organization-box">

                <h2>
                    ${source} Organization
                </h2>

                <p>
                    Storage information is not available for this source.
                </p>

            </div>

        `;

        return;

    }


    // =========================
    // DISPLAY REMAINING STORAGE
    // =========================

    organizationContent.innerHTML = `

        <div class="organization-box">

            <h2>
                ${source} Organization
            </h2>


            <div class="organization-storage-summary">

                <h3>
                    Remaining Storage
                </h3>

                <p>
                    ${sourceData.used}
                    used out of
                    ${sourceData.total}
                </p>

            </div>


            <div class="organization-item">

                <span>🖼️</span>

                <div>

                    <strong>Images</strong>

                    <p>
                        ${sourceData.photos} remaining
                    </p>

                </div>

            </div>


            <div class="organization-item">

                <span>🎥</span>

                <div>

                    <strong>Videos</strong>

                    <p>
                        ${sourceData.videos} remaining
                    </p>

                </div>

            </div>


            <div class="organization-item">

                <span>📄</span>

                <div>

                    <strong>Documents / Files</strong>

                    <p>
                        ${sourceData.files} remaining
                    </p>

                </div>

            </div>


            <div class="organization-item">

                <span>📦</span>

                <div>

                    <strong>Other Files</strong>

                    <p>
                        ${sourceData.other} remaining
                    </p>

                </div>

            </div>


            <p class="organization-success-message">

                Your remaining files are now neatly organized.

            </p>

        </div>

    `;

}


// =========================
// START AGAIN
// =========================

function startAgain() {

    localStorage.removeItem("selectedSource");
    localStorage.removeItem("selectedSources");
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("cleanupFiles");
    localStorage.removeItem("cleanupConfirmed");
    localStorage.removeItem("freedStorage");
    localStorage.removeItem("updatedStorage");

    window.location.href =
        "index.html";
}