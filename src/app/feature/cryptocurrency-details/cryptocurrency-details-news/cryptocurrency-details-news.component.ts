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

  ngOnInit(): void {
    console.log(this.encode_utf8(this.data.body.replace('[', '').replace(']', ' ')));
  }

  // Original
  encode_utf8(s) {
    return unescape(encodeURIComponent(s));
  }

  decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }
}
