import { storeToRefs } from "pinia";
import { store } from "../stores";

const logic = (animate: "to" | "ft" | "none") => {
  //after click() and move()
  const { blockes, dom } = storeToRefs(store());
  for (let i = 0; i <= 14; i++) {
    blockes.value[i].animate(dom.value[i], animate);
  }
};

export const reStart = async (delay = true) => {
  if (delay) {
    await new Promise((r) => {
      setTimeout(() => r(true), 3500);
    });
  }
  const { blockes, table,empty,step } = storeToRefs(store());
  let i = 0;
  a: while (true) {
    i++;
    const y = Math.floor(Math.random() * 4),
      x = Math.floor(Math.random() * 4);
    if (y!=empty.value.y&&x!=empty.value.x) {
      i--;
      continue
    }
    if (table.value[y][x].num) {
      table.value[y][x].click("none");
    }
    if (i > 100) {
      for (let i = 0; i <= 14; i++) {
        if (blockes.value[i].check()) continue a;
      }
      logic("to");
      
      break a;
    }
  }
  step.value=0
};
export default logic;
