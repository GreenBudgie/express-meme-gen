import https from "https";
import cheerio from "cheerio";
import express from "express";
import sassMiddleware from "node-sass-middleware";
import fs from "fs";

const app = express();

app.set("view engine", "ejs");
app.use(sassMiddleware({
    src: "./public",
    dest: "./public",
    debug: true,
}));
app.use(express.static("public"));

const port = 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

const wordList = getWordList();

function getWordList(): string[] {
	const data = fs.readFileSync("./words.txt");
	const rawData = data.toString();
	const singleWords = rawData.split(new RegExp("\s*\r*\n+"));
	return singleWords;
}

function randomWord(): string {
	return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

app.get("/api/randomImageURL", (req, res) => {
	const bingSearchURLPattern = "https://www.bing.com/images/search?q=";
	searchUntilSuccess();

	function searchUntilSuccess() {
		https.get(bingSearchURLPattern + randomWord(), incoming => {
			let body: string = "";
			incoming.on("data", (data) => {
				body += data;
			});
			incoming.on("end", () => {
				const $ = cheerio.load(body);
				const rawImageURL = $(".mimg").attr("src");
				if(rawImageURL != undefined && rawImageURL != null && rawImageURL.trim().length > 1) {
					res.send(rawImageURL);
				} else {
					searchUntilSuccess();
				}
			});
		});
	}
	
});

app.get("/api/randomWord", (req, res) => {
	res.send(randomWord());
});

app.get("/", (req, res) => {
	res.render("index");
});