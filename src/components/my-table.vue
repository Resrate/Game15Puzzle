<style scoped>
.buttom {
  position: absolute;
  padding: 0px 0px;
  border: #857c71 solid 2px;
  border-radius: 8px;
  z-index: 0;
  width: 330px;
  height: 330px;
  left: 14px;
  top: 14px;
  scale: 0;
}
</style>

<template>
  <div class="buttom" ref="buttom"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
const buttom = ref<HTMLElement>();
onMounted(() => {
  gsap.to(buttom.value!, {
    scale: 1,
    duration: 0.8,
  });
  gsap.to(buttom.value!, {
    backgroundColor: "#cdc1b4",
    boxShadow:
      "inset -4px -4px 0 rgba(255, 255, 255, 0.4),inset 2px 2px 0 rgba(0, 0, 0, 0.2)",
    duration: 1,
    ease: "power1.out",
    delay: 0.5,
  });
});
</script>
