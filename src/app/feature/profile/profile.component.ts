import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@coin-market/core/authorization';

@Component({
  selector: 'coin-market-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private readonly _httpClinet: HttpClient, private userAut: AuthService) {}

  ngOnInit(): void {}
}
