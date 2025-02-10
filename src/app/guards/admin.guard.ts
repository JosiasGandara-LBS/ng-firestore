import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRole = authService.getRole();
  if (userRole === 'TI' || userRole === 'ADMIN') {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
