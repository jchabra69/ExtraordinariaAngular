import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HousingService } from '../housing.service';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-edit-house',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  template: `
    <h2>Editar Casa</h2>

    <form [formGroup]="editForm" (ngSubmit)="onSave()">
      <label for="name">Nombre:</label>
      <input id="name" type="text" formControlName="name" />
      <div
        *ngIf="
          editForm.get('name')?.invalid && editForm.get('name')?.touched
        "
        class="error"
      >
        El nombre es obligatorio.
      </div>

      <label for="city">Ciudad:</label>
      <input id="city" type="text" formControlName="city" />
      <div
        *ngIf="
          editForm.get('city')?.invalid && editForm.get('city')?.touched
        "
        class="error"
      >
        La ciudad es obligatoria.
      </div>

      <label for="state">Estado:</label>
      <input id="state" type="text" formControlName="state" />
      <div
        *ngIf="
          editForm.get('state')?.invalid && editForm.get('state')?.touched
        "
        class="error"
      >
        El estado es obligatorio.
      </div>

      <label for="photo">Foto (URL):</label>
      <input id="photo" type="text" formControlName="photo" />
      <div
        *ngIf="
          editForm.get('photo')?.invalid && editForm.get('photo')?.touched
        "
        class="error"
      >
        La foto es obligatoria.
      </div>

      <label for="availableUnits">Unidades Disponibles:</label>
      <input
        id="availableUnits"
        type="number"
        formControlName="availableUnits"
        min="0"
      />
      <div
        *ngIf="
          editForm.get('availableUnits')?.invalid &&
          editForm.get('availableUnits')?.touched
        "
        class="error"
      >
        Las unidades disponibles son obligatorias y deben ser un número ≥ 0.
      </div>

      <label>
        <input type="checkbox" formControlName="wifi" />
        Wifi
      </label>

      <label>
        <input type="checkbox" formControlName="laundry" />
        Lavandería
      </label>

      <label>Sistemas de Seguridad:</label>
      <div formArrayName="securitySystems">
        <div
          *ngFor="
            let control of securitySystems.controls;
            let i = index
          "
        >
          <input [formControlName]="i" />
          <button type="button" (click)="removeSecuritySystem(i)">
            Eliminar
          </button>
        </div>
        <button type="button" (click)="addSecuritySystem()">
          Añadir Sistema
        </button>
      </div>

      <label for="status">Estado:</label>
      <input id="status" type="text" formControlName="status" />

      <button type="submit" [disabled]="editForm.invalid">
        Guardar Cambios
      </button>
    </form>
  `,
  styleUrls: ['./edit-house.component.css'],
})
export class EditHouseComponent implements OnInit {
  // Servicios y utilidades inyectados
  private housingService = inject(HousingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  housingId!: number; // ID de la vivienda que se edita

  // Formulario reactivo con validaciones y estructura según interfaz HousingLocation
  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required),
    availableUnits: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    wifi: new FormControl(false),
    laundry: new FormControl(false),
    securitySystems: new FormArray([]), // Array dinámico para sistemas de seguridad
    status: new FormControl(''),
  });

  // Getter para acceder al FormArray de sistemas de seguridad fácilmente en template y código
  get securitySystems() {
    return this.editForm.get('securitySystems') as FormArray;
  }

  ngOnInit() {
    // Extraemos el id de la URL para cargar datos concretos
    this.housingId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.housingId) {
      this.loadHousing(this.housingId);
    }
  }

  // Método para obtener los datos de la vivienda y rellenar el formulario
  private async loadHousing(id: number) {
    const housing = await this.housingService.getHousingLocationById(id);
    if (housing) {
      // Parcheamos los campos simples del formulario
      this.editForm.patchValue({
        name: housing.name,
        city: housing.city,
        state: housing.state,
        photo: housing.photo,
        availableUnits: housing.availableUnits,
        wifi: housing.wifi,
        laundry: housing.laundry,
        status: housing.status ?? '',
      });

      // Limpiamos el FormArray antes de cargar valores
      this.securitySystems.clear();

      // Añadimos cada sistema de seguridad como un nuevo control
      (housing.securitySystems ?? []).forEach((system) => {
        this.securitySystems.push(new FormControl(system));
      });
    }
  }

  // Añade un nuevo sistema de seguridad vacío para ser editado por el usuario
  addSecuritySystem() {
    this.securitySystems.push(new FormControl(''));
  }

  // Elimina un sistema de seguridad por índice
  removeSecuritySystem(index: number) {
    this.securitySystems.removeAt(index);
  }

  // Se llama al enviar el formulario
  async onSave() {
    if (this.editForm.invalid) return; // Validamos antes de enviar

    // Construimos el objeto completo HousingLocation con todos los datos
    const updatedHouse: HousingLocation = {
      id: this.housingId,
      name: this.editForm.value.name!,
      city: this.editForm.value.city!,
      state: this.editForm.value.state!,
      photo: this.editForm.value.photo!,
      availableUnits: this.editForm.value.availableUnits!,
      wifi: this.editForm.value.wifi!,
      laundry: this.editForm.value.laundry!,
      securitySystems: this.editForm.value.securitySystems ?? [],
      status: this.editForm.value.status ?? '',
    };

    try {
      // Intentamos actualizar la vivienda mediante el servicio
      await this.housingService.updateHousingLocation(updatedHouse);
      alert('Casa actualizada con éxito');
      this.router.navigate(['/']); // Volvemos a la lista tras actualizar
    } catch (error) {
      console.error('Error actualizando:', error);
      alert('Error al actualizar la casa');
    }
  }
}
