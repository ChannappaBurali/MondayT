import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from './auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { LogOutComponent } from './log-out/log-out.component';
const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'product-list',  component: ProductListComponent, canActivate : [AuthGuard] },
  { path: 'add-product',  component: AddProductComponent, canActivate : [AuthGuard] },
  { path: 'add-product/:productId',  component: AddProductComponent, canActivate : [AuthGuard] },
  { path: 'log-out',  component: LogOutComponent, canActivate : [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
