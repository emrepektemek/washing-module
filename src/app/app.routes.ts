import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MachineAddComponent } from './components/machine-add/machine-add.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'order', component: OrderCreateComponent },
      { path: 'machine', component: MachineAddComponent },
    ],
  },
];
