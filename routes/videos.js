const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//Define path to Data file:
const dataPath = path.join(__dirname, "../data/videos.json");

// Import the JSON file
const videoDataJSON = require(path.join(dataPath));

//GET the list of videos:
router.get("/", (req, res) => {
	const basicVideoList = videoDataJSON.map(video => {
		return {
			id: video.id,
			title: video.title,
			channel: video.channel,
			image: video.image,
		};
	});
	res.json(basicVideoList);
});

//GET a specific video:
router.get("/:videoId", (req, res) => {
	//grab the query param:
	const { videoId } = req.params;

	//Identify the selected video data via filter by ID:
	const selectedVideoData = videoDataJSON.filter(
		video => video.id === videoId
	);

	//return video data that matches query param:
	res.json(selectedVideoData[0]);
});

//POST a video:
router.post("/upload", (req, res) => {
	//grab video data:
	const newVideo = req.body;

	//give the new video an ID:
	newVideo.id = uuidv4();

	//read current videos.json file:
	fs.readFile(dataPath, "utf8", (error, data) => {
		//error handling:
		if (error) {
			return res
				.status(500)
				.json({ error: "Error while attempting to read file" });
		}

		//create a variable to hold parsed data:
		let videoList;

		//add existing video data to the array:
		try {
			videoList = JSON.parse(data);
		} catch (error) {
			return res
				.status(500)
				.json({ error: "Error while attempting to parse data" });
		}

		//add new video data to the array:
		videoList.push(newVideo);

		//write the entire contents, old and new, back into the JSON file:
		fs.writeFile(
			dataPath,
			JSON.stringify(videoList, null, 2),
			"utf8",
			error => {
				//error handling:
				if (error) {
					return res.status(500).json({
						error: "Error while attempting to write file",
					});
				}
				res.status(201).json(newVideo);
			}
		);
	});
});

module.exports = router;
