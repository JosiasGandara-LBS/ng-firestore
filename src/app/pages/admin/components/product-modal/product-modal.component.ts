import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '@app/interfaces/product.interface';
import { ProductsService } from '@app/services/products.service';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'products-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, InputSwitchModule, FileUploadModule, DropdownModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
  providers: [DialogService]
})
export class ProductModalComponent implements OnInit {

	private productsService = inject(ProductsService)
	private fb = inject(FormBuilder)
	private dialogService = inject(DialogService)
	private firestore = inject(AngularFirestore)

	categories: any[] = [];

	ngOnInit() {
		const product = this.productsService.selectedProduct();
		if (product) {
			this.productForm.patchValue({
				...product,
				price: product.price.toString(),
				available: product.available
			});
		}
		this.fetchCategories();
	}

	public productForm = this.fb.group({
		name: [this.productsService.selectedProduct()?.name ?? '', [Validators.required, Validators.minLength(3)]],
		price: [this.productsService.selectedProduct()?.price ?? '', [Validators.required, Validators.min(0)]],
		description: [this.productsService.selectedProduct()?.description ?? '', [Validators.required, Validators.minLength(3)]],
		available: [this.productsService.selectedProduct()?.available ?? true, Validators.required],
		category: [this.productsService.selectedProduct()?.category ?? '', [Validators.required, Validators.minLength(3)]],
		image: [this.productsService.selectedProduct()?.image ?? '', Validators.required],
	});

	getErrorMessage(field: string): string {
		const control = this.productForm.get(field);
		if (control?.hasError('required')) {
			return 'Este campo es obligatorio';
		} else if (control?.hasError('minlength')) {
			return `El campo debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
		} else if (control?.hasError('min')) {
			return 'El valor debe ser mayor o igual a 0';
		} else if (control?.hasError('image')) {
			return 'Ha ocurrido un error al subir la imagen';
		}
		return '';
	}

	public closeModal() {
		this.productsService.selectedProduct.set(null);
	}

	public saveProduct() {
		const formValues = this.productForm.value;
		const updatedProduct: Product = {
			id: this.productsService.selectedProduct()?.id ?? '',
			name: formValues.name as string,
			price: parseFloat(formValues.price as string),
			description: formValues.description as string,
			available: formValues.available === true,
			category: formValues.category as string,
			image: formValues.image as string
		};
		// Save the updated product details
		// this.productsService.updateProduct(updatedProduct).subscribe(() => {
		// 	this.closeModal();
		// });
	}

	public async uploadImage(event: any) {
		try {
			const file = event.files[0];
			const url = await this.productsService.uploadImage(file);
			if (url) {
				this.productForm.patchValue({ image: url });
			}
		} catch (error) {
			this.productForm.patchValue({ image: '' });
			this.productForm.setErrors({ image: 'Ha ocurrido un error al subir la imagen' });

		}
	}

	fetchCategories() {
		this.firestore.collection('categories').valueChanges().subscribe(data => {
			this.categories = data.map((category: any) => ({ label: category.name, value: category.name }));
		});
	}

	openCategoryModal() {
		const ref = this.dialogService.open(CategoryModalComponent, {
			header: 'Agregar Categoría',
			width: '50%'
		});

		ref.onClose.subscribe(() => {
			this.fetchCategories();
		});
	}
}
