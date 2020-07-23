import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'coin-market-cryptocurrency-details',
  templateUrl: './cryptocurrency-details.component.html',
  styleUrls: ['./cryptocurrency-details.component.scss'],
})
export class CryptocurrencyDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('sub module');
  }
}
