import './style.css'
import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector("canvas.webgl"));
experience.setGarnitura("models/sofa/carrera/carrera.fbx", "fbx", 0.1)
