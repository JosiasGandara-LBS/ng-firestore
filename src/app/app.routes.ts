import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrdersWaiterComponent } from './pages/orders-waiter/orders-waiter.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { waiterGuard } from './guards/waiter.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { cashierGuard } from './guards/cashier.guard';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

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
		path: 'login',
		loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
		canActivate: [authGuard],
	},
	{
		path: 'orders-waiter', component: OrdersWaiterComponent,
		canActivate: [waiterGuard],
		children: [
			{
				path: '', redirectTo: 'orders-waiter', pathMatch: 'full'
			}
		]
	},
	{
		path: 'admin', component: AdminComponent,
		canActivate: [cashierGuard],
		children: [
			{
				path: 'products',
				loadComponent: () => import('./pages/admin/products/products.component').then(m => m.ProductsComponent),
			},
			{
				path: 'employees',
				canActivate: [adminGuard],
				loadComponent: () => import('./pages/admin/employees/employees.component').then(m => m.EmployeesComponent),
			},
			{path: '', redirectTo: 'products', pathMatch: 'full'},
			{path: '**', redirectTo: 'products', pathMatch: 'full'}
		]

	},
	{
		path: '', redirectTo: 'home', pathMatch: 'full'
	},
	{
		path: '**', redirectTo: 'home', pathMatch: 'full'
	}
];
