import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import EventEmitter from "./EventEmitter.js";

export default class Resources extends EventEmitter{
    constructor(sources){
        super();

        this.sources = sources;
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;
        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
        this.loaders.fbxLoader = new FBXLoader();
    }

    async startLoading(){
        for(const source of this.sources){
            if(source.type === "gltfModel"){
                const [file] = await Promise.all([this.loaders.gltfLoader.loadAsync(
                    source.path,
                )]);
                this.sourceLoaded(source,file)
            }else if(source.type === "fbxModel"){
                this.loaders.fbxLoader.load(
                    source.path,
                    (file) =>{
                        this.sourceLoaded(source, file);
                    }
                )
            }else if(source.type === "texture"){
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source,file)
                    }
                );
            }else if(source.type === "cubeTexture"){
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source,file)
                    }
                );
            }
        }
    }

    sourceLoaded(source, file){
        this.items[source.name] = file;
        this.loaded++;

        if(this.loaded == this.toLoad+1){
            this.trigger("ready");
            setTimeout(()=>{
                document.querySelector(".loading").classList.add("hidden");
            }, 500)
        }
    }
}