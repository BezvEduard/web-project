function openHackedPage() {
    // Создаём новое окно
    const hackedWindow = window.open('', '_blank');

    // Генерируем HTML для страницы "взлома"
    hackedWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Взлом системы</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #000;
                    color: #f00;
                    font-family: 'Courier New', monospace;
                    font-size: 3rem;
                    text-align: center;
                    text-transform: uppercase;
                }
                .blink {
                    animation: blink 0.5s infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            </style>
        </head>
        <body>
            <div>
                <span class="blink">ТЫ ВЗЛОМАЛ СИСТЕМУ!</span>
            </div>
        </body>
        </html>
    `);

    // Закрываем поток записи
    hackedWindow.document.close();
}

// 1. Валидация полей ввода (1 балл)
function validateInputs(username, password) {
    // Проверка длины пароля (минимум 6 символов)
    if (password.length < 6) {
        return {
            isValid: false,
            message: "Пароль должен содержать не менее 6 символов"
        };
    }
    return { isValid: true };
}

// 2. Захардкоженные верные данные (1 балл)
const CORRECT_LOGIN = "admin@example.com";
const CORRECT_PASSWORD = "secret123";

// 3. Проверка правильности введённых данных (1 балл)
function checkCredentials(username, password) {
    return username === CORRECT_LOGIN && password === CORRECT_PASSWORD;
}

// 4. Сохранение данных (4 балла)
// Выбран localStorage, так как это простой способ сохранить данные между сессиями
// без сервера. Пароль не сохраняется из соображений безопасности.
function saveSession(username, rememberSession) {
    if (rememberSession) {
        localStorage.setItem("savedUsername", username);
    } else {
        localStorage.removeItem("savedUsername");
    }
}

function loadSavedSession() {
    return localStorage.getItem("savedUsername") || "";
}

// 5. Вывод сообщений пользователю (1 балл)
function showMessage(message, isError = true) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = isError ? "error" : "success";

    setTimeout(() => {
        messageDiv.textContent = "";
        messageDiv.className = "";
    }, 5000);
}

// 6. Обработчики событий (1 балл)
document.addEventListener("DOMContentLoaded", () => {
    // Загрузка сохранённой сессии
    const savedUsername = loadSavedSession();
    if (savedUsername) {
        document.getElementById("username").value = savedUsername;
        document.getElementById("remember").checked = true;
    }

    // Обработчик отправки формы
    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const rememberSession = document.getElementById("remember").checked;

        // Валидация
        const validation = validateInputs(username, password);
        if (!validation.isValid) {
            showMessage(validation.message);
            return;
        }

        // Проверка логина/пароля
        if (checkCredentials(username, password)) {
            saveSession(username, rememberSession);
            showMessage("Вход выполнен успешно!", false);

            // Имитация перехода (в реальном приложении здесь был бы редирект)
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="text-align: center; padding: 50px;">
                        <h1>Добро пожаловать, ${username}!</h1>
                        <p>Вы успешно авторизовались</p>
                    </div>
                `;
            }, 1500);
        } else {
            showMessage("Неверный логин или пароль");
        }
    });
});
