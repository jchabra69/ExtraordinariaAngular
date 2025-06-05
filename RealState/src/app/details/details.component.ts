import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>

      <!-- Mostrar status -->
      <p class="listing-status">
        <strong>Status:</strong> {{ housingLocation?.status }}
      </p>

      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>

        <h3>Security Systems</h3>
        <ng-container
          *ngIf="housingLocation?.securitySystems?.length; else noSecurity"
        >
          <ul>
            <li *ngFor="let system of housingLocation?.securitySystems">
              {{ system }}
            </li>
          </ul>
        </ng-container>
        <ng-template #noSecurity>
          <p><em>It doesn't have security systems</em></p>
        </ng-template>
      </section>

      <section class="listing-apply">
        <h2 class="section-heading">
          {{
            canApply()
              ? 'Apply now to live here'
              : 'Not enough units available'
          }}
        </h2>
        <form
          [formGroup]="applyForm"
          (submit)="submitApplication()"
          [class.disabled]="!canApply()"
        >
          <label for="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            formControlName="firstName"
            [disabled]="!canApply()"
          />

          <label for="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            formControlName="lastName"
            [disabled]="!canApply()"
          />

          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            [disabled]="!canApply()"
          />

          <button
            type="submit"
            class="primary"
            [disabled]="!canApply() || applyForm.invalid"
          >
            Apply now
          </button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }

  canApply(): boolean {
    return (
      this.housingLocation?.status === 'disponible' &&
      this.housingLocation?.availableUnits! > 0
    );
  }

  async submitApplication() {
    if (!this.housingLocation || !this.canApply()) return;

    console.log('Actualizando casa:', this.housingLocation.id);

    this.housingLocation.availableUnits -= 1;
    if (this.housingLocation.availableUnits === 0) {
      this.housingLocation.status = 'reservado';
    }

    try {
      await this.housingService.updateHousingLocation(this.housingLocation);
    } catch (error) {
      console.error('Error actualizando la casa:', error);
    }

    this.applyForm.reset();
  }
}
