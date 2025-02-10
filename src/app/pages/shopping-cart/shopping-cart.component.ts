import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { FormCommunicationService } from '../../services/form-communication.service';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

	title = 'Tu pedido'

	totalPriceSignal = inject(CartService).getTotalPriceSignal();

	@ViewChild(CheckoutComponent) checkoutComponent?: CheckoutComponent;

	constructor(private route: ActivatedRoute, private router : Router, private formCommunicationService: FormCommunicationService ) {}

	ngOnInit(): void {
		// Detectar cambios de ruta y actualizar el título
		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
			const childRoute = this.route.firstChild?.snapshot;
			if (childRoute?.data?.['title']) this.title = childRoute.data['title'];
		});
	}

	goToHome() {
		if(this.router.url === '/shopping-cart/checkout') {
			this.router.navigate(['/shopping-cart'])
		} else {
			this.router.navigate(['/home'])
		}
	}

	goToCheckout() {
		if(this.router.url === '/shopping-cart/checkout') {
			// Mostrar lo que tiene mi form
			this.formCommunicationService.triggerSubmitForm();

		}
		this.router.navigate(['/shopping-cart/checkout'])
	}

}
