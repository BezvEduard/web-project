# web-project
Люди с ограниченными способностями: Установлен атрибут aria-required="true", чтобы человек не отправил пустую форму

Обоснование подхода: Здесь использован блочный подход, так как форма состоит из независимых блоков (кнопки, поля ввода, галочка). Блочная верстка подходит для четкого структурирования элементов, что позволяет легко управлять их отображением и стилем.

Брейкпоинты выбраны для удобства пользования формы на планшетах и телефонах

Пасхалка реализована в форме зеленого квадратика справа сверху, переводящего на новую страницу с мигающей надписью "Ты взломал систему"

Стрелочные и именованные функции
Предпочтение: для основной логики использованы именованные функции (validateInputs, checkCredentials и др.), так как они лучше читаются и их легче отлаживать. Стрелочные функции использованы для коротких колбэков (обработчики событий, setTimeout), где их краткий синтаксис удобен.

admin@example.com

secret123

Выбираем npm, так как он стандартный и простой для начинающих

Выбрана строгая конфигурация для лучшего контроля типов

Vite выбран из-за скорости и простоты

В целом в проекте выполнена 1 часть и 2 часть до момента подключения линтера включительно.
