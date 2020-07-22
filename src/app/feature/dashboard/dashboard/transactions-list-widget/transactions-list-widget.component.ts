import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@coin-market/data-access/models';

@Component({
  selector: 'coin-market-transactions-list-widget',
  templateUrl: './transactions-list-widget.component.html',
  styleUrls: ['./transactions-list-widget.component.scss'],
})
export class TransactionsListWidgetComponent implements OnInit {
  constructor(private readonly _router: Router, private readonly _activatedRoute: ActivatedRoute) {}

  @Input() loading = true;
  @Input() data: Transaction[];
  @Input() error: HttpErrorResponse;

  ngOnInit(): void {}

  redirectToFullTransactionList(): void {
    this._router.navigate(['../pages/transactions-history']);
  }
}
