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

    // Storage after cleanup
    const updatedStorage = {
        totalStorage: "256 GB",
        usedStorage: "142.60 GB",
        freeStorage: "113.40 GB",
        usagePercentage: "55.7%",

        googlePhotos: "45 GB",
        galleryPhotos: "13.20 GB",
        files: "42.10 GB",
        mails: "42.30 GB",

        spaceFreed: "55.85 GB"
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