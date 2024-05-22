import { RouterModule, Routes } from "@angular/router";
import { ConfiguratorComponent } from "./configurator.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { ModelListComponent } from "./model-list/model-list.component";


export const routes:Routes = [
    {
        path: "",
        component: ConfiguratorComponent,
        children:[
            {
                path: "",
                redirectTo: "categories",
                pathMatch: "full"
            },
            {
                path: "categories",
                component: CategoryListComponent
            },
            {
                path: "models/:category",
                component: ModelListComponent
            }
        ]
    }
]

export const ConfiguratorRoutingModule = RouterModule.forRoot(routes);