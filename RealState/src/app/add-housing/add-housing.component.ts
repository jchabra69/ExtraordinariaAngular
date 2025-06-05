import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-add-housing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2 class="title">Register a New House</h2>
    <form [formGroup]="form" (ngSubmit)="addHouse()">
      <label for="name">Name:</label>
      <input id="name" type="text" formControlName="name" required />

      <label for="city">City:</label>
      <input id="city" type="text" formControlName="city" required />

      <label for="state">State:</label>
      <input id="state" type="text" formControlName="state" required />

      <label for="availableUnits">Available Units:</label>
      <input
        id="availableUnits"
        type="number"
        formControlName="availableUnits"
        required
      />

      <label> <input type="checkbox" formControlName="wifi" /> Wifi </label>

      <label>
        <input type="checkbox" formControlName="laundry" /> Laundry
      </label>

      <label>Security Systems:</label>
      <div class="security-options">
        <label *ngFor="let option of securityOptions">
          <input
            type="checkbox"
            [value]="option"
            (change)="onSecuritySystemChange($event)"
            [checked]="(form.value.securitySystems ?? []).includes(option)"
          />
          {{ option }}
        </label>
      </div>

      <label for="photo">Photo URL (optional):</label>
      <input id="photo" type="url" formControlName="photo" />


      <button type="submit" [disabled]="form.invalid">Register House</button>
    </form>
  `,
  styleUrls: ['./add-housing.component.css'],
})
export class AddHousingComponent implements OnInit {
  housingService = inject(HousingService);
  router = inject(Router);

  private readonly storageKey = 'addHouseFormData';

  securityOptions = [
    'alarms',
    'cameras',
    'smoke detectors',
    'reinforced doors',
  ];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    availableUnits: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
    wifi: new FormControl(false),
    laundry: new FormControl(false),
    securitySystems: new FormControl<string[]>([], Validators.required),
    photo: new FormControl(''),
  });

  ngOnInit() {
    // Si hay datos recuperalos
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const formData = JSON.parse(saved);
        this.form.patchValue(formData);
      } catch {}
    }

    // Guarda to en el localstorage
    this.form.valueChanges.subscribe((value) => {
      localStorage.setItem(this.storageKey, JSON.stringify(value));
    });
  }

  onSecuritySystemChange(event: Event) {

    const checkbox = event.target as HTMLInputElement;
    const selectedOptions = this.form.value.securitySystems ?? [];

    if (checkbox.checked) {
      this.form.patchValue({
        securitySystems: [...selectedOptions, checkbox.value],
      });

    } else {
      this.form.patchValue({
        securitySystems: selectedOptions.filter(
          (opt) => opt !== checkbox.value
        ),
      });
    }
  }

  async addHouse() {
  const formValue = this.form.value;

  const houses = await this.housingService.getAllHousingLocations();
  const maxId = houses.reduce(
    (max, loc) => (loc.id > max ? loc.id : max),
    0
  );

  const newHouse: HousingLocation = {
    id: maxId + 1,
    name: formValue.name ?? '',
    city: formValue.city ?? '',
    state: formValue.state ?? '',
    photo: formValue.photo?.trim() || 'assets/noPhoto.webp',
    availableUnits: parseInt(formValue.availableUnits ?? '0', 10),
    wifi: formValue.wifi ?? false,
    laundry: formValue.laundry ?? false,
    securitySystems: formValue.securitySystems ?? [],
    status: 'disponible',
  };

  await this.housingService.addHousingLocation(newHouse);

  localStorage.removeItem(this.storageKey);
  this.router.navigateByUrl('/');
}

}