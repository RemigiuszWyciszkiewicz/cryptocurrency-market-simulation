import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cryptocurrency, TransactionType } from '@coin-market/data-access/models';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'coin-market-coin-transaction-modal',
  templateUrl: './coin-transaction-modal.component.html',
  styleUrls: ['./coin-transaction-modal.component.scss'],
})
export class CoinTransactionModalComponent implements OnInit {
  @Input() title = 'Transaction';
  @Input() cryptocurrency: Cryptocurrency;

  get cryptoAmountControl(): AbstractControl {
    return this.formGroup.get('cryptoAmount');
  }

  get transactionValue(): number {
    return Number(Number(this.cryptocurrency.current_price * +this.cryptoAmountControl.value).toFixed(2));
  }

  formGroup: FormGroup;
  constructor(private readonly _formBuilder: FormBuilder, private readonly _ref: NbDialogRef<CoinTransactionModalComponent>) {
    this.formGroup = this._formBuilder.group({ cryptoAmount: ['', [Validators.min(0)]] });
  }

  buy(): void {
    if (this.cryptoAmountControl.valid) {
      this._ref.close({
        amount: this.cryptoAmountControl.value,
        value: this.transactionValue,
        cryptocurrency: this.cryptocurrency.id,
        price: this.cryptocurrency.current_price,
        type: TransactionType.BUY,
      });
    }
  }

  cancel(): void {
    this._ref.close();
  }
  ngOnInit(): void {}

  roundToX(num: number, X: number): number {
    return +(Math.round(num + Number('e+' + X)) + 'e-' + X);
  }
}
