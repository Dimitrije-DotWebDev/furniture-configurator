import * as THREE from 'three';
import Experience from "../Experience.js";
import ImageTexture from '../Utils/ImageTexture.js';

export default class Garnitura{
    
    constructor(path, type, scale){
        this.experience = new Experience();

        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.imageTexture = new ImageTexture();
        this.preloadResources(path, type, scale);
        this.woodTextures = [];
        this.fabricTextures = [];
        this.parts = [];
        this.configuration = {
            selectedSittingMaterial: "",
            selectedSittingColor: "",
            selectedSideMaterial: "",
            selectedSideColor: "",
            selectedLegsMaterial: "",
            selectedLegsColor: "",
        }
        //this.resource = this.resources.items.sofa;
    }
    async preloadResources(objectPath, type, scale){
        if(type == "fbx"){
            const [file] = await Promise.all(
                [this.resources.loaders.fbxLoader.loadAsync(objectPath)]
            );
            this.resources.sourceLoaded({name: "sofa"}, file);
            this.resource = this.resources.items.sofa;
        }
        let woodTexturesMaps = document.getElementById("materials").children;
        for(let woodTextureMap of woodTexturesMaps){
            this.woodTextures.push({
                map: this.resources.loaders.textureLoader.load(woodTextureMap.src),
                metalness: this.resources.loaders.textureLoader.load(woodTextureMap.getAttribute("data-mapPath")+"A23DTEX_Metallic.jpg"),
                roughness: this.resources.loaders.textureLoader.load(woodTextureMap.getAttribute("data-mapPath")+"A23DTEX_Roughness.jpg"),
                specular: this.resources.loaders.textureLoader.load(woodTextureMap.getAttribute("data-mapPath")+"A23DTEX_Specular Level"),
                normal: this.resources.loaders.textureLoader.load(woodTextureMap.getAttribute("data-mapPath")+"A23DTEX_Normal.jpg"),
                ao: this.resources.loaders.textureLoader.load(woodTextureMap.getAttribute("data-mapPath")+"A23DTEX_Ambient Occlusion.jpg")
            });
        }
        let fabricTexturesMaps = document.getElementById("colors").children;
        for(let fabricTextureMap of fabricTexturesMaps){
            this.fabricTextures.push({
                map: this.resources.loaders.textureLoader.load(fabricTextureMap.firstChild.src),
                metalness: this.resources.loaders.textureLoader.load(fabricTextureMap.firstChild.getAttribute("data-mapPath")+"A23DTEX_Metallic.jpg"),
                roughness: this.resources.loaders.textureLoader.load(fabricTextureMap.firstChild.getAttribute("data-mapPath")+"A23DTEX_Roughness.jpg"),
                specular: this.resources.loaders.textureLoader.load(fabricTextureMap.firstChild.getAttribute("data-mapPath")+"A23DTEX_Specular Level"),
                normal: this.resources.loaders.textureLoader.load(fabricTextureMap.firstChild.getAttribute("data-mapPath")+"A23DTEX_Normal.jpg"),
                ao: this.resources.loaders.textureLoader.load(fabricTextureMap.firstChild.getAttribute("data-mapPath")+"A23DTEX_Ambient Occlusion.jpg")
            });
        }
        this.setModel(scale);
        this.setMaterialHandler();
        this.setTextureEventHandler();
        this.setParts(this.imageTexture.selectedPart);
        this.setPartsHandler();

    }
    setModel(scale){
        this.resource.scale.set(scale,scale,scale);
        this.resource.position.y -= 10;
        this.resource.castShadow = true;
        this.resource.receiveShadow = true;
        this.resource.traverse(child=>{
            if(child.isMesh){
                
                if(child.name != document.getElementsByClassName("icon")[document.getElementsByClassName("icon").length-1].getAttribute("data-objects")){
                    let material = child.material;
                    if(Array.isArray(material)){
                        child.material = new THREE.MeshPhongMaterial(material[1]);
                    }else{                        
                        child.material = new THREE.MeshPhongMaterial(material);
                    }
                    child.material.shininess = 0.1;
                    child.material.color = new THREE.Color(0xffffff);
                    child.material.map = this.fabricTextures[this.imageTexture.selected].map;
                    child.material.map.wrapS = 1000;
                    child.material.map.wrapT = 1000;
                    child.material.map.roughnessMap = this.fabricTextures[this.imageTexture.selected].roughness;
                    child.material.map.metalnessMap = this.fabricTextures[this.imageTexture.selected].metalness;
                    child.material.map.specularColorMap = this.fabricTextures[this.imageTexture.selected].specular;
                    child.material.map.normalMap = this.fabricTextures[this.imageTexture.selected].normal;
                    child.material.map.aoMap = this.fabricTextures[this.imageTexture.selected].ao;
                    child.material.map.repeat.set(7.5,7.5);
                    child.material.map.anisotropy = 16;
                    child.material.map.colorSpace = THREE.SRGBColorSpace;
                    child.material.needsUpdate = true;
                    child.material.side = THREE.DoubleSide;
                     
                }else{
                    let material = child.material;
                    if(Array.isArray(material)){
                        child.material = material[0];                        
                    }
                    child.material.color = new THREE.Color(0xffffff);
                    child.material.map = this.woodTextures[this.imageTexture.selectedWood].map;
                    child.material.map.wrapS = 1000;
                    child.material.map.wrapT = 1000;                        
                    child.material.map.anisotropy = 16;         
                    child.material.map.colorSpace = THREE.SRGBColorSpace;
                    child.material.needsUpdate = true;
                    child.material.shininess = 0;
                    child.material.side = THREE.DoubleSide;
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
            this.parts.forEach(child=>{
                child.material.map = this.fabricTextures[this.imageTexture.selected].map;
                child.material.map.wrapS = 1000;
                child.material.map.wrapT = 1000;
                child.material.map.repeat.set(7.5,7.5);
                child.material.map.anisotropy = 16;
                child.material.map.colorSpace = THREE.SRGBColorSpace;
                child.material.needsUpdate = true;
                child.material.shininess = 0;
                child.material.side = THREE.DoubleSide;
            })
        })
        

        this.imageTexture.on("wood changed", ()=>{
            this.parts.forEach(child=>{
                child.material.map = this.woodTextures[this.imageTexture.selectedWood].map;
                child.material.map.wrapS = 1000;
                child.material.map.wrapT = 1000;
                child.material.map.roughnessMap = this.fabricTextures[this.imageTexture.selected].roughness;
                child.material.map.metalnessMap = this.fabricTextures[this.imageTexture.selected].metalness;
                child.material.map.specularColorMap = this.fabricTextures[this.imageTexture.selected].specular;
                child.material.map.normalMap = this.fabricTextures[this.imageTexture.selected].normal;
                child.material.map.aoMap = this.fabricTextures[this.imageTexture.selected].ao;                        
                child.material.map.anisotropy = 16;  
                child.material.metalness = 1;
                child.material.roughness = 0.1;
                child.material.map.colorSpace = THREE.SRGBColorSpace;
                child.material.needsUpdate = true;
                child.material.side = THREE.DoubleSide;
            });
        })
    }
    setParts(partsNames){
        this.parts = [];
        this.resource.traverse(child=>{
            if(partsNames.includes(child.name)){
                this.parts.push(child);
            }
        })
    }
    setPartsHandler(){
        this.imageTexture.on("part changed", ()=>{
            this.setParts(this.imageTexture.selectedPart);
        })
    }
    setMaterialHandler(){
        this.imageTexture.on("material changed", ()=>{
            this.parts.forEach(child=>{                
                child.material.map.colorSpace = THREE.SRGBColorSpace;
                child.material.map.roughnessMap = this.fabricTextures[this.imageTexture.selected].roughness;
                child.material.map.metalnessMap = this.fabricTextures[this.imageTexture.selected].metalness;
                child.material.map.specularColorMap = this.fabricTextures[this.imageTexture.selected].specular;
                child.material.map.normalMap = this.fabricTextures[this.imageTexture.selected].normal;
                child.material.map.aoMap = this.fabricTextures[this.imageTexture.selected].ao;
                child.material.needsUpdate = true;
                child.material.shininess = 0;
                child.material.side = THREE.DoubleSide;
            })
        });
    }

    getSelected(){
        return this.configuration;
    }
    update(){
    }
}