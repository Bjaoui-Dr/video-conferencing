import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

export const clientGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const location = inject(Location);
  let isClient = authService.getRole() == 'USER';
  console.log(authService.getRole());
  if (!isClient) location.back();
  return isClient;
};
