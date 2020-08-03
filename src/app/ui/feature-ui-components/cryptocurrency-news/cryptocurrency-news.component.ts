import { Component, Input, OnInit } from '@angular/core';
import { News } from '@coin-market/data-access/models';

@Component({
  selector: 'coin-market-cryptocurrency-news',
  templateUrl: './cryptocurrency-news.component.html',
  styleUrls: ['./cryptocurrency-news.component.scss'],
})
export class CryptocurrencyNewsComponent implements OnInit {
  @Input() data: News;
  constructor() {}

  ngOnInit(): void {}
}
