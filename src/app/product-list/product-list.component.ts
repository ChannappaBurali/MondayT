import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/productModel';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import {from } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService, private authenticationService: AuthenticationService,
    private conformationService: ConfirmationDialogService,
    private router: Router) { }
  editField: string;
  public products: Product[];

  ngOnInit() {
   this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      if (response) {
        this.products = response;
      }
    }, error => console.log(error));
  }

  edit(ProductID: string) {
    this.router.navigate([`/add-product/` + ProductID]);
  }

  delete(ProductID: number) {
   from(this.conformationService.confirm('Are you sure', 'You want to delete the product?')
    ).subscribe((res) => {
      if (res) {
        this.productService.deleteProduct(ProductID).subscribe((response: any) => {
          if (response != null) {
            this.getProducts();
          }
         }, error => console.log(error));
     }
   }, error => console.log(error));
  }
  addProduct(): void {
    this.router.navigate(['/add-product']);
  }
  logout() {
    this.router.navigate(['/log-out']);
  }
}
