import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, products } from '../products';
import { CartService } from '../services/cart.service';
import { ProviderService, Provider } from '../services/provider.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  provider: Provider | undefined;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private providerService: ProviderService
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    
this.product = products.find((product: Product) => product.id === productIdFromRoute);

    if (this.product) {
      this.providerService.getProviderById(this.product.providerId).subscribe(
        (provider) => this.provider = provider
      );
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
