"use strict";

let title;
let screens;
let screenPrice;
let adaptiv;

let service1;
let servicePrice1;
let service2;
let servicePrice2;

let rollback = 32;

let fullPrice, servicePercentPrice, allServicePrices;

const appData = {
	title: "",
	screens: "",
	screenPrice: 0,
	adaptiv: true,
	service1: "",
	servicePrice1: 0,
	service2: "",
	servicePrice2: 0,
	rollback: 32,
	fullPrice: 0,
	servicePercentPrice: 0,
	allServicePrices: 0,
	start: function () {
		appData.asking();
		appData.allServicePrices = appData.getAllServicePrices();
		appData.fullPrice = appData.getFullPrice();
		appData.servicePercentPrice = appData.getServicePercentPrices();
		appData.title = appData.getTitle();

		appData.logger();
	},
	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},
	asking: function () {
		appData.title = prompt("как называется ваш проект?", "мой проект");
		appData.screens = prompt(
			"Какие типы экранов нужно разработать?",
			"Простые, Сложные, Интерактивные"
		);

		do {
			appData.screenPrice = prompt(
				"Сколько будет стоить данная работа?",
				"12000"
			);
		} while (!appData.isNumber(appData.screenPrice));

		appData.adaptiv = confirm("Нужен ли адаптив на сайте?");
	},
	getAllServicePrices: function () {
		let sum = 0;

		for (let i = 0; i < 2; i++) {
			let price = 0;

			if (i === 0) {
				appData.service1 = prompt(
					"Какой дополнительный тип услуги нужен?",
					"натяжка на Wp"
				);
			} else if (i === 1) {
				appData.service2 = prompt(
					"Какой дополнительный тип услуги нужен?",
					"натяжка на Wp"
				);
			}

			do {
				price = prompt("Сколько это будет стоить?", "2500");
			} while (!appData.isNumber(price));

			sum += +price;
		}

		return sum;
	},
	getFullPrice: function () {
		return +appData.screenPrice + appData.allServicePrices;
	},
	getServicePercentPrices: function () {
		return Math.ceil(
			appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
		);
	},
	getTitle: function () {
		return (
			appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1)
		);
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
		for (let key in appData) {
			console.log(`${key}: ${appData[key]}`);
		}
	},
};

appData.start();
