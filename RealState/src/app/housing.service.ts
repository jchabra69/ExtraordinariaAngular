import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  private housingLocations: HousingLocation[] = [];

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    if (this.housingLocations.length === 0) {
      const data = await fetch(this.url);
      this.housingLocations = await data.json() ?? [];
    }
    return this.housingLocations;
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  addHousingLocation(location: HousingLocation) {
    this.housingLocations.push(location);
    console.log('New house added:', location);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}

