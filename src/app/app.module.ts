import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {AuthenticationService } from './services/authentication.service';
import { UiModule } from './ui/ui.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { LogOutComponent } from './log-out/log-out.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ProductService} from './services/product.service';
import {SupplierService} from './services/supplier.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogService } from './services/confirmation-dialog.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThousandSeperatorPipe } from './thousand-seperator.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent ,
    ProductListComponent,
    AddProductComponent,
    LogOutComponent,
    PageNotFoundComponent,
    ConfirmationDialogComponent,
    ThousandSeperatorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
     AuthenticationService,
     ProductService,
     SupplierService,
     ConfirmationDialogService
  ],
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
