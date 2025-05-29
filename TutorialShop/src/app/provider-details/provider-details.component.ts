import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService, Provider } from '../services/provider.service';

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.css']
})
export class ProviderDetailsComponent implements OnInit {
  provider: Provider | undefined;

  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const providerIdFromRoute = Number(routeParams.get('providerId'));

    this.providerService.getProviderById(providerIdFromRoute).subscribe(provider => {
      this.provider = provider;
    });
  }
}
