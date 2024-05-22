import * as THREE from 'three';
import Experience from "./Experience.js";

export default class Renderer{
    constructor(){

        this.experience = new Experience();

        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.setInstance();
        this.canvas.addEventListener("webglcontextrestored", ()=>{
            this.onContextRestored();
        }, false);
    }

    setInstance(){
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            preserveDrawingBuffer: true
        })
        this.instance.physicallyCorrectLights = true;
        this.instance.toneMapping = THREE.ReinhardToneMapping;
        this.instance.toneMappingExposure = 2.3;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setClearColor(0xffffff);
        this.instance.setClearAlpha(0.0);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    resize(){
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }
    onContextRestored(){
        this.instance.setClearColor(0xffffff);
        this.instance.setClearAlpha(0.0);
    }
    saveAsImage() {
        this.camera.setSnapshotPosition();
        setTimeout(
        ()=>{
                var imgData, imgNode;
        
            try {
                var strMime = "image/jpeg";
                var strDownloadMime = "image/octet-stream";
        
                imgData = this.instance.domElement.toDataURL(strMime);
        
                this.saveFile(imgData.replace(strMime, strDownloadMime), "furniture.jpg");
                this.scene.background = null;
        
            } catch (e) {
                console.log(e);
                return;
            }
        },500);
    }

    saveFile(strData, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            document.body.appendChild(link); //Firefox requires the link to be in the body
            link.download = filename;
            link.href = strData;
            link.click();
            document.body.removeChild(link); //remove the link when done
        } else {
            location.replace(uri);
        }
    }

    update(){
        this.instance.render(this.scene, this.camera.instance);
    }
}