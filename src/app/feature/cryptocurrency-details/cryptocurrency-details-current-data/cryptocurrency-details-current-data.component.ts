import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { CryptocurrenciesQuery } from '@coin-market/data-access/cryptocurrencies';
import { Cryptocurrency, CryptocurrencyDetails } from '@coin-market/data-access/models';
import { TransactionsService } from '@coin-market/data-access/transactions';

@Component({
  selector: 'coin-market-cryptocurrency-details-current-data',
  templateUrl: './cryptocurrency-details-current-data.component.html',
  styleUrls: ['./cryptocurrency-details-current-data.component.scss'],
})
export class CryptocurrencyDetailsCurrentDataComponent implements AfterViewInit {
  get buttonText(): string {
    return 'BUY ' + this.data.name.toUpperCase();
  }

  constructor(
    @Inject(DOCUMENT) private readonly _document: any,
    private readonly _transactionsService: TransactionsService,
    private readonly _cryptocurrenciesQuery: CryptocurrenciesQuery
  ) {}

  @ViewChild('description', { static: false }) descriptionContainer: ElementRef;

  @Input()
  data: CryptocurrencyDetails;

  ngAfterViewInit(): void {
    const tmpElement = this._document.createElement('div');

    // TODO Security issue.
    tmpElement.innerHTML = this.data.description;
    this.descriptionContainer.nativeElement.textContent = this.extractHeadOfText(tmpElement.textContent, 5);
  }

  buy(): void {
    this._transactionsService.buy(this.getCryprocurencyFromStore());
  }

  getCryprocurencyFromStore(): Cryptocurrency {
    return this._cryptocurrenciesQuery.getCryptocurrency(this.data.id);
  }

  extractHeadOfText(text: string, sentencesNumber: number): string {
    let lastIndex = 0;

    for (let i = 0; i < sentencesNumber; i++) {
      lastIndex = text.indexOf('.', lastIndex);
      lastIndex++;
    }
    return text.substring(0, lastIndex);
  }
}
