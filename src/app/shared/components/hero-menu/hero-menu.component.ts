import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../../interfaces/menu-item';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-hero-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-menu.component.html',
  styleUrl: './hero-menu.component.scss'
})
export class HeroMenuComponent {

	_menuService = inject(CartService).getMenu;

	cartItemsCount: number = 0;
	buttonClass: string = '';

	constructor(
		private router: Router,
		private cartService: CartService
	) {}

	async ngOnInit() {
		this.updateCartItemsCount();
	}

	// Método para organizar los platillos por categoría
	organizeByCategory(items: MenuItem[]): { [key: string]: MenuItem[] } {
		return items.reduce((acc: { [key: string]: MenuItem[] }, item: MenuItem) => {
			const { category } = item;

			if (!acc[category]) {
				acc[category] = [];
			}

			acc[category].push(item);
			return acc;
		}, {});
	}

	goToOrders() {
		this.router.navigate(['/orders']);
	}

	updateCartItemsCount(): void {
		this.cartItemsCount = this.cartService.getTotalItems(); // Llama al servicio para obtener el total de items
	}

	// Método para agregar al carrito
	addToCart(item: MenuItem): void {
		navigator.vibrate(200);
		this.cartService.addToCart(item.id, item.name, item.description, item.price);
		this.updateCartItemsCount();
	}

}
