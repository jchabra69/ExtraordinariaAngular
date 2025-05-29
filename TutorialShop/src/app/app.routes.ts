import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { ProviderListComponent } from './provider-list/provider-list.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent, title: 'Home page' },
  { path: 'products/:productId', component: ProductDetailsComponent, title: 'Product details' },
  { path: 'providers/:providerId', component: ProviderDetailsComponent, title: 'Provider details' },
  { path: 'providers/:providerId', component: ProviderDetailsComponent }
];
