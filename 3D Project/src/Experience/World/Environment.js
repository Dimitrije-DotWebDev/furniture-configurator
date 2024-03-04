import * as THREE from 'three';
import Experience from "../Experience.js";
export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder("enviornment");
        }
        this.setHemisphereLight();
        this.setSunLight();
        this.setEnvironmentMap();
    }
    setHemisphereLight(){
        this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1.5);
        this.scene.add(this.hemisphereLight);
    }
    setSunLight(){
        this.sunLight = new THREE.SpotLight(0xffa95c, 3000);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 150;
        this.sunLight.shadow.camera.left = -30;
        this.sunLight.shadow.camera.right = 30;
        this.sunLight.shadow.camera.top = 30;
        this.sunLight.shadow.camera.bottom = -30;
        this.sunLight.shadow.bias = -0.0001;
        this.sunLight.shadow.mapSize.set(1024*4,1024*4);
        this.sunLight.position.set(this.experience.camera.instance.position.x-30,this.experience.camera.instance.position.y + 30,this.experience.camera.instance.position.z);
        this.scene.add(this.sunLight);
        if(this.debug.active){
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001);
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(-5)
                .max(5)
                .step(0.001);
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(-5)
                .max(5)
                .step(0.001);
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(-5)
                .max(5)
                .step(0.001);
        }
    /*    this.sunLight = new THREE.DirectionalLight('#ffffff', 4);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 70;
        this.sunLight.shadow.camera.left = -30;
        this.sunLight.shadow.camera.right = 30;
        this.sunLight.shadow.camera.top = 30;
        this.sunLight.shadow.camera.bottom = -30;
        this.sunLight.shadow.mapSize.set(1024,1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(23.5,22.765,25);
        this.scene.add(this.sunLight);
        this.scene.add(new THREE.CameraHelper( this.sunLight.shadow.camera ))

        this.ambient = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(this.ambient);

        if(this.debug.active){
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001);
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(-5)
                .max(5)
                .step(0.001);
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(-5)
                .max(5)
                .step(0.001);
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(-5)
                .max(5)
                .step(0.001);
        }*/
    }

    setEnvironmentMap(){
        this.environmentMap = {};
        this.environmentMap.intensity = 0.4;
        this.environmentMap.texture = this.resources.items.environmentMapTexture;
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;
        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterial = ()=>{
            this.scene.traverse((child)=>{
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity = this.environmentMap.intensity;
                    child.material.needsUpdate = true;
                }
            })
        }
        this.environmentMap.updateMaterial();

        if(this.debug.active){
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(12)
                .step(0.001)
                .onChange( this.environmentMap.updateMaterial )
        }
    }
    update(){
        //this.sunLight?.position.set(this.experience.camera.instance.position.x + 30, this.experience.camera.instance.position.y + 30, this.experience.camera.instance.position.z + 30);
    }
}