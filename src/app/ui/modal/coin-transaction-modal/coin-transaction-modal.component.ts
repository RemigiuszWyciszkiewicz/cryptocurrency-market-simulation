import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cryptocurrency, TransactionType } from '@coin-market/data-access/models';
import { NbDialogRef } from '@nebular/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'coin-market-coin-transaction-modal',
  templateUrl: './coin-transaction-modal.component.html',
  styleUrls: ['./coin-transaction-modal.component.scss'],
})
export class CoinTransactionModalComponent implements OnInit {
  @Input() usdLimit: number;
  @Input() quantityLimit: number;
  @Input() transactionType: TransactionType;
  @Input() cryptocurrency: Cryptocurrency;

  get cryptoquantityControl(): AbstractControl {
    return this.formGroup.get('cryptoquantity');
  }

  get transactionValue(): number {
    return this.countTransactionValue(this.cryptoquantityControl.value);
  }

  showLimitExceededStatement$: Observable<boolean>;

  formGroup: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _ref: NbDialogRef<CoinTransactionModalComponent>) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({ cryptoquantity: ['', [Validators.min(0), Validators.max(this.quantityLimit)]] });

    this.showLimitExceededStatement$ = this.cryptoquantityControl.valueChanges.pipe(
      map(() => this.transactionValue > this.usdLimit)
    );
  }

  buy(): void {
    if (this.cryptoquantityControl.valid) {
      this._ref.close({
        quantity: Number(this.cryptoquantityControl.value),
        value: this.transactionValue,
        cryptocurrency: this.cryptocurrency.id,
        price: this.cryptocurrency.current_price,
        type: TransactionType.PURCHASE,
      });
    }
  }

  countTransactionValue(value: number): number {
    return this.cryptocurrency.current_price * Number(value);
  }

  cancel(): void {
    this._ref.close();
  }
}
