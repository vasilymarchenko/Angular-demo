import { Component, OnInit } from '@angular/core';
import {IProduct} from './product';
import { ProductService } from './product.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    errorMessage: string;

    // listFilter = 'cart';
    _listFilter = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];

    products: IProduct[] = [];

      // private _productService;
      // constructor(productservice: ProductService) {
      //   this._productService = productservice;
      //   this.filteredProducts = this.products;
      //   this._listFilter = 'cart';
      // }

      constructor(private productService: ProductService) {
      }

      toggleImage(): void {
          this.showImage = !this.showImage;
      }

      ngOnInit(): void {
        // console.log('product-list ngOnInit has been triggered');
        // this.products = this.productService.getProducts();
        // this.filteredProducts = this.products;
        this.productService.getProducts().subscribe(
          products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error => this.errorMessage = <any>error
        );
        //this.filteredProducts = this.products;

      }

      performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();

        // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        return this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      onRatingClicked(message: string): void {
        this.pageTitle = 'Product List ' + message;
      }
}
