import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptocurrencyService } from '@coin-market/data-access/cryptocurrency';
import { CryptocurrencyDetails } from '@coin-market/data-access/models';

@Component({
  selector: 'coin-market-cryptocurrency-details',
  templateUrl: './cryptocurrency-details.component.html',
  styleUrls: ['./cryptocurrency-details.component.scss'],
})
export class CryptocurrencyDetailsComponent implements OnInit {
  cryptocurrencyDetails: CryptocurrencyDetails;

  constructor(
    private readonly _cryprocurrenciesService: CryptocurrencyService,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  get id() {
    return this._activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this._cryprocurrenciesService.getCryptocurrencyDetails(this.id).subscribe((value: CryptocurrencyDetails) => {
      this.cryptocurrencyDetails = value;
    });
  }
}
