import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormCommunicationService } from '../../services/form-communication.service';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [DropdownComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnDestroy {

	form: FormGroup;
	savedData: { firstName: string; lastName: string }[] = [];
	totalPriceSignal = inject(CartService).getTotalPriceSignal();

	private subscription: Subscription;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private formCommunicationService: FormCommunicationService,
		private ordersService : OrdersService,
		private cartService : CartService
	) {
		// Configuración del formulario reactivo
		this.form = this.fb.group({
			client: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			assignedToTable: ['', Validators.required],
			paymentMethod: ['', Validators.required],
			totalAmount: [0, Validators.required],
			createdDate: ['01/01/1800, 00:00 a.m.'],
			status: [1]
		});

		// Escuchar la señal para enviar el formulario
		this.subscription = this.formCommunicationService.submitForm$.subscribe(() => {
			this.submitForm();
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	goToOrders() {
		this.router.navigate(['/orders']);
	}

	submitForm() {
		if (this.form.valid) {

			// Obtener solo los campos necesarios del carrito
			const cartItems = this.cartService.getCartItemsToOrder();
			console.log(cartItems);

			// Añadir datos derivados como fecha y precio total
			const now = new Date();
			const formattedDate = new Intl.DateTimeFormat('es-MX', {
				dateStyle: 'short',
				timeStyle: 'short',
			}).format(now);

			// Actualizar valores en el formulario
			this.form.patchValue({
				createdDate: formattedDate,
				totalAmount: this.totalPriceSignal(),
			});

			this.ordersService.addOrder({...this.form.value, foodDishes: cartItems})
			.then(() => {
				console.log('Platillo agregado con exito');
				this.cartService.clearCart();
				this.router.navigate(['/home']);
			}).catch((error) => {
				console.log('Error al agregar platillo: ', error);
			});

		} else {
			console.log('Formulario inválido');
		}
	}

}
