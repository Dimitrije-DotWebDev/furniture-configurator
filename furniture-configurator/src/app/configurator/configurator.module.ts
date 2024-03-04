import { NgModule } from "@angular/core";
import { ConfiguratorComponent } from "./configurator.component";
import { CategoryListModule } from "../category-list/category-list.module";

@NgModule({
    declarations: [ConfiguratorComponent],
    imports: [CategoryListModule],
    exports: [ConfiguratorComponent]
})
export class ConfiguratorModule{

}