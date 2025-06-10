import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Provider, ProviderService } from "../services/provider.service";
import { Product, products } from "../products";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrl: "./create-product.component.css",
})
export class CreateProductComponent implements OnInit {
  /*
   id: number;
  name: string;
  price: number;
  description: string;
  providerId: number; 
  */

   private readonly storageKey = 'addProductData';

  miFormulario = new FormGroup({
    //El id del producto se genera automáticamente al crearse y meterse en el array
    name: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    providerId: new FormControl("", Validators.required),
  });

  //Los proveedores se cargaran automaticamente en el formulario
  //Así que uso el metodo del servicio que me devuelve el array de los proveedores
  providers: Provider[] = [];

  constructor(private providerService: ProviderService, private router: Router) {}

  ngOnInit() {

    //También voy a hacer que se guarden/restauren los datos en el formulario
    //Desde el localstorage

    // Si hay datos recuperalos
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const formData = JSON.parse(saved);
        this.miFormulario.patchValue(formData);
      } catch {}
    }

    // Guarda to en el localstorage
    this.miFormulario.valueChanges.subscribe((value) => {
      localStorage.setItem(this.storageKey, JSON.stringify(value));
    });

    this.providerService.getProviders().subscribe({
      next: (data) => {
        this.providers = data;
      },
      error: (err) => {
        console.error("Error cargando proveedores:", err);
      },
    });
  }

  addProduct() {
    //SI EL FORMULARIO ES VALIDO, METE LOS VALORES EN EL OBJETO
    if (this.miFormulario.valid) {
      const nuevoProducto: Product = {
        id: products.length + 1,
        name: this.miFormulario.value.name ?? "",
        price: Number(this.miFormulario.value.price),
        description: this.miFormulario.value.description ?? "",
        providerId: Number(this.miFormulario.value.providerId),
      };

      products.push(nuevoProducto);

      console.log("Producto añadido:", nuevoProducto);
      this.miFormulario.reset();
    }

    //Una vez creado redirijo al home
    this.router.navigate(['/']); //Recuerda declarar en el constructor el Router

  }
}
