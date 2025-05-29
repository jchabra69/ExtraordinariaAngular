import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Provider {
  id: number;
  name: string;
  website: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private url = 'assets/providers.json';

  constructor(private http: HttpClient) {}

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.url);
  }

  getProviderById(id: number): Observable<Provider | undefined> {
    return this.getProviders().pipe(
      map(providers => providers.find(p => p.id === id))
    );
  }
}
