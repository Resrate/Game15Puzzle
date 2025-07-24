<style scoped>
* {
  position: absolute;
  text-align: center;
  width: 100%;
  height: auto;
  z-index: 30;
  color: rgba(255, 255, 255, 0.65);
  font-size: 200%;
}
#white {
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
}
#win {
  font-family: "楷体";
  font-size: 500%;
  top: 10%;
}
#time {
  top: 55%;
}
#tick {
  top: 63%;
}
</style>

<template>
  <Transition @enter="obj.white.animate">
    <div id="white" v-if="obj.white.show" ref="black">&nbsp;</div>
  </Transition>
  <Transition @enter="obj.win.animate">
    <div id="win" v-show="obj.white.show">
      <h1>{{ result }}</h1>
    </div>
  </Transition>
  <Transition @enter="obj.time.animate">
    <div id="time" v-show="obj.white.show">
      完成度:{{ Math.floor(finish) }}%, 步数:{{ Math.floor(steps) }}
    </div>
  </Transition>
  <Transition @enter="obj.tick.animate">
    <div id="tick" v-show="obj.white.show" @click="click">
      单击此处即可重新开始游戏
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import gsap from "gsap";
import { storeToRefs } from "pinia";
import { store } from "../stores";
import { reStart } from "../ts/logic";

const { blockes, step } = storeToRefs(store());
const black = ref<HTMLElement>();
const click = () => {
  gsap
    .fromTo(black.value!, { opacity: 1 }, { opacity: 0, duration: 1 })
    .then(() => {
      show.value = false;
      reStart(false);
    });
};
let finishes = 100,
  result = ref("胜利"),
  show = ref(false),
  flag = true;
watch(
  step,
  () => {
    flag = true;
    for (const block of blockes.value) {
      if (!block.check() && block.num) {
        flag = false;
        break;
      }
    }
    if (flag) show.value = true;
  },
  { deep: true }
);
const finish = ref(0),
  steps = ref(0);
type GSAPTweenTarget = string | Element | Element[] | object;
const obj = reactive({
  white: {
    show: show,
    animate: (vDom: GSAPTweenTarget, done: () => void) => {
      return gsap.from(vDom, {
        opacity: 0,
        duration: 1,
        onComplete: done,
      });
    },
  },
  win: {
    show: show,
    animate: (vDom: GSAPTweenTarget, done: () => void) => {
      return gsap.from(vDom, {
        opacity: 0,
        duration: 2,
        y: -1000,
        ease: "bounce.out",
        onComplete: done,
      });
    },
  },
  time: {
    show: show,
    animate: (vDom: GSAPTweenTarget, done: () => void) => {
      gsap.to(steps, {
        duration: 2.3,
        ease: "power1.out",
        value: step.value,
      });
      gsap.to(finish, {
        duration: 2.3,
        ease: "power1.out",
        value: finishes,
      });
      return gsap.from(vDom, {
        opacity: 0,
        y: window.innerHeight,
        duration: 0.7,
        onComplete: done,
      });
    },
  },
  tick: {
    show: show,
    animate: (vDom: GSAPTweenTarget, done: () => void) => {
      return gsap.from(vDom, {
        opacity: 0,
        duration: 4,
        ease: "power4.in",
        onComplete: done,
      });
    },
  },
});
</script>
