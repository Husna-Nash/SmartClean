const express = require("express");
const organizationRouter = require("./organization");
const recoveryBinRouter = require("./recovery-bin");

const router = express.Router();

router.post("/", (req, res) => {

    const deletedItems = req.body;

    // Items that were deleted
    const recoveryItems = [
        {
            id: Date.now(),
            name: "Selected Photos",
            source: "Google Photos",
            size: "25 MB",
            deletedDate: "13-09-2026",
            deletedTime: "Now"
        },
        {
            id: Date.now() + 1,
            name: "Selected Files",
            source: "Google Drive",
            size: "15 MB",
            deletedDate: "13-09-2026",
            deletedTime: "Now"
        },
        {
            id: Date.now() + 2,
            name: "Selected Mails",
            source: "Gmail",
            size: "10 MB",
            deletedDate: "13-09-2026",
            deletedTime: "Now"
        }
    ];

    // Add deleted items to Recovery Bin
    recoveryBinRouter.addDeletedItems(recoveryItems);

 // =========================
// CALCULATE STORAGE AFTER CLEANUP
// =========================

// Current storage before cleanup
const currentStorage = {
    googlePhotos: {
        used: 86,
        total: 100,
        photos: 42,
        videos: 18,
        files: 14,
        other: 12
    },

    gallery: {
        used: 60,
        total: 100,
        photos: 30,
        videos: 15,
        files: 8,
        other: 7
    },

    files: {
        used: 45,
        total: 100,
        photos: 5,
        videos: 3,
        files: 30,
        other: 7
    },

    mails: {
        used: 25,
        total: 100,
        photos: 2,
        videos: 1,
        files: 18,
        other: 4
    }
};


// =========================
// CALCULATE SELECTED STORAGE
// =========================

let spaceFreed = 0;

let googlePhotosFreed = 0;
let filesFreed = 0;
let mailsFreed = 0;

let googlePhotosCategoryFreed = 0;
let filesCategoryFreed = 0;
let mailsCategoryFreed = 0;


// Read every selected item
deletedItems.forEach(item => {

    const size =
        parseFloat(
            item.size.toString()
                .replace("GB", "")
                .trim()
        ) || 0;

    spaceFreed += size;


    // -------------------------
    // DUPLICATE FILES
    // -------------------------

    if (item.category === "Duplicate Files") {

        filesFreed += size;
        filesCategoryFreed += size;

    }


    // -------------------------
    // OLD SCREENSHOTS
    // -------------------------

    else if (item.category === "Old Screenshots") {

        googlePhotosFreed += size;
        googlePhotosCategoryFreed += size;

    }


    // -------------------------
    // LARGE FILES
    // -------------------------

    else if (item.category === "Large Files") {

        filesFreed += size;
        filesCategoryFreed += size;

    }


    // -------------------------
    // EMAIL ATTACHMENTS
    // -------------------------

    else if (item.category === "Email Attachments") {

        mailsFreed += size;
        mailsCategoryFreed += size;

    }

});


// Round total
spaceFreed = Number(spaceFreed.toFixed(2));

googlePhotosFreed =
    Number(googlePhotosFreed.toFixed(2));

filesFreed =
    Number(filesFreed.toFixed(2));

mailsFreed =
    Number(mailsFreed.toFixed(2));


// =========================
// UPDATED STORAGE
// =========================

const updatedStorage = {

    totalStorage: "256 GB",

    usedStorage:
        (
            86 +
            60 +
            45 +
            25 -
            spaceFreed
        ).toFixed(2) + " GB",

    freeStorage:
        (
            256 -
            (
                86 +
                60 +
                45 +
                25 -
                spaceFreed
            )
        ).toFixed(2) + " GB",

    usagePercentage:
        (
            (
                (
                    86 +
                    60 +
                    45 +
                    25 -
                    spaceFreed
                ) / 256
            ) * 100
        ).toFixed(1) + "%",


    // =========================
    // GOOGLE PHOTOS
    // =========================

    googlePhotos: {

        used:
            Math.max(
                0,
                currentStorage.googlePhotos.used -
                googlePhotosFreed
            ).toFixed(2) + " GB",

        total: "100 GB",

        photos:
            Math.max(
                0,
                currentStorage.googlePhotos.photos -
                googlePhotosCategoryFreed
            ).toFixed(2) + " GB",

        videos:
            currentStorage.googlePhotos.videos + " GB",

        files:
            currentStorage.googlePhotos.files + " GB",

        other:
            currentStorage.googlePhotos.other + " GB"
    },


    // =========================
    // GALLERY
    // =========================

    gallery: {

        used:
            currentStorage.gallery.used + " GB",

        total: "100 GB",

        photos:
            currentStorage.gallery.photos + " GB",

        videos:
            currentStorage.gallery.videos + " GB",

        files:
            currentStorage.gallery.files + " GB",

        other:
            currentStorage.gallery.other + " GB"
    },


    // =========================
    // FILES & DOCUMENTS
    // =========================

    files: {

        used:
            Math.max(
                0,
                currentStorage.files.used -
                filesFreed
            ).toFixed(2) + " GB",

        total: "100 GB",

        photos:
            currentStorage.files.photos + " GB",

        videos:
            currentStorage.files.videos + " GB",

        files:
            Math.max(
                0,
                currentStorage.files.files -
                filesCategoryFreed
            ).toFixed(2) + " GB",

        other:
            currentStorage.files.other + " GB"
    },


    // =========================
    // GMAIL
    // =========================

    mails: {

        used:
            Math.max(
                0,
                currentStorage.mails.used -
                mailsFreed
            ).toFixed(2) + " GB",

        total: "100 GB",

        photos:
            currentStorage.mails.photos + " GB",

        videos:
            currentStorage.mails.videos + " GB",

        files:
            Math.max(
                0,
                currentStorage.mails.files -
                mailsCategoryFreed
            ).toFixed(2) + " GB",

        other:
            currentStorage.mails.other + " GB"
    },


    // =========================
    // TOTAL SPACE FREED
    // =========================

    spaceFreed:
        spaceFreed.toFixed(2) + " GB"
};

    // Automatically update Organization storage
    organizationRouter.updateStorage(updatedStorage);

    res.json({
        message: "Items moved to Recovery Bin successfully!",
        deletedItems: deletedItems,
        recoveryBin: true,
        updatedStorage: updatedStorage
    });
});

module.exports = router;