import express from "express";
import { storageService } from "../services/storage.service.js";

const router = express.Router();

// GET /api/file/:key
router.get("/:key", async (req, res) => {
  try {
    const key = "reports/" + req.params.key;
    if (!key) {
      res.status(400).json({ error: "Missing file key" });
      return;
    }
    const fileBuffer = await storageService.get({ key });
    // Optionally, set content-type based on file extension
    // For now, default to image
    res.setHeader("Content-Type", "image/*");
    // show the image on the browser
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${req.params.key}"`
    );
    res.send(fileBuffer);
  } catch (err) {
    res.status(404).json({ error: "File not found" });
  }
});

export { router as fileRoutes };
