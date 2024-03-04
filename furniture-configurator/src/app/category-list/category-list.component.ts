import { Component } from '@angular/core';
import { CategoryItem } from '../category/categoryItem';

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

  constructor(){

  }
}
