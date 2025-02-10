import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const cashierGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRole = authService.getRole();
  if (userRole === 'CAJA' || userRole === 'ADMIN' || userRole === 'TI') {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
