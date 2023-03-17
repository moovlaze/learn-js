document.addEventListener("DOMContentLoaded", () => {
	const DomElement = function ({ selector, height, width, bg, fontSize }) {
		this.selector = selector;
		this.height = height;
		this.width = width;
		this.bg = bg;
		this.fontSize = fontSize;

		this.createEl = function () {
			if (this.selector.includes(".")) {
				const div = document.createElement("div");
				let countHorizontal = 0;
				let countVertical = 0;

				this.selector = this.selector.slice(1);

				div.classList.add(this.selector);
				div.style.cssText = `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px; position: absolute`;
				div.textContent = "Это я создал див";

				document.body.append(div);

				document.addEventListener("keydown", (e) => {
					if (e.key === "ArrowRight") {
						countHorizontal += 30;
						div.style.left = `${countHorizontal}px`;
					} else if (e.key === "ArrowLeft") {
						countHorizontal -= 30;
						div.style.left = `${countHorizontal}px`;
					} else if (e.key === "ArrowUp") {
						countVertical -= 30;
						div.style.top = `${countVertical}px`;
					} else if (e.key === "ArrowDown") {
						countVertical += 30;
						div.style.top = `${countVertical}px`;
					}
				});
			} else if (this.selector.includes("#")) {
				const p = document.createElement("p");

				this.selector = this.selector.slice(1);

				p.id = this.selector;
				p.style.cssText = `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px; margin: 0px;`;
				p.textContent = "Это я создал параграф";

				document.body.append(p);
			}
		};
	};

	const newDiv = new DomElement({
		selector: ".block",
		height: "100",
		width: "100",
		bg: "red",
		fontSize: "22",
	});
	console.log("newDiv: ", newDiv);

	newDiv.createEl();
});
