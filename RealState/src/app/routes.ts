import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { AddHousingComponent } from './add-housing/add-housing.component';
import { EditHouseComponent } from './edit-house/edit-house.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'add-housing',
    component: AddHousingComponent,
    title: 'Add a new house'
  },
  {
    path: 'edit/:id',
    component: EditHouseComponent,
    title: 'Edit a house'
  }
];

export default routeConfig;
