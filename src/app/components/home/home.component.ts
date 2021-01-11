import { Component, OnInit } from '@angular/core';
import Product from './../../model/product';
import { ProductService } from './../../services/product.service';
import { AngularFireList } from '@angular/fire/database';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public products!: Array<Product>;
  public defaultImg = './../../assets/noimage.png'
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveProducts();
  }

  public retrieveProducts(): void {
    this.productService
      .getProdNOW()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
        )
      )
      .subscribe((data) => (this.products = data));
  }

  public viewDetails(key) {
    this.router.navigate(['/details/' + key]);
  }
}
