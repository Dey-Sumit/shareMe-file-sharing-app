import express from "express";
import File from "../models/file";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const file = await File.findOne({ id });
    if (!file)
      return res.status(404).json({ message: "Download link is expired" });

    const directoryPath = `${__dirname}/../${file.path}`;

    res.download(directoryPath);
  } catch (error) {
    return res.status(500).json({ message: "Server is broken" });
  }
});

export default router;
