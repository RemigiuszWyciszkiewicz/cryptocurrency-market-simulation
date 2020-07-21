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
  @Input() title = 'Transaction';
  @Input() usdLimit: number;
  @Input() quantityLimit: number;
  @Input() cryptocurrency: Cryptocurrency;

  get cryptoAmountControl(): AbstractControl {
    return this.formGroup.get('cryptoAmount');
  }

  get transactionValue(): number {
    return this.countTransactionValue(this.cryptoAmountControl.value);
  }

  showLimitExceededStatement$: Observable<boolean>;

  formGroup: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _ref: NbDialogRef<CoinTransactionModalComponent>) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({ cryptoAmount: ['', [Validators.min(0), Validators.max(this.quantityLimit)]] });

    this.showLimitExceededStatement$ = this.cryptoAmountControl.valueChanges.pipe(
      map(() => this.transactionValue > this.usdLimit)
    );
  }

  buy(): void {
    if (this.cryptoAmountControl.valid) {
      this._ref.close({
        amount: Number(this.cryptoAmountControl.value),
        value: this.transactionValue,
        cryptocurrency: this.cryptocurrency.id,
        price: this.cryptocurrency.current_price,
        type: TransactionType.BUY,
      });
    }
  }

  countTransactionValue(value: number): number {
    return Number(Number(this.cryptocurrency.current_price * +value).toFixed(2));
  }

  cancel(): void {
    this._ref.close();
  }

  roundToX(num: number, X: number): number {
    return +(Math.round(num + Number('e+' + X)) + 'e-' + X);
  }
}
