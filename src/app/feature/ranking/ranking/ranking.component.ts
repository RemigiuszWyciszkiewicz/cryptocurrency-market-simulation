import { Component, OnInit } from '@angular/core';
import { Ranking } from '@coin-market/data-access/models';
import { RankingService } from '@coin-market/data-access/ranking';

@Component({
  selector: 'coin-market-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  constructor(private readonly _rankingService: RankingService) {}
  ranking: Ranking[];
  ngOnInit(): void {
    this._rankingService.getRanking().subscribe((value: Ranking[]) => {
      this.ranking = value;
    });
  }
}
