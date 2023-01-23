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

const isNumber = function (num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
	title = prompt("как называется ваш проект?", "мой проект");
	screens = prompt(
		"Какие типы экранов нужно разработать?",
		"Простые, Сложные, Интерактивные"
	);

	do {
		screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
	} while (!isNumber(screenPrice));

	adaptiv = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
	let sum = 0;

	for (let i = 0; i < 2; i++) {
		if (i === 0) {
			service1 = prompt(
				"Какой дополнительный тип услуги нужен?",
				"натяжка на Wp"
			);

			do {
				servicePrice1 = prompt("Сколько это будет стоить?", "2500");
			} while (!isNumber(servicePrice1));
		} else if (i === 1) {
			service2 = prompt(
				"Какой дополнительный тип услуги нужен?",
				"натяжка на Wp"
			);

			do {
				servicePrice2 = prompt("Сколько это будет стоить?", "2500");
			} while (!isNumber(servicePrice2));
		}
	}

	sum = +servicePrice1 + +servicePrice2;

	return sum;
};

function getFullPrice() {
	return +screenPrice + allServicePrices;
}

const getServicePercentPrices = function () {
	return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

const getTitle = function () {
	return title.trim()[0].toUpperCase() + title.trim().slice(1);
};

const showTypeOf = function (variable) {
	console.log(`${variable} -`, typeof variable);
};

const getRollbackMessage = function (price) {
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
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptiv);

console.log(getRollbackMessage(fullPrice));
console.log("servicePercentPrice -", servicePercentPrice);
console.log("fullPrice -", fullPrice);
console.log("allServicePrices = ", allServicePrices);
console.log("title = ", title);
