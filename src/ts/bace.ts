import gsap from "gsap";
import { storeToRefs } from "pinia";
import { store } from "../stores";
import logic from "./logic";
export class Block {
  constructor(
    public num: number,
    public from: { x: number; y: number },
    public to: { x: number; y: number },
  ) {}
  get positionFrom() {
    return { x: this.from.x * 80 + 20, y: this.from.y * 80 + 20 };
  }
  get positionTo() {
    return {
      x: this.to.x * 80 + 20,
      y: this.to.y * 80 + 20,
      duration:0.5
    };
  }
  check(){
    if (this.num==this.to.y*4+this.to.x+1) return true
    return false
  }
  animate(dom:HTMLElement,animate:"to"|"ft"|"none") {
    if(animate!="none") gsap.to(dom,this.positionTo);
    this.from.x = this.to.x;
    this.from.y = this.to.y;
  }
  click(animate:"to"|"ft"|"none") {
    const { empty} = storeToRefs(store());
    let flag = false;
    if (empty.value.x == this.from.x) {
      flag = true;
      const delta = empty.value.y - this.from.y,
        direction = delta / Math.abs(delta);
      this.move(0, direction);
    }
    if (empty.value.y == this.from.y) {
      flag = true;
      const delta = empty.value.x - this.from.x,
        direction = delta / Math.abs(delta);
      this.move(direction, 0);
    }
    if (flag) {
      empty.value.x = this.from.x;
      empty.value.y = this.from.y;
      logic(animate);
    }
  }
  move(deltaX: number, deltaY: number) {
    // console.log("move:", this.num);
    const { table } = storeToRefs(store());
    this.to.x += deltaX;
    this.to.y += deltaY;
    // console.log(table.value);
    const targrt = table.value[this.from.y + deltaY][this.from.x + deltaX];
    // console.log(this.num, "的deltaX", deltaX);
    // console.log(this.num, "的deltaY", deltaY);
    // console.log(this.num, "的target", targrt);
    if (targrt.num == 0) return;
    targrt.move(deltaX, deltaY);
  }
}
