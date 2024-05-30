import { Component} from '@angular/core';
import { CategoryItem } from '../../shared/categoryItem';
import axios from 'axios';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories : CategoryItem[] = [
    new CategoryItem("Ugaone garniture", "assets/images/categories/ugaone.png"),
    new CategoryItem("TDF Garniture", "assets/images/categories/tdf.png"),
    new CategoryItem("Francuski ležajevi", "assets/images/categories/francuski.png"),
    new CategoryItem("Sofe i fotelje", "assets/images/categories/sofe i fotelje.png"),
  ];
  ngOnInit(): void{
    /*axios.get("https://reservisi.me/conf/categories", {
    }).then((response)=>{
      this.categories = []
      response.data.categories.forEach( (category : {id : string, Name : string, ImgPath : string}) => {
        this.categories.push(new CategoryItem(category.Name, "http://reservisi.me:9000/conf/" + category.ImgPath))
      })
    })*/
    document.querySelector(".breadcrumps-menu")?.classList.remove("breadcrumps-menu-absolute")
  
  }
  constructor(){

  }
}
