import Experience from "../Experience";
import EventEmitter from "./EventEmitter";

export default class ImageTexture extends EventEmitter{
    constructor(){
        super();
        this.texturesLibrary = document.getElementById("colors");
        this.woodLibrary = document.getElementById("materials");
        this.selected = this.texturesLibrary.children[0];
        this.selectedWood = this.woodLibrary.children[0];
        for(let i = 0; i < this.texturesLibrary.children.length; i++){
            this.texturesLibrary.children[i].addEventListener("click", ()=>{
                this.selected = this.texturesLibrary.children[i];
                this.trigger("texture changed");
                for(let i = 0; i < this.texturesLibrary.children.length; i++){
                    this.texturesLibrary.children[i].className = "";
                }
                this.texturesLibrary.children[i].className = "selected"
            },false)
        }
        for(let i = 0; i < this.woodLibrary.children.length; i++){
            this.woodLibrary.children[i].addEventListener("click", ()=>{
                this.selectedWood = this.woodLibrary.children[i];
                this.trigger("wood changed");
                for(let i = 0; i < this.woodLibrary.children.length; i++){
                    this.woodLibrary.children[i].className = "";
                }
                this.woodLibrary.children[i].className = "selected";
            },false)
        }
    }
}