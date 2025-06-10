import { Component, OnInit } from '@angular/core';

import { products } from '../products';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  products = [...products];

  // Inyectamos el servicio en el constructor
  constructor(private productService: ProductService) {}

  // OnInit: cuando el componente se inicialice, llamamos al servicio para obtener los productos
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products; // Asignamos los productos recibidos para mostrarlos
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
        // Aquí podrías manejar mostrar un mensaje de error en la plantilla si quieres
      }
    });
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/