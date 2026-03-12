/**
 * useSketchCanvas — Dessin libre 2D sur canvas HTML natif
 * Singleton de module : état partagé entre SketchCanvas.vue et la sidebar
 */
import { ref } from 'vue'

export type SketchTool = 'pencil' | 'eraser'

// ─── État singleton ──────────────────────────────────────────────────────────
let canvasEl: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let isPointerDown = false
const history: ImageData[] = []
let historyIndex = -1
const MAX_HISTORY = 30

const currentTool = ref<SketchTool>('pencil')
const brushSize = ref(6)
const brushColor = ref('#000000')
const canUndo = ref(false)
const canRedo = ref(false)

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

// ─── Composable ──────────────────────────────────────────────────────────────
export function useSketchCanvas() {
  const initCanvas = (el: HTMLCanvasElement) => {
    canvasEl = el
    ctx = el.getContext('2d')!

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      const snapshot = historyIndex >= 0 ? history[historyIndex] : null
      el.width = Math.max(width, 1)
      el.height = Math.max(height, 1)
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
    isPointerDown = true
    const { x, y } = getPos(e)
    const size =
      currentTool.value === 'eraser' ? brushSize.value * 4 : brushSize.value
    ctx.beginPath()
    ctx.arc(x, y, size / 2, 0, Math.PI * 2)
    ctx.fillStyle =
      currentTool.value === 'eraser' ? '#ffffff' : brushColor.value
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: PointerEvent) => {
    if (!ctx || !canvasEl || !isPointerDown) return
    const { x, y } = getPos(e)
    const size =
      currentTool.value === 'eraser' ? brushSize.value * 4 : brushSize.value
    ctx.lineTo(x, y)
    ctx.strokeStyle =
      currentTool.value === 'eraser' ? '#ffffff' : brushColor.value
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDraw = () => {
    if (!isPointerDown) return
    isPointerDown = false
    ctx?.beginPath()
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

  return {
    currentTool,
    brushSize,
    brushColor,
    canUndo,
    canRedo,
    initCanvas,
    startDraw,
    draw,
    stopDraw,
    undo,
    redo,
    clear,
    exportPNG,
  }
}
