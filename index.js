const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 7770;
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//GET the list of videos:
app.get("/videos", (req, res) => {
	res.send();
});

//GET a specific video:
app.get("/videos/:id", (req, res) => {
	res.send();
});

//POST a video:
app.post("", (req, res) => {
	res.status();
	res.send();
});

//Listener
app.listen(port, function () {
	console.log(`Server is running fine, on port ${port} 👍`);
});
