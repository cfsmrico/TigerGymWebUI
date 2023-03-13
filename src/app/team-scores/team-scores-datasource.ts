import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MeetDataService } from '../services/meet-data-service';
import { AthleteMeetSummary } from '../models/meet-aggregate';
import { TeamScoreSummary } from '../models/team-score-summary';

/**
 * Data source for the TeamScores view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TeamScoresDataSource extends DataSource<TeamScoreSummary> {
  data: TeamScoreSummary[] | undefined = undefined;
  paginator: MatPaginator | undefined = undefined;
  sort: MatSort | undefined = undefined;

  constructor() {
    super();
    MeetDataService.BuildTeamScoresSummary();
    var allTeamSummaries = MeetDataService.TeamScoresSummary;
    this.data = allTeamSummaries;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TeamScoreSummary[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up duri
   * ng connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TeamScoreSummary[]): TeamScoreSummary[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TeamScoreSummary[]): TeamScoreSummary[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'Name': return compare(a.Name, b.Name, isAsc);
        case 'Level': return compare(a.Level, b.Level, isAsc);
        case 'AA': return compare(a.AA, b.AA, isAsc);
        case 'Vault': return compare(a.Vault, b.Vault, isAsc);
        case 'Bars': return compare(a.Bars, b.Bars, isAsc);
        case 'Beam': return compare(a.Beam, b.Beam, isAsc);
        case 'Floor': return compare(a.Floor, b.Floor, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
