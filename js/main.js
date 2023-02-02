"use strict";

const title = document.getElementsByTagName("h1")[0];
const handlerBtn = document.getElementsByClassName("handler_btn");
const screenBtn = document.querySelector(".screen-btn");
const otherItemsPercents = document.querySelectorAll(".other-items.percent");
const otherItemsNumbers = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input[type='range']");
const rangeValue = document.querySelector(".rollback .range-value");
const totalInputs = document.getElementsByClassName("total-input");

const inputTotal = totalInputs[0];
const inputTotalCount = totalInputs[1];
const inputTotalCountOther = totalInputs[2];
const inputTotalFullCount = totalInputs[3];
const inputTotalCountRollback = totalInputs[4];

let screen = document.querySelectorAll(".screen");

let appData = {
	title: "",
	screens: [],
	screenPrice: 0,
	adaptiv: true,
	service: {},
	rollback: 32,
	fullPrice: 0,
	servicePercentPrice: 0,
	allServicePrices: 0,
	start: function () {
		appData.asking();
		appData.getAllServicePrices();
		appData.getFullPrice();
		appData.getServicePercentPrices();
		appData.getTitle();

		appData.logger();
	},
	isString: function (str) {
		return !!Number(str);
	},
	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},
	asking: function () {
		do {
			appData.title = prompt("как называется ваш проект?", "мой проект");
		} while (appData.isString(appData.title));

		for (let i = 0; i < 2; i++) {
			let name;
			do {
				name = prompt(
					"Какие типы экранов нужно разработать?",
					"Простые, Сложные, Интерактивные"
				);
			} while (appData.isString(name));
			let price = 0;

			do {
				price = prompt("Сколько будет стоить данная работа?", "12000");
			} while (!appData.isNumber(price));

			appData.screens.push({ id: i, name: name, price: +price });
		}

		appData.screenPrice = appData.screens.reduce(function (sum, item) {
			return sum + item.price;
		}, 0);

		for (let i = 0; i < 2; i++) {
			let name;
			do {
				name = prompt(
					"Какой дополнительный тип услуги нужен?",
					"натяжка на Wp"
				);
			} while (appData.isString(name));
			let price = 0;

			do {
				price = prompt("Сколько это будет стоить?", "2500");
			} while (!appData.isNumber(price));

			appData.service[name + `${i + 1}`] = +price;
		}

		appData.adaptiv = confirm("Нужен ли адаптив на сайте?");
	},
	getAllServicePrices: function () {
		for (let key in appData.service) {
			appData.allServicePrices += appData.service[key];
		}
	},
	getFullPrice: function () {
		appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
	},
	getServicePercentPrices: function () {
		appData.servicePercentPrice = Math.ceil(
			appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
		);
	},
	getTitle: function () {
		appData.title =
			appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1);
	},
	getRollbackMessage: function (price) {
		switch (true) {
			case price >= 30000:
				return "Даем скидку в 10%";
			case price >= 15000 && price < 30000:
				return "Даем скидку в 5%";
			case price < 15000 && price >= 0:
				return "Скидка не предусмотрена";
			default:
				return "Что то пошло не так";
		}
	},
	logger: function () {
		console.log(appData.fullPrice);
		console.log(appData.servicePercentPrice);
		console.log(appData.allServicePrices);
	},
};

appData.start();
