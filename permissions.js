const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    const permissions = req.body;

    res.json({
        message: "Permissions received successfully!",
        permissions: permissions
    });
});

module.exports = router;