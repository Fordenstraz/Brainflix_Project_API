const express = require("express");
const router = express.Router();
const path = require("path");

// Import the JSON file
const videoData = require(path.join(__dirname, "../data/videos.json"));

//GET the list of videos:
router.get("/", (req, res) => {
	res.json(videoData);
});

//Testing route
router.get("/", function (req, res) {
	res.send("Hello test");
});

module.exports = router;
