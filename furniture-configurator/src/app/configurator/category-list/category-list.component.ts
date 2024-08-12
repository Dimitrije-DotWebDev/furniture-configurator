import { Component} from '@angular/core';
import { CategoryItem } from '../../shared/categoryItem';
import axios from 'axios';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  categories : CategoryItem[] = [] /* = [
    new CategoryItem("Ugaone garniture", "assets/images/categories/ugaone.png", "123"),
    new CategoryItem("TDF Garniture", "assets/images/categories/tdf.png", "1234"),
    new CategoryItem("Francuski ležajevi", "assets/images/categories/francuski.png", "12345"),
    new CategoryItem("Sofe i fotelje", "assets/images/categories/sofe i fotelje.png", "123456"),
    new CategoryItem("Ugaone garniture", "assets/images/categories/ugaone.png", "123"),
    new CategoryItem("TDF Garniture", "assets/images/categories/tdf.png", "1234"),
    new CategoryItem("Francuski ležajevi", "assets/images/categories/francuski.png", "12345"),
    new CategoryItem("Sofe i fotelje", "assets/images/categories/sofe i fotelje.png", "123456"),
  ]; */
  ngOnInit(): void{
    axios.get("https://8dpthbbd-9999.euw.devtunnels.ms/conf/categories/", {
    }).then((response)=>{
      this.categories = [];
      response.data.forEach( (category : {ID : string, Name : string, ImgPath : string}) => {
        this.categories.push(new CategoryItem(category.Name, "https://8dpthbbd-9000.euw.devtunnels.ms/" + category.ImgPath, category.ID))
      })
      const script = document.createElement('script');
    script.src = "assets/js/swipe-script.js";
    document.body.appendChild(script);
    })
    document.querySelector(".breadcrumps-menu")?.classList.remove("breadcrumps-menu-absolute")

    
  
  }

  constructor(){

  }
}

