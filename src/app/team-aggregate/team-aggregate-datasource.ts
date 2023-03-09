import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MeetData, MeetScore, TeamScore } from '../models/meet';
import { MeetDataService } from '../services/meet-data-service';
import { AthleteMeetSummary, MeetAggregate } from '../models/meet-aggregate';

// TODO: Replace this with your own data model type
export interface TeamAggregateItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TeamAggregateItem[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
];

/**
 * Data source for the TeamAggregate view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TeamAggregateDataSource extends DataSource<AthleteMeetSummary> {
  data: AthleteMeetSummary[] | undefined = undefined;
  paginator: MatPaginator | undefined = undefined;
  sort: MatSort | undefined = undefined;

  constructor() {
    super();
    MeetDataService.BuildMeetDataAggregates();
    var allAthleteSummaries = MeetDataService.AthleteMeetSummary;
    this.data = allAthleteSummaries;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AthleteMeetSummary[]> {
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
  private getPagedData(data: AthleteMeetSummary[]): AthleteMeetSummary[] {
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
  private getSortedData(data: AthleteMeetSummary[]): AthleteMeetSummary[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'Name': return compare(a.Name, b.Name, isAsc);
        case 'Level': return compare(a.Level, b.Level, isAsc);
        case 'AAAvg': return compare(a.AAAvg, b.AAAvg, isAsc);
        case 'BestAA': return compare(a.BestAA, b.BestAA, isAsc);
        case 'BestVault': return compare(a.BestVault, b.BestVault, isAsc);
        case 'BestBars': return compare(a.BestBars, b.BestBars, isAsc);
        case 'BestBeam': return compare(a.BestBeam, b.BestBeam, isAsc);
        case 'BestFloor': return compare(a.BestFloor, b.BestFloor, isAsc);
        case 'NumPlacements': return compare(a.NumPlacements, b.NumPlacements, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
