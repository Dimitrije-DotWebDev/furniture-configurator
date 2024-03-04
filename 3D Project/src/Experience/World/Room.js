import * as THREE from 'three';
import Experience from "../Experience.js";

export default class Room{
    
    constructor(x,y,z){
        this.experience = new Experience();

        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resource = {
            "nx": this.resources.items.roomTexturePZ,
            "px": this.resources.items.roomTexturePZ,
            "ny": this.resources.items.roomTexturePZ,
            "py": this.resources.items.roomTexturePY,
            "nz": this.resources.items.roomTexturePZ,
            "pz": this.resources.items.roomTexturePZ
        };
        this.tv = this.resources.items.tvModel.scene;
        this.setGeometry(x,y,z);
        this.setMaterial();
        this.setMesh();
        this.setTV();
    }
    setGeometry(x,y,z){
        this.geometry = new THREE.BoxGeometry(x,y,z);
    }
    setMaterial(){
        this.material = [];
        for(const key in this.resource){
            let color = 0x94472a;
            let opacity = 1;
            let repeat = {x: 1, y:1}
            if(key == "py"){
                color = 0xDCCAB2;
                repeat.x = 2;
                repeat.y = 2;
            }else{
                color = 0xFAF9F6;
            }
            if(key == "ny"){
                opacity = 0;
                color = 0xffffff;
            }
            if(key == "pz" || key == "nz"){
                
                repeat.x = 1.67;
                repeat.y = 1;
            }
            this.resource[key].wrapS = 1000;
            this.resource[key].wrapT = 1000;
            this.resource[key].repeat.set(repeat.x, repeat.y);
            if(key != "py"){
                this.material.push(new THREE.MeshPhysicalMaterial({color: color, map: this.resource[key], side:THREE.BackSide, transparent: true, opacity: opacity,}));
                this.material[this.material.length-1].metalnessMap = this.resources.items.roomWallMetalMap;
                this.material[this.material.length-1].normalMap = this.resources.items.roomWallNormalMap;
                this.material[this.material.length-1].roughnessMap = this.resources.items.roomWallRoughnessMap;
                this.material[this.material.length-1].bumpMap = this.resources.items.roomWallBumpMap;
                this.material[this.material.length-1].aoMap = this.resources.items.roomWallAoMap;
            }else{
                this.material.push(new THREE.MeshPhysicalMaterial({color: 	color, map: this.resource[key], side:THREE.BackSide, transparent: true, opacity: opacity,roughness: 0.5, metalness: 0.55}));
                this.material[this.material.length-1].metalnessMap = this.resources.items.roomFloorMetalMap;
                this.material[this.material.length-1].normalMap = this.resources.items.roomFloorNormalMap;
                this.material[this.material.length-1].roughnessMap = this.resources.items.roomFloorRoughnessMap;
                this.material[this.material.length-1].bumpMap = this.resources.items.roomFloorBumpMap;
                this.material[this.material.length-1].aoMap = this.resources.items.roomFloorAoMap;
            }
            
            
            this.material.map.colorSpace = THREE.SRGBColorSpace;
            this.material.map.anisotropy = 16;
        }
    }
    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
    }
    setTV(){
        this.tv = this.resources.items.tvModel.scene;
        this.tv.children[0].material.color = new THREE.Color(0x000000);
        this.tv.rotation.y += Math.PI;
        this.tv.position.z += 19.95;
        this.tv.scale.set(8,8,8);
        this.scene.add(this.tv);
    }
    update(){
        if(this.experience.camera.instance.position.z > 19.9 && this.tv.visible){
            this.tv.visible = false;
        }else{
            if(this.experience.camera.instance.position.z <= 19.9 && !this.tv.visible){
                this.tv.visible = true;
            }
        }
    }
}