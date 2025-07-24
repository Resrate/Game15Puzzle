<style scoped>
#sd div {
  background-color: #beb1a0;
  width: 80px;
  height: 50%;
  font-size: large;
}
#sd {
  margin-top: 10px;
  margin-left: 10px;
  float: right;
  border: #857c71 solid 2px;
  border-radius: 3px;
}
</style>

<template>
  <div id="sd">
    <div>{{ props.name }}</div>
    <div ref="value" v-if="props.name=='步数'">{{ Math.floor(num.value) }}</div>
    <div ref="value" v-else>{{ Math.floor(num.value) }}%</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import gsap from "gsap";
import { storeToRefs } from "pinia";
import { store } from "../stores";
const value = ref<HTMLElement>();
const { blockes ,step} = storeToRefs(store());
const props = defineProps<{
  name: "完成度" | "步数";
}>();
let values = ref<number>(0);
watch(step, () => {
  let sum=0
  for (const block of blockes.value) {
    if(block.check()) sum++
  }
  values.value = props.name == "完成度" ? sum/15*100 : step.value;
},{deep:true});
let num = reactive({
  value: 0,
});
watch(
  values,
  (newValue) => {
    gsap.to(num, {
      value: newValue,
      ease: "power1.out",
      duration: 0.7,
    });
  }
);
</script>
