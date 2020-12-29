import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { ProductService } from './../../services/product.service';
import { BusketService } from './../../services/busket.service';
import Product from './../../model/product';
import { Router, Params } from '@angular/router';
import { CompareService } from 'src/app/services/compare.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
})
export class AllProductComponent implements OnInit {
  public products!: Array<Product>;
  public types: Array<any>;
  public currentProduct = null;
  public currentPage = 1;
  public defaultImg = '../../assets/noimage.png';
  public busketCount: number = 0;
  public compareCount: number = 0;
  public itemPerPage = 6;
  public filteredType = 'all';
  public searchString: string = ''
  private lastProduct: Product;

  constructor(
    private productService: ProductService,
    private share: BusketService,
    private router: Router,
    private compare: CompareService
  ) {
    this.share.onClick.subscribe((cnt: any) => (this.busketCount = cnt));
    this.compare.onClick.subscribe((cnt: any) => (this.compareCount = cnt));
  }

  public ngOnInit(): void {
    this.retrieveProducts();
    this.getAllTypes();
  }

  public refreshList(): void {
    this.filteredType = 'all';
    this.currentProduct = null;
    this.currentPage = 1;
    this.retrieveProducts();
  }

  public retrieveProducts(): void {
    this.productService
      .filterFirstPage(this.filteredType)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.lastProduct = data[data.length - 1];
        this.products = data;
      });
  }

  public addProdToBusket(product) {
    this.share.addToBusket(product);
  }

  public addProdToCompare(product) {
    this.compare.addToCompareList(product);
    console.log(this.compare.compareList)
  }

  public getNumberOfProducts(length: number) {
    return new Array(Math.ceil(length / this.itemPerPage));
  }

  public previousPage() {
    if (
      this.currentPage - 1 >
      0
    ) {
      console.log(this.productService.prodLength);
      this.currentPage--;
      this.productService
        .getPrevPage(this.lastProduct, this.filteredType)
        .snapshotChanges()
        .pipe(
          map((changes) =>
            changes.map((c) => ({
              id: c.payload.doc.id,
              ...c.payload.doc.data(),
            }))
          )
        )
        .subscribe((data) => {
          this.lastProduct = data[data.length - 1];
          this.products = data;
        });
    }
  }
  public nextPage() {
    if (
      this.currentPage + 1 <=
      Math.ceil(this.productService.prodLength / this.itemPerPage)
    ) {
      console.log(this.productService.prodLength);
      this.currentPage++;
      this.productService
        .getNextPage(this.lastProduct, this.filteredType)
        .snapshotChanges()
        .pipe(
          map((changes) =>
            changes.map((c) => ({
              id: c.payload.doc.id,
              ...c.payload.doc.data(),
            }))
          )
        )
        .subscribe((data) => {
          this.lastProduct = data[data.length - 1];
          this.products = data;
        });
    }
  }

  public viewDetails(key) {
    this.router.navigate(['/details/' + key]);
  }

  public getAllTypes() {
    this.productService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => c.payload.doc.data().type)))
      .subscribe((data) => {
        this.types = this.filterPr(data);
      });
  }

  private filterPr(data) {
    let arr_2 = data.filter((item, index) => {
      return data.indexOf(item) == index;
    });
    return arr_2;
  }
  
  public filterProd(type) {
    this.filteredType = type;
    this.productService
      .filterFirstPage(this.filteredType)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((result) => {
        this.products = result;
      });
  }

  searchForm(){
    let searchValue = this.searchString.toLowerCase();
    this.productService
      .seachProd(searchValue)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((result) => {
        console.log(result)
        this.products = result;
      });
  }
  // public removeAllProducts(): void {
  //   this.productService
  //     .deleteAll()
  //     .then(() => this.refreshList())
  //     .catch((err) => console.log(err));
  // }
}
