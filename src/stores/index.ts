import { defineStore } from "pinia";
import { Block } from "../ts/bace";
import { computed, ref } from "vue";

export const store = defineStore("15Puzzle", () => {
  const blockes = ref(
    Array.from(
      { length: 16 },
      (_, index) =>
        new Block(
          index + 1,
          { x: index % 4, y: Math.floor(index / 4) },
          { x: index % 4, y: Math.floor(index / 4) }
        )
    )
  );
  const empty = ref({x:3,y:3});
  blockes.value[15]=new Block(0,empty.value,empty.value)
  const table = computed(() => {
    const arr = Array.from({length:4},()=>Array.from({length:4},()=>({} as Block)));
    for (const block of blockes.value) {
      arr[block.from.y][block.from.x] = block;
    }
    return arr;
  });
  const dom=ref<HTMLElement[]>([])
  const step=ref(0)
  return { blockes, table ,empty,dom,step};
});
