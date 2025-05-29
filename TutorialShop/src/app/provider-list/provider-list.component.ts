import { Component, OnInit } from '@angular/core';
import { ProviderService, Provider } from '../services/provider.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  providers: Provider[] = [];

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers;
    });
  }
}
