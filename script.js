document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById('board');
    const ASSETS_URL = "./assets/"; 

    const pieceOrder = ["torre", "caballo", "perro", "alfil", "rey", "dama", "alfil", "perro", "caballo", "torre"];

    function createBoard() {
        boardElement.innerHTML = '';
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const square = document.createElement('div');
                square.className = 'square';
                
                let pieceName = null;
                if (row === 0) pieceName = `negra-${pieceOrder[col]}`;
                else if (row === 1) pieceName = `negra-peon`;
                else if (row === 8) pieceName = `blanca-peon`;
                else if (row === 9) pieceName = `blanca-${pieceOrder[col]}`;

                if (pieceName) {
                    const img = document.createElement('img');
                    img.src = `${ASSETS_URL}${pieceName}.png`; 
                    img.className = 'piece';
                    
                    img.onerror = () => {
                        img.style.display = 'none';
                        const initial = pieceName.split('-')[1][0].toUpperCase();
                        square.innerHTML = `<span style="font-family:'Emiliosans'; font-size: 18px; color:${pieceName.includes('blanca') ? '#4db8ff' : '#ff4d4d'}">${initial}</span>`;
                    };
                    
                    square.appendChild(img);
                }
                boardElement.appendChild(square);
            }
        }
    }

    const modal = document.getElementById("credits-modal");
    document.getElementById("open-credits").onclick = () => modal.style.display = "block";
    document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

    createBoard();
});