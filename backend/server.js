const express = require("express");
const cors = require("cors");

const permissionsRouter = require("./routes/permissions");
const scanRouter = require("./routes/scan");
const cleanupRouter = require("./routes/cleanup");
const deleteRouter = require("./routes/delete");
const recoveryBinRouter = require("./routes/recovery-bin");
const restoreRouter = require("./routes/restore");
const organizationRouter = require("./routes/organization");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "SMART CLEAN Backend is running!"
    });
});

app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        project: "SMART CLEAN"
    });
});

// Permissions API
app.use("/api/permissions", permissionsRouter);
app.use("/api/scan", scanRouter);
app.use("/api/cleanup", cleanupRouter);
app.use("/api/delete", deleteRouter);
app.use("/api/recovery-bin", recoveryBinRouter);
app.use("/api/restore", restoreRouter);
app.use("/api/organization", organizationRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`SMART CLEAN Backend running on port ${PORT}`);
});