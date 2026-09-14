// =========================
// GET CLEANUP INFORMATION
// =========================

let recoveryFiles =
    JSON.parse(
        localStorage.getItem("cleanupFiles")
    ) || [];


// =========================
// SHOW FILE COUNT
// =========================

document.getElementById(
    "recoveryFileCount"
).innerHTML =
    recoveryFiles.length;


// =========================
// CALCULATE TOTAL SIZE
// =========================

function calculateTotalSize() {

    let total = 0;

    recoveryFiles.forEach(function(file) {

        total += Number(file.size) || 0;

    });

    return total;

}


// =========================
// SHOW TOTAL SIZE
// =========================

document.getElementById(
    "recoveryStorage"
).innerHTML =
    calculateTotalSize().toFixed(2) + " GB";


// =========================
// FILE LIST
// =========================

const fileList =
    document.getElementById("recoveryFileList");

fileList.innerHTML = "";


// =========================
// SHOW FILES
// =========================

if (recoveryFiles.length === 0) {

    fileList.innerHTML = `
        <div class="empty-recovery-message">
            Recovery Bin is empty.
        </div>
    `;

} else {

    recoveryFiles.forEach(function(file, index) {

        let source = "Files";

        let sourceIcon = "📄";

        let sourceClass = "files-source";


        // Photos

        if (
            file.category === "Duplicate Files" ||
            file.category === "Old Screenshots"
        ) {

            source = "Photos";
            sourceIcon = "▧";
            sourceClass = "photos-source";

        }


        // Large files

        if (
            file.category === "Large Files"
        ) {

            source = "Files";
            sourceIcon = "▤";
            sourceClass = "files-source";

        }


        // Email attachments

        if (
            file.category === "Email Attachments"
        ) {

            source = "Mails";
            sourceIcon = "✉";
            sourceClass = "mails-source";

        }


        // File icon

        let fileIcon = "📄";

        if (
            file.name.toLowerCase().endsWith(".jpg") ||
            file.name.toLowerCase().endsWith(".jpeg") ||
            file.name.toLowerCase().endsWith(".png")
        ) {

            fileIcon = "🖼️";

        } else if (
            file.name.toLowerCase().endsWith(".mp4")
        ) {

            fileIcon = "🎬";

        } else if (
            file.name.toLowerCase().endsWith(".pdf")
        ) {

            fileIcon = "📕";

        } else if (
            file.name.toLowerCase().endsWith(".zip")
        ) {

            fileIcon = "📦";

        }


        // Deleted date

        const deletedDate =
            new Date().toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );


        // Create row

        const row =
            document.createElement("div");

        row.className =
            "recovery-file-item";


        row.innerHTML = `

            <div class="check-column">

                <input
                    type="checkbox"
                    class="recovery-checkbox"
                    data-index="${index}"
                    checked>

            </div>


            <div class="recovery-item-name">

                <div class="recovery-file-icon">
                    ${fileIcon}
                </div>

                <span>
                    ${file.name}
                </span>

            </div>


            <div>

                <span class="source-badge ${sourceClass}">

                    ${sourceIcon}
                    ${source}

                </span>

            </div>


            <div class="recovery-size">

                ${file.size} GB

            </div>


            <div class="recovery-date">

                ${deletedDate}

            </div>


            <div>

                <button
                    class="restore-button"
                    onclick="restoreFile(${index})">

                    ↻ Restore

                </button>

            </div>

        `;


        fileList.appendChild(row);

    });

}


// =========================
// SELECT ALL
// =========================

function toggleAllRecovery(checkbox) {

    const checkboxes =
        document.querySelectorAll(
            ".recovery-checkbox"
        );

    checkboxes.forEach(function(item) {

        item.checked =
            checkbox.checked;

    });

}


// =========================
// RESTORE ONE FILE
// =========================

function restoreFile(index) {

    recoveryFiles.splice(index, 1);

    localStorage.setItem(
        "cleanupFiles",
        JSON.stringify(recoveryFiles)
    );

    location.reload();

}


// =========================
// RESTORE SELECTED
// =========================

function restoreSelected() {

    const selected =
        document.querySelectorAll(
            ".recovery-checkbox:checked"
        );

    if (selected.length === 0) {

        alert(
            "Please select at least one file to restore."
        );

        return;

    }


    const indexes = [];

    selected.forEach(function(item) {

        indexes.push(
            Number(item.dataset.index)
        );

    });


    recoveryFiles =
        recoveryFiles.filter(
            function(file, index) {

                return !indexes.includes(index);

            }
        );


    localStorage.setItem(
        "cleanupFiles",
        JSON.stringify(recoveryFiles)
    );


    location.reload();

}


// =========================
// DELETE PERMANENTLY
// =========================

function emptyRecoveryBin() {

    if (recoveryFiles.length === 0) {

        alert(
            "Recovery Bin is already empty."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to permanently delete all files in the Recovery Bin?"
        );


    if (!confirmDelete) {

        return;

    }


    localStorage.removeItem(
        "cleanupFiles"
    );

    localStorage.removeItem(
        "freedStorage"
    );

    localStorage.removeItem(
        "cleanupConfirmed"
    );


    location.reload();

}
// =========================
// DELETE SELECTED FILES
// =========================

function deleteSelected() {

    const selected =
        document.querySelectorAll(
            ".recovery-checkbox:checked"
        );

    if (selected.length === 0) {

        alert(
            "Please select at least one file to delete."
        );

        return;

    }


    const indexes = [];

    selected.forEach(function(item) {

        indexes.push(
            Number(item.dataset.index)
        );

    });


    const confirmDelete =
        confirm(
            "Are you sure you want to permanently delete the selected files?"
        );


    if (!confirmDelete) {

        return;

    }


    recoveryFiles =
        recoveryFiles.filter(
            function(file, index) {

                return !indexes.includes(index);

            }
        );


    localStorage.setItem(
        "cleanupFiles",
        JSON.stringify(recoveryFiles)
    );


    location.reload();

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

    window.location.href = "index.html";
}
// =========================
// OPEN ORGANIZATION
// =========================

function openOrganization() {

    if (
        localStorage.getItem("cleanupConfirmed")
        !== "true"
    ) {

        alert(
            "Organization will be available after cleanup."
        );

        return;

    }

    window.location.href =
        "organization.html";

}