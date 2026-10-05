const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {

    const scanResults = {
        photos: {
            duplicate: 24,
            repeated: 18,
            screenshots: 31,
            blurry: 12,
            oldPhotos: 15
        },

        files: {
            largeFiles: 8,
            duplicateFiles: 6,
            notOpenedRecently: 14,
            downloads: 11,
            oldDocuments: 7,
            largeVideos: 5
        },

        mails: {
            largeAttachments: 9,
            oldAttachments: 13,
            repeatedAttachments: 6,
            promotionalEmails: 28,
            emailsWithLargeFiles: 7
        }
    };

    res.json({
        message: "Smart Scan completed successfully!",
        results: scanResults
    });
});

module.exports = router;