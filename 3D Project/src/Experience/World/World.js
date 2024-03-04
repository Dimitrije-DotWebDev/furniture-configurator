import * as THREE from 'three';
import Experience from "../Experience.js";
import Environment from './Environment.js';
import Room from './Room.js';
import Garnitura from './Garnitura.js';

export default class World{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resources.on('ready', ()=>{
            this.environment = new Environment();
            this.room = new Room(50,20,40);
            this.garnitura = new Garnitura(this.resources.items.carreraModel, 0.1);

        })
    }

    update(){
        this.environment?.update();
        this.room?.update();
    }
}