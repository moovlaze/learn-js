const banner = document.querySelector(".adv");

const bookParent = document.querySelector(".books");
const allBooks = document.querySelectorAll(".book");
const book3Title = allBooks[4].querySelector("a");

banner.remove();

bookParent.append(
	allBooks[1],
	allBooks[0],
	allBooks[4],
	allBooks[3],
	allBooks[5],
	allBooks[2]
);

book3Title.textContent = "Книга 3. this и Прототипы Объектов";

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

const li = allBooks[2].querySelector("ul").querySelectorAll("li");

const newLi = document.createElement("li");
newLi.textContent = "Глава 8: За пределами ES6";

li[8].after(newLi);
