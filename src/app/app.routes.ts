import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MachineAddComponent } from './components/machine-add/machine-add.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { WashingComponent } from './components/washing/washing.component';
import { OrderPantListComponent } from './components/order-pant-list/order-pant-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'washing', component: OrderPantListComponent },
      { path: 'washing-process', component: WashingComponent },
      { path: 'order', component: OrderCreateComponent },
      { path: 'machine', component: MachineAddComponent },
    ],
  },
];
