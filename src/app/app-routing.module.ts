import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {AuthGuard} from "./_auth/auth.guard";
import {AddNewProductComponent} from "./add-new-product/add-new-product.component";
import {ShowProductDetailsComponent} from "./show-product-details/show-product-details.component";
import {ProductResolveService} from "./_services/product-resolve.service";
import {ProductViewComponent} from "./product-view/product-view.component";


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path: 'user', component: UserComponent,canActivate:[AuthGuard],data:{roles:['User']}},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path:'addNewProduct',component:AddNewProductComponent,canActivate:[AuthGuard],data:{roles: ['Admin']},
    resolve:{
    product:ProductResolveService
    }
  },
  {path:'showProductDetails',component:ShowProductDetailsComponent,canActivate:[AuthGuard],data:{roles: ['Admin']}},
  {path:'productView',component:ProductViewComponent,resolve:{product: ProductResolveService}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
