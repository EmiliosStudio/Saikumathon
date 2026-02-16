document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById('board');
    const ASSETS_URL = "./assets/";

    // --- SONIDOS ---
    const sounds = {
        error: new Audio(`${ASSETS_URL}error.mp3`),
        captura: new Audio(`${ASSETS_URL}captura.mp3`),
        jaque: new Audio(`${ASSETS_URL}jaque.mp3`)
    };

    let currentPlayer = 'blanca';
    let selectedPiece = null;
    let possibleMoves = [];
    const boardState = Array(10).fill(null).map(() => Array(10).fill(null));
    const pawnMoved = Array(10).fill(null).map(() => Array(10).fill(false));

    const pieceOrder = ["torre", "caballo", "perro", "alfil", "rey", "dama", "alfil", "perro", "caballo", "torre"];

    // --- SISTEMA DE JAQUE ---
    function findKing(color, board) {
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                if (board[r][c]?.type === 'rey' && board[r][c]?.color === color) return { r, c };
            }
        }
        return null;
    }

    function isKingInCheck(color, board) {
        const kingPos = findKing(color, board);
        if (!kingPos) return false;
        const enemyColor = color === 'blanca' ? 'negra' : 'blanca';
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const p = board[r][c];
                if (p && p.color === enemyColor) {
                    const moves = calculateMoves(r, c, p.type, p.color, board, true);
                    if (moves.some(m => m.row === kingPos.r && m.col === kingPos.c)) return true;
                }
            }
        }
        return false;
    }

    // --- REGLAS DE MOVIMIENTO SAIKUMATHON ---
    function calculateMoves(row, col, type, color, board, isSimulation = false) {
        let moves = [];
        const getAt = (r, c) => (r < 0 || r >= 10 || c < 0 || c >= 10) ? 'out' : board[r][c];

        if (type === 'peon') {
            const dir = color === 'blanca' ? -1 : 1;
            if (getAt(row + dir, col) === null) {
                moves.push({ row: row + dir, col: col, isCapture: false });
                if (!pawnMoved[row][col] && getAt(row + dir * 2, col) === null) {
                    moves.push({ row: row + dir * 2, col: col, isCapture: false });
                    if (getAt(row + dir * 3, col) === null) moves.push({ row: row + dir * 3, col: col, isCapture: false });
                }
            }
            [-1, 1].forEach(dc => {
                const t = getAt(row + dir, col + dc);
                if (t && t !== 'out' && t.color !== color) moves.push({ row: row + dir, col: col + dc, isCapture: true });
            });
        }

        if (type === 'caballo') { // Salto 2x2
            [[2,2], [2,-2], [-2,2], [-2,-2]].forEach(([dr, dc]) => {
                const t = getAt(row + dr, col + dc);
                if (t !== 'out' && (t === null || t.color !== color)) moves.push({ row: row + dr, col: col + dc, isCapture: t !== null });
            });
        }

        if (type === 'perro') { // 1 o 2 pasos (no salta)
            [[1,0], [-1,0], [0,1], [0,-1]].forEach(([dr, dc]) => {
                const step1 = getAt(row + dr, col + dc);
                if (step1 !== 'out') {
                    if (step1 === null || step1.color !== color) moves.push({ row: row + dr, col: col + dc, isCapture: step1 !== null });
                    if (step1 === null) {
                        const step2 = getAt(row + dr * 2, col + dc * 2);
                        if (step2 !== 'out' && (step2 === null || step2.color !== color)) moves.push({ row: row + dr * 2, col: col + dc * 2, isCapture: step2 !== null });
                    }
                }
            });
        }

        if (type === 'torre' || type === 'dama') {
            [[1,0], [-1,0], [0,1], [0,-1]].forEach(([dr, dc]) => {
                for (let i = 1; i < 10; i++) {
                    const nr = row + dr * i, nc = col + dc * i;
                    const t = getAt(nr, nc);
                    if (t === 'out') break;
                    if (t === null) moves.push({ row: nr, col: nc, isCapture: false });
                    else { if (t.color !== color) moves.push({ row: nr, col: nc, isCapture: true }); break; }
                }
            });
        }

        if (type === 'alfil' || type === 'dama') {
            [[1,1], [1,-1], [-1,1], [-1,-1]].forEach(([dr, dc]) => {
                for (let i = 1; i < 10; i++) {
                    const nr = row + dr * i, nc = col + dc * i;
                    const t = getAt(nr, nc);
                    if (t === 'out') break;
                    if (t === null) moves.push({ row: nr, col: nc, isCapture: false });
                    else { if (t.color !== color) moves.push({ row: nr, col: nc, isCapture: true }); break; }
                }
            });
        }

        if (type === 'rey') {
            [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]].forEach(([dr, dc]) => {
                const t = getAt(row + dr, col + dc);
                if (t !== 'out' && (t === null || t.color !== color)) moves.push({ row: row + dr, col: col + dc, isCapture: t !== null });
            });
        }
        return moves;
    }

    // --- GESTIÓN DE MOVIMIENTOS ---
    function movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = boardState[fromRow][fromCol];
        const isCap = boardState[toRow][toCol] !== null;

        const virtualBoard = boardState.map(r => [...r]);
        virtualBoard[toRow][toCol] = piece;
        virtualBoard[fromRow][fromCol] = null;

        if (isKingInCheck(currentPlayer, virtualBoard)) {
            const img = document.querySelector(`.square[data-row='${fromRow}'][data-col='${fromCol}'] .piece`);
            sounds.error.play();
            img.classList.add('illegal-move-animation');
            setTimeout(() => img.classList.remove('illegal-move-animation'), 1000);
            return;
        }

        if (piece.type === 'peon') pawnMoved[fromRow][fromCol] = true;
        boardState[toRow][toCol] = piece;
        boardState[fromRow][fromCol] = null;

        const toSq = document.querySelector(`.square[data-row='${toRow}'][data-col='${toCol}']`);
        const img = document.querySelector(`.square[data-row='${fromRow}'][data-col='${fromCol}'] .piece`);
        toSq.innerHTML = '';
        toSq.appendChild(img);

        const enemy = currentPlayer === 'blanca' ? 'negra' : 'blanca';
        if (isKingInCheck(enemy, boardState)) sounds.jaque.play();
        else if (isCap) sounds.captura.play();

        clearIndicators();
        selectedPiece = null;
        currentPlayer = enemy;
        updateCheckVisuals();
    }

    function updateCheckVisuals() {
        document.querySelectorAll('.check-square').forEach(el => el.classList.remove('check-square'));
        if (isKingInCheck(currentPlayer, boardState)) {
            const k = findKing(currentPlayer, boardState);
            document.querySelector(`.square[data-row='${k.r}'][data-col='${k.c}']`).classList.add('check-square');
        }
    }

    function handleSquareClick(row, col, square) {
        if (selectedPiece) {
            const move = possibleMoves.find(m => m.row === row && m.col === col);
            if (move) { movePiece(selectedPiece.row, selectedPiece.col, row, col); return; }
        }
        const p = boardState[row][col];
        if (p && p.color === currentPlayer) {
            clearIndicators();
            selectedPiece = { row, col, ...p };
            square.classList.add('selected-square');
            possibleMoves = calculateMoves(row, col, p.type, p.color, boardState);
            possibleMoves.forEach(m => {
                const target = document.querySelector(`.square[data-row='${m.row}'][data-col='${m.col}']`);
                const ind = document.createElement('div');
                ind.className = m.isCapture ? 'capture-indicator' : 'move-indicator';
                target.appendChild(ind);
            });
        } else { clearIndicators(); selectedPiece = null; }
    }

    function clearIndicators() {
        document.querySelectorAll('.move-indicator, .capture-indicator').forEach(el => el.remove());
        document.querySelectorAll('.selected-square').forEach(el => el.classList.remove('selected-square'));
    }

    function createBoard() {
        boardElement.innerHTML = '';
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.dataset.row = r; square.dataset.col = c;
                square.onclick = () => handleSquareClick(r, c, square);

                let name = null, type = null, col = null;
                if (r === 0) { name = `negra-${pieceOrder[c]}`; col = 'negra'; type = pieceOrder[c]; }
                else if (r === 1) { name = `negra-peon`; col = 'negra'; type = 'peon'; }
                else if (r === 8) { name = `blanca-peon`; col = 'blanca'; type = 'peon'; }
                else if (r === 9) { name = `blanca-${pieceOrder[c]}`; col = 'blanca'; type = pieceOrder[c]; }

                if (name) {
                    boardState[r][c] = { type, color: col };
                    const img = document.createElement('img');
                    img.src = `${ASSETS_URL}${name}.png`;
                    img.className = 'piece';
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