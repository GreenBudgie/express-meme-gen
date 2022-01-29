import {IncomingMessage} from "http";
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
app.listen(3000);

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

app.get("/", (req, res) => {

	const bingSearchURL: string = `https://www.bing.com/images/search?q=${randomWord()}`;
	https.get(bingSearchURL, (incoming: IncomingMessage) => {
		let body: string = "";
		incoming.on("data", (data) => {
			body += data;
		});
		incoming.on("end", () => {
			const $ = cheerio.load(body);
			const imageurl = $(".mimg").attr("src");
			console.log(imageurl);
			res.render("index", {
				memeImage: imageurl,
				memeText: randomWord()
			});
		});
	});

	
});