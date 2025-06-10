# Cuando quiero redirigir manualmente tras una logica

import { Router } from '@angular/router';

constructor(private router: Router) {}

guardarProducto() {
  // lógica para guardar...
  this.router.navigate(['/create']);
}

# Crear una ruta

<a routerLink="/create">Crear producto</a>
<!-- o -->
<button [routerLink]="['/create']">Crear</button>

# Cuando el componente sea standalone, debo meter RouterModule, así que en moviles recuerda trabajar con el app.module

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [RouterModule], // ✅ Necesario para routerLink y navegación
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {}
