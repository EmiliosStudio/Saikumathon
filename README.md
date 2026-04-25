# Saikumathon - Aplicación de Escritorio

Evolución del ajedrez en un tablero 10x10.

## Requisitos previos

- **Node.js** (v16 o superior): [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)

## Instalación

1. Abre una terminal en esta carpeta
2. Instala las dependencias:

```bash
npm install
```

## Probar en modo desarrollo

```bash
npm start
```

Esto abrirá la aplicación Electron sin compilar.

## Compilar a ejecutable

### Windows (.exe portable)

```bash
npm run build:win
```

El archivo `.exe` estará en la carpeta `dist/`.
Es un **ejecutable portable** — no necesita instalación, solo doble clic.

### macOS (.dmg)

```bash
npm run build:mac
```

### Linux (.AppImage)

```bash
npm run build:linux
```

### Compilar para todas las plataformas

```bash
npm run build:all
```

## Estructura del proyecto

```
saikumathon/
├── main.js              # Punto de entrada de Electron
├── package.json         # Configuración del proyecto
├── index.html           # Interfaz del juego
├── style.css            # Estilos
├── script.js            # Lógica del juego
├── assets/              # Recursos (piezas, sonidos, iconos, banderas, manuales)
├── tableros/            # Imágenes del tablero
└── dist/                # Carpeta de salida (se crea al compilar)
```

## Iconos de la aplicación

Para que el .exe tenga un icono personalizado, necesitas crear:

- **Windows**: `assets/icon.ico` (256x256 píxeles, formato .ico)
- **macOS**: `assets/icon.icns` (puedes usar una herramienta online para convertir .png a .icns)
- **Linux**: `assets/icon.png` (512x512 píxeles)

Puedes usar el logo del juego (`logo.png`) y convertirlo a estos formatos con herramientas como:
- https://convertio.co/es/png-ico/
- https://cloudconvert.com/png-to-icns

## Notas importantes

1. **Tamaño del ejecutable**: El .exe pesa ~150-200 MB porque incluye Chromium (el motor de Electron). Es normal.

2. **Primera ejecución**: En Windows puede aparecer un aviso de SmartScreen. Es normal en apps sin firma digital. El usuario debe hacer clic en "Más información" → "Ejecutar de todos modos".

3. **Firma digital** (opcional avanzado): Para evitar el aviso de SmartScreen, necesitas un certificado de firma de código (cuesta dinero). Para uso personal no hace falta.

4. **PDFs**: Los manuales (`manual_espanol.pdf`, `manual_ingles.pdf`) deben estar en `assets/manuales/`.

5. **Banderas**: Las imágenes de las banderas (`es.png`, `en.png`) deben estar en `assets/flags/`.

## Solución de problemas

### "npm install" falla
- Asegúrate de tener Node.js instalado
- Ejecuta como administrador (Windows) o con `sudo` (Linux/Mac)

### El .exe no abre
- Verifica que todas las carpetas `assets/` y `tableros/` estén completas
- Comprueba que los archivos de audio, imágenes y PDFs existan

### Los sonidos no funcionan
- Asegúrate de que la carpeta `assets/sounds/` contiene todos los .mp3

## Distribución

El archivo `.exe` generado es **portable** y **standalone**:
- No necesita instalación
- Contiene todos los archivos necesarios
- Se puede copiar a un USB y ejecutar en cualquier PC con Windows

Puedes compartirlo directamente, subirlo a Google Drive, o distribuirlo como quieras.

---

**Creado por Emilio's Studio - 2026**
