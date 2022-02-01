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
const memeElement = document.getElementById("meme");
const memeWrapperElement = document.getElementById("meme-wrapper");
const generateMemeElement = document.getElementById("generate-meme");
const loadingElement = document.getElementById("loading");
const canvasSize = 640;
memeElement.width = canvasSize;
memeElement.height = canvasSize;
new ResizeObserver(() => {
    memeWrapperElement.style.height = getComputedStyle(memeWrapperElement).width;
}).observe(memeWrapperElement);
function showMeme(imageURL, text) {
    const context = memeElement.getContext("2d");
    console.log(memeElement.width, memeElement.height, memeElement.clientWidth, memeElement.clientHeight);
    const image = new Image();
    image.src = imageURL;
    image.onload = () => {
        context.drawImage(image, 0, 0, canvasSize, canvasSize);
        context.textAlign = "center";
        context.textBaseline = "bottom";
        context.font = `bold ${canvasSize / 10}px Impact`;
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.lineWidth = canvasSize / 320;
        const textWidth = context.measureText(text).width;
        if (textWidth > canvasSize - 10) {
            context.font = `bold ${canvasSize / 15}px Impact`;
        }
        context.fillText(text, canvasSize / 2, canvasSize);
        context.strokeText(text, canvasSize / 2, canvasSize);
        noMemeElement.classList.add("hidden");
        loadingElement.classList.add("hidden");
        memeElement.classList.remove("hidden");
        generateMemeElement.removeAttribute("disabled");
    };
}
function loadMemeEffect() {
    generateMemeElement.setAttribute("disabled", "");
    noMemeElement.classList.add("hidden");
    memeElement.classList.add("hidden");
    loadingElement.classList.remove("hidden");
}
generateMemeElement.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    loadMemeEffect();
    const imageURL = yield (yield fetch("/api/randomImageURL")).text();
    const word = yield (yield fetch("/api/randomWord")).text();
    showMeme(imageURL, word);
}));
//# sourceMappingURL=script.js.map