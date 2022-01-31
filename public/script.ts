const noMemeElement = document.getElementById("no-meme")!;
const memeImageElement: HTMLImageElement = document.getElementById("meme-image") as HTMLImageElement;
const memeTextElement = document.getElementById("meme-text")!;
const memeWrapperElement = document.getElementById("meme-wrapper")!;
const generateMemeElement = document.getElementById("generate-meme")!;
const loadingElement = document.getElementById("loading") as HTMLImageElement;

new ResizeObserver(() => {
	memeWrapperElement.style.height = getComputedStyle(memeWrapperElement).width;
}).observe(memeWrapperElement);

function showMeme(imageURL: string, text: string) {
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

generateMemeElement.addEventListener("click", async (event: MouseEvent) => {
	loadMemeEffect();
	const imageURL = await (await fetch("/api/randomImageURL")).text();
	const word = await (await fetch("/api/randomWord")).text();
	showMeme(imageURL, word);
});