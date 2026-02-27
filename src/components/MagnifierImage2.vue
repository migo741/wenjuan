<template>
  <div
    class="magnifier-container"
    @mousemove="handleMouseMove"
    @mouseenter="showMagnifier = true"
    @mouseleave="showMagnifier = false"
  >
    <img ref="imgRef" :src="src" :alt="alt" />
    <div v-show="showMagnifier" class="magnifier" :style="magnifierStyle"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
type Props = {
  src: string
  alt?: string
  height?: number
  scale?: number
  magnifierSize?: number
}
const props = withDefaults(defineProps<Props>(), {
  alt: '图片',
  height: 480,
  scale: 1.5,
  magnifierSize: 150,
})
const mouseX = ref(0)
const mouseY = ref(0)
const imgRef = ref<HTMLImageElement | null>(null)
const showMagnifier = ref(false)
let frame = 0
let lastEvent: MouseEvent | null = null

const updateMouse = (e: MouseEvent) => {
  if (!imgRef.value) return
  const rect = imgRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}
const handleMouseMove = (e: MouseEvent) => {
  lastEvent = e
  if (frame) return
  frame = requestAnimationFrame(() => {
    if (lastEvent) updateMouse(lastEvent)
    frame = 0
  })
}

const magnifierStyle = computed(() => {
  if (!imgRef.value) return {}
  const img = imgRef.value
  const bgX = mouseX.value * props.scale - props.magnifierSize / 2
  const bgY = mouseY.value * props.scale - props.magnifierSize / 2
  return {
    left: `${mouseX.value - props.magnifierSize / 2}px`,
    top: `${mouseY.value - props.magnifierSize / 2}px`,
    height: `${props.magnifierSize}px`,
    width: `${props.magnifierSize}px`,
    backgroundImage: `url(${img.src})`,
    backgroundSize: `${props.scale * img.width}px ${props.scale * img.height}px`,
    backgroundPosition: `${-bgX}px ${-bgY}px`,
  }
})
</script>

<style scoped>
.magnifier-container {
  position: relative;
}
.magnifier {
  position: absolute;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-repeat: no-repeat;
  pointer-events: none;
}
</style>
