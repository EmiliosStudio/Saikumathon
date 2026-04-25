// =============================================
// SISTEMA DE IDIOMAS
// =============================================
const TRANSLATIONS = {
    es: {
        subtitle:           'Elige entre...',
        sinTiempo:          'Jugar sin tiempo',
        conTiempo:          'Jugar con tiempo',
        tiempoPersonalizado:'Tiempo personalizado:',
        incremento:         'Incremento',
        girarTablero:       'Girar el tablero cada turno',
        empezar:            'Empezar',
        editarTiempoBtn:    'Editar<br>tiempo',
        ponerTiempoBtn:     'Poner<br>tiempo',
        editarTiempoModal:  'Editar tiempo',
        ponerTiempoModal:   'Poner tiempo',
        tiempo:             'Tiempo',
        personalizado:      'Personalizado:',
        aplicar:            'Aplicar',
        quitarTiempo:       'Quitar tiempo',
        comoMover:          'Cómo mover',
        creditos:           'Créditos',
        webOficial:         'Web oficial',
        cambiarIdioma:      'Cambiar idioma',
        volverMenu:         'Volver al menú',
        officialWebTitle:   'Ir a la web oficial',
        officialWebMessage: 'Va a ir a la web oficial del Saikumathon. ¿Desea ir?',
        officialWebContinue:'Continuar',
        officialWebCancel:  'Cancelar',
        changeLangTitle:    'Cambiar idioma',
        backMenuMsg:        '¿Seguro que quieres ir a la pantalla de idioma del principio? Si cambias, perderás toda tu partida, y no podrá ser recuperada.',
        backMenuConfirm:    'Cambiar',
        backMenuCancel:     'Cancelar',
        deshacer:           'Deshacer',
        reanudar:           'Reanudar',
        pausar:             'Pausar',
        welcomeText:        'Bienvenido al <strong>Saikumathon</strong>, una evolución del ajedrez en un campo de <strong>10x10</strong>, en el que desde un peón más veloz, hasta el perro guardián, una pieza que defiende todo el reinado.',
        wipText:            'Todavía está por construirse.',
        creditsList: [
            ['Idea', "Emilio's Studio"],
            ['Texto', 'Emiliosans Regular, Sans Serif'],
            ['Diseño tablero', "Emilio's Studio"],
            ['Programación juego', 'Google Gemini y Claude'],
            ['Diseño piezas', "Gemini y Emilio's Studio"],
            ['Traducción inglés', "Emilio's Studio con Deepl Translator"]
        ],
        creditsTitle:       'Créditos',
        pdfPath:            './assets/manuales/manual_espanol.pdf',
        pdfError:           'Error: no se encontró el PDF en assets/manuales/manual_espanol.pdf',
        pdfLoading:         'Cargando...',
        gameoverTimeout:    (winner) => `¡Tiempo agotado!\n${winner} ganan.`,
        gameoverMate:       (winner) => `¡Jaque mate!\n${winner} ganan.`,
        gameoverDraw:       '¡Ahogado!\nTablas.',
        winnerBlack:        'Negras',
        winnerWhite:        'Blancas',
        timeError:          'Error. Selecciona un tiempo más alto o empieza una nueva partida.',
        gameoverVolverMenu:  'Volver al menú',
        gameoverRevisar:     'Revisar partida',
        reviewCounter:       (n, total) => `${n} de ${total} movimiento${total !== 1 ? 's' : ''}`,
    },
    en: {
        subtitle:           'Choose from...',
        sinTiempo:          'Play without time',
        conTiempo:          'Play with time',
        tiempoPersonalizado:'Personalised time:',
        incremento:         'Increase',
        girarTablero:       'Turn the board over every turn',
        empezar:            'Start',
        editarTiempoBtn:    'Edit<br>time',
        ponerTiempoBtn:     'Set<br>time',
        editarTiempoModal:  'Edit time',
        ponerTiempoModal:   'Set time',
        tiempo:             'Time',
        personalizado:      'Custom:',
        aplicar:            'Apply',
        quitarTiempo:       'Remove time',
        comoMover:          'How to move',
        creditos:           'Credits',
        webOficial:         'Official website',
        cambiarIdioma:      'Change language',
        volverMenu:         'Back to menu',
        officialWebTitle:   'Go to official website',
        officialWebMessage: 'You are about to visit the official Saikumathon website. Do you want to proceed?',
        officialWebContinue:'Continue',
        officialWebCancel:  'Cancel',
        changeLangTitle:    'Change language',
        backMenuMsg:        'Are you sure you want to go back to the language screen? If you change, you will lose your entire game and it cannot be recovered.',
        backMenuConfirm:    'Change',
        backMenuCancel:     'Cancel',
        deshacer:           'Undo',
        reanudar:           'Resume',
        pausar:             'Pause',
        welcomeText:        'Welcome to the <strong>Saikumathon</strong>, an evolution of chess played on a <strong>10x10</strong> board, featuring everything from a faster pawn to the guardian dog, a piece that defends the entire kingdom.',
        wipText:            'It has yet to be built...',
        creditsList: [
            ['Idea', "Emilio's Studio"],
            ['Font', 'Emiliosans Regular, Sans Serif'],
            ['Board design', "Emilio's Studio"],
            ['Game programming', 'Google Gemini & Claude'],
            ['Piece design', "Gemini & Emilio's Studio"],
            ['English translation', "Emilio's Studio with Deepl Translator"]
        ],
        creditsTitle:       'Credits',
        pdfPath:            './assets/manuales/manual_ingles.pdf',
        pdfError:           'Error: PDF not found at assets/manuales/manual_ingles.pdf',
        pdfLoading:         'Loading...',
        gameoverTimeout:    (winner) => `Time's up!\n${winner} win.`,
        gameoverMate:       (winner) => `Checkmate!\n${winner} win.`,
        gameoverDraw:       'Stalemate!\nDraw.',
        winnerBlack:        'Black',
        winnerWhite:        'White',
        timeError:          'Error. Select a higher time or start a new game.',
        gameoverVolverMenu:  'Back to menu',
        gameoverRevisar:     'Review game',
        reviewCounter:       (n, total) => `${n} of ${total} move${total !== 1 ? 's' : ''}`,
    }
};

let currentLang = 'es';

function t(key) {
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS['es'][key] || key;
}

// Ajusta el font-size de todos los .lang-label-fit para que el texto
// ocupe el ancho de la bandera, usando el mismo tamaño en todos.
function fitLangLabels() {
    const labels = document.querySelectorAll('.lang-label-fit');
    if (!labels.length) return;
    // Obtener el ancho de referencia de la primera bandera visible
    const firstFlag = document.querySelector('.flag-img');
    const targetWidth = firstFlag ? firstFlag.offsetWidth || 110 : 110;
    if (targetWidth === 0) return; // aún no visible

    let minSize = 999;
    labels.forEach(label => {
        const text = label.dataset.langtext || label.textContent;
        // Buscar el font-size que hace que el texto mida exactamente targetWidth
        let lo = 8, hi = 60, size = 16;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            ctx.font = `${mid}px Emiliosans, sans-serif`;
            const w = ctx.measureText(text).width;
            if (w < targetWidth) { size = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        minSize = Math.min(minSize, size);
    });
    labels.forEach(label => {
        label.style.fontSize = minSize + 'px';
    });
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = TRANSLATIONS[currentLang][key];
        if (val !== undefined) el.textContent = val;
    });
    // Welcome & wip (tienen HTML)
    const wt = document.getElementById('welcome-text');
    const wi = document.getElementById('wip-text');
    if (wt) wt.innerHTML = t('welcomeText');
    if (wi) wi.textContent = t('wipText');
    // Créditos
    const cl = document.getElementById('credits-list');
    const ct = document.getElementById('credits-title');
    if (ct) ct.textContent = t('creditsTitle');
    if (cl) {
        cl.innerHTML = '';
        t('creditsList').forEach(([label, val]) => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>· ${label}:</strong> ${val}`;
            cl.appendChild(p);
        });
    }
    // Modal cambiar idioma
    const clt = document.getElementById('change-lang-title');
    if (clt) clt.textContent = t('changeLangTitle');
    // Modal volver al menú
    const bmm = document.getElementById('back-menu-msg');
    if (bmm) bmm.textContent = t('backMenuMsg');
    const bmc = document.getElementById('btn-confirm-back');
    if (bmc) bmc.textContent = t('backMenuConfirm');
    const bmcan = document.getElementById('btn-cancel-back');
    if (bmcan) bmcan.textContent = t('backMenuCancel');
    // Botones fin partida
    const bgm = document.getElementById('btn-gameover-menu');
    if (bgm) bgm.textContent = t('gameoverVolverMenu');
    const bgr = document.getElementById('btn-gameover-review');
    if (bgr) bgr.textContent = t('gameoverRevisar');
    const brm = document.getElementById('btn-review-menu');
    if (brm) brm.textContent = t('gameoverVolverMenu');
    // Ajustar tamaño de texto de las banderas para que encajen igual
    fitLangLabels();
}

// =============================================
// FIN SISTEMA DE IDIOMAS
// =============================================

document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById('board');
    const ASSETS_URL = "./assets/";

    // --- SELECCIÓN DE IDIOMA ---
    // Ajustar texto inicial de banderas
    requestAnimationFrame(() => fitLangLabels());

    document.getElementById('btn-lang-es').onclick = () => {
        currentLang = 'es';
        document.getElementById('lang-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'flex';
        applyTranslations();
    };
    document.getElementById('btn-lang-en').onclick = () => {
        currentLang = 'en';
        document.getElementById('lang-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'flex';
        applyTranslations();
    };

    // --- SONIDOS ---
    const sounds = {
        error: new Audio(`${ASSETS_URL}sounds/error.mp3`),
        captura: new Audio(`${ASSETS_URL}sounds/capturar.mp3`),
        jaque: new Audio(`${ASSETS_URL}sounds/jaque.mp3`),
        mover: new Audio(`${ASSETS_URL}sounds/mover.mp3`),
        empezar: new Audio(`${ASSETS_URL}sounds/empezar.mp3`),
        fin: new Audio(`${ASSETS_URL}sounds/fin.mp3`)
    };

    // --- ESTADO DEL JUEGO ---
    let currentPlayer = 'blanca';
    let selectedPiece = null;
    let possibleMoves = [];
    const boardState = Array(10).fill(null).map(() => Array(10).fill(null));
    const pawnMoved = Array(10).fill(null).map(() => Array(10).fill(false));
    let moveHistory = [];
    let gameReviewHistory = []; // copia completa al final de la partida para revisar
    let timerPaused = false;
    let rotateBoard = false;
    const kingMoved = { blanca: false, negra: false };
    const rookMoved = { blanca: false, negra: false };

    // --- CONFIG DE PARTIDA ---
    let gameMode = 'sin-tiempo';
    let timePerPlayer = 0;
    let incrementSecs = 0;
    let timers = { blanca: 0, negra: 0 };
    let timerInterval = null;

    // --- PIEZAS CAPTURADAS ---
    const captured = { blanca: [], negra: [] }; // capturadas POR ese color
    const pieceOrder = ["torre", "caballo", "perro", "alfil", "rey", "dama", "alfil", "perro", "caballo", "torre"];
    const captureOrder = ['peon', 'perro', 'caballo', 'alfil', 'torre', 'dama', 'rey'];

    function renderCaptured() {
        ['blanca', 'negra'].forEach(color => {
            const el = document.getElementById(`captured-${color}`);
            el.innerHTML = '';
            const sorted = [...captured[color]].sort((a, b) =>
                captureOrder.indexOf(a) - captureOrder.indexOf(b)
            );
            const enemy = color === 'blanca' ? 'negra' : 'blanca';
            sorted.forEach(type => {
                const img = document.createElement('img');
                img.src = `${ASSETS_URL}${enemy}-${type}.png`;
                img.className = 'captured-piece';
                el.appendChild(img);
            });
        });
    }

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
                const winner = currentPlayer === 'blanca' ? t('winnerBlack') : t('winnerWhite');
                showGameOver(t('gameoverTimeout')(winner));
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
        stopSilentTimer();
        timerPaused = true;
        sounds.fin.play();

        // Guardar copia del historial completo para revisar (incluir estado final)
        gameReviewHistory = moveHistory.map(s => ({
            board: s.board.map(r => r.map(c => c ? {...c} : null)),
            captured: { blanca: [...s.captured.blanca], negra: [...s.captured.negra] },
            moveMeta: s.moveMeta ? {...s.moveMeta} : null
        }));
        // Añadir el estado actual (último movimiento)
        gameReviewHistory.push({
            board: boardState.map(r => r.map(c => c ? {...c} : null)),
            captured: { blanca: [...captured.blanca], negra: [...captured.negra] },
            moveMeta: null // estado final, no hay movimiento nuevo
        });

        const modal = document.getElementById('gameover-modal');
        document.getElementById('gameover-msg').textContent = msg;
        document.getElementById('btn-gameover-menu').textContent = t('gameoverVolverMenu');
        document.getElementById('btn-gameover-review').textContent = t('gameoverRevisar');
        // Sin cierre al hacer clic fuera — no añadir onclick al modal
        setTimeout(() => { modal.style.display = 'block'; }, 200);
    }

    function checkGameOver() {
        if (!hasLegalMoves(currentPlayer, boardState)) {
            if (isKingInCheck(currentPlayer, boardState)) {
                const winner = currentPlayer === 'blanca' ? t('winnerBlack') : t('winnerWhite');
                showGameOver(t('gameoverMate')(winner));
            } else {
                showGameOver(t('gameoverDraw'));
            }
        }
    }

    // --- REVISAR PARTIDA ---
    let reviewIndex = 0;
    const COL_LETTERS = ['a','b','c','d','e','f','g','h','i','j'];

    // Nombres de piezas para el historial
    const PIECE_NAMES = {
        es: { peon:'peón', caballo:'caballo', alfil:'alfil', torre:'torre', dama:'dama', rey:'rey', perro:'perro' },
        en: { peon:'pawn', caballo:'knight', alfil:'bishop', torre:'rook', dama:'queen', rey:'king', perro:'dog' }
    };

    function pieceLabel(type) {
        return (PIECE_NAMES[currentLang] || PIECE_NAMES.es)[type] || type;
    }

    // Calcular icono para cada movimiento.
    // snapBefore = gameReviewHistory[idx-1] (estado antes del movimiento)
    // snapAfter  = gameReviewHistory[idx]   (estado después del movimiento)
    // meta       = snapBefore.moveMeta      (datos del movimiento)
    const PIECE_VALUE = { peon:1, perro:2, caballo:3, alfil:3, torre:5, dama:9, rey:99 };
    function getMoveIcon(meta, snapBefore, snapAfter) {
        if (!meta || !snapBefore || !snapAfter) return null;
        if (meta.isCastling) return 'bien'; // enroque = buena jugada siempre

        const colorJugador = meta.pieceColor;
        const capAntes = snapBefore.captured[colorJugador].length;
        const capDespues = snapAfter.captured[colorJugador].length;

        if (capDespues > capAntes) {
            // Capturó algo
            const capturada = snapAfter.captured[colorJugador][capDespues - 1];
            const valCapturada = PIECE_VALUE[capturada] || 1;
            const valPropia = PIECE_VALUE[meta.pieceType] || 1;
            if (valCapturada >= valPropia) return 'bien';
            if (valCapturada >= valPropia - 1) return 'regular';
            return 'mal';
        }
        // Movimiento sin captura: regular por defecto
        return 'regular';
    }

    function openReview() {
        document.getElementById('gameover-modal').style.display = 'none';
        document.getElementById('review-modal').style.display = 'flex';
        reviewIndex = 0;
        buildMoveHistoryList();
        renderReviewStep(reviewIndex);
    }

    function buildMoveHistoryList() {
        const list = document.getElementById('review-move-list');
        list.innerHTML = '';
        const total = gameReviewHistory.length - 1;

        // Construir todas las filas desde el principio,
        // pero invisibles — se revelan en renderReviewStep según el paso activo
        let moveNum = 1;
        for (let i = 1; i <= total; i += 2) {
            const row = document.createElement('div');
            row.className = 'review-history-row';

            const numEl = document.createElement('span');
            numEl.className = 'review-history-num';
            numEl.textContent = moveNum + '.';

            // Movimiento blancas (paso i)
            const wMeta = gameReviewHistory[i - 1]?.moveMeta; // moveMeta está en snapshot ANTERIOR al estado
            const wEl = document.createElement('span');
            wEl.className = 'review-history-move review-history-hidden';
            wEl.dataset.step = i;
            wEl.dataset.revealAt = i;
            if (wMeta) {
                wEl.textContent = `${pieceLabel(wMeta.pieceType)} ${COL_LETTERS[wMeta.toCol]}${10 - wMeta.toRow}`;
            }

            // Movimiento negras (paso i+1)
            const bMeta = gameReviewHistory[i]?.moveMeta;
            const bEl = document.createElement('span');
            bEl.className = 'review-history-move review-history-hidden';
            bEl.dataset.step = i + 1;
            bEl.dataset.revealAt = i + 1;
            if (bMeta) {
                bEl.textContent = `${pieceLabel(bMeta.pieceType)} ${COL_LETTERS[bMeta.toCol]}${10 - bMeta.toRow}`;
            }

            [wEl, bEl].forEach(el => {
                el.onclick = () => {
                    const step = parseInt(el.dataset.step);
                    if (step <= total && !el.classList.contains('review-history-hidden')) {
                        reviewIndex = step;
                        renderReviewStep(reviewIndex);
                    }
                };
            });

            row.appendChild(numEl);
            row.appendChild(wEl);
            row.appendChild(bEl);
            list.appendChild(row);
            moveNum++;
        }
    }

    function renderReviewStep(idx) {
        const snap = gameReviewHistory[idx];
        if (!snap) return;
        const total = gameReviewHistory.length - 1;

        // El movimiento que PRODUJO el estado idx fue guardado en gameReviewHistory[idx-1].moveMeta
        const lastMeta = idx > 0 ? gameReviewHistory[idx - 1]?.moveMeta : null;
        // Para el icono: snapBefore = idx-1, snapAfter = idx
        const iconStr = idx > 0
            ? getMoveIcon(lastMeta, gameReviewHistory[idx - 1], gameReviewHistory[idx])
            : null;

        // Dibujar tablero
        const reviewBoard = document.getElementById('review-board');
        reviewBoard.innerHTML = '';

        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const sq = document.createElement('div');
                sq.className = 'square';
                sq.style.position = 'relative';

                // Resaltar casilla destino del último movimiento
                const isLastDest = lastMeta && !lastMeta.isCastling
                    && r === lastMeta.toRow && c === lastMeta.toCol;
                if (isLastDest) sq.classList.add('review-last-move');

                const p = snap.board[r][c];
                if (p) {
                    const img = document.createElement('img');
                    img.src = `${ASSETS_URL}${p.color}-${p.type}.png`;
                    img.className = 'piece';
                    sq.appendChild(img);
                }

                // Icono de jugada: se pone en la esquina sup-der de la casilla destino
                if (isLastDest && iconStr) {
                    const badge = document.createElement('img');
                    badge.src = `${ASSETS_URL}icons/${iconStr}.png`;
                    badge.className = 'review-move-badge';
                    sq.appendChild(badge);
                }

                reviewBoard.appendChild(sq);
            }
        }

        // Piezas capturadas
        ['blanca', 'negra'].forEach(color => {
            const el = document.getElementById(`review-captured-${color}`);
            el.innerHTML = '';
            const enemy = color === 'blanca' ? 'negra' : 'blanca';
            const sorted = [...snap.captured[color]].sort((a, b) =>
                captureOrder.indexOf(a) - captureOrder.indexOf(b));
            sorted.forEach(type => {
                const img = document.createElement('img');
                img.src = `${ASSETS_URL}${enemy}-${type}.png`;
                img.className = 'captured-piece';
                el.appendChild(img);
            });
        });

        // Contador
        document.getElementById('review-counter').textContent =
            idx === 0
                ? (currentLang === 'es' ? 'Posición inicial' : 'Initial position')
                : t('reviewCounter')(idx, total);

        // Botones nav
        document.getElementById('btn-review-prev').disabled = idx <= 0;
        document.getElementById('btn-review-next').disabled = idx >= total;

        // Resaltar fila activa en historial, revelar movimientos hasta idx, y hacer scroll
        document.querySelectorAll('.review-history-move').forEach(el => {
            const revealAt = parseInt(el.dataset.revealAt);
            const step = parseInt(el.dataset.step);
            // Mostrar sólo si ya hemos llegado a ese paso
            if (revealAt <= idx) {
                el.classList.remove('review-history-hidden');
            } else {
                el.classList.add('review-history-hidden');
            }
            el.classList.toggle('review-history-active', step === idx);
        });
        const activeEl = document.querySelector(`.review-history-move[data-step="${idx}"]`);
        if (activeEl) activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function setupDrag(square, r, c) {
        const img = square.querySelector('.piece');
        if (!img) return;

        // HTML5 drag (escritorio)
        img.draggable = true;
        img.addEventListener('dragstart', (e) => {
            const p = boardState[r][c];
            if (!p || p.color !== currentPlayer) { e.preventDefault(); return; }
            if (timerPaused) resumeFromBlink();
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
            // Limpiar dragging de TODAS las piezas — doble limpieza para evitar piezas difuminadas
            document.querySelectorAll('.piece.dragging').forEach(el => el.classList.remove('dragging'));
            setTimeout(() => {
                document.querySelectorAll('.piece.dragging').forEach(el => el.classList.remove('dragging'));
            }, 50);
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
            document.querySelectorAll('.piece.dragging').forEach(el => el.classList.remove('dragging'));
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
            // Enroque: mostrar indicador en la casilla donde irá el rey (col 1), pero guardar isCastling
            if (!isSimulation && !kingMoved[color] && !rookMoved[color]) {
                const rookRow = color === 'blanca' ? 9 : 0;
                const rook = board[rookRow][0];
                if (rook && rook.type === 'torre' && rook.color === color) {
                    if (!board[rookRow][1] && !board[rookRow][2] && !board[rookRow][3]) {
                        // El indicador aparece en col 1 (donde irá el rey), pero marcamos isCastling
                        moves.push({ row: rookRow, col: 1, isCastling: true, isCapture: false });
                    }
                }
            }
        }
        return moves;
    }

    // --- MOVER PIEZA ---
    function movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = boardState[fromRow][fromCol];
        const isCap = boardState[toRow][toCol] !== null;
        const capturedPiece = boardState[toRow][toCol];

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
            timers: { ...timers },
            captured: { blanca: [...captured.blanca], negra: [...captured.negra] },
            kingMoved: { ...kingMoved },
            rookMoved: { ...rookMoved },
            // Metadatos del movimiento para revisión
            moveMeta: {
                pieceType: piece.type,
                pieceColor: piece.color,
                fromRow, fromCol, toRow, toCol,
                isCastling: false // se actualiza abajo si es enroque
            }
        });

        // Detectar enroque ANTES de registrar captura
        const castlingMove = possibleMoves.find(m => m.row === toRow && m.col === toCol && m.isCastling);

        if (capturedPiece && !castlingMove) captured[currentPlayer].push(capturedPiece.type);

        if (castlingMove) {
            moveHistory[moveHistory.length - 1].moveMeta.isCastling = true;
            const rookRow = currentPlayer === 'blanca' ? 9 : 0;
            boardState[rookRow][0] = null;
            boardState[rookRow][fromCol] = null;
            boardState[rookRow][1] = piece;       // rey a col 1
            boardState[rookRow][2] = { type: 'torre', color: currentPlayer }; // torre a col 2
            kingMoved[currentPlayer] = true;
            rookMoved[currentPlayer] = true;
            rebuildBoard();
        } else {
            if (piece.type === 'rey') kingMoved[currentPlayer] = true;
            if (piece.type === 'torre' && fromCol === 0) rookMoved[currentPlayer] = true;
            boardState[toRow][toCol] = piece;
            boardState[fromRow][fromCol] = null;
            const toSq = document.querySelector(`.square[data-row='${toRow}'][data-col='${toCol}']`);
            const img = document.querySelector(`.square[data-row='${fromRow}'][data-col='${fromCol}'] .piece`);
            img.classList.remove('dragging'); // fix: evitar que quede difuminada
            toSq.innerHTML = '';
            toSq.appendChild(img);
            setupDrag(toSq, toRow, toCol);
            const fromSq = document.querySelector(`.square[data-row='${fromRow}'][data-col='${fromCol}']`);
            setupDrag(fromSq, fromRow, fromCol);
        }
        renderCaptured();

        const enemy = currentPlayer === 'blanca' ? 'negra' : 'blanca';
        if (isKingInCheck(enemy, boardState)) sounds.jaque.play();
        else if (isCap && !castlingMove) sounds.captura.play();
        else sounds.mover.play();

        clearIndicators();
        selectedPiece = null;
        // Asegurar que no parpadea al pasar el turno
        stopBlink();

        if (gameMode === 'con-tiempo') {
            timers[currentPlayer] += incrementSecs;
            stopTimer();
        } else {
            stopSilentTimer();
        }
        currentPlayer = enemy;

        // Rotación del tablero
        if (rotateBoard) {
            document.getElementById('board-col').classList.toggle('rotated', currentPlayer === 'negra');
        }

        if (gameMode === 'con-tiempo') {
            startTimer();
            updateTimerDisplay();
        } else {
            startSilentTimer();
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
            if (timerPaused) resumeFromBlink();
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
        document.getElementById('custom-time-input').value = '';
        btnEmpezar.classList.add('visible');
    };

    btnConTiempo.onclick = () => {
        gameMode = 'con-tiempo';
        btnConTiempo.classList.add('active');
        btnSinTiempo.classList.remove('active');
        timeOptions.classList.remove('time-options-disabled');
        document.getElementById('custom-time-input').value = '';
        selectedTime = 0;
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        btnEmpezar.classList.remove('visible');
    };

    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedTime = parseInt(btn.dataset.time);
            timePerPlayer = selectedTime;
            document.getElementById('custom-time-input').value = '';
            if (gameMode === 'con-tiempo') btnEmpezar.classList.add('visible');
        };
    });

    document.getElementById('custom-time-input').oninput = (e) => {
        let val = Math.floor(parseFloat(e.target.value));
        if (isNaN(val) || val < 1) return;
        if (val > 60) val = 60;
        e.target.value = val;
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        selectedTime = val * 60;
        timePerPlayer = selectedTime;
        if (gameMode === 'con-tiempo') btnEmpezar.classList.add('visible');
    };

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
        applyTranslations();

        const timersCol = document.querySelector('.timers-col');
        timersCol.style.display = 'flex'; // Siempre visible
        silentTimers = { blanca: 0, negra: 0 };
        if (gameMode === 'con-tiempo') {
            timers.blanca = timePerPlayer;
            timers.negra = timePerPlayer;
            updateTimerDisplay();
            startTimer();
        } else {
            startSilentTimer();
        }
        updateSidebarForMode();
        createBoard();
        moveHistory.length = 0;
        gameReviewHistory.length = 0;
        reviewIndex = 0;
        captured.blanca = [];
        captured.negra = [];
        renderCaptured();
        rotateBoard = document.getElementById('chk-rotate').checked;
        kingMoved.blanca = false; kingMoved.negra = false;
        rookMoved.blanca = false; rookMoved.negra = false;
        document.getElementById('board-col').classList.remove('rotated');
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
        captured.blanca = [...snap.captured.blanca];
        captured.negra = [...snap.captured.negra];
        if (snap.kingMoved) { kingMoved.blanca = snap.kingMoved.blanca; kingMoved.negra = snap.kingMoved.negra; }
        if (snap.rookMoved) { rookMoved.blanca = snap.rookMoved.blanca; rookMoved.negra = snap.rookMoved.negra; }
        stopTimer();
        timerPaused = false;
        if (gameMode === 'con-tiempo') { startTimer(); updateTimerDisplay(); }
        selectedPiece = null; possibleMoves = [];
        rebuildBoard();
        renderCaptured();
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

    // Tiempo silencioso para modo sin-tiempo
    let silentTimers = { blanca: 0, negra: 0 };
    let silentInterval = null;

    function startSilentTimer() {
        if (silentInterval) clearInterval(silentInterval);
        silentInterval = setInterval(() => {
            silentTimers[currentPlayer]++;
        }, 1000);
    }

    function stopSilentTimer() {
        if (silentInterval) { clearInterval(silentInterval); silentInterval = null; }
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
        // En modo sin-tiempo también abre el modal (para "Poner tiempo")
        if (gameMode === 'con-tiempo') pauseWithBlink();
        editSelectedTime = 0;
        editIncSlider.value = incrementSecs;
        editIncValue.textContent = incrementSecs + 's';
        document.querySelectorAll('#edit-time-grid .time-btn').forEach(b => b.classList.remove('active'));
        // Cambiar título y texto del modal según el modo
        const modalTitle = document.getElementById('edit-time-modal-title');
        if (gameMode === 'sin-tiempo') {
            modalTitle.textContent = t('ponerTiempoModal');
            document.getElementById('btn-quit-time').style.display = 'none';
        } else {
            modalTitle.textContent = t('editarTiempoModal');
            document.getElementById('btn-quit-time').style.display = '';
        }
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
            document.getElementById('edit-custom-time-input').value = '';
        };
    });

    document.getElementById('edit-custom-time-input').oninput = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) return;
        if (val > 60) { val = 60; e.target.value = 60; }
        document.querySelectorAll('#edit-time-grid .time-btn').forEach(b => b.classList.remove('active'));
        editSelectedTime = val * 60;
    };

    let errorTimeout = null;
    document.getElementById('btn-apply-time').onclick = () => {
        const errEl = document.getElementById('edit-time-error');
        if (editSelectedTime > 0) {
            // Calcular tiempo ya gastado (real o silencioso)
            const tiempoGastado = gameMode === 'con-tiempo'
                ? timePerPlayer - Math.min(timers.blanca, timers.negra)
                : Math.max(silentTimers.blanca, silentTimers.negra);

            if (tiempoGastado >= editSelectedTime) {
                if (errorTimeout) clearTimeout(errorTimeout);
                errEl.textContent = t('timeError');
                errEl.style.opacity = "1";
                errorTimeout = setTimeout(() => {
                    errEl.style.opacity = "0";
                    errEl.textContent = '';
                }, 7000);
                return;
            }

            if (gameMode === 'sin-tiempo') {
                // Activar modo con tiempo
                gameMode = 'con-tiempo';
                const nuevoRestante = editSelectedTime - tiempoGastado;
                timers.blanca = nuevoRestante;
                timers.negra = nuevoRestante;
                timePerPlayer = editSelectedTime;
                stopSilentTimer();
                // Mostrar timers
                document.getElementById('timer-negra').style.visibility = 'visible';
                document.getElementById('timer-blanca').style.visibility = 'visible';
                // Actualizar botón
                document.getElementById('btn-edit-time').innerHTML = t('editarTiempoBtn');
                updateSidebarForMode();
            } else {
                const nuevoRestante = editSelectedTime - tiempoGastado;
                timers.blanca = nuevoRestante;
                timers.negra = nuevoRestante;
                timePerPlayer = editSelectedTime;
            }
        }
        incrementSecs = parseInt(editIncSlider.value);
        errEl.textContent = '';
        errEl.style.opacity = "0";
        updateTimerDisplay();
        editTimeModal.style.display = 'none';
        stopBlink();
        timerPaused = false;
        startTimer();
    };

    function updateSidebarForMode() {
        const editBtn = document.getElementById('btn-edit-time');
        const playBtn = document.getElementById('btn-play');
        const pauseBtn = document.getElementById('btn-pause');
        const timerNegra = document.getElementById('timer-negra');
        const timerBlanca = document.getElementById('timer-blanca');
        if (gameMode === 'sin-tiempo') {
            editBtn.innerHTML = t('ponerTiempoBtn');
            playBtn.style.visibility = 'hidden';
            pauseBtn.style.visibility = 'hidden';
            timerNegra.style.visibility = 'hidden';
            timerBlanca.style.visibility = 'hidden';
        } else {
            editBtn.innerHTML = t('editarTiempoBtn');
            playBtn.style.visibility = 'visible';
            pauseBtn.style.visibility = 'visible';
            timerNegra.style.visibility = 'visible';
            timerBlanca.style.visibility = 'visible';
        }
    }

    document.getElementById('btn-quit-time').onclick = () => {
        stopTimer();
        gameMode = 'sin-tiempo';
        silentTimers = { blanca: 0, negra: 0 };
        startSilentTimer();
        editTimeModal.style.display = 'none';
        timerPaused = false;
        updateSidebarForMode();
    };

    // --- MODAL CAMBIAR IDIOMA ---
    const changeLangModal = document.getElementById('change-lang-modal');
    document.getElementById('open-change-lang').onclick = () => {
        pauseWithBlink();
        applyTranslations(); // refrescar títulos
        fitLangLabels();
        changeLangModal.style.display = 'block';
    };
    document.getElementById('close-change-lang').onclick = () => {
        changeLangModal.style.display = 'none';
        resumeFromBlink();
    };
    changeLangModal.onclick = (e) => {
        if (e.target === changeLangModal) {
            changeLangModal.style.display = 'none';
            resumeFromBlink();
        }
    };
    // Botones de idioma dentro del modal
    document.getElementById('modal-btn-lang-es').onclick = () => {
        currentLang = 'es';
        changeLangModal.style.display = 'none';
        resumeFromBlink();
        applyTranslations();
        updateSidebarForMode();
    };
    document.getElementById('modal-btn-lang-en').onclick = () => {
        currentLang = 'en';
        changeLangModal.style.display = 'none';
        resumeFromBlink();
        applyTranslations();
        updateSidebarForMode();
    };

    // --- MODAL VOLVER AL MENÚ ---
    const backMenuModal = document.getElementById('back-menu-modal');
    document.getElementById('open-back-menu').onclick = () => {
        pauseWithBlink();
        applyTranslations();
        backMenuModal.style.display = 'block';
    };
    document.getElementById('close-back-menu').onclick = () => {
        backMenuModal.style.display = 'none';
        resumeFromBlink();
    };
    backMenuModal.onclick = (e) => {
        if (e.target === backMenuModal) {
            backMenuModal.style.display = 'none';
            resumeFromBlink();
        }
    };
    document.getElementById('btn-cancel-back').onclick = () => {
        backMenuModal.style.display = 'none';
        resumeFromBlink();
    };
    document.getElementById('btn-confirm-back').onclick = () => {
        // Detener todo y volver a la pantalla de idioma
        stopTimer();
        stopSilentTimer();
        backMenuModal.style.display = 'none';
        document.getElementById('game-header').style.display = 'none';
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('game-footer').style.display = 'none';
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('lang-screen').style.display = 'flex';
        // Resetear estado de partida
        moveHistory.length = 0;
        gameReviewHistory.length = 0;
        reviewIndex = 0;
        captured.blanca = []; captured.negra = [];
        timerPaused = false;
        gameMode = 'sin-tiempo';
        requestAnimationFrame(() => fitLangLabels());
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

    // --- MODAL WEB OFICIAL ---
    const officialWebModal = document.getElementById("official-web-modal");
    const officialWebUrl = "https://emiliostudio.wixsite.com/saikumathon";
    
    document.getElementById("open-official-web").onclick = () => {
        document.getElementById("official-web-title").textContent = t('officialWebTitle');
        document.getElementById("official-web-message").textContent = t('officialWebMessage');
        document.getElementById("btn-official-web-continue").textContent = t('officialWebContinue');
        document.getElementById("btn-official-web-cancel").textContent = t('officialWebCancel');
        officialWebModal.style.display = "block";
        pauseWithBlink();
    };
    
    document.getElementById("btn-official-web-continue").onclick = () => {
        window.open(officialWebUrl, '_blank');
        officialWebModal.style.display = "none";
        resumeFromBlink();
    };
    
    document.getElementById("btn-official-web-cancel").onclick = () => {
        officialWebModal.style.display = "none";
        resumeFromBlink();
    };
    
    officialWebModal.onclick = (e) => {
        if (e.target === officialWebModal) {
            officialWebModal.style.display = "none";
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
        pdfPageInfo.textContent = t('pdfLoading');
        try {
            const PDF_PATH = t('pdfPath') + "?v=" + Date.now();
            pdfDoc = await pdfjsLib.getDocument(PDF_PATH).promise;
            pdfLoaded = true;
            await renderPage(pdfPage);
        } catch (err) {
            pdfError.style.display = "block";
            pdfError.textContent = t('pdfError');
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

    // --- BOTONES FIN DE PARTIDA ---
    document.getElementById('btn-gameover-menu').onclick = () => {
        document.getElementById('gameover-modal').style.display = 'none';
        document.getElementById('review-modal').style.display = 'none';
        stopTimer(); stopSilentTimer();
        document.getElementById('game-header').style.display = 'none';
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('game-footer').style.display = 'none';
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('lang-screen').style.display = 'flex';
        moveHistory.length = 0; gameReviewHistory.length = 0;
        captured.blanca = []; captured.negra = [];
        timerPaused = false; gameMode = 'sin-tiempo';
        requestAnimationFrame(() => fitLangLabels());
    };

    document.getElementById('btn-gameover-review').onclick = () => openReview();

    // --- MODAL REVISAR PARTIDA ---
    document.getElementById('btn-review-prev').onclick = () => {
        if (reviewIndex > 0) { reviewIndex--; renderReviewStep(reviewIndex); }
    };
    document.getElementById('btn-review-next').onclick = () => {
        if (reviewIndex < gameReviewHistory.length - 1) { reviewIndex++; renderReviewStep(reviewIndex); }
    };
    document.getElementById('btn-review-menu').onclick = () => {
        document.getElementById('review-modal').style.display = 'none';
        stopTimer(); stopSilentTimer();
        document.getElementById('game-header').style.display = 'none';
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('game-footer').style.display = 'none';
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('lang-screen').style.display = 'flex';
        moveHistory.length = 0; gameReviewHistory.length = 0;
        captured.blanca = []; captured.negra = [];
        timerPaused = false; gameMode = 'sin-tiempo';
        requestAnimationFrame(() => fitLangLabels());
    };
});
