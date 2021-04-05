import express from "express";
import File from "../models/file";
const router = express.Router();

//TODO use password or secret code to encrypt as an option
//TODO add proper error handling route
//TODO change name from show to details

router.get("/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const file = await File.findOne({ uuid });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    const { filename, size } = file;
    const downloadLink = `${process.env.BASE_ENDPOINT_CLIENT}/download/${file._id}`;
    return res.status(200).json({
      uuid,
      filename,
      size,
      downloadLink,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;
