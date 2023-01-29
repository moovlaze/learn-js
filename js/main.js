"use strict";

let startBot = () => {
	const number = Math.floor(Math.random() * 100);
	let attempts = 10;

	const checkQuestion = (
		func = chekUserNumber,
		questionText = "Ввести новый вариант?"
	) => {
		if (confirm(questionText)) {
			func();
		} else {
			alert("Игра окончена");
			startBot = null;
		}
	};

	const chekUserNumber = () => {
		const userNumber = +prompt("Угадай число от 1 до 100", 2);

		if (isNaN(userNumber)) {
			alert("Введи число!");
			checkQuestion();
		}
		if (attempts > 1) {
			switch (true) {
				case userNumber === 0:
					alert(`Игра окончена`);
					startBot = null;
					break;
				case userNumber > number:
					alert(`Загаданное число меньше, осталость попыток ${--attempts}`);
					checkQuestion();
					break;
				case userNumber < number:
					alert(`Загаданное число больше, осталость попыток ${--attempts}`);
					checkQuestion();
					break;
				case userNumber === number:
					checkQuestion(
						startBot,
						"Поздравляю, Вы угадали!!! Хотите сыграть еще?"
					);
					break;
			}
		} else {
			checkQuestion(startBot, "Вы исчерпали все попытки хотите сыграть еще?");
		}
	};

	chekUserNumber();
};

startBot();
