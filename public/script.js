"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const noMemeElement = document.getElementById("no-meme");
const memeImageElement = document.getElementById("meme-image");
const memeTextElement = document.getElementById("meme-text");
const memeWrapperElement = document.getElementById("meme-wrapper");
new ResizeObserver(() => {
    memeWrapperElement.style.height = getComputedStyle(memeWrapperElement).width;
}).observe(memeWrapperElement);
function showMeme(imageURL, text) {
    memeImageElement.setAttribute("src", imageURL);
    memeTextElement.textContent = text;
    noMemeElement.classList.add("hidden");
    memeImageElement.classList.remove("hidden");
    memeTextElement.classList.remove("hidden");
}
function hideMemeAndReset() {
    memeImageElement.removeAttribute("src");
    memeTextElement.textContent = "";
    memeImageElement.classList.add("hidden");
    memeTextElement.classList.add("hidden");
    noMemeElement.classList.remove("hidden");
}
document.getElementById("generate-meme").addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.target.setAttribute("disabled", "");
    const imageURL = yield (yield fetch("/api/randomImageURL")).text();
    const word = yield (yield fetch("/api/randomWord")).text();
    event.target.removeAttribute("disabled");
    showMeme(imageURL, word);
}));
//# sourceMappingURL=script.js.map