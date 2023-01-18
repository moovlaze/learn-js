"use strict";

let title = prompt("как называется ваш проект?", "мой проект");
let screens = prompt(
	"Какие типы экранов нужно разработать?",
	"Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
let adaptiv = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt(
	"Какой дополнительный тип услуги нужен?",
	"натяжка на Wp"
);
let servicePrice1 = +prompt("Сколько это будет стоить?", "2500");
let service2 = prompt(
	"Какой дополнительный тип услуги нужен?",
	"натяжка на Wp"
);
let servicePrice2 = +prompt("Сколько это будет стоить?", "2500");

let rollback = 32;

let fullPrice, servicePercentPrice, allServicePrices;

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

const getAllServicePrices = function (price1, price2) {
	return price1 + price2;
};

function getFullPrice(price1, allPrices) {
	return price1 + allPrices;
}

const getTitle = function (text) {
	return text.trim()[0].toUpperCase() + text.trim().slice(1);
};

const getServicePercentPrices = function (price) {
	return Math.ceil(price - price * (rollback / 100));
};

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptiv);

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice);

console.log(getRollbackMessage(fullPrice));
console.log("servicePercentPrice -", servicePercentPrice);
