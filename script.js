document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById('board');
    const ASSETS_URL = "./assets/"; 

    // Orden de las piezas en la fila principal
    const pieceOrder = ["torre", "caballo", "perro", "alfil", "rey", "dama", "alfil", "perro", "caballo", "torre"];

    function createBoard() {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.dataset.row = row;
                square.dataset.col = col;

                let pieceName = null;

                // Colocación de piezas (Negras arriba, Blancas abajo)
                if (row === 0) pieceName = `negra-${pieceOrder[col]}`;
                else if (row === 1) pieceName = `negra-peon`;
                else if (row === 8) pieceName = `blanca-peon`;
                else if (row === 9) pieceName = `blanca-${pieceOrder[col]}`;

                if (pieceName) {
                    const img = document.createElement('img');
                    img.src = `${ASSETS_URL}${pieceName}.png`; 
                    img.className = 'piece';
                    
                    // Si no encuentra la imagen, pone una letra provisional
                    img.onerror = () => {
                        img.style.display = 'none';
                        square.innerText = pieceName.split('-')[1][0].toUpperCase();
                        square.style.color = pieceName.includes('blanca') ? '#4db8ff' : '#ff4d4d';
                        square.style.fontFamily = 'Emiliosans';
                    };
                    
                    square.appendChild(img);
                }

                boardElement.appendChild(square);
            }
        }
    }

    // Lógica para abrir/cerrar Créditos
    const modal = document.getElementById("credits-modal");
    const btn = document.getElementById("open-credits");
    const span = document.querySelector(".close-modal");

    btn.onclick = () => modal.style.display = "block";
    span.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    }

    createBoard();
});
