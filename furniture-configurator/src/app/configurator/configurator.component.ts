import { Component, OnInit } from '@angular/core';
import { BreadcrumpItem, BreadcrumpItems } from '../shared/breadcrumpItem';
import { SelectedItemsService } from './services/selected-items.service';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrl: './configurator.component.css'
})
export class ConfiguratorComponent implements OnInit{
  selectedBreadcrumpItem!: BreadcrumpItem;
  breadcrumpItems = BreadcrumpItem;
  breadcrumpItemsWithValues = BreadcrumpItems;
  selectedCategoryItem!: string;
  selectedModelItem!: string;

  constructor(private selectedItemsService: SelectedItemsService){}

  ngOnInit(): void {
    this.selectedBreadcrumpItem = this.selectedItemsService.selectedMenuItem$.value;
    this.selectedItemsService.selectedMenuItem$.subscribe((selectedMenuItem) => {
      this.selectedBreadcrumpItem = selectedMenuItem;
    });
    this.selectedItemsService.selectedCategoryItem$.subscribe((selectedCategoryItem) => {
      this.selectedCategoryItem = selectedCategoryItem;
      this.selectedItemsService.selectedMenuItem$.next(BreadcrumpItem.Model);
    });
    this.selectedItemsService.selectedModelItem$.subscribe((selectedModelItem) => {
      this.selectedModelItem = selectedModelItem;
      this.selectedItemsService.selectedMenuItem$.next(BreadcrumpItem.Configurator);
    });
  }

  selectBreadcrumpItem(breadcrumpItem: BreadcrumpItem): void{
    if(breadcrumpItem < this.selectedBreadcrumpItem){
      this.selectedItemsService.selectedMenuItem$.next(breadcrumpItem);
    }
  }
}
