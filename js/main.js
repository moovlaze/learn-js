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
	init: function () {
		appData.addTitle();
		// appData.checkScreens();
		appData.addRollback();
		screenBtn.addEventListener("click", appData.addScreenBlock);

		startBtn.addEventListener("click", appData.start);
	},
	start: function () {
		appData.addScreens();
		appData.addService();
		appData.addPrices();
		appData.showResult();

		appData.logger();
	},
	showResult: function () {
		inputTotal.value = appData.screenPrice;
		inputTotalCount.value = appData.screenCount;
		inputTotalCountOther.value =
			+appData.servicePricesNumber + +appData.servicePricesPercent;
		inputTotalFullCount.value = appData.fullPrice;
		inputTotalCountRollback.value = appData.servicePercentPrice;
	},
	addTitle: function () {
		document.title = title.textContent;
	},
	// checkScreens: function () {
	// 	document
	// 		.querySelector(".main-controls__views")
	// 		.addEventListener("change", function () {
	// 			screens.forEach(function (screen, index) {
	// 				const select = screen.querySelector("select");
	// 				const input = screen.querySelector("input");
	// 				const selectName = select.options[select.selectedIndex];

	// 				console.log(input.value === "");
	// 			});
	// 		});
	// },
	addScreens: function () {
		screens = document.querySelectorAll(".screen");

		appData.screens = [];

		screens.forEach(function (screen, index) {
			const select = screen.querySelector("select");
			const input = screen.querySelector("input");
			const selectName = select.options[select.selectedIndex];

			appData.screens.push({
				id: index,
				name: selectName.textContent,
				price: +selectName.value * +input.value,
			});

			appData.screenCount += +input.value;
		});
	},
	addScreenBlock: function () {
		const cloneScreen = screens[0].cloneNode(true);
		screens = document.querySelectorAll(".screen");

		screens[screens.length - 1].after(cloneScreen);
	},
	addService: function () {
		appData.servicePercent = {};
		appData.serviceNumber = {};
		otherItemsPercents.forEach(function (item) {
			const check = item.querySelector('input[type="checkbox"]');
			const label = item.querySelector("label");
			const input = item.querySelector('input[type="text"]');

			if (check.checked) {
				appData.servicePercent[label.textContent] = +input.value;
			}
		});
		otherItemsNumbers.forEach(function (item) {
			const check = item.querySelector('input[type="checkbox"]');
			const label = item.querySelector("label");
			const input = item.querySelector('input[type="text"]');

			if (check.checked) {
				appData.serviceNumber[label.textContent] = +input.value;
			}
		});
	},
	addRollback: function () {
		inputRange.addEventListener("input", function () {
			rangeValue.textContent = `${inputRange.value}%`;
			appData.rollback = +inputRange.value;

			appData.servicePercentPrice = Math.ceil(
				appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
			);

			inputTotalCountRollback.value = appData.servicePercentPrice;
		});
	},
	addPrices: function () {
		for (let screen of appData.screens) {
			appData.screenPrice += +screen.price;
		}

		for (let key in appData.serviceNumber) {
			appData.servicePricesNumber += appData.serviceNumber[key];
		}

		for (let key in appData.servicePercent) {
			appData.servicePricesPercent +=
				appData.screenPrice * (appData.servicePercent[key] / 100);
		}

		appData.fullPrice =
			appData.screenPrice +
			appData.servicePricesNumber +
			appData.servicePricesPercent;

		appData.servicePercentPrice = Math.ceil(
			appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
		);
	},
	logger: function () {
		console.log(appData.screens);
		console.log(appData.screenPrice);
		console.log(appData.servicePercent);
		console.log(appData.serviceNumber);
		console.log(appData.servicePricesNumber);
		console.log(appData.fullPrice);
	},
};

appData.init();
