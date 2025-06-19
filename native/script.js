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
