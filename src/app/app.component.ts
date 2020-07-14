import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-dream-app';
  constructor(
    private _httpClient: HttpClient,
    private router: Router,
    private avtivatedRoute: ActivatedRoute
  ) {}

  action(): void {
    this._httpClient.get('/api/cryptocurrencies/all').subscribe(console.log);
  }
  redirect(): void {
    this.router.navigate(['./home'], { relativeTo: this.avtivatedRoute });
  }
  back(): void {
    this.router.navigate([''], { relativeTo: this.avtivatedRoute });
  }
}
