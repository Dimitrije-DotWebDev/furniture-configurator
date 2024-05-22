import { NgModule } from "@angular/core";
import { ConfiguratorComponent } from "./configurator.component";
import { Router, RouterOutlet } from "@angular/router";
import { ConfiguratorRoutingModule } from "./configurator-routing.module";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryComponent } from "./category-list/category/category.component";
import { CommonModule } from "@angular/common";
import { BreadcrumpsComponent } from "./breadcrumps/breadcrumps.component";
import { ModelListComponent } from "./model-list/model-list.component";
import { ModelComponent } from "./model-list/model/model.component";
import { ThreejsViewerComponent } from "./threejs-viewer/threejs-viewer.component";

@NgModule({
    declarations: [ConfiguratorComponent, CategoryListComponent, CategoryComponent, BreadcrumpsComponent, 
        ModelListComponent, ModelComponent, ThreejsViewerComponent],
    imports: [CommonModule, RouterOutlet, ConfiguratorRoutingModule],
    exports: [ConfiguratorComponent]
})
export class ConfiguratorModule{

}