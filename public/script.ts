const noMemeElement = document.getElementById("no-meme")!;
const memeImageElement = document.getElementById("meme-image")!;
const memeTextElement = document.getElementById("meme-text")!;

function resizeElements(windowSize: number) {
	const fontSizeToImageRatio = 10;
	const imageMinSize = 250;

	const imageSize = Math.max(imageMinSize, windowSize);
	const fontSize = Math.max(imageMinSize / fontSizeToImageRatio, windowSize / fontSizeToImageRatio);

	memeImageElement.style.width = `${imageSize}px`;
	memeImageElement.style.height = `${imageSize}px`;
	memeTextElement.style.fontSize = `${fontSize}px`;
}

function showMeme(imageURL: string, text: string) {
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

document.getElementById("generate-meme")!.addEventListener("click", async (event: MouseEvent) => {
	(event.target as HTMLElement).setAttribute("disabled", "");
	const imageURL = await (await fetch("/api/randomImageURL")).text();
	const word = await (await fetch("/api/randomWord")).text();
	(event.target as HTMLElement).removeAttribute("disabled");
	showMeme(imageURL, word);
})

// window.addEventListener("resize", () => {
// 	const minSize = Math.min(window.innerWidth, window.innerHeight);
// 	resizeElements(minSize);
// });