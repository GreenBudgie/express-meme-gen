const noMemeElement = document.getElementById("no-meme")!;
const memeImageElement = document.getElementById("meme-image")!;
const memeTextElement = document.getElementById("meme-text")!;
const memeWrapperElement = document.getElementById("meme-wrapper")!;

new ResizeObserver(() => {
	memeWrapperElement.style.height = getComputedStyle(memeWrapperElement).width;
}).observe(memeWrapperElement);

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