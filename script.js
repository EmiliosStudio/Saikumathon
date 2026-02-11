const board = document.getElementById('board');
const ASSETS_URL = "../assets/";

// Orden de las piezas en la fila principal
const pieceOrder = [
    "torre", "caballo", "perro", "alfil", "rey", 
    "dama", "alfil", "perro", "caballo", "torre"
];

function initGame() {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const square = document.createElement('div');
            
            // Lógica de color de la casilla (Patrón 3 colores)
            const colorIndex = (row + col) % 3;
            square.className = `square color-${colorIndex}`;
            
            let pieceInfo = null;

            // --- COLOCACIÓN NEGRAS ---
            if (row === 0) {
                pieceInfo = { name: `negra-${pieceOrder[col]}`, type: 'png' };
            } else if (row === 1) {
                pieceInfo = { name: "negra-peon", type: 'png' };
            }

            // --- COLOCACIÓN BLANCAS ---
            if (row === 9) {
                pieceInfo = { name: `blanca-${pieceOrder[col]}`, type: 'png' };
            } else if (row === 8) {
                pieceInfo = { name: "blanca-peon", type: 'png' };
            }

            // Si hay una pieza en esta casilla, crear la imagen
            if (pieceInfo) {
                const img = document.createElement('img');
                // IMPORTANTE: Si tus imágenes son .jpg, cambia '.png' por '.jpg' abajo
                img.src = `${ASSETS_URL}${pieceInfo.name}.png`; 
                img.className = 'piece';
                img.alt = pieceInfo.name;
                
                // Manejo de error por si falla la ruta de la imagen
                img.onerror = () => {
                    console.error(`No se encontró: ${img.src}`);
                    square.innerText = pieceInfo.name.split('-')[1][0].toUpperCase();
                };
                
                square.appendChild(img);
            }

            board.appendChild(square);
        }
    }
}

initGame();