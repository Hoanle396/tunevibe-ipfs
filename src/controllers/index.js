var express = require("express");
const { Hash } = require("../models/hash");
const { logger } = require("../utils/logger");
const { upload } = require("../utils/upload");
var router = express.Router();
const ipfsHash = require("ipfs-only-hash");
const { authentication } = require("../middlewares/authentication");

router.post(
  "/pinIpfs",
  [authentication, upload.single("file")],
  async function (req, res, next) {
    try {
      const hash = await ipfsHash.of(req.file.path);
      const data = await Hash.create({ content: req.file.path, hash });
      return res.status(200).json(data);
    } catch (error) {
      logger.error(error?.message);
      return res.status(400).json(error);
    }
  }
);

/**
 * @openapi
 * /{hash}:
 *  get:
 *     tags:
 *     - Hash
 *     description: get file by hash
 *     parameters:
 *     - in: path
 *       name: hash
 *     responses:
 *       200:
 *         description: Get list success
 *       400:
 *         description: Invalid token
 */
router.get("/:hash", async function (req, res, next) {
  const { hash } = req.params;
  try {
    const data = await Hash.findOne({ hash }).select({ _id: 0, __v: 0 });
    if (!data) {
      return res.status(404).send({ message: "not found" });
    }
    return res.status(200).sendfile(data.content);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message, error });
  }
});

module.exports = { router };
