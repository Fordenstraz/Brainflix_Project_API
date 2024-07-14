const express = require("express");
const router = express.Router();
const path = require("path");

// Import the JSON file
const videoData = require(path.join(__dirname, "../data/videos.json"));

//GET the list of videos:
router.get("/", (req, res) => {
	res.json(videoData);
});

//GET a specific video:
router.get("/:videoId", (req, res) => {
	//grab the query param:
	const { videoId } = req.params;
	const selectedVideoData = videoData.filter(video => video.id === videoId);
	//return video data that matches query param:
	res.json(selectedVideoData[0]);
});

//Testing route
router.get("/", function (req, res) {
	res.send("Hello test");
});

module.exports = router;
