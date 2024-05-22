import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { BreadcrumpItem } from "../../shared/breadcrumpItem";
import { Model } from "../../shared/model";

@Injectable({
    providedIn: 'root'
})
export class SelectedItemsService{
    selectedMenuItem$: BehaviorSubject<BreadcrumpItem> = new BehaviorSubject<BreadcrumpItem>(BreadcrumpItem.Category);
    selectedCategoryItem$: Subject<string> = new Subject<string>();
    selectedModelItem$: Subject<string> = new Subject<string>();
}