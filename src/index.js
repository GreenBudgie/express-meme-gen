"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.listen(3000);
app.get("/", (req, res) => {
    res.sendStatus(418);
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
//# sourceMappingURL=index.js.map