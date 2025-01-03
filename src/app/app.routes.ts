import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrdersWaiterComponent } from './pages/orders-waiter/orders-waiter.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

export const routes: Routes = [
	{
		path: 'home', component: HomeComponent,
	},
	{
		path: 'shopping-cart', component: ShoppingCartComponent,
		children: [
			{
				path: '',
				loadComponent: () => import('./shared/components/cart-items/cart-items.component').then(m => m.CartItemsComponent),
				data: { title: 'Tu Pedido' },
			},
			{
				path: 'checkout',
				loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
				data: { title: 'Detalles del pedido' },
			}
		]
	},
	{
		path: 'orders-waiter', component: OrdersWaiterComponent,
		children: [
			{
				path: '', redirectTo: 'orders-waiter', pathMatch: 'full'
			}
		]
	},
	{
		path: '', redirectTo: 'home', pathMatch: 'full'
	},
	{
		path: '**', redirectTo: 'home', pathMatch: 'full'
	}
];
