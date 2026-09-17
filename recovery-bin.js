const express = require("express");

const router = express.Router();

// Recovery Bin storage
let recoveryItems = [];

// Get Recovery Bin items
router.get("/", (req, res) => {

    res.json({
        message: "Recovery Bin loaded successfully!",
        totalItems: recoveryItems.length,
        items: recoveryItems
    });
});

// Add deleted items to Recovery Bin
router.addDeletedItems = (items) => {

    recoveryItems.push(...items);
};

// Remove restored or permanently deleted items
router.removeItems = (itemsToRemove) => {

    const idsToRemove = Array.isArray(itemsToRemove)
        ? itemsToRemove.map(item => item.id)
        : [itemsToRemove.id];

    recoveryItems = recoveryItems.filter(
        item => !idsToRemove.includes(item.id)
    );
};

module.exports = router;