import { Component, OnInit } from '@angular/core';
import { Ranking } from '@coin-market/data-access/models';
import { RankingQuery, RankingService, RankingStore } from '@coin-market/data-access/ranking';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  constructor(
    private readonly _rankingService: RankingService,
    private readonly _rankingStore: RankingStore,
    private readonly _rankingQuery: RankingQuery
  ) {}
  ranking$: Observable<Ranking[]> = this._rankingQuery.selectAll();
  loading$: Observable<boolean> = this._rankingQuery.selectLoading();
  ngOnInit(): void {
    if (!this._rankingQuery.hasEntity()) {
      this.fetchRanking();
    }
  }

  fetchRanking(): void {
    this._rankingService
      .getRanking()
      .pipe(
        tap((value) => {
          this._rankingStore.set(value);
        })
      )
      .subscribe();
  }
}
