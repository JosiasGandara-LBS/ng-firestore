import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductsService } from '@app/services/products.service';

@Component({
	selector: 'app-category-modal',
	templateUrl: './category-modal.component.html',
	standalone: true,
	imports: [CommonModule,ReactiveFormsModule],
	styleUrls: []
})
export class CategoryModalComponent {
	categoryForm: FormGroup;

	private productsService = inject(ProductsService)

	constructor(
		private fb: FormBuilder,
		public ref: DynamicDialogRef
	) {
		this.categoryForm = this.fb.group({
			name: ['', Validators.required]
		});
	}

	saveCategory() {
		if (this.categoryForm.valid) {
			this.ref.close(this.categoryForm.value);

			this.productsService.addCategory(this.categoryForm.value);
		}
	}
}
