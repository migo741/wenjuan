<template>
  <div
    ref="containerRef"
    class="magnifier-container"
    @pointerenter="onEnter"
    @pointerleave="onLeave"
    @pointermove="onMove"
  >
    <img
      ref="imgRef"
      :src="src"
      :alt="alt"
      class="magnifier-img"
      @load="onImgLoad"
    />

    <div v-show="visible && ready" class="magnifier-lens" :style="lensStyle" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type Props = {
  src: string
  alt?: string
  zoom?: number
  lensSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'image',
  zoom: 2,
  lensSize: 160,
})

/** refs */
const imgRef = ref<HTMLImageElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

/** 状态 */
const visible = ref(false)
const ready = ref(false)

/** 鼠标坐标 */
const x = ref(0)
const y = ref(0)

/** rAF 节流 */
let frame = 0
let lastEvent: PointerEvent | null = null

function updatePosition(e: PointerEvent) {
  if (!imgRef.value) return

  const rect = imgRef.value.getBoundingClientRect()

  x.value = e.clientX - rect.left
  y.value = e.clientY - rect.top
}

function onMove(e: PointerEvent) {
  lastEvent = e

  if (frame) return

  frame = requestAnimationFrame(() => {
    if (lastEvent) updatePosition(lastEvent)
    frame = 0
  })
}

function onEnter() {
  visible.value = true
}

function onLeave() {
  visible.value = false
}

function onImgLoad() {
  ready.value = true
}

/** clamp */
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(v, max))
}

/** lens style */
const lensStyle = computed(() => {
  const img = imgRef.value
  if (!img || !ready.value) return {}

  const lens = props.lensSize
  const half = lens / 2

  /** 边界限制 */
  const cx = clamp(x.value, half, img.clientWidth - half)
  const cy = clamp(y.value, half, img.clientHeight - half)

  /** 关键：natural size */
  const bgX = cx * props.zoom - half
  const bgY = cy * props.zoom - half

  return {
    left: `${cx - half}px`,
    top: `${cy - half}px`,
    width: `${lens}px`,
    height: `${lens}px`,
    backgroundImage: `url(${img.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${img.naturalWidth * props.zoom}px ${img.naturalHeight * props.zoom}px`,
    backgroundPosition: `-${bgX}px -${bgY}px`,
  }
})
</script>

<style scoped>
.magnifier-container {
  position: relative;
  display: inline-block;
}

.magnifier-img {
  display: block;
  max-width: 100%;
}

.magnifier-lens {
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  pointer-events: none;
  border: 2px solid #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  will-change: transform;
}
</style>
