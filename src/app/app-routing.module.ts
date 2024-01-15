import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ProductComponent } from './view/product/product.component';
import { SupplierComponent } from './view/supplier/supplier.component';
import { AddproductComponent } from './view/addproduct/addproduct.component';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:'dashboard', component:DashboardComponent },
  { path:'addproduct/:id', component:AddproductComponent },
  { path:'product', component:ProductComponent },
  { path:'supplier', component:SupplierComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  DashboardComponent,
  AddproductComponent,
  ProductComponent,
  SupplierComponent
]
