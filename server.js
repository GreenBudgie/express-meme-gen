"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const cheerio_1 = __importDefault(require("cheerio"));
const express_1 = __importDefault(require("express"));
const node_sass_middleware_1 = __importDefault(require("node-sass-middleware"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use((0, node_sass_middleware_1.default)({
    src: "./public",
    dest: "./public",
    debug: true,
}));
app.use(express_1.default.static("public"));
const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
const wordList = getWordList();
function getWordList() {
    const data = fs_1.default.readFileSync("./words.txt");
    const rawData = data.toString();
    const singleWords = rawData.split(new RegExp("\s*\r*\n+"));
    return singleWords;
}
function randomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}
app.get("/api/randomImageURL", (req, res) => {
    const bingSearchURLPattern = "https://www.bing.com/images/search?q=";
    searchUntilSuccess();
    function searchUntilSuccess() {
        https_1.default.get(bingSearchURLPattern + randomWord(), incoming => {
            let body = "";
            incoming.on("data", (data) => {
                body += data;
            });
            incoming.on("end", () => {
                const $ = cheerio_1.default.load(body);
                const rawImageURL = $(".mimg").attr("src");
                if (rawImageURL != undefined && rawImageURL != null && rawImageURL.trim().length > 1) {
                    res.send(rawImageURL);
                }
                else {
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
//# sourceMappingURL=server.js.map