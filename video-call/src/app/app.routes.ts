import { Routes } from '@angular/router';
import { RoomComponent } from './pages/room/room.component';
import { HomeComponent } from './pages/home/home.component';
import { clientGuard } from './core/guards/client.guards';
import { notLoggedInGuard } from './core/guards/not-logged.guards';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-route').then((mod) => mod.AUTH_ROUTES),
    // canMatch: [notLoggedInGuard],
  },
  {
    path: 'room/:roomId',
    component: RoomComponent,
    canMatch: [clientGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canMatch: [clientGuard],
  },
];
