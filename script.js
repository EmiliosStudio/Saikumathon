body {
    background-color: #121212;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
}

#game-container {
    padding: 12px;
    background: #2b1d0e; /* Marco color madera */
    border-radius: 4px;
    box-shadow: 0 0 40px rgba(0,0,0,0.8);
}

#board {
    display: grid;
    /* 10 columnas y 10 filas de 50px cada una */
    grid-template-columns: repeat(10, 50px);
    grid-template-rows: repeat(10, 50px);
    
    /* Imagen del tablero */
    background-image: url('./tableros/tablero_numerado.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    
    width: 500px;
document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById('board');
    const ASSETS_URL = "./assets/"; 

    // Orden de las piezas especiales en las filas 1 y 10
    const pieceOrder = [
        "torre", "caballo", "perro", "alfil", "rey", 
        "dama", "alfil", "perro", "caballo", "torre"
    ];

    function createBoard() {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.dataset.row = row;
                square.dataset.col = col;

                let pieceName = null;

                // --- LÓGICA DE COLOCACIÓN ---
                
                // Fila 0: Especiales Negras
                if (row === 0) {
                    pieceName = `negra-${pieceOrder[col]}`;
                } 
                // Fila 1: Peones Negros
                else if (row === 1) {
                    pieceName = `negra-peon`;
                }
                // Fila 8: Peones Blancos
                else if (row === 8) {
                    pieceName = `blanca-peon`;
                }
                // Fila 9: Especiales Blancas
                else if (row === 9) {
                    pieceName = `blanca-${pieceOrder[col]}`;
                }

                if (pieceName) {
                    const img = document.createElement('img');
                    img.src = `${ASSETS_URL}${pieceName}.png`; 
                    img.className = 'piece';
                    
                    // Si la imagen no carga, muestra la letra inicial
                    img.onerror = () => {
                        img.style.display = 'none';
                        square.innerText = pieceName.split('-')[1][0].toUpperCase();
                        square.style.color = pieceName.includes('blanca') ? '#4db8ff' : '#ff4d4d';
                        square.style.fontWeight = 'bold';
                        square.style.fontFamily = 'sans-serif';
                    };
                    
                    square.appendChild(img);
                }

                boardElement.appendChild(square);
            }
        }
    }

    createBoard();
});