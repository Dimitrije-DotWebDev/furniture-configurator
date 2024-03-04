import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter{
    constructor(){
        super();

        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        window.requestAnimationFrame(()=>{
            this.tick();
        })
    }

    tick(){

        const currentTime = Date.now();
        this.delta = currentTime - this.currentTime;
        this.currentTime = currentTime;
        this.elapsed = this.current - this.start;
        this.trigger('tick');
        window.requestAnimationFrame(()=>{
            this.tick();
        })
    }
}