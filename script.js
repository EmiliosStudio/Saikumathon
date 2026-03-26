document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById('board');
    const ASSETS_URL = "./assets/";

    // --- SONIDOS ---
    const sounds = {
        error: new Audio(`${ASSETS_URL}sounds/error.mp3`),
        captura: new Audio(`${ASSETS_URL}sounds/capturar.mp3`),
        jaque: new Audio(`${ASSETS_URL}sounds/jaque.mp3`),
        mover: new Audio(`${ASSETS_URL}sounds/mover.mp3`),
        empezar: new Audio(`${ASSETS_URL}sounds/empezar.mp3`)
    };

    // --- ESTADO DEL JUEGO ---
    let currentPlayer = 'blanca';
    let selectedPiece = null;
    let possibleMoves = [];
    const boardState = Array(10).fill(null).map(() => Array(10).fill(null));
    const pawnMoved = Array(10).fill(null).map(() => Array(10).fill(false));
    let moveHistory = []; // historial para undo
    let timerPaused = false;

    // --- CONFIG DE PARTIDA ---
    let gameMode = 'sin-tiempo';
    let timePerPlayer = 0;
    let incrementSecs = 0;
    let timers = { blanca: 0, negra: 0 };
    let timerInterval = null;

    const pieceOrder = ["torre", "caballo", "perro", "alfil", "rey", "dama", "alfil", "perro", "caballo", "torre"];

    // --- TEMPORIZADORES ---
    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        document.getElementById('timer-negra').textContent = formatTime(timers.negra);
        document.getElementById('timer-blanca').textContent = formatTime(timers.blanca);
        document.getElementById('timer-negra').classList.toggle('timer-active', currentPlayer === 'negra');
        document.getElementById('timer-blanca').classList.toggle('timer-active', currentPlayer === 'blanca');
    }

    function stopTimer() {
        if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    }

    function startTimer() {
        if (gameMode !== 'con-tiempo') return;
        stopTimer();
        timerInterval = setInterval(() => {
            timers[currentPlayer]--;
            updateTimerDisplay();
            if (timers[currentPlayer] <= 0) {
                timers[currentPlayer] = 0;
                updateTimerDisplay();
                stopTimer();
                const winner = currentPlayer === 'blanca' ? 'Negras' : 'Blancas';
                showGameOver(`¡Tiempo agotado!\n${winner} ganan.`);
            }
        }, 1000);
    }

    function hasLegalMoves(color, board) {
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const p = board[r][c];
                if (!p || p.color !== color) continue;
                const moves = calculateMoves(r, c, p.type, p.color, board);
                for (const m of moves) {
                    const virtual = board.map(row => [...row]);
                    virtual[m.row][m.col] = p;
                    virtual[r][c] = null;
                    if (!isKingInCheck(color, virtual)) return true;
                }
            }
        }
        return false;
    }

    function showGameOver(msg) {
        stopTimer();
        timerPaused = true;
        const modal = document.getElementById('gameover-modal');
        document.getElementById('gameover-msg').textContent = msg;
        setTimeout(() => { modal.style.display = 'block'; }, 200);
        modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    }

    function checkGameOver() {
        if (!hasLegalMoves(currentPlayer, boardState)) {
            if (isKingInCheck(currentPlayer, boardState)) {
                const winner = currentPlayer === 'blanca' ? 'Negras' : 'Blancas';
                showGameOver(`¡Jaque mate!\n${winner} ganan.`);
            } else {
                showGameOver('¡Ahogado!\nTablas.');
            }
        }
    }

    function setupDrag(square, r, c) {
        const img = square.querySelector('.piece');
        if (!img) return;

        // HTML5 drag (escritorio)
        img.draggable = true;
        img.addEventListener('dragstart', (e) => {
            const p = boardState[r][c];
            if (!p || p.color !== currentPlayer) { e.preventDefault(); return; }
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', `${r},${c}`);
            setTimeout(() => img.classList.add('dragging'), 0);
            selectedPiece = { row: r, col: c };
            possibleMoves = calculateMoves(r, c, p.type, p.color, boardState);
            clearIndicators();
            square.classList.add('selected-square');
            possibleMoves.forEach(m => {
                const target = document.querySelector(`.square[data-row='${m.row}'][data-col='${m.col}']`);
                const ind = document.createElement('div');
                ind.className = m.isCapture ? 'capture-indicator' : 'move-indicator';
                target.appendChild(ind);
            });
        });
        img.addEventListener('dragend', () => {
            img.classList.remove('dragging');
        });
    }

    function setupDropZone(square, r, c) {
        square.addEventListener('dragover', (e) => {
            if (!selectedPiece) return;
            const isValid = possibleMoves.find(m => m.row === r && m.col === c);
            if (isValid) {
                e.preventDefault();
                square.classList.add('drag-over');
            }
        });
        square.addEventListener('dragleave', () => {
            square.classList.remove('drag-over');
        });
        square.addEventListener('drop', (e) => {
            e.preventDefault();
            square.classList.remove('drag-over');
            if (!selectedPiece) return;
            const move = possibleMoves.find(m => m.row === r && m.col === c);
            if (move) movePiece(selectedPiece.row, selectedPiece.col, r, c);
            else { clearIndicators(); selectedPiece = null; }
        });
    }

    // --- SISTEMA DE JAQUE ---
    function findKing(color, board) {
        for (let r = 0; r < 10; r++)
            for (let c = 0; c < 10; c++)
                if (board[r][c]?.type === 'rey' && board[r][c]?.color === color) return { r, c };
        return null;
    }

    function isKingInCheck(color, board) {
        const kingPos = findKing(color, board);
        if (!kingPos) return false;
        const enemyColor = color === 'blanca' ? 'negra' : 'blanca';
        for (let r = 0; r < 10; r++)
            for (let c = 0; c < 10; c++) {
                const p = board[r][c];
                if (p && p.color === enemyColor) {
                    const moves = calculateMoves(r, c, p.type, p.color, board, true);
                    if (moves.some(m => m.row === kingPos.r && m.col === kingPos.c)) return true;
                }
            }
        return false;
    }

    // --- REGLAS DE MOVIMIENTO ---
    function calculateMoves(row, col, type, color, board, isSimulation = false) {
        let moves = [];
        const getAt = (r, c) => (r < 0 || r >= 10 || c < 0 || c >= 10) ? 'out' : board[r][c];

        if (type === 'peon') {
            const dir = color === 'blanca' ? -1 : 1;
            const filaInicial = color === 'blanca' ? 8 : 1;
            const pasos = row === filaInicial ? 3 : 1;
            for (let i = 1; i <= pasos; i++) {
                const t = getAt(row + dir * i, col);
                if (t === null) moves.push({ row: row + dir * i, col, isCapture: false });
                else break;
            }
            [-1, 1].forEach(dc => {
                const t = getAt(row + dir, col + dc);
                if (t && t !== 'out' && t.color !== color) moves.push({ row: row + dir, col: col + dc, isCapture: true });
            });
        }

        if (type === 'caballo') {
            [[2,2],[2,-2],[-2,2],[-2,-2]].forEach(([dr, dc]) => {
                const t = getAt(row + dr, col + dc);
                if (t !== 'out' && (t === null || t.color !== color)) moves.push({ row: row + dr, col: col + dc, isCapture: t !== null });
            });
        }

        if (type === 'perro') {
            [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
                const s1 = getAt(row + dr, col + dc);
                if (s1 !== 'out') {
                    if (s1 === null || s1.color !== color) moves.push({ row: row + dr, col: col + dc, isCapture: s1 !== null });
                    if (s1 === null) {
                        const s2 = getAt(row + dr * 2, col + dc * 2);
                        if (s2 !== 'out' && (s2 === null || s2.color !== color)) moves.push({ row: row + dr * 2, col: col + dc * 2, isCapture: s2 !== null });
                    }
                }
            });
        }

        if (type === 'torre' || type === 'dama') {
            [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr, dc]) => {
                for (let i = 1; i < 10; i++) {
                    const nr = row + dr * i, nc = col + dc * i, t = getAt(nr, nc);
                    if (t === 'out') break;
                    if (t === null) moves.push({ row: nr, col: nc, isCapture: false });
                    else { if (t.color !== color) moves.push({ row: nr, col: nc, isCapture: true }); break; }
                }
            });
        }

        if (type === 'alfil' || type === 'dama') {
            [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
                for (let i = 1; i < 10; i++) {
                    const nr = row + dr * i, nc = col + dc * i, t = getAt(nr, nc);
                    if (t === 'out') break;
                    if (t === null) moves.push({ row: nr, col: nc, isCapture: false });
                    else { if (t.color !== color) moves.push({ row: nr, col: nc, isCapture: true }); break; }
                }
            });
        }

        if (type === 'rey') {
            [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
                const t = getAt(row + dr, col + dc);
                if (t !== 'out' && (t === null || t.color !== color)) moves.push({ row: row + dr, col: col + dc, isCapture: t !== null });
            });
        }
        return moves;
    }

    // --- MOVER PIEZA ---
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

        // Guardar snapshot para undo
        moveHistory.push({
            board: boardState.map(r => r.map(c => c ? {...c} : null)),
            pawnMoved: pawnMoved.map(r => [...r]),
            currentPlayer,
            timers: { ...timers }
        });

        boardState[toRow][toCol] = piece;
        boardState[fromRow][fromCol] = null;

        const toSq = document.querySelector(`.square[data-row='${toRow}'][data-col='${toCol}']`);
        const img = document.querySelector(`.square[data-row='${fromRow}'][data-col='${fromCol}'] .piece`);
        toSq.innerHTML = '';
        toSq.appendChild(img);
        setupDrag(toSq, toRow, toCol);
        const fromSq = document.querySelector(`.square[data-row='${fromRow}'][data-col='${fromCol}']`);
        setupDrag(fromSq, fromRow, fromCol);

        const enemy = currentPlayer === 'blanca' ? 'negra' : 'blanca';
        if (isKingInCheck(enemy, boardState)) sounds.jaque.play();
        else if (isCap) sounds.captura.play();
        else sounds.mover.play();

        clearIndicators();
        selectedPiece = null;

        // Incremento al jugador que acaba de mover, luego cambiar turno
        if (gameMode === 'con-tiempo') {
            timers[currentPlayer] += incrementSecs;
            stopTimer();
        }
        currentPlayer = enemy;
        if (gameMode === 'con-tiempo') {
            startTimer();
            updateTimerDisplay();
        }
        updateCheckVisuals();
        checkGameOver();
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

                let name = null, type = null, color = null;
                if (r === 0) { name = `negra-${pieceOrder[c]}`; color = 'negra'; type = pieceOrder[c]; }
                else if (r === 1) { name = `negra-peon`; color = 'negra'; type = 'peon'; }
                else if (r === 8) { name = `blanca-peon`; color = 'blanca'; type = 'peon'; }
                else if (r === 9) { name = `blanca-${pieceOrder[c]}`; color = 'blanca'; type = pieceOrder[c]; }

                if (name) {
                    boardState[r][c] = { type, color };
                    const img = document.createElement('img');
                    img.src = `${ASSETS_URL}${name}.png`;
                    img.className = 'piece';
                    square.appendChild(img);
                }
                setupDropZone(square, r, c);
                setupDrag(square, r, c);
                boardElement.appendChild(square);
            }
        }
    }

    // --- PANTALLA DE INICIO ---
    const btnSinTiempo = document.getElementById('btn-sin-tiempo');
    const btnConTiempo = document.getElementById('btn-con-tiempo');
    const timeOptions = document.getElementById('time-options');
    const btnEmpezar = document.getElementById('btn-empezar');
    const incSlider = document.getElementById('increment-slider');
    const incValue = document.getElementById('inc-value');
    let selectedTime = 0;

    btnSinTiempo.onclick = () => {
        gameMode = 'sin-tiempo';
        btnSinTiempo.classList.add('active');
        btnConTiempo.classList.remove('active');
        timeOptions.classList.add('time-options-disabled');
        btnEmpezar.classList.add('visible');
    };

    btnConTiempo.onclick = () => {
        gameMode = 'con-tiempo';
        btnConTiempo.classList.add('active');
        btnSinTiempo.classList.remove('active');
        timeOptions.classList.remove('time-options-disabled');
        if (selectedTime > 0) btnEmpezar.classList.add('visible');
        else btnEmpezar.classList.remove('visible');
    };

    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedTime = parseInt(btn.dataset.time);
            timePerPlayer = selectedTime;
            if (gameMode === 'con-tiempo') btnEmpezar.classList.add('visible');
        };
    });

    incSlider.oninput = () => {
        incrementSecs = parseInt(incSlider.value);
        incValue.textContent = incrementSecs + 's';
    };

    btnEmpezar.onclick = () => {
        sounds.empezar.play();
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-header').style.display = 'block';
        document.getElementById('game-container').style.display = 'block';
        document.getElementById('game-footer').style.display = 'flex';

        const timersCol = document.querySelector('.timers-col');
        if (gameMode === 'con-tiempo') {
            timers.blanca = timePerPlayer;
            timers.negra = timePerPlayer;
            timersCol.style.display = 'flex';
            updateTimerDisplay();
            startTimer(); // empiezan blancas
        } else {
            timersCol.style.display = 'none';
        }
        createBoard();
    };

    // --- UNDO ---
    function undoMove() {
        if (moveHistory.length === 0) return;
        const snap = moveHistory.pop();
        // Restaurar estado
        for (let r = 0; r < 10; r++)
            for (let c = 0; c < 10; c++) {
                boardState[r][c] = snap.board[r][c];
                pawnMoved[r][c] = snap.pawnMoved[r][c];
            }
        currentPlayer = snap.currentPlayer;
        timers = { ...snap.timers };
        stopTimer();
        timerPaused = false;
        if (gameMode === 'con-tiempo') { startTimer(); updateTimerDisplay(); }
        selectedPiece = null; possibleMoves = [];
        rebuildBoard();
        updateCheckVisuals();
    }

    function rebuildBoard() {
        boardElement.innerHTML = '';
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.dataset.row = r; square.dataset.col = c;
                square.onclick = () => handleSquareClick(r, c, square);
                const p = boardState[r][c];
                if (p) {
                    const img = document.createElement('img');
                    img.src = `${ASSETS_URL}${p.color}-${p.type}.png`;
                    img.className = 'piece';
                    square.appendChild(img);
                }
                setupDropZone(square, r, c);
                setupDrag(square, r, c);
                boardElement.appendChild(square);
            }
        }
    }

    // --- PARPADEO AL PAUSAR ---
    function startBlink() {
        const activeTimer = currentPlayer === 'blanca'
            ? document.getElementById('timer-blanca')
            : document.getElementById('timer-negra');
        activeTimer.classList.add('timer-blinking');
    }

    function stopBlink() {
        document.getElementById('timer-blanca').classList.remove('timer-blinking');
        document.getElementById('timer-negra').classList.remove('timer-blinking');
    }

    function pauseWithBlink() {
        if (gameMode !== 'con-tiempo' || timerPaused) return;
        stopTimer();
        timerPaused = true;
        startBlink();
    }

    function resumeFromBlink() {
        if (gameMode !== 'con-tiempo' || !timerPaused) return;
        stopBlink();
        timerPaused = false;
        startTimer();
    }

    // --- BOTONES LATERALES ---
    document.getElementById('btn-undo-top').onclick = undoMove;
    document.getElementById('btn-undo-bottom').onclick = undoMove;

    document.getElementById('btn-pause').onclick = () => pauseWithBlink();
    document.getElementById('btn-play').onclick = () => resumeFromBlink();

    // --- MODAL EDITAR TIEMPO ---
    const editTimeModal = document.getElementById('edit-time-modal');
    const editIncSlider = document.getElementById('edit-increment-slider');
    const editIncValue = document.getElementById('edit-inc-value');
    let editSelectedTime = 0;

    document.getElementById('btn-edit-time').onclick = () => {
        if (gameMode !== 'con-tiempo') return;
        pauseWithBlink();
        editSelectedTime = 0;
        editIncSlider.value = incrementSecs;
        editIncValue.textContent = incrementSecs + 's';
        document.querySelectorAll('#edit-time-grid .time-btn').forEach(b => b.classList.remove('active'));
        editTimeModal.style.display = 'block';
    };

    document.getElementById('close-edit-time').onclick = () => {
        editTimeModal.style.display = 'none';
        resumeFromBlink();
    };
    editTimeModal.onclick = (e) => {
        if (e.target === editTimeModal) {
            editTimeModal.style.display = 'none';
            resumeFromBlink();
        }
    };

    editIncSlider.oninput = () => {
        editIncValue.textContent = editIncSlider.value + 's';
    };

    document.querySelectorAll('#edit-time-grid .time-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('#edit-time-grid .time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            editSelectedTime = parseInt(btn.dataset.time);
        };
    });

    document.getElementById('btn-apply-time').onclick = () => {
        if (editSelectedTime > 0) {
            timers.blanca = editSelectedTime;
            timers.negra = editSelectedTime;
            timePerPlayer = editSelectedTime;
        }
        incrementSecs = parseInt(editIncSlider.value);
        updateTimerDisplay();
        editTimeModal.style.display = 'none';
        stopBlink();
        timerPaused = false;
        startTimer();
    };

    document.getElementById('btn-quit-time').onclick = () => {
        stopTimer();
        gameMode = 'sin-tiempo';
        document.querySelector('.timers-col').style.display = 'none';
        editTimeModal.style.display = 'none';
        timerPaused = false;
    };

    // --- MODAL CRÉDITOS ---
    const creditsModal = document.getElementById("credits-modal");
    document.getElementById("open-credits").onclick = () => {
        creditsModal.style.display = "block";
        pauseWithBlink();
    };
    document.getElementById("close-credits").onclick = () => {
        creditsModal.style.display = "none";
        resumeFromBlink();
    };
    creditsModal.onclick = (e) => {
        if (e.target === creditsModal) {
            creditsModal.style.display = "none";
            resumeFromBlink();
        }
    };

    // --- MODAL CÓMO MOVER ---
    const howToModal = document.getElementById("how-to-modal");
    const pdfCanvas = document.getElementById("pdf-canvas");
    const pdfCtx = pdfCanvas.getContext("2d");
    const pdfPageInfo = document.getElementById("pdf-page-info");
    const pdfPrev = document.getElementById("pdf-prev");
    const pdfNext = document.getElementById("pdf-next");
    const pdfError = document.getElementById("pdf-error");

    let pdfDoc = null, pdfPage = 1, pdfLoaded = false, renderTask = null;

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    async function renderPage(num) {
        if (renderTask) renderTask.cancel();
        const page = await pdfDoc.getPage(num);
        const scale = pdfCanvas.parentElement.clientWidth / page.getViewport({ scale: 1 }).width * 0.46;
        const viewport = page.getViewport({ scale });
        pdfCanvas.width = viewport.width;
        pdfCanvas.height = viewport.height;
        renderTask = page.render({ canvasContext: pdfCtx, viewport });
        await renderTask.promise;
        pdfPageInfo.textContent = `${num} / ${pdfDoc.numPages}`;
        pdfPrev.disabled = num <= 1;
        pdfNext.disabled = num >= pdfDoc.numPages;
    }

    async function loadPDF() {
        if (pdfLoaded) return;
        pdfError.style.display = "none";
        pdfPageInfo.textContent = "Cargando...";
        try {
            const PDF_PATH = "./assets/como_mover_las_piezas.pdf?v=" + Date.now();
            pdfDoc = await pdfjsLib.getDocument(PDF_PATH).promise;
            pdfLoaded = true;
            await renderPage(pdfPage);
        } catch (err) {
            pdfError.style.display = "block";
            pdfError.textContent = `Error: no se encontró el PDF en assets/como_mover_las_piezas.pdf`;
            pdfPageInfo.textContent = "— / —";
        }
    }

    function closePdfModal() {
        howToModal.style.display = "none";
        pdfPage = 1; pdfLoaded = false; pdfDoc = null;
        pdfCtx.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
        pdfPageInfo.textContent = "1 / 1";
    }

    document.getElementById("open-how-to").onclick = async () => {
        howToModal.style.display = "block";
        pauseWithBlink();
        await loadPDF();
    };
    document.getElementById("close-how-to").onclick = () => {
        closePdfModal();
        resumeFromBlink();
    };
    howToModal.onclick = (e) => {
        if (e.target === howToModal) {
            closePdfModal();
            resumeFromBlink();
        }
    };
    pdfPrev.onclick = async () => { if (pdfPage > 1) { pdfPage--; await renderPage(pdfPage); } };
    pdfNext.onclick = async () => { if (pdfDoc && pdfPage < pdfDoc.numPages) { pdfPage++; await renderPage(pdfPage); } };
});
