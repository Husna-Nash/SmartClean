const express = require("express");

const router = express.Router();

router.post("/confirm", (req, res) => {

    const selectedItems = req.body;

    res.json({
        message: "Cleanup confirmed successfully!",
        selectedItems: selectedItems
    });
});

module.exports = router;