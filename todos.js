document.addEventListener('DOMContentLoaded', () => {
    const todosCountInput = document.getElementById('todos-count');
    const fetchTodosBtn = document.getElementById('fetch-todos-btn');
    const todosContainer = document.getElementById('todos-container');

    const API_URL = 'https://jsonplaceholder.typicode.com/todos';

    const fetchTodos = async () => {
        const count = todosCountInput.value;

        if (!count || count < 1) {
            alert('Пожалуйста, введите корректное количество задач (больше 0).');
            return;
        }

        try {
            const response = await fetch(`${API_URL}?_limit=${count}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('Не удалось загрузить задачи:', error);
            todosContainer.innerHTML = '<p>Не удалось загрузить задачи. Попробуйте позже.</p>';
        }
    };

    const renderTodos = (todos) => {
        todosContainer.innerHTML = ''; // Очищаем контейнер

        todos.forEach(todo => {
            const card = document.createElement('div');
            card.classList.add('todo-card');

            const title = document.createElement('h3');
            title.textContent = todo.title;
            card.appendChild(title);

            if (todo.completed) {
                card.classList.add('completed');
            }

            todosContainer.appendChild(card);
        });
    };

    fetchTodosBtn.addEventListener('click', fetchTodos);
}); 