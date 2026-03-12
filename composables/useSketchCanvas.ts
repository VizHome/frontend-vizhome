/**
 * useSketchCanvas — Dessin libre 2D sur canvas HTML natif
 * Singleton de module : état partagé entre SketchCanvas.vue et la sidebar
 *
 * Outils : pencil | eraser | line | rect | circle | fill | eyedropper
 */
import { ref } from 'vue'

export type SketchTool =
  | 'pencil'
  | 'eraser'
  | 'line'
  | 'rect'
  | 'circle'
  | 'fill'
  | 'eyedropper'

// ─── État singleton ──────────────────────────────────────────────────────────
let canvasEl: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null

// Canvas overlay pour la preview des formes en cours de tracé
let overlayEl: HTMLCanvasElement | null = null
let overlayCtx: CanvasRenderingContext2D | null = null

let isPointerDown = false
let startX = 0
let startY = 0
const history: ImageData[] = []
let historyIndex = -1
const MAX_HISTORY = 30

const currentTool = ref<SketchTool>('pencil')
const brushSize = ref(6)
const brushColor = ref('#000000')
const brushOpacity = ref(1)
const fillShape = ref(false)
const canUndo = ref(false)
const canRedo = ref(false)
const eyedropperColor = ref('#000000')

// ─── Helpers internes ────────────────────────────────────────────────────────
function saveSnapshot() {
  if (!ctx || !canvasEl) return
  history.splice(historyIndex + 1)
  history.push(ctx.getImageData(0, 0, canvasEl.width, canvasEl.height))
  if (history.length > MAX_HISTORY) history.shift()
  historyIndex = history.length - 1
  canUndo.value = historyIndex > 0
  canRedo.value = false
}

function getPos(e: PointerEvent): { x: number; y: number } {
  const rect = canvasEl!.getBoundingClientRect()
  return {
    x: (e.clientX - rect.left) * (canvasEl!.width / rect.width),
    y: (e.clientY - rect.top) * (canvasEl!.height / rect.height),
  }
}

function applyContextStyle(context: CanvasRenderingContext2D, forFill = false) {
  context.globalAlpha = brushOpacity.value
  context.strokeStyle = brushColor.value
  context.fillStyle = brushColor.value
  context.lineWidth = brushSize.value
  context.lineCap = 'round'
  context.lineJoin = 'round'
  if (forFill) {
    context.globalCompositeOperation = 'source-over'
  }
}

/** Flood fill algorithmique (scanline) */
function floodFill(startX: number, startY: number, fillColorHex: string) {
  if (!ctx || !canvasEl) return
  const width = canvasEl.width
  const height = canvasEl.height
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  const toIdx = (x: number, y: number) => (y * width + x) * 4

  const targetIdx = toIdx(Math.floor(startX), Math.floor(startY))
  const targetR = data[targetIdx] ?? 0
  const targetG = data[targetIdx + 1] ?? 0
  const targetB = data[targetIdx + 2] ?? 0
  const targetA = data[targetIdx + 3] ?? 255

  // Parser la couleur hex en RGBA
  const hex = fillColorHex.replace('#', '')
  const fillR = parseInt(hex.slice(0, 2), 16)
  const fillG = parseInt(hex.slice(2, 4), 16)
  const fillB = parseInt(hex.slice(4, 6), 16)
  const fillA = Math.round(255 * brushOpacity.value)

  // Si la couleur cible = couleur de remplissage, ne rien faire
  if (
    targetR === fillR &&
    targetG === fillG &&
    targetB === fillB &&
    targetA === fillA
  )
    return

  const tolerance = 30
  const matches = (idx: number) => {
    return (
      Math.abs((data[idx] ?? 0) - targetR) <= tolerance &&
      Math.abs((data[idx + 1] ?? 0) - targetG) <= tolerance &&
      Math.abs((data[idx + 2] ?? 0) - targetB) <= tolerance &&
      Math.abs((data[idx + 3] ?? 255) - targetA) <= tolerance
    )
  }

  const stack: [number, number][] = [[Math.floor(startX), Math.floor(startY)]]
  const visited = new Uint8Array(width * height)

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!
    if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue
    const vi = cy * width + cx
    if (visited[vi]) continue
    visited[vi] = 1
    const idx = toIdx(cx, cy)
    if (!matches(idx)) continue

    data[idx] = fillR
    data[idx + 1] = fillG
    data[idx + 2] = fillB
    data[idx + 3] = fillA

    stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1])
  }

  ctx.putImageData(imageData, 0, 0)
}

/** Redessine la forme preview sur le canvas overlay */
function drawShapePreview(ex: number, ey: number) {
  if (!overlayCtx || !overlayEl) return
  overlayCtx.clearRect(0, 0, overlayEl.width, overlayEl.height)
  applyContextStyle(overlayCtx)

  const x = Math.min(startX, ex)
  const y = Math.min(startY, ey)
  const w = Math.abs(ex - startX)
  const h = Math.abs(ey - startY)

  overlayCtx.beginPath()

  if (currentTool.value === 'line') {
    overlayCtx.moveTo(startX, startY)
    overlayCtx.lineTo(ex, ey)
    overlayCtx.stroke()
  } else if (currentTool.value === 'rect') {
    if (fillShape.value) {
      overlayCtx.fillRect(x, y, w, h)
    }
    overlayCtx.strokeRect(x, y, w, h)
  } else if (currentTool.value === 'circle') {
    const rx = w / 2
    const ry = h / 2
    const cx = x + rx
    const cy = y + ry
    overlayCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
    if (fillShape.value) overlayCtx.fill()
    overlayCtx.stroke()
  }
}

/** Valide la forme sur le canvas principal */
function commitShape(ex: number, ey: number) {
  if (!ctx || !canvasEl) return
  applyContextStyle(ctx)

  const x = Math.min(startX, ex)
  const y = Math.min(startY, ey)
  const w = Math.abs(ex - startX)
  const h = Math.abs(ey - startY)

  ctx.beginPath()

  if (currentTool.value === 'line') {
    ctx.moveTo(startX, startY)
    ctx.lineTo(ex, ey)
    ctx.stroke()
  } else if (currentTool.value === 'rect') {
    if (fillShape.value) ctx.fillRect(x, y, w, h)
    ctx.strokeRect(x, y, w, h)
  } else if (currentTool.value === 'circle') {
    const rx = w / 2
    const ry = h / 2
    const cx2 = x + rx
    const cy2 = y + ry
    ctx.ellipse(cx2, cy2, rx, ry, 0, 0, Math.PI * 2)
    if (fillShape.value) ctx.fill()
    ctx.stroke()
  }

  // Nettoyer l'overlay
  if (overlayCtx && overlayEl) {
    overlayCtx.clearRect(0, 0, overlayEl.width, overlayEl.height)
  }
  ctx.globalAlpha = 1
}

// ─── Composable ──────────────────────────────────────────────────────────────
export function useSketchCanvas() {
  const initCanvas = (el: HTMLCanvasElement, overlay?: HTMLCanvasElement) => {
    canvasEl = el
    ctx = el.getContext('2d')!

    if (overlay) {
      overlayEl = overlay
      overlayCtx = overlay.getContext('2d')!
    }

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      const snapshot = historyIndex >= 0 ? history[historyIndex] : null
      el.width = Math.max(width, 1)
      el.height = Math.max(height, 1)
      if (overlayEl) {
        overlayEl.width = el.width
        overlayEl.height = el.height
      }
      // Fond blanc
      ctx!.fillStyle = '#ffffff'
      ctx!.fillRect(0, 0, el.width, el.height)
      if (snapshot) ctx!.putImageData(snapshot, 0, 0)
    }

    resize()
    history.length = 0
    historyIndex = -1
    saveSnapshot()

    const observer = new ResizeObserver(resize)
    observer.observe(el)
  }

  const startDraw = (e: PointerEvent) => {
    if (!ctx || !canvasEl) return
    const { x, y } = getPos(e)
    startX = x
    startY = y
    isPointerDown = true

    if (currentTool.value === 'eyedropper') {
      const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data
      const hex =
        '#' +
        [pixel[0], pixel[1], pixel[2]]
          .map(v => (v ?? 0).toString(16).padStart(2, '0'))
          .join('')
      brushColor.value = hex
      eyedropperColor.value = hex
      currentTool.value = 'pencil'
      return
    }

    if (currentTool.value === 'fill') {
      floodFill(x, y, brushColor.value)
      saveSnapshot()
      return
    }

    if (currentTool.value === 'pencil' || currentTool.value === 'eraser') {
      applyContextStyle(ctx)
      const size =
        currentTool.value === 'eraser' ? brushSize.value * 4 : brushSize.value
      ctx.globalAlpha = currentTool.value === 'eraser' ? 1 : brushOpacity.value
      ctx.beginPath()
      ctx.arc(x, y, size / 2, 0, Math.PI * 2)
      ctx.fillStyle =
        currentTool.value === 'eraser' ? '#ffffff' : brushColor.value
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
    // Pour line/rect/circle : on attend pointermove/pointerup
  }

  const draw = (e: PointerEvent) => {
    if (!ctx || !canvasEl || !isPointerDown) return
    const { x, y } = getPos(e)

    if (currentTool.value === 'pencil' || currentTool.value === 'eraser') {
      const size =
        currentTool.value === 'eraser' ? brushSize.value * 4 : brushSize.value
      ctx.globalAlpha = currentTool.value === 'eraser' ? 1 : brushOpacity.value
      ctx.lineTo(x, y)
      ctx.strokeStyle =
        currentTool.value === 'eraser' ? '#ffffff' : brushColor.value
      ctx.lineWidth = size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else if (
      currentTool.value === 'line' ||
      currentTool.value === 'rect' ||
      currentTool.value === 'circle'
    ) {
      drawShapePreview(x, y)
    }
  }

  const stopDraw = (e: PointerEvent) => {
    if (!isPointerDown) return
    isPointerDown = false
    const { x, y } = getPos(e)

    if (
      currentTool.value === 'line' ||
      currentTool.value === 'rect' ||
      currentTool.value === 'circle'
    ) {
      commitShape(x, y)
    }

    ctx?.beginPath()
    ctx && (ctx.globalAlpha = 1)
    saveSnapshot()
  }

  const undo = () => {
    if (!ctx || !canvasEl || historyIndex <= 0) return
    historyIndex--
    const snap = history[historyIndex]
    if (snap) ctx.putImageData(snap, 0, 0)
    canUndo.value = historyIndex > 0
    canRedo.value = true
  }

  const redo = () => {
    if (!ctx || !canvasEl || historyIndex >= history.length - 1) return
    historyIndex++
    const snap = history[historyIndex]
    if (snap) ctx.putImageData(snap, 0, 0)
    canUndo.value = true
    canRedo.value = historyIndex < history.length - 1
  }

  const clear = () => {
    if (!ctx || !canvasEl) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height)
    saveSnapshot()
  }

  const exportPNG = () => {
    if (!canvasEl) return
    const link = document.createElement('a')
    link.download = `sketch-${Date.now()}.png`
    link.href = canvasEl.toDataURL('image/png')
    link.click()
  }

  /** Retourne le contenu du canvas en base64 PNG (pour envoi à l'IA). */
  const getCanvasDataURL = (): string | null => {
    if (!canvasEl) return null
    return canvasEl.toDataURL('image/png')
  }

  return {
    currentTool,
    brushSize,
    brushColor,
    brushOpacity,
    fillShape,
    canUndo,
    canRedo,
    eyedropperColor,
    initCanvas,
    startDraw,
    draw,
    stopDraw,
    undo,
    redo,
    clear,
    exportPNG,
    getCanvasDataURL,
  }
}
