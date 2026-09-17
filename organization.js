const express = require("express");

const router = express.Router();

// Current storage information
const storage = {
    totalStorage: "256 GB",
    usedStorage: "198.45 GB",
    freeStorage: "57.55 GB",
    usagePercentage: "77.5%",

    googlePhotos: "70 GB",
    galleryPhotos: "22.45 GB",
    files: "65.30 GB",
    mails: "40.70 GB",

    spaceFreed: "0 GB"
};

// Get current storage
router.get("/", (req, res) => {

    res.json({
        message: "Organization storage loaded successfully!",
        storage: storage
    });
});

// Update storage manually
router.post("/update", (req, res) => {

    Object.assign(storage, req.body);

    res.json({
        message: "Organization storage updated successfully!",
        storage: storage
    });
});

// Allow other backend routes to update storage
router.updateStorage = (newStorage) => {
    Object.assign(storage, newStorage);
};

module.exports = router;