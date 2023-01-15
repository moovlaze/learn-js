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
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

console.log(typeof title, typeof fullPrice, typeof adaptiv);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(" "));
console.log(fullPrice * (rollback / 100));
console.log(servicePercentPrice);

switch (true) {
	case fullPrice >= 30000:
		console.log("Даем скидку в 10%");
		break;
	case fullPrice >= 15000 && fullPrice < 30000:
		console.log("Даем скидку в 5%");
		break;
	case fullPrice < 15000 && fullPrice >= 0:
		console.log("Скидка не предусмотрена");
		break;
	default:
		console.log("Что то пошло не так");
		break;
}
