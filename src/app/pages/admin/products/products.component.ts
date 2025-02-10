import { Component, OnInit, signal, computed, Inject } from '@angular/core';
import { ProductsService } from '../../../services/products.service'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product.interface'; // Adjust the path as necessary
import { ProductModalComponent } from '../components/product-modal/product-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [CommonModule, ProductModalComponent, ReactiveFormsModule],
  styleUrls: []
})
export class ProductsComponent implements OnInit {
  private productsService = Inject(ProductsService);
  private formsModule = Inject(ReactiveFormsModule);

  public searchForm = this.formsModule.group({
    query: ['']
  });

  private _products = signal<Product[]>([]);
  public products = computed(() => this._products().filter(product => product.name.toLowerCase().includes(this.searchForm.query.toLowerCase())));

  isModalOpen = false;
  isKitchenOpen = true;



  ngOnInit() {
    this.productsService.getProducts().subscribe((data: unknown) => {
      const products = data as Product[];
      this._products.set(products);
    });
  }

  openAddProductModal() {
    this.isModalOpen = true;
  }

  openEditProductModal(product: any) {
    this.isModalOpen = true;
    this.productsService.selectedProduct.set(product);
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleKitchenStatus() {
    this.isKitchenOpen = !this.isKitchenOpen;
  }
}
