import {IncomingMessage} from "http";
import https from "https";
import cheerio from "cheerio";
import express from "express";

const app = express();
app.set("view engine", "ejs");
app.listen(3000);

app.get("/", (req, res) => {
	res.render("index");
});

/* const url: string = "https://yandex.ru/images/search?text=cat";

https.get(url, (incoming: IncomingMessage) => {
	let body: string = "";
	incoming.on("data", (data) => {
		body += data;
	});
	incoming.on("end", () => {
		const $ = cheerio.load(body);
		const imageurl = "https:" + $(".serp-item__thumb").attr("src");
		console.log(imageurl);
	});
}); */