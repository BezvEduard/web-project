// Типы для функций валидации
interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Функция открытия "взломанной" страницы
function openHackedPage(): void {
  const hackedWindow = window.open('', '_blank');
  if (!hackedWindow) return; // Проверка на null

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

  hackedWindow.document.close();
}

// 1. Валидация полей ввода
function validateInputs(username: string, password: string): ValidationResult {
  if (password.length < 6) {
    return {
      isValid: false,
      message: 'Пароль должен содержать не менее 6 символов',
    };
  }
  return { isValid: true };
}

// 2. Захардкоженные верные данные
const CORRECT_LOGIN = 'admin@example.com';
const CORRECT_PASSWORD = 'secret123';

// 3. Проверка правильности введённых данных
function checkCredentials(username: string, password: string): boolean {
  return username === CORRECT_LOGIN && password === CORRECT_PASSWORD;
}

// 4. Сохранение данных
function saveSession(username: string, rememberSession: boolean): void {
  if (rememberSession) {
    localStorage.setItem('savedUsername', username);
  } else {
    localStorage.removeItem('savedUsername');
  }
}

function loadSavedSession(): string {
  return localStorage.getItem('savedUsername') || '';
}

// 5. Вывод сообщений пользователю
function showMessage(message: string, isError: boolean = true): void {
  const messageDiv = document.getElementById('message');
  if (!messageDiv) return;

  messageDiv.textContent = message;
  messageDiv.className = isError ? 'error' : 'success';

  setTimeout(() => {
    if (!messageDiv) return;
    messageDiv.textContent = '';
    messageDiv.className = '';
  }, 5000);
}

// 6. Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
  // Загрузка сохранённой сессии
  const savedUsername = loadSavedSession();
  const usernameInput = document.getElementById('username') as HTMLInputElement | null;
  const rememberCheckbox = document.getElementById('remember') as HTMLInputElement | null;

  if (savedUsername && usernameInput && rememberCheckbox) {
    usernameInput.value = savedUsername;
    rememberCheckbox.checked = true;
  }

  // Обработчик отправки формы
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement)?.value.trim() || '';
    const password = (document.getElementById('password') as HTMLInputElement)?.value || '';
    const rememberSession =
      (document.getElementById('remember') as HTMLInputElement)?.checked || false;

    // Валидация
    const validation = validateInputs(username, password);
    if (!validation.isValid) {
      showMessage(validation.message!);
      return;
    }

    // Проверка логина/пароля
    if (checkCredentials(username, password)) {
      saveSession(username, rememberSession);
      showMessage('Вход выполнен успешно!', false);

      // Имитация перехода
      setTimeout(() => {
        document.body.innerHTML = `
                    <div style="text-align: center; padding: 50px;">
                        <h1>Добро пожаловать, ${username}!</h1>
                        <p>Вы успешно авторизовались</p>
                    </div>
                `;
      }, 1500);
    } else {
      showMessage('Неверный логин или пароль');
    }
  });
});
