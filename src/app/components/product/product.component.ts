import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import Product from './../../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product = new Product();
  submitted = false;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  saveProduct(): void{
    this.productService.create(this.product).then(()=>{
      this.submitted = true;
    })
  }
  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }
}
