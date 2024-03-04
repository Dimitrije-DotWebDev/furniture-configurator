import * as THREE from 'three';
import Experience from "../Experience.js";
import ImageTexture from '../Utils/ImageTexture.js';

export default class Garnitura{
    
    constructor(sofaModel, scale){
        this.experience = new Experience();

        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resource = sofaModel;
        this.imageTexture = new ImageTexture();
        this.setModel(scale);        
        this.setTextureEventHandler();
    }
    setModel(scale){
        this.resource.scale.set(scale,scale,scale);
        this.resource.position.y -= 10;
        this.resource.castShadow = true;
        this.resource.receiveShadow = true;
        this.resource.traverse(child=>{
            if(child.isMesh){
                
                if(child.name == "Box004"){
                    let material = child.material;
                    if(Array.isArray(material)){
                        child.material = material[1];
                    }
                    child.material.shininess = 0.1;
                    child.material.color = new THREE.Color(0xffffff);
                    child.material.map = new THREE.TextureLoader().load(this.imageTexture.selected.src);
                    child.material.map.wrapS = 1000;
                    child.material.map.wrapT = 1000;
                    child.material.map.roughnessMap = new THREE.TextureLoader().load("textures/materijali/Golden/A23DTEX_Roughness.jpg");
                    child.material.map.metalnessMap = new THREE.TextureLoader().load("textures/materijali/Golden/A23DTEX_Metallic.jpg");
                    child.material.map.specularColorMap = new THREE.TextureLoader().load("textures/materijali/Golden/A23DTEX_Specular Level.jpg");
                    child.material.map.normalMap = new THREE.TextureLoader().load("textures/materijali/Golden/A23DTEX_Normal.jpg");
                    child.material.map.repeat.set(7.5,7.5);
                    child.material.map.anisotropy = 16;
                    child.material.map.colorSpace = THREE.SRGBColorSpace;
                    child.material.needsUpdate = true;
                     
                }else{
                    let material = child.material;
                    if(Array.isArray(material)){
                        child.material = material[0];                        
                    }
                    child.material.color = new THREE.Color(0xffffff);
                    child.material.map = new THREE.TextureLoader().load(this.imageTexture.selectedWood.src);
                    child.material.map.wrapS = 1000;
                    child.material.map.wrapT = 1000;                        
                    child.material.map.anisotropy = 16;         
                    child.material.map.colorSpace = THREE.SRGBColorSpace;
                    child.material.needsUpdate = true;
                    child.material.shininess = 0.1;
                }
                if(child.material.map){
                    child.material.map.anisotropy = 16;
                }
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
        this.scene.add(this.resource);
    }
    setTextureEventHandler(){
        this.imageTexture.on("texture changed", ()=>{
            this.resource.traverse(child=>{
                if(child.isMesh){
                    if(child.name == "Box004"){
                        child.material.map = new THREE.TextureLoader().load(this.imageTexture.selected.src);
                        child.material.map.wrapS = 1000;
                        child.material.map.wrapT = 1000;
                        child.material.map.roughnessMap = new THREE.TextureLoader().load(this.imageTexture.selected.getAttribute("data-mapPath")+"A23DTEX_Roughness.jpg");
                        child.material.map.metalnessMap = new THREE.TextureLoader().load(this.imageTexture.selected.getAttribute("data-mapPath")+"A23DTEX_Metallic.jpg");
                        child.material.map.specularColorMap = new THREE.TextureLoader().load(this.imageTexture.selected.getAttribute("data-mapPath")+"A23DTEX_Specular Level.jpg");
                        child.material.map.normalMap = new THREE.TextureLoader().load(this.imageTexture.selected.getAttribute("data-mapPath")+"A23DTEX_Normal.jpg");
                        child.material.map.aoMap = new THREE.TextureLoader().load(this.imageTexture.selected.getAttribute("data-mapPath")+"A23DTEX_Ambient Occlusion.jpg");
                        child.material.map.repeat.set(7.5,7.5);
                        child.material.map.anisotropy = 16;
                        child.material.map.colorSpace = THREE.SRGBColorSpace;
                        child.material.needsUpdate = true;
                    }
                }
            })
        })
        

        this.imageTexture.on("wood changed", ()=>{
            this.resource.traverse(child=>{
                if(child.isMesh){
                    if(child.name != "Box004"){
                        child.material.map = new THREE.TextureLoader().load(this.imageTexture.selectedWood.src);
                        child.material.map.wrapS = 1000;
                        child.material.map.wrapT = 1000;                        
                        child.material.map.anisotropy = 16;         
                        child.material.map.colorSpace = THREE.SRGBColorSpace;
                        child.material.needsUpdate = true;
                    }
                }
            });
        })
    }
    update(){
    }
}