import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";

import { ProductListComponent } from "./product-list/product-list.component";
import { ProductAlertsComponent } from "./product-alerts/product-alerts.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

import { CartComponent } from "./cart/cart.component";
import { HttpClientModule } from "@angular/common/http";
import { ShippingComponent } from "./shipping/shipping.component";
import { ProviderDetailsComponent } from "./provider-details/provider-details.component";

import { ProviderListComponent } from './provider-list/provider-list.component';
import { CreateProductComponent } from "./create-product/create-product.component";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: ProductListComponent },
      { path: "products/:productId", component: ProductDetailsComponent },
      { path: "cart", component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: "providers/:providerId", component: ProviderDetailsComponent },
      { path: "providers", component: ProviderListComponent },
      { path: "create", component: CreateProductComponent },

    ]),
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    ProviderDetailsComponent,
    ProviderListComponent,
    CreateProductComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
