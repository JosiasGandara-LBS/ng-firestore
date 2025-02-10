import { inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Role } from '../interfaces/employee.interface';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user = signal<{ email: string, name: string, role: string } | null>(null);
	private _firestore = inject(Firestore);
	private _router = inject(Router);

	login(email: string, password: string) {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				const userDoc = doc(this._firestore, `users/${user.uid}`);
				const userDocData = await getDoc(userDoc);
				this.user.set({ email: user.email!, name: userDocData.get('name'),role: userDocData.get('role') });
				if (userDocData.get('role') !== 'user') {
					this._router.navigate(['/admin']);
				} else {
					this._router.navigate(['/']);
				}
				Swal.fire({
					icon: 'success',
					title: 'Inicio de sesión correcto',
					text: 'Bienvenido',
					showConfirmButton: false,
					timer: 1500
				});
			})
			.catch((error) => {
				console.error("Authentication failed:", error);
				Swal.fire({
					icon: 'error',
					title: 'Inicio de sesión incorrecto',
					text: 'Usuario o contraseña incorrectos',
					showConfirmButton: false,
					timer: 1500
				});
			});
	}

	logout() {
		this.user.set(null);
		this._router.navigate(['/login']);
	}

	getRole(): Role | null {
		return this.user()?.role as Role;
	}
}
