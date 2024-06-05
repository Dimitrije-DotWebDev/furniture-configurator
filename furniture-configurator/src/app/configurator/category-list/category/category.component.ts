import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectedItemsService } from '../../services/selected-items.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  @Input() title: string = "";
  @Input() imagePath : string = "";
  @Input() id : string = "";
  @Output() selectedCategory = new EventEmitter<string>();

  constructor(private selectedItemsService: SelectedItemsService){}

  selectCategory(): void{
    this.selectedItemsService.selectedCategoryItem$.next(this.id);
  }
}
