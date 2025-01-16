import { AfterViewInit, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {

	cartItemsCount = inject(CartService).getCartItemsCount();

	constructor(private router : Router){}

	ngAfterViewInit(): void {
		initFlowbite();
	}

	goToOrders() { this.router.navigate(['/shopping-cart']) }
}
