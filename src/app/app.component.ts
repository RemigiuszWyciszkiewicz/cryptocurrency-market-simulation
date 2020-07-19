import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'coin-market',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router, private avtivatedRoute: ActivatedRoute) {}

  redirect(): void {
    this.router.navigate(['./pages'], { relativeTo: this.avtivatedRoute });
  }
}
