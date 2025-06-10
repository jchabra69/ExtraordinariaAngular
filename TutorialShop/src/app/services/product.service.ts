// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../products';


// DTO para el primer JSON (mismos campos que Product)
interface ProductDTO1 {
  id: number;
  name: string;
  price: number;
  description: string;
  providerId: number;
}

// DTO para el segundo JSON (estructura distinta)
interface ProductDTO2 {
  product_id: string;
  product_name: string;
  cost: number;
  details: string;
  supplier: string;
}

@Injectable({
  providedIn: 'root'  // Hace que Angular registre este servicio en el inyector raíz
})
export class ProductService {
  // Rutas a los archivos JSON en assets/
  private url1 = 'assets/products1.json';
  private url2 = 'assets/products2.json';

  // Inyectamos HttpClient para poder hacer peticiones HTTP a los ficheros JSON
  constructor(private http: HttpClient) {}

  /**
   * getProducts()
   *  - Lanza dos peticiones paralelas a ambos JSON usando forkJoin
   *  - Cuando ambas respuestas llegan, las convierte y concatena
   *  - Devuelve un Observable de array de Product unificado
   */
  getProducts(): Observable<Product[]> {
    // Petición al primer JSON, devuelve ProductDTO1[]
    const req1$ = this.http.get<ProductDTO1[]>(this.url1);

    // Petición al segundo JSON, devuelve ProductDTO2[]
    const req2$ = this.http.get<ProductDTO2[]>(this.url2);

    // forkJoin espera a que ambas peticiones se completen
    return forkJoin([req1$, req2$]).pipe(
      map(([list1, list2]) => [
        // Mapear cada DTO1 a Product con convert1()
        ...list1.map(dto => this.convert1(dto)),
        // Mapear cada DTO2 a Product con convert2()
        ...list2.map(dto => this.convert2(dto))
      ])
    );
  }

  /**
   * convert1()
   *  - Recibe un ProductDTO1 (ya mismo formato)
   *  - Devuelve un Product tal cual
   */
  private convert1(dto: ProductDTO1): Product {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
      description: dto.description,
      providerId: dto.providerId
    };
  }

  /**
   * convert2()
   *  - Recibe un ProductDTO2 (estructura distinta)
   *  - Transforma sus campos a los de Product
   *  - Convierte cadenas numéricas a number
   */
  private convert2(dto: ProductDTO2): Product {
    return {
      id: Number(dto.product_id),         // Convertir string a number
      name: dto.product_name,             // Renombrar title
      price: dto.cost,                    // cost -> price
      description: dto.details,           // details -> description
      providerId: Number(dto.supplier)    // Convertir string a number
    };
  }
}