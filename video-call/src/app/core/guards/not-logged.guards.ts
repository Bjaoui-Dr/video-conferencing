import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

export const notLoggedInGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const location = inject(Location);
  let isLoggedIn = authService.getRole().trim() == '';
  if (!isLoggedIn) location.back();

  return isLoggedIn;
};
