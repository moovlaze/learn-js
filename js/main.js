"use strict";

const title = document.getElementsByTagName("h1")[0];

const screenBtn = document.querySelector(".screen-btn");
const otherItemsPercents = document.querySelectorAll(".other-items.percent");
const otherItemsNumbers = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input[type='range']");
const rangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const inputTotal = document.getElementsByClassName("total-input")[0];
const inputTotalCount = document.getElementsByClassName("total-input")[1];
const inputTotalCountOther = document.getElementsByClassName("total-input")[2];
const inputTotalFullCount = document.getElementsByClassName("total-input")[3];
const inputTotalCountRollback =
	document.getElementsByClassName("total-input")[4];

const cmsCheckbox = document.getElementById("cms-open");
const cmsBlock = document.querySelector(".hidden-cms-variants");
const cmsControlsInput = cmsBlock.querySelector(".main-controls__input");
const cmsInput = cmsControlsInput.querySelector("input");
const cmsSelect = cmsBlock.querySelector(".main-controls__select > select");

let screens = document.querySelectorAll(".screen");

let appData = {
	title: "",
	screens: [],
	screenPrice: 0,
	screenCount: 0,
	adaptiv: true,
	servicePercent: {},
	serviceNumber: {},
	rollback: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	cmsPercent: 0,
	init: function () {
		this.addTitle();
		this.addRollback();
		this.addCmsBlock();
		screenBtn.addEventListener("click", this.addScreenBlock);

		startBtn.addEventListener("click", this.start.bind(appData));
		resetBtn.addEventListener("click", this.reset.bind(appData));
	},
	start: function () {
		this.addScreens();
		this.addService();
		this.countCms();
		this.addPrices();
		this.showResult();
		this.blockingElems();

		this.logger();
	},
	reset: function () {
		this.clearScreens();
		this.clearChekboxAndRange();
		this.clearValues();
		this.clearCmsBlock();
		this.showResult();
		this.unblockingElems();
	},
	blockingElems: function () {
		const checkbox = document.querySelectorAll('input[type="checkbox"]');

		screens = document.querySelectorAll(".screen");

		screens.forEach((item) => {
			const input = item.querySelector("input");
			const select = item.querySelector("select");

			input.setAttribute("disabled", "true");
			select.setAttribute("disabled", "true");
		});

		screenBtn.setAttribute("disabled", "true");

		checkbox.forEach((item) => {
			item.setAttribute("disabled", "true");
		});

		cmsSelect.setAttribute("disabled", "true");
		cmsInput.setAttribute("disabled", "true");

		startBtn.style.display = "none";
		resetBtn.style.display = "block";
	},
	unblockingElems: function () {
		const checkbox = document.querySelectorAll('input[type="checkbox"]');

		screens = document.querySelectorAll(".screen");

		screens.forEach((item) => {
			const input = item.querySelector("input");
			const select = item.querySelector("select");

			input.removeAttribute("disabled");
			select.removeAttribute("disabled");
		});

		screenBtn.removeAttribute("disabled");

		checkbox.forEach((item) => {
			item.removeAttribute("disabled");
		});

		cmsSelect.removeAttribute("disabled");
		cmsInput.removeAttribute("disabled");

		startBtn.style.display = "block";
		resetBtn.style.display = "none";
	},
	showResult: function () {
		inputTotal.value = this.screenPrice;
		inputTotalCount.value = this.screenCount;
		inputTotalCountOther.value =
			+this.servicePricesNumber + +this.servicePricesPercent;
		inputTotalFullCount.value = this.fullPrice;
		inputTotalCountRollback.value = this.servicePercentPrice;
	},
	addTitle: function () {
		document.title = title.textContent;
	},
	addScreens: function () {
		screens = document.querySelectorAll(".screen");

		this.screens = [];

		screens.forEach((screen, index) => {
			const select = screen.querySelector("select");
			const input = screen.querySelector("input");
			const selectName = select.options[select.selectedIndex];

			this.screens.push({
				id: index,
				name: selectName.textContent,
				price: +selectName.value * +input.value,
			});

			this.screenCount += +input.value;
		});
	},
	addScreenBlock: function () {
		const cloneScreen = screens[0].cloneNode(true);
		const cloneScreenInput = cloneScreen.querySelector(
			".main-controls__input > input"
		);

		cloneScreenInput.value = "";
		screens = document.querySelectorAll(".screen");

		screens[screens.length - 1].after(cloneScreen);
	},
	addService: function () {
		this.servicePercent = {};
		this.serviceNumber = {};
		otherItemsPercents.forEach((item) => {
			const check = item.querySelector('input[type="checkbox"]');
			const label = item.querySelector("label");
			const input = item.querySelector('input[type="text"]');

			if (check.checked) {
				this.servicePercent[label.textContent] = +input.value;
			}
		});
		otherItemsNumbers.forEach((item) => {
			const check = item.querySelector('input[type="checkbox"]');
			const label = item.querySelector("label");
			const input = item.querySelector('input[type="text"]');

			if (check.checked) {
				this.serviceNumber[label.textContent] = +input.value;
			}
		});
	},
	addRollback: function () {
		inputRange.addEventListener("input", () => {
			rangeValue.textContent = `${inputRange.value}%`;
			this.rollback = +inputRange.value;

			this.servicePercentPrice = Math.ceil(
				this.fullPrice - this.fullPrice * (this.rollback / 100)
			);

			inputTotalCountRollback.value = this.servicePercentPrice;
		});
	},
	addPrices: function () {
		for (let screen of this.screens) {
			this.screenPrice += +screen.price;
		}

		for (let key in this.serviceNumber) {
			this.servicePricesNumber += this.serviceNumber[key];
		}

		for (let key in this.servicePercent) {
			this.servicePricesPercent +=
				this.screenPrice * (this.servicePercent[key] / 100);
		}

		this.fullPrice =
			this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

		this.fullPrice = this.fullPrice + this.fullPrice * this.cmsPercent;

		this.servicePercentPrice = Math.ceil(
			this.fullPrice - this.fullPrice * (this.rollback / 100)
		);
	},
	addCmsBlock: function () {
		cmsCheckbox.addEventListener("click", () => {
			if (cmsCheckbox.checked) {
				cmsBlock.style.display = "flex";
			} else {
				cmsBlock.style.display = "none";
				cmsControlsInput.style.display = "none";
				cmsInput.value = "";
				cmsSelect.selectedIndex = 0;
			}
		});

		cmsSelect.addEventListener("change", () => {
			const cmsOption = cmsSelect.options[cmsSelect.selectedIndex];

			if (cmsOption.value === "other") {
				cmsControlsInput.style.display = "block";
			} else {
				cmsControlsInput.style.display = "none";
				cmsInput.value = "";
			}
		});
	},
	clearCmsBlock: function () {
		cmsBlock.style.display = "none";
		cmsControlsInput.style.display = "none";
		cmsInput.value = "";
		cmsSelect.selectedIndex = 0;

		this.cmsPercent = 0;
	},
	countCms: function () {
		const cmsOption = cmsSelect.options[cmsSelect.selectedIndex];

		if (cmsOption.value === "50") {
			this.cmsPercent = +cmsOption.value / 100;
		} else if (cmsOption.value === "other") {
			this.cmsPercent = +cmsInput.value / 100;
		}
	},
	clearScreens: function () {
		screens = document.querySelectorAll(".screen");

		screens.forEach((item, index) => {
			const input = item.querySelector("input");
			const select = item.querySelector("select");

			input.value = "";
			select.value = "";
			if (index > 0) {
				item.remove();
			}
		});
	},
	clearChekboxAndRange: function () {
		const checkbox = document.querySelectorAll('input[type="checkbox"]');

		checkbox.forEach((item) => {
			item.checked = false;
		});

		inputRange.value = "0";
		rangeValue.textContent = "0%";
	},
	clearValues: function () {
		this.rollback = 0;
		this.screenPrice = 0;
		this.screenCount = 0;
		this.servicePricesNumber = 0;
		this.servicePricesPercent = 0;
		this.fullPrice = 0;
		this.servicePercentPrice = 0;
	},
	logger: function () {
		console.log(this.fullPrice);
		console.log(this.cmsPercent);
	},
};

appData.init();
