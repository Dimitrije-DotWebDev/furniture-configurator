import { NgModule } from "@angular/core";
import { CategoryListComponent } from "./category-list.component";
import { CategoryModule } from "../category/category.module";
import { NgFor, NgIf } from "@angular/common";

@NgModule({
    declarations: [CategoryListComponent],
    imports: [CategoryModule, NgIf, NgFor],
    exports: [CategoryListComponent]
})
export class CategoryListModule{

}