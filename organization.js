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

    organizationContent.innerHTML = `

        <div class="organization-box">

            <h2>
                ${source} Organization
            </h2>


            <div class="organization-item">

                <span>🖼️</span>

                <div>

                    <strong>Images</strong>

                    <p>
                        25 files remaining
                    </p>

                </div>

            </div>


            <div class="organization-item">

                <span>🎥</span>

                <div>

                    <strong>Videos</strong>

                    <p>
                        8 files remaining
                    </p>

                </div>

            </div>


            <div class="organization-item">

                <span>📄</span>

                <div>

                    <strong>Documents</strong>

                    <p>
                        4 files remaining
                    </p>

                </div>

            </div>


            <div class="organization-item">

                <span>📦</span>

                <div>

                    <strong>Other Files</strong>

                    <p>
                        3 files remaining
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

    window.location.href =
        "index.html";
}