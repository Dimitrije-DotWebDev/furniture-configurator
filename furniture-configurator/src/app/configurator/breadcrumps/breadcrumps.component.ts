import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreadcrumpItem } from '../../shared/breadcrumpItem';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.component.html',
  styleUrl: './breadcrumps.component.css'
})
export class BreadcrumpsComponent{
  breadcrumpItems = BreadcrumpItem;
  @Output() menuItemChanged = new EventEmitter<number>();

  clickHandler(index: number){
    this.menuItemChanged.emit(index);
  }
}
