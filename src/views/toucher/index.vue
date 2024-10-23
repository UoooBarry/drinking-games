<template>
  <div ref="container" class="user-select-none touch-area">
    <div
      class="fixed inset-0 flex items-center justify-center bg-black dark:bg-gray-900 user-select-none"
      @mousedown.prevent="handlePressStart"
      @mouseup="handlePressEnd"
      @touchstart.prevent="handleTouch"
      @touchend="handleTouch"
    >
      <div
        v-for="(ripple, index) in ripples"
        :key="index"
        :style="{
          top: `${ripple.y}px`,
          left: `${ripple.x}px`,
          backgroundColor: ripple.color,
        }"
        class="absolute rounded-full opacity-50"
        :class="{
          'ripple-effect': stage === 'counting',
          'ripple-no-effect': stage !== 'counting',
          'scale-up': ripple.selected,
        }"
      ></div>
    </div>
    <button
      v-if="stage === 'init'"
      class="absolute bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 border-2 border-gray-900 dark:border-gray-100 text-vertical writing-mode-vertical-lr hover:bg-gray-300 dark:hover:bg-gray-700 h-40 w-16"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10;"
      @click="handleButtonPress"
      @touchend="handleButtonPress"
      @touchstart.stop.prevent
    >
      Touch Me
    </button>
    <button
      v-if="stage === 'pause'"
      class="absolute bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 border-2 border-gray-900 dark:border-gray-100 text-vertical writing-mode-vertical-lr hover:bg-gray-300 dark:hover:bg-gray-700 h-40 w-16"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10;"
      @click="resetGame"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ripples = ref<
  { id: number; x: number; y: number; color: string; selected?: boolean }[]
>([]);
const currentRippleId = ref<number | null>(null); // 记录当前按住的光圈ID
const container = ref<HTMLElement | null>(null);
const stage = ref<"init" | "counting" | "beforeReset" | "pause">("init");

const getRandomColor = () => {
  const colors = [
    "#FF5733", // 红色
    "#33FF57", // 绿色
    "#3357FF", // 蓝色
    "#F333FF", // 紫色
    "#FF33F3", // 粉色
    "#33FFF3", // 青色
    "#F3FF33", // 黄色
    "#FF9933", // 橙色
    "#9933FF", // 深紫色
    "#33FF99", // 浅绿色
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
let rippleId = 0;
const generateRippleId = () => {
  rippleId += 1;
  return rippleId;
};
const handlePressStart = (event: MouseEvent | TouchEvent) => {
  const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
  const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

  // 获取点击位置
  const rect = container.value?.getBoundingClientRect();
  const x = clientX - (rect?.left ?? 0);
  const y = clientY - (rect?.top ?? 0);

  const color = getRandomColor();
  // 生成唯一ID并添加光圈
  const newRippleId = generateRippleId();
  ripples.value.push({
    id: newRippleId,
    x,
    y,
    color,
  });

  // 保存当前光圈ID
  currentRippleId.value = newRippleId;
};

const handleTouch = (event: TouchEvent) => {
  if (stage.value === "init") {
    ripples.value = Array.from(event.touches).map((touch) => {
      const newRippleId = generateRippleId();
      const color = getRandomColor();
      return {
        id: newRippleId,
        x: touch.clientX,
        y: touch.clientY,
        color,
      };
    });
  }
  if (stage.value === "beforeReset" || stage.value === "counting") {
    stage.value = "pause";
  }
};

const resetGame = () => {
  currentRippleId.value = null;
  ripples.value = [];
  stage.value = "init";
};

const handlePressEnd = () => {
  if (currentRippleId.value !== null) {
    ripples.value = ripples.value.filter(
      (ripple) => ripple.id !== currentRippleId.value,
    );
    currentRippleId.value = null; // 重置当前ID
  }
  if (stage.value === "beforeReset") {
    stage.value = "pause";
  }
};

// 悬浮按钮按下时，随机选中一个光圈
const handleButtonPress = () => {
  stage.value = "counting";
  if (ripples.value.length === 0) {
    stage.value = "init";
    return;
  }

  // 随机选取一个光圈
  const randomIndex = Math.floor(Math.random() * ripples.value.length);
  const selectedRipple = ripples.value[randomIndex];

  // 开始倒计时5秒
  setTimeout(() => {
    // 保留被选中的光圈，清除其他的光圈
    selectedRipple.selected = true;
    ripples.value = ripples.value.filter(
      (ripple) => ripple.id === selectedRipple.id,
    );
    stage.value = "beforeReset";
  }, 5000);
};
</script>

<style scoped>
.text-vertical {
  writing-mode: vertical-lr;
}
/* 光圈动画 */
@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1);
}
/* 光圈脉动动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}

.ripple-effect {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.7;
  animation: pulse 1.5s infinite ease-in-out;
}

.ripple-no-effect {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.7;
}

.user-select-none {
  user-select: none;
  -webkit-user-select: none; /* Chrome, Safari, Opera */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

* {
  -webkit-touch-callout: none;

  /* iOS Safari */
  -webkit-user-select: none;

  /* Safari */
  -khtml-user-select: none;

  /* Konqueror HTML */
  -moz-user-select: none;

  /* Firefox */
  -ms-user-select: none;

  /* Internet Explorer/Edge */
  user-select: none;

  /* Non-prefixed version, currently supported by Chrome and Opera */
}
.scale-up {
  width: 200px;
  height: 200px;
}

.touch-area {
  touch-action: none;
}
</style>
