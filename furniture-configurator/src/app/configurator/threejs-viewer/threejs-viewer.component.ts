import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Model } from '../../shared/model';
import { SelectedItemsService } from '../services/selected-items.service';
import { BreadcrumpItem } from '../../shared/breadcrumpItem';

@Component({
  selector: 'app-threejs-viewer',
  templateUrl: './threejs-viewer.component.html',
  styleUrl: './threejs-viewer.component.css'
})
export class ThreejsViewerComponent implements OnInit {
  @Input() selectedModelItem!: string;
  model!: Model;
  constructor(private selectedItemsService: SelectedItemsService){}
  ngOnInit(){
    this.model = {title: this.selectedModelItem, category: "Sofe i fotelje", imagePath: "assets/images/models-preview/Melody.png", objectPath: "assets/models/sofa/carrera/carrera.fbx", type: "fbx", scale: 0.1};
    
  document.querySelector(".breadcrumps-menu")?.classList.add("breadcrumps-menu-absolute")
    
    const script = document.createElement('script');
      script.src = "assets/threejs-scripts/bundle.26b1937c2da9e7b5a3ea.js";
      script.onload = () =>{
        (window as any).experience.setGarnitura(this.model.objectPath, this.model.type, this.model.scale);
      }
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
    console.log((window as any).experience.getSelected());
    let selected = (window as any).experience.getSelected();
    let sittingPartInfo = document.getElementById("sitting-part-info");
    (sittingPartInfo?.children[1].children[1] as any).src = selected.sittingPartMaterial.children[0].src;
    (sittingPartInfo?.children[1].children[2] as any).innerHTML = selected.sittingPartMaterial.children[1].innerHTML;

    (sittingPartInfo?.children[2].children[1] as any).src = selected.sittingPartColor.children[0].src;
    (sittingPartInfo?.children[2].children[2] as any).innerHTML = selected.sittingPartColor.children[1].innerHTML;

    let sidePartInfo = document.getElementById("side-part-info");

    (sidePartInfo?.children[1].children[1] as any).src = selected.sidePartMaterial.children[0].src;
    (sidePartInfo?.children[1].children[2] as any).innerHTML = selected.sidePartMaterial.children[1].innerHTML;

    (sidePartInfo?.children[2].children[1] as any).src = selected.sidePartColor.children[0].src;
    (sidePartInfo?.children[2].children[2] as any).innerHTML = selected.sidePartColor.children[1].innerHTML;

    let legPartInfo = document.getElementById("leg-part-info");
    (legPartInfo?.children[1].children[1] as any).src = selected.legsPartMaterial.src;
    (legPartInfo?.children[1].children[2] as any).innerHTML = "WOOD";

    (legPartInfo?.children[2].children[1] as any).src = selected.legsPartColor.src;
    (legPartInfo?.children[2].children[2] as any).innerHTML = "WOOD";
  }

  openSentRequestPage() : void{
    document.getElementById("sent-request")?.classList.remove("display-none");
  }

  restartApp() : void{
    this.selectedItemsService.selectedMenuItem$.next(BreadcrumpItem.Category);
  }
}
