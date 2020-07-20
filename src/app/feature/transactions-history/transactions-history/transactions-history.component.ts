import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@coin-market/core/authorization';
import { Transaction } from '@coin-market/data-access/models';
import { TransactionsService } from '@coin-market/data-access/transactions';
import { Observable } from 'rxjs';

@Component({
  selector: 'coin-market-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent implements OnInit {
  transaction$: Observable<Transaction[]>;

  constructor(
    private readonly _transactionService: TransactionsService,
    private readonly _tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.transaction$ = this._transactionService.getAllTransactions(this._tokenStorageService.getId());
  }
}
