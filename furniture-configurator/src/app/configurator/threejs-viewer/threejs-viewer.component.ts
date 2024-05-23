import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Model } from '../../shared/model';
import { SelectedItemsService } from '../services/selected-items.service';

@Component({
  selector: 'app-threejs-viewer',
  templateUrl: './threejs-viewer.component.html',
  styleUrl: './threejs-viewer.component.css'
})
export class ThreejsViewerComponent implements OnInit {
  @Input() selectedModelItem!: string;
  model!: Model;
  
  ngOnInit(){
    this.model = {title: this.selectedModelItem, category: "Sofe i fotelje", imagePath: "assets/images/models-preview/Melody.png", objectPath: "assets/models/sofa/carrera/carrera.fbx", type: "fbx", scale: 0.1};
    
    
    const script = document.createElement('script');
      script.src = "assets/threejs-scripts/bundle.26b1937c2da9e7b5a3ea.js";
      /*script.onload = () =>{
        (window as any).experience.setGarnitura(this.model.objectPath, this.model.type, this.model.scale);
      }*/
      document.body.appendChild(script);

      let configurator = document.getElementById("configurator");
      let canvas = document.getElementById("canvas");
      let configuratorScreen = document.getElementsByClassName("configurator")[0];

      configurator?.addEventListener("click", ()=>{
        (canvas as HTMLElement).style.height = configurator?.offsetHeight + "px";
        (configuratorScreen as  HTMLElement).style.height = configurator?.offsetHeight + "px";
      });

      
  }
  openOrderPage(): void{
    document.getElementById("order-page")?.classList.remove("display-none");
  }
}
