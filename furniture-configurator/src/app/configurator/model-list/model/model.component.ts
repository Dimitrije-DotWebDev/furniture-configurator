import { Component, Input } from '@angular/core';
import { SelectedItemsService } from '../../services/selected-items.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent {
  @Input() title: string = "";
  @Input() imagePath : string = "";

  constructor(private selectedItemsService: SelectedItemsService){}

  selectModel(): void{
    this.selectedItemsService.selectedModelItem$.next(this.title);
  }
}
