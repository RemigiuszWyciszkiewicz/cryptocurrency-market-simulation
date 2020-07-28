import { Component, Input, OnInit } from '@angular/core';
import { News } from '@coin-market/data-access/models';

@Component({
  selector: 'coin-market-cryptocurrency-details-news',
  templateUrl: './cryptocurrency-details-news.component.html',
  styleUrls: ['./cryptocurrency-details-news.component.scss'],
})
export class CryptocurrencyDetailsNewsComponent implements OnInit {
  @Input() data: News;
  constructor() {}

  ngOnInit(): void {}
}
