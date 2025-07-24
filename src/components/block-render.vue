<style scoped>
.move {
  z-index: 10;
  color: #776e65;
  font-weight: bolder;
  font-size: 30px;
  text-align: center;
  line-height: 81px;
  background-color: #eee4da;
  width: 78px;
  height: 78px;
  position: absolute;
  margin: 0px 0px;
  padding: 0px 0px;
  border-radius: 7px;
  border: #857c71 solid 1px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: inset -2.5px -2.5px 0 rgba(0, 0, 0, 0.2),
    inset 4px 4px 0 rgba(255, 255, 255, 0.4);
}
</style>

<template>
  <div class="move" ref="block" v-for="dom in blockes" v-show="dom.num">
    {{ dom.num }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { store } from "../stores";
import { onMounted, ref } from "vue";
import gsap from "gsap/all";
import { useEventListener } from "@vueuse/core";
import { reStart } from "../ts/logic";

const { blockes,dom,step} = storeToRefs(store());
const block = ref<HTMLElement[]>([]);
onMounted(() => {
  dom.value=block.value!;
  reStart()
  for (let i = 0; i <= 14; i++) {
    useEventListener(block.value[i], "click", () => {
      blockes.value[i].click("ft");
      step.value++
    });
    const a = gsap.fromTo(
      block.value![i],
      {
        scale: 0,
        opacity: 0,
        x: blockes.value[i].to.x * 80 + 12,
        y: blockes.value[i].to.y * 80 + 12,
      },
      {
        scale: 1,
        opacity: 1,
        delay: (blockes.value[i].to.x + blockes.value[i].to.y) * 0.1 + 2,
      }
    );
    const b = gsap.to(block.value![i], {
      x: blockes.value[i].to.x * 80 + 20,
      y: blockes.value[i].to.y * 80 + 20,
    });
    gsap.timeline().add(a).add(b);
  }
});
</script>
