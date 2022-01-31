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
const generateMemeElement = document.getElementById("generate-meme");
const loadingElement = document.getElementById("loading");
new ResizeObserver(() => {
    memeWrapperElement.style.height = getComputedStyle(memeWrapperElement).width;
}).observe(memeWrapperElement);
function showMeme(imageURL, text) {
    memeImageElement.setAttribute("src", imageURL);
    memeImageElement.onload = () => {
        memeTextElement.textContent = text;
        noMemeElement.classList.add("hidden");
        loadingElement.classList.add("hidden");
        memeImageElement.classList.remove("hidden");
        memeTextElement.classList.remove("hidden");
        generateMemeElement.removeAttribute("disabled");
    };
}
function loadMemeEffect() {
    generateMemeElement.setAttribute("disabled", "");
    noMemeElement.classList.add("hidden");
    memeImageElement.classList.add("hidden");
    memeTextElement.classList.add("hidden");
    loadingElement.classList.remove("hidden");
}
generateMemeElement.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    loadMemeEffect();
    const imageURL = yield (yield fetch("/api/randomImageURL")).text();
    const word = yield (yield fetch("/api/randomWord")).text();
    showMeme(imageURL, word);
}));
//# sourceMappingURL=script.js.map