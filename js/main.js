let title = "my project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 20;
let rollback = 32;
let fullPrice = 36000;
let adaptiv = true;

console.log(typeof title, typeof fullPrice, typeof adaptiv);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(" "));
console.log(fullPrice * (rollback / 100));
