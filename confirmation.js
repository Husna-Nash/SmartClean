// =========================
// GET SELECTED FILES
// =========================

const cleanupFiles =
    JSON.parse(
        localStorage.getItem("cleanupFiles")
    ) || [];


// =========================
// CALCULATE TOTALS
// =========================

let totalStorage = 0;

cleanupFiles.forEach(function(file) {

    totalStorage += Number(file.size);

});


// =========================
// SHOW TOTAL FILES
// =========================

document.getElementById(
    "confirmationFileCount"
).innerHTML =
    cleanupFiles.length;


// =========================
// SHOW TOTAL STORAGE
// =========================

document.getElementById(
    "confirmationStorage"
).innerHTML =
    totalStorage.toFixed(2) + " GB";


// =========================
// SHOW SELECTED FILES
// =========================

const selectedFilesList =
    document.getElementById(
        "selectedFilesList"
    );


if (cleanupFiles.length === 0) {

    selectedFilesList.innerHTML = `
        <p class="no-files-message">
            No files selected.
        </p>
    `;

}

else {

    cleanupFiles.forEach(function(file) {

        const fileItem =
            document.createElement("div");

        fileItem.className =
            "selected-file-item";

        fileItem.innerHTML = `

            <div>

                <h3>${file.name}</h3>

                <p>${file.category}</p>

            </div>

            <strong>
                ${Number(file.size).toFixed(2)} GB
            </strong>

        `;

        selectedFilesList.appendChild(
            fileItem
        );

    });

}


// =========================
// GO BACK
// =========================

function goBackToReview() {

    window.location.href =
        "review.html";

}


// =========================
// CONFIRM CLEANUP
// =========================

function confirmCleanup() {

    localStorage.setItem(
        "cleanupConfirmed",
        "true"
    );

    localStorage.setItem(
        "freedStorage",
        totalStorage.toFixed(2)
    );

    window.location.href =
        "cleanup-complete.html";

}