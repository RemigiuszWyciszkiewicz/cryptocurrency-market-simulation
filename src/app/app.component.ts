import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'coin-market',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private avtivatedRoute: ActivatedRoute) {}
  title = 'my-dream-app';

  ngOnInit(): void {}

  redirect(): void {
    this.router.navigate(['./pages'], { relativeTo: this.avtivatedRoute });
  }
}
