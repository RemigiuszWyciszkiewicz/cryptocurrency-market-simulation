import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'coin-market-cryptocurrency-details-chart',
  templateUrl: './cryptocurrency-details-chart.component.html',
  styleUrls: ['./cryptocurrency-details-chart.component.scss'],
})
export class CryptocurrencyDetailsChartComponent implements OnInit {
  @Input() data: number[][];

  ngOnInit(): void {}
}
