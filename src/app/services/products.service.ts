import { Inject, Injectable, signal } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(@Inject(AngularFirestore) private firestore: AngularFirestore) {}

  public selectedProduct = signal<Product | null>(null);

  getProducts() {
    return this.firestore.collection('/products').valueChanges();
  }

  addProduct(product: any) {
    return this.firestore.collection('/products').add(product);
  }

  updateProduct(id: string, product: Product) {
    return this.firestore.collection('/products').doc(id).update(product);
  }

  deleteProduct(id: string) {
    return this.firestore.collection('/products').doc(id).delete();
  }

  // Similar methods for users
}
