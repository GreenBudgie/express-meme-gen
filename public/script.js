"use strict";
const memeImage = document.querySelector("#meme-image");
const memeText = document.querySelector("#meme-text");
function resizeElements(windowSize) {
    const fontSizeToImageRatio = 10;
    const imageMinSize = 250;
    const imageSize = Math.max(imageMinSize, windowSize);
    const fontSize = Math.max(imageMinSize / fontSizeToImageRatio, windowSize / fontSizeToImageRatio);
    memeImage.style.width = `${imageSize}px`;
    memeImage.style.height = `${imageSize}px`;
    memeText.style.fontSize = `${fontSize}px`;
}
// window.addEventListener("resize", () => {
// 	const minSize = Math.min(window.innerWidth, window.innerHeight);
// 	resizeElements(minSize);
// });
//# sourceMappingURL=script.js.map