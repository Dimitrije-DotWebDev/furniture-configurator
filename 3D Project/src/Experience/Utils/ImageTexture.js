import Experience from "../Experience";
import EventEmitter from "./EventEmitter";

export default class ImageTexture extends EventEmitter{
    constructor(){
        super();
        this.texturesLibrary = document.getElementById("colors");
        this.woodLibrary = document.getElementById("materials");
        this.materialLibrary = document.getElementById("material");
        this.parts = document.getElementById("icons");
        this.selected = 0;
        this.selectedWood = 0;
        this.configuration ={
            sittingPartMaterial: document.getElementById("material").firstChild,
            sittingPartColor: document.getElementById("colors").firstChild,
            sidePartMaterial: document.getElementById("material").firstChild,
            sidePartColor: document.getElementById("colors").firstChild,
            legsPartMaterial: this.woodLibrary.children[0],
            legsPartColor: this.woodLibrary.children[0]
        }
        this.selectedPart = this.getSelectedParts(this.parts.children[0].firstChild.getAttribute("data-objects"));
        this.currentPartDiv = this.parts.children[0].children[1].innerHTML;
        this.selectedMaterial = "LUIS";
        for(let i = 0; i < this.texturesLibrary.children.length; i++){
            this.texturesLibrary.children[i].addEventListener("click", ()=>{
                this.texturesLibrary.children[this.selected].firstChild.className = "";
                this.selected = i;
                if(this.currentPartDiv == "Entire Sofa"){
                    this.configuration.sittingPartColor = this.texturesLibrary.children[this.selected];
                    this.configuration.sidePartColor = this.texturesLibrary.children[this.selected];
                }
                if(this.currentPartDiv == "Sitting Part"){
                    this.configuration.sittingPartColor = this.texturesLibrary.children[this.selected];
                }
                if(this.currentPartDiv == "Sofa Sides"){
                    this.configuration.sidePartColor = this.texturesLibrary.children[this.selected];
                }
                this.trigger("texture changed");
                this.texturesLibrary.children[i].firstChild.className = "selected"
            },false)
        }
        for(let i = 0; i < this.woodLibrary.children.length; i++){
            this.woodLibrary.children[i].addEventListener("click", ()=>{
                this.selectedWood = i;
                this.trigger("wood changed");
                for(let i = 0; i < this.woodLibrary.children.length; i++){
                    this.woodLibrary.children[i].className = "";
                }
                this.configuration.legsPartMaterial = this.woodLibrary.children[this.selected];
                this.configuration.legsPartColor = this.woodLibrary.children[this.selected];
                this.woodLibrary.children[i].className = "selected";
            },false)
        }

        for(let i = 0; i < this.materialLibrary.children.length; i++){
            this.materialLibrary.children[i].addEventListener("click", ()=>{
                let textureChanged = false;
                this.selectedMaterial = this.materialLibrary.children[i].getAttribute("data-materialName");
                this.trigger("material changed");
                for(let i = 0; i < this.materialLibrary.children.length; i++){
                    if(this.materialLibrary.children[i].getAttribute("data-MaterialName") == this.selectedMaterial){
                        this.materialLibrary.children[i].firstChild.className = "selected";
                        if(this.currentPartDiv == "Entire Sofa"){
                            this.configuration.sittingPartMaterial = this.materialLibrary.children[i];
                            this.configuration.sidePartMaterial = this.materialLibrary.children[i];
                        }
                        if(this.currentPartDiv == "Sitting Part"){
                            this.configuration.sittingPartMaterial = this.materialLibrary.children[i];
                        }
                        if(this.currentPartDiv == "Sofa Sides"){
                            this.configuration.sidePartMaterial = this.materialLibrary.children[i];
                        }
                    }else{
                        this.materialLibrary.children[i].firstChild.className = "";
                    }
                }
                
                for(let i = 0; i < this.texturesLibrary.children.length; i++){
                    if(this.texturesLibrary.children[i].getAttribute("data-materialName") == this.selectedMaterial){
                        this.texturesLibrary.children[i].className = "selected-material";
                        if(!textureChanged){
                            textureChanged = true;
                            this.texturesLibrary.children[this.selected].firstChild.className = "";
                            this.selected = i;
                            this.texturesLibrary.children[i].firstChild.className = "selected"
                            if(this.currentPartDiv == "Entire Sofa"){
                                this.configuration.sittingPartColor = this.texturesLibrary.children[this.selected];
                                this.configuration.sidePartColor = this.texturesLibrary.children[this.selected];
                            }
                            if(this.currentPartDiv == "Sitting Part"){
                                this.configuration.sittingPartColor = this.texturesLibrary.children[this.selected];
                            }
                            if(this.currentPartDiv == "Sofa Sides"){
                                this.configuration.sidePartColor = this.texturesLibrary.children[this.selected];
                            }
                            //this.texturesLibrary.children[i]
                            this.trigger("texture changed");
                        }                        
                    }
                    else{
                        this.texturesLibrary.children[i].className = "not-selected-material";
                    }
                }
            },false)
        }
        for(let i = 0; i < this.parts.children.length; i++){
            this.parts.children[i].addEventListener("click", ()=>{
                for(let j = 0; j < this.parts.children.length; j++){
                    this.parts.children[j].firstChild.classList.remove("selected");
                }
                this.parts.children[i].firstChild.className += "selected";    
                if(this.parts.children[i].firstChild.getAttribute("data-isFabric") == "true"){
                    document.getElementById("materials").classList.remove("selected-material");
                    document.getElementById("material").classList.remove("not-selected-material");
                    document.getElementById("colors").classList.remove("not-selected-material");
                    document.getElementById("materials").classList.add("not-selected-material");
                    document.getElementById("material").classList.add("selected-material");
                    document.getElementById("colors").classList.add("selected-material");
                }else{
                    document.getElementById("materials").classList.remove("not-selected-material");
                    document.getElementById("material").classList.remove("selected-material");
                    document.getElementById("colors").classList.remove("selected-material");
                    document.getElementById("materials").classList.add("selected-material");
                    document.getElementById("material").classList.add("not-selected-material");
                    document.getElementById("colors").classList.add("not-selected-material")
                }
                this.selectedPart = this.getSelectedParts(this.parts.children[i].firstChild.getAttribute("data-objects"));
                this.currentPartDiv = this.parts.children[i].children[1].innerHTML;
                this.trigger("part changed");
            },false)
        }
    }
    getSelectedParts(namesArray){
        let parts = namesArray.split(", ");
        return parts;
    }
}