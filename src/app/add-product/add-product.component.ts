import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Supplier } from '../model/supplierModel';
import { ProductService } from '../services/product.service';
import { SupplierService } from '../services/supplier.service';
import { Product } from '../model/productModel';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @ViewChild('f') ngForm: any;
  supplierList: Supplier [];
  product: Product;
  productId = 0;
  isProductInserted: boolean = null;
  isProductUpdated: boolean = null;
  isInventoryExists = false;
  isProductNameExists = false;
  isEditable = false;
  productName = '';
  // tslint:disable-next-line:max-line-length
  constructor(private productService: ProductService, private supplierService: SupplierService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.product = new Product();
    this.productId = this.activatedRoute.snapshot.params['productId'];
       }


  ngOnInit() {
    this.getSuppliers();
    if (typeof( this.productId) !== 'undefined') {
    this.getProductDetailsById(this.productId);
    }
  }

  getSuppliers(): void {
    this.supplierService.getSuppliers().subscribe((response: any) => {
      if (response.length > 0) {
        this.supplierList = response;
      }
    }, error => {console.log(error); });

  }

  CheckProductName(productName, productID): void {
    if (productID == null || typeof(productID) === 'undefined') {
      productID = 0;
    }
    this.productService.CheckProductName(productName, productID).subscribe((response: any) => {
      if (response != null) {
        this.isProductNameExists = response.IsProductNameExists;
      } else {
        this.isProductNameExists = response.IsProductNameExists;
      }
    }, error => console.log(error));
  }

  onSubmit(): void {
   this.product.TotalCost = this.product.TotalCost == null ? 0 : this.product.TotalCost;
    const modeldata = this.product;
    modeldata.TotalCost = (this.product.Quantity * this.product.UnitPrice);
    if (typeof(this.productId) === 'undefined') {
         this.productService.saveProduct(modeldata).subscribe((response: any) => {
           if (response != null && response.ProductID > 0) {
             this.router.navigate(['/product-list']);
           }
        }, error => {console.log(error); });
     } else if (typeof(this.productId) !== 'undefined') {
      this.productService.updateProduct(modeldata).subscribe((response: any) => {
      if (response != null && response.IsProductUpdated ) {
        this.isProductUpdated = true;
        this.router.navigate(['/product-list']);
      } else {
        this.isProductUpdated = false;
      }
     }, error => console.log(error));
     }
  }

  getProductDetailsById(productId: number): void {
    this.productService.getProductDetailsById(productId).subscribe((response: any) => {
     this.product = response;
   }, error => console.log(error));
  }

  backToList(): void {
    this.router.navigate(['/product-list']);
  }
  clearForm(productForm): void {
      productForm.resetForm();
  }
  logout() {
    this.router.navigate(['/log-out']);
  }

}
