const noMemeElement = document.getElementById("no-meme")!;
const memeElement = document.getElementById("meme") as HTMLCanvasElement;
const memeWrapperElement = document.getElementById("meme-wrapper")!;
const generateMemeElement = document.getElementById("generate-meme")!;
const loadingElement = document.getElementById("loading") as HTMLImageElement;

const canvasSize = 640;
memeElement.width = canvasSize;
memeElement.height = canvasSize;

new ResizeObserver(() => {
	memeWrapperElement.style.height = getComputedStyle(memeWrapperElement).width;
}).observe(memeWrapperElement);

function showMeme(imageURL: string, text: string) {
	const context: CanvasRenderingContext2D = memeElement.getContext("2d")!;
	console.log(memeElement.width, memeElement.height, memeElement.clientWidth, memeElement.clientHeight);
	const image = new Image();
	image.src = imageURL;
	image.onload = () => {
		context.drawImage(image, 0, 0, canvasSize, canvasSize);
		
		context.textAlign = "center";
		context.textBaseline = "bottom";
		context.font = "bold 64px Impact";
		context.fillStyle = "white";
		context.strokeStyle = "black";
		context.lineWidth = 2;
		const textWidth = context.measureText(text).width;
		if(textWidth > canvasSize - 10) {
			context.font = "bold 48px Impact";
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

generateMemeElement.addEventListener("click", async (event: MouseEvent) => {
	loadMemeEffect();
	const imageURL = await (await fetch("/api/randomImageURL")).text();
	const word = await (await fetch("/api/randomWord")).text();
	showMeme(imageURL, word);
});