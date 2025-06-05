import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  private housingLocations: HousingLocation[] = [];

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    if (this.housingLocations.length === 0) {
      const data = await fetch(this.url);
      this.housingLocations = (await data.json()) ?? [];
    }
    return this.housingLocations;
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  async addHousingLocation(location: HousingLocation): Promise<void> {

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });

    if (!response.ok) {
      throw new Error('Error al añadir la nueva vivienda');
    }

  }
  

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }

  async updateHousingLocation(location: HousingLocation): Promise<void> {
  const response = await fetch(`${this.url}/${location.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(location),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la vivienda');
  }
}



}
