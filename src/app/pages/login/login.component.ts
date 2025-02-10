import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	constructor(private authService: AuthService, private router: Router) {}

	login(username: string, password: string) {
		if (this.authService.login(username, password)) {
			this.router.navigate(['/home']);
		} else {
			alert('Login failed');
		}
	}
}
