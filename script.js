body {
    background-color: #1e1e1e;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 20px;
}

#game-container {
    position: relative;
const boardElement = document.getElementById('board');
// IMPORTANTE: Asegúrate de que la carpeta se llame 'assets' en minúsculas
const ASSETS_URL = "./assets/"; 

const pieceOrder = ["torre", "caballo", "perro", "alfil", "rey", "dama", "alfil", "perro", "caballo", "torre"];

function initGame() {
    boardElement.innerHTML = ''; // Limpiar tablero
    
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const square = document.createElement('div');
            
            // Lógica de 3 colores (ajustada para que sea 10x10 real)
            const colorIndex = (row + col) % 3;
            square.className = `square color-${colorIndex}`;
            square.dataset.row = row;
            square.dataset.col = col;

            let pieceName = null;

            // Colocación lógica
            if (row === 0) pieceName = `negra-${pieceOrder[col]}`;
            else if (row === 1) pieceName = `negra-peon`;
            else if (row === 9) pieceName = `blanca-${pieceOrder[col]}`;
            else if (row === 8) pieceName = `blanca-peon`;

            if (pieceName) {
                const img = document.createElement('img');
                // IMPORTANTE: Verifica si tus archivos son .png o .jpg
                img.src = `${ASSETS_URL}${pieceName}.png`; 
                img.className = 'piece';
                
                // Si la imagen falla, ponemos la inicial
                img.onerror = () => {
                    square.innerText = pieceName.split('-')[1][0].toUpperCase();
                    square.style.color = pieceName.includes('blanca') ? 'blue' : 'red';
                };
                square.appendChild(img);
            }

            boardElement.appendChild(square);
        }
    }
}

initGame();