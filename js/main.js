const btn = document.querySelector("#btn");
const text = document.querySelector("#text");
const square = document.getElementById("square");
const range = document.getElementById("range");
const rangeSpan = document.getElementById("range-span");
const circle = document.getElementById("circle");

btn.addEventListener("click", function () {
	let textValue = text.value;

	if (textValue) {
		square.style.backgroundColor = `${textValue}`;
	}
});

document.querySelector("#e_btn").style.display = "none";

range.addEventListener("input", () => {
	let rangeValue = range.value;

	rangeSpan.textContent = rangeValue;

	circle.style.width = `${rangeValue}%`;
	circle.style.height = `${rangeValue}%`;
});
