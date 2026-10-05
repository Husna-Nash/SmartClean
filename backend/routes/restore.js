const express = require("express");
const recoveryBinRouter = require("./recovery-bin");

const router = express.Router();

// Restore selected items
router.post("/", (req, res) => {

    const restoredItems = req.body;

    // Remove restored items from Recovery Bin
    recoveryBinRouter.removeItems(restoredItems);

    res.json({
        message: "Selected items restored successfully!",
        restoredItems: restoredItems
    });
});

// Permanently remove selected items
router.post("/permanent-delete", (req, res) => {

    const deletedItems = req.body;

    // Remove permanently deleted items from Recovery Bin
    recoveryBinRouter.removeItems(deletedItems);

    res.json({
        message: "Selected items permanently removed!",
        deletedItems: deletedItems
    });
});

module.exports = router;