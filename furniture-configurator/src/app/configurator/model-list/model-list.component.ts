import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from '../../shared/model';
import axios from 'axios';
import { SelectedItemsService } from '../services/selected-items.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrl: './model-list.component.css'
})
export class ModelListComponent implements OnInit{
  models: Model[] = [];
  @Input() selectedCategory!: string;
  constructor(private selectedItemsService: SelectedItemsService){}
  ngOnInit(): void {
    /*this.models = [
      {title: "Melody", imagePath: "assets/images/models-preview/Melody.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Simphony", imagePath: "assets/images/models-preview/Simphony.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Cleopatra", imagePath: "assets/images/models-preview/Cleopatra.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Leopold", imagePath: "assets/images/models-preview/Leopold.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Zona", imagePath: "assets/images/models-preview/Zona.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Harmony", imagePath: "assets/images/models-preview/Harmony.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Milano", imagePath: "assets/images/models-preview/Milano.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Rest", imagePath: "assets/images/models-preview/Rest.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},//asdasd
      {title: "Melody", imagePath: "assets/images/models-preview/Melody.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Simphony", imagePath: "assets/images/models-preview/Simphony.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Cleopatra", imagePath: "assets/images/models-preview/Cleopatra.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Leopold", imagePath: "assets/images/models-preview/Leopold.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Zona", imagePath: "assets/images/models-preview/Zona.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Harmony", imagePath: "assets/images/models-preview/Harmony.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Milano", imagePath: "assets/images/models-preview/Milano.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1},
      {title: "Rest", imagePath: "assets/images/models-preview/Rest.png", objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1}
    ];*/
    //console.log(this.selectedItemsService.selectedCategoryItem$.value);
    axios.get("https://reservisi.me/conf/models/category/" + this.selectedCategory, {
    }).then((response)=>{
      console.log(response);
      this.models = []
      response.data.models.forEach( (model : {id : string, name : string, description : string, img_path : string}) => {
        this.models.push({title: model.name, imagePath:  "http://reservisi.me:9000/" + model.img_path, objectPath: "", category: "Sofe i fotelje", type: "fbx", scale: 0.1})
      })
    })
    document.querySelector(".breadcrumps-menu")?.classList.remove("breadcrumps-menu-absolute")
  
  }

}
