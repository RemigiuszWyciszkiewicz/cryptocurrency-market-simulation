import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cryptocurrency, TransactionType } from '@coin-market/data-access/models';
import { NbDialogRef } from '@nebular/theme';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-coin-transaction-modal',
  templateUrl: './coin-transaction-modal.component.html',
  styleUrls: ['./coin-transaction-modal.component.scss'],
})
export class CoinTransactionModalComponent implements OnInit {
  get cryptoquantityControl(): AbstractControl {
    return this.formGroup.get('cryptoquantity');
  }

  get transactionValue(): number {
    return this.countTransactionValue(this.cryptoquantityControl.value);
  }

  get buttonText(): string {
    return `${this.transactionType === TransactionType.PURCHASE ? 'BUY' : 'SELL'} ${this.cryptocurrency.name} `;
  }

  get showMaxButton(): boolean {
    return this.transactionType === TransactionType.SALE;
  }

  @Input() usdLimit: number;
  @Input() quantityLimit: number;
  @Input() transactionType: TransactionType;
  @Input() cryptocurrency: Cryptocurrency;

  formGroup: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _ref: NbDialogRef<CoinTransactionModalComponent>) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({ cryptoquantity: ['', [Validators.min(0), Validators.max(this.quantityLimit)]] });

    this.cryptoquantityControl.valueChanges
      .pipe(
        map(() => this.transactionValue > this.usdLimit),
        tap((value) => {
          value ? this.cryptoquantityControl.setErrors({ moneyExceed: false }) : this.cryptoquantityControl.setErrors(null);
        })
      )
      .subscribe();
  }

  buy(): void {
    if (this.cryptoquantityControl.valid) {
      this._ref.close({
        quantity: Number(this.cryptoquantityControl.value),
        value: this.transactionValue,
        cryptocurrency: this.cryptocurrency.id,
        price: this.cryptocurrency.current_price,
        type: this.transactionType,
      });
    }
  }

  countTransactionValue(value: number): number {
    return this.cryptocurrency.current_price * Number(value);
  }

  max(): void {
    this.formGroup.get('cryptoquantity').setValue(this.quantityLimit);
  }

  cancel(): void {
    this._ref.close();
  }
}
