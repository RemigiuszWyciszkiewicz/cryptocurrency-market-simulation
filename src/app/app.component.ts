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
  token;
  action(): void {
    this._httpClient
      .post('/api/user/signin', {
        email: 'remigiusz@wp.pl',
        password: 'fwafafa',
      })
      .subscribe((value) => (this.token = value));
  }
  redirect(): void {
    this.router.navigate(['./test'], { relativeTo: this.avtivatedRoute });
  }
  back(): void {
    this.router.navigate([''], { relativeTo: this.avtivatedRoute });
  }
}
