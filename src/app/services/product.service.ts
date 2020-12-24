import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import Product from './../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dbPath = '/products';
  public prodLength;
  private buf;

  productsRef: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore) {
   
  }

  getAll(): AngularFirestoreCollection<Product> {
    return this.db.collection(this.dbPath);
  }

  getProd(prodKey) {
    return this.db.collection(this.dbPath).doc(prodKey).snapshotChanges();
  }

  getProdUnSub(prodKey) {
    return this.db.collection(this.dbPath).doc(prodKey).ref.get();
  }

  getProdNOW(): AngularFirestoreCollection<Product> {
    return this.db.collection(this.dbPath, (ref) =>
      ref.orderBy('number').limit(3)
    );
  }

  create(product: Product): any {
    return this.productsRef.add({ ...product });
  }

  update(id: string, data: any): Promise<void> {
    return this.productsRef.doc(id).update(data);
  }

  filterType(type): AngularFirestoreCollection<Product> {
    return this.db.collection(this.dbPath, (ref) =>
      ref.where('type', '==', type).orderBy('title')
    );
  }

  delete(id: string): Promise<void> {
    return this.productsRef.doc(id).delete();
  }

  deleteAll(): Promise<void> {
    return this.productsRef.doc().delete();
  }

  filterFirstPage(
    type = 'all',
    pageSize = 6
  ): AngularFirestoreCollection<Product> {
    if (type == 'all')
    this.getAll()
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
        this.prodLength = data.length;
      });
    else this.filterType(type)
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
        this.prodLength = data.length;
      });
    if (type == 'all') {
      return this.db.collection(this.dbPath, (ref) =>
        ref.orderBy('title').limit(pageSize)
      );
    } else
      return this.db.collection(this.dbPath, (ref) =>
        ref.where('type', '==', type).orderBy('title').limit(pageSize)
      );
  }

  getNextPage(
    lastEl: Product,
    type = 'all',
    pageSize = 6
  ): AngularFirestoreCollection<Product> {
    if (type == 'all')
      return this.db.collection(this.dbPath, (ref) =>
        ref.orderBy('title').startAfter(lastEl['title']).limit(pageSize)
      );
    else
      return this.db.collection(this.dbPath, (ref) =>
        ref
          .where('type', '==', type)
          .orderBy('title')
          .startAfter(lastEl['title'])
          .limit(pageSize)
      );
  }

  getPrevPage(
    lastEl: Product,
    type = 'all',
    pageSize = 6
  ): AngularFirestoreCollection<Product> {
    if (type == 'all')
      return this.db.collection(this.dbPath, (ref) =>
        ref.orderBy('title').endBefore(lastEl['title']).limitToLast(pageSize)
      );
    else
      return this.db.collection(this.dbPath, (ref) =>
        ref
          .where('type', '==', type)
          .orderBy('title')
          .endBefore(lastEl['title'])
          .limitToLast(pageSize)
      );
  }

  seachProd(str): AngularFirestoreCollection<Product> {
    if (str=='') return this.filterFirstPage();
    return this.db.collection(this.dbPath, (ref) =>
      ref
        .orderBy('title')
        .where('title', '>=', str)
        .where('title', '<=', str + '\uf8ff')
    );
  }
}
