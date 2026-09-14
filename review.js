// =========================
// CATEGORY DATA
// =========================

const categories = [
    {
        name: "Duplicate Files",

        files: [
            {
                name: "IMG_1023.jpg",
                size: 0.8,
                image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80"
            },
            {
                name: "IMG_1023_copy.jpg",
                size: 0.8,
                image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80"
            },
            {
                name: "Holiday_Photo.jpg",
                size: 0.8,
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80"
            }
        ]
    },

    {
        name: "Old Screenshots",

        files: [
            {
                name: "Screenshot_2023.png",
                size: 0.4,
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80"
            },
            {
                name: "Screenshot_2022.png",
                size: 0.35,
                image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=500&q=80"
            },
            {
                name: "Old_Screenshot.png",
                size: 0.35,
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80"
            }
        ]
    },

    {
        name: "Large Files",

        files: [
            {
                name: "Large_Video.mp4",
                size: 1.5,
                type: "video"
            },
            {
                name: "Project_File.zip",
                size: 1.0,
                type: "file"
            },
            {
                name: "Old_Movie.mp4",
                size: 0.7,
                type: "video"
            }
        ]
    },

    {
        name: "Email Attachments",

        files: [
            {
                name: "Large_Attachment.pdf",
                size: 0.3,
                type: "pdf"
            },
            {
                name: "Old_Document.pdf",
                size: 0.25,
                type: "pdf"
            },
            {
                name: "Email_Image.jpg",
                size: 0.25,
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80"
            }
        ]
    }
];


// =========================
// CURRENT CATEGORY
// =========================

let currentCategoryIndex = 0;


// =========================
// SAVE USER SELECTIONS
// =========================

// true means selected
const selections = categories.map(function(category) {

    return category.files.map(function() {
        return true;
    });

});


// =========================
// REMEMBER REVIEWED CATEGORIES
// =========================

const reviewedCategories = [
    false,
    false,
    false,
    false
];


// =========================
// OPEN CATEGORY
// =========================

function openCategory(index) {

    saveCurrentSelections();

    currentCategoryIndex = index;

    reviewedCategories[index] = true;

    displayCategory();

    updateCategoryButtons();

    updateReviewProgress();

    updateFinalSummary();

}


// =========================
// DISPLAY CATEGORY
// =========================

function displayCategory() {

    const category =
        categories[currentCategoryIndex];

    document.getElementById("currentCategory").innerHTML =
        category.name;

    const fileList =
        document.getElementById("reviewFileList");

    fileList.innerHTML = "";

    category.files.forEach(function(file, index) {

        const card =
            document.createElement("div");

        card.className =
            "review-file-card";


        // IMAGE PREVIEW

        if (file.image) {

            card.innerHTML = `

                <div class="review-file-preview image-preview">

                    <img
                        src="${file.image}"
                        alt="${file.name}">

                </div>

                <div class="review-file-info">

                    <h3>${file.name}</h3>

                    <p>${file.size.toFixed(2)} GB</p>

                </div>

                <input
                    type="checkbox"
                    class="file-checkbox"
                    data-index="${index}"
                    ${selections[currentCategoryIndex][index] ? "checked" : ""}>

            `;

        }


        // VIDEO / OTHER FILE PREVIEW

        else {

            let previewIcon = "📦";

            if (file.type === "video") {
                previewIcon = "🎥";
            }

            else if (file.type === "pdf") {
                previewIcon = "📄";
            }


            card.innerHTML = `

                <div class="review-file-preview file-preview">

                    ${previewIcon}

                </div>

                <div class="review-file-info">

                    <h3>${file.name}</h3>

                    <p>${file.size.toFixed(2)} GB</p>

                </div>

                <input
                    type="checkbox"
                    class="file-checkbox"
                    data-index="${index}"
                    ${selections[currentCategoryIndex][index] ? "checked" : ""}>

            `;

        }


        fileList.appendChild(card);

    });


    updateSelectAll();

    updateNavigationButtons();

}


// =========================
// SAVE CURRENT SELECTIONS
// =========================

function saveCurrentSelections() {

    const checkboxes =
        document.querySelectorAll(".file-checkbox");

    checkboxes.forEach(function(checkbox) {

        const index =
            Number(
                checkbox.getAttribute("data-index")
            );

        selections[currentCategoryIndex][index] =
            checkbox.checked;

    });

}


// =========================
// SELECT ALL
// =========================

document.addEventListener("change", function(event) {

    if (
        event.target.classList.contains("file-checkbox")
    ) {

        const index =
            Number(
                event.target.getAttribute("data-index")
            );

        selections[currentCategoryIndex][index] =
            event.target.checked;

        updateSelectAll();

        updateFinalSummary();

    }

});


// =========================
// SELECT ALL BUTTON
// =========================

document.getElementById("selectAll")
.addEventListener("change", function() {

    const checked =
        this.checked;

    const checkboxes =
        document.querySelectorAll(".file-checkbox");

    checkboxes.forEach(function(checkbox) {

        checkbox.checked =
            checked;

        const index =
            Number(
                checkbox.getAttribute("data-index")
            );

        selections[currentCategoryIndex][index] =
            checked;

    });

    updateFinalSummary();

});


// =========================
// UPDATE SELECT ALL
// =========================

function updateSelectAll() {

    const category =
        categories[currentCategoryIndex];

    const allSelected =
        selections[currentCategoryIndex]
        .every(function(selected) {
            return selected === true;
        });

    const selectAll =
        document.getElementById("selectAll");

    selectAll.checked =
        allSelected;

}


// =========================
// UPDATE CATEGORY BUTTONS
// =========================

function updateCategoryButtons() {

    for (let i = 0; i < categories.length; i++) {

        const button =
            document.getElementById(
                "categoryButton" + i
            );

        const status =
            document.getElementById(
                "categoryStatus" + i
            );


        if (i === currentCategoryIndex) {

            button.classList.add("active");

        }

        else {

            button.classList.remove("active");

        }


        if (reviewedCategories[i]) {

            status.innerHTML = "✓";

            button.classList.add("reviewed");

        }

        else {

            status.innerHTML = "○";

            button.classList.remove("reviewed");

        }

    }

}


// =========================
// REVIEW PROGRESS
// =========================

function updateReviewProgress() {

    let reviewedCount = 0;

    reviewedCategories.forEach(function(reviewed) {

        if (reviewed) {
            reviewedCount++;
        }

    });

    document.getElementById("reviewProgress").innerHTML =
        reviewedCount + " of 4 categories reviewed";


    const continueButton =
        document.getElementById(
            "reviewContinueButton"
        );


    // Continue only after all 4 categories

    if (reviewedCount === 4) {

        continueButton.disabled = false;

        continueButton.innerHTML =
            "Continue";

    }

    else {

        continueButton.disabled = true;

        continueButton.innerHTML =
            "Review All Categories";

    }

}


// =========================
// PREVIOUS CATEGORY
// =========================

function previousCategory() {

    saveCurrentSelections();

    if (currentCategoryIndex > 0) {

        currentCategoryIndex--;

        reviewedCategories[currentCategoryIndex] =
            true;

        displayCategory();

        updateCategoryButtons();

        updateReviewProgress();

        updateFinalSummary();

    }

}


// =========================
// NEXT CATEGORY
// =========================

function nextCategory() {

    saveCurrentSelections();

    if (currentCategoryIndex < categories.length - 1) {

        currentCategoryIndex++;

        reviewedCategories[currentCategoryIndex] =
            true;

        displayCategory();

        updateCategoryButtons();

        updateReviewProgress();

        updateFinalSummary();

    }

}


// =========================
// NAVIGATION BUTTONS
// =========================

function updateNavigationButtons() {

    const previousButton =
        document.getElementById(
            "previousCategoryButton"
        );

    const nextButton =
        document.getElementById(
            "nextCategoryButton"
        );


    if (currentCategoryIndex === 0) {

        previousButton.disabled = true;

    }

    else {

        previousButton.disabled = false;

    }


    if (
        currentCategoryIndex ===
        categories.length - 1
    ) {

        nextButton.disabled = true;

    }

    else {

        nextButton.disabled = false;

    }

}


// =========================
// FINAL SUMMARY
// =========================

function updateFinalSummary() {

    let totalFiles = 0;

    let totalStorage = 0;


    selections.forEach(function(categorySelection, categoryIndex) {

        categorySelection.forEach(function(selected, fileIndex) {

            if (selected) {

                totalFiles++;

                totalStorage +=
                    categories[categoryIndex]
                    .files[fileIndex]
                    .size;

            }

        });

    });


    document.getElementById("selectedCount").innerHTML =
        totalFiles + " files selected";


    document.getElementById("selectedStorage").innerHTML =
        totalStorage.toFixed(2) +
        " GB will be freed";

}


// =========================
// CONTINUE
// =========================

document.getElementById(
    "reviewContinueButton"
)
.addEventListener("click", function() {

    let allReviewed = true;

    reviewedCategories.forEach(function(reviewed) {

        if (!reviewed) {
            allReviewed = false;
        }

    });


    if (!allReviewed) {

        return;

    }


    saveCurrentSelections();


    const selectedFiles = [];


    selections.forEach(function(categorySelection, categoryIndex) {

        categorySelection.forEach(function(selected, fileIndex) {

            if (selected) {

                selectedFiles.push({

                    category:
                        categories[categoryIndex].name,

                    name:
                        categories[categoryIndex]
                        .files[fileIndex]
                        .name,

                    size:
                        categories[categoryIndex]
                        .files[fileIndex]
                        .size

                });

            }

        });

    });


    localStorage.setItem(
        "cleanupFiles",
        JSON.stringify(selectedFiles)
    );


    window.location.href =
        "confirmation.html";

});


// =========================
// INITIAL LOAD
// =========================

reviewedCategories[0] = true;

displayCategory();

updateCategoryButtons();

updateReviewProgress();

updateFinalSummary();