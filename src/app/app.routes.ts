import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { InventoryComponent } from './components/inventory/inventory.component';
import { OrderComponent } from './components/order/order.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserRoleAssignmentComponent } from './components/user-role-assignment/user-role-assignment.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { UserOrderHistoryComponent } from './components/user-order-history/user-order-history.component';
import { OrderApproveComponent } from './components/order-approve/order-approve.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'inventory', component: InventoryComponent },
      { path: 'order', component: OrderComponent },
      { path: 'user-create', component: UserCreateComponent },
      { path: 'product-create', component: ProductCreateComponent },
      { path: 'user-role-assignment', component: UserRoleAssignmentComponent },
      { path: 'customer-create', component: CustomerCreateComponent },
      { path: 'order-approve', component: OrderApproveComponent },
      { path: 'user-order', component: UserOrderComponent },
      { path: 'user-order-history', component: UserOrderHistoryComponent },
    ],
  },
];
