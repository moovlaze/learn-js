const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

const render = function () {
	todoList.innerHTML = "";
	todoCompleted.innerHTML = "";

	todoData.forEach(function (item, index) {
		const li = document.createElement("li");

		li.classList.add("todo-item");

		li.innerHTML = `<li class="todo-item">
			<span class="text-todo">${item.text}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
		</li>`;

		if (item.checked) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		}

		li.querySelector(".todo-complete").addEventListener("click", function () {
			item.checked = !item.checked;
			localStorage.setItem("todos", JSON.stringify(todoData));
			render();
		});

		li.querySelector(".todo-remove").addEventListener("click", function () {
			todoData.splice(index, 1);
			localStorage.setItem("todos", JSON.stringify(todoData));
			render();
		});
	});
};

todoControl.addEventListener("submit", function (e) {
	e.preventDefault();

	if (headerInput.value !== "") {
		const newTodo = {
			text: headerInput.value,
			checked: false,
		};

		headerInput.value = "";

		todoData.push(newTodo);

		localStorage.setItem("todos", JSON.stringify(todoData));

		render();
	}
});

window.addEventListener("load", function () {
	if (JSON.parse(localStorage.getItem("todos")) !== null) {
		todoData = JSON.parse(localStorage.getItem("todos"));

		render();
	}
});
