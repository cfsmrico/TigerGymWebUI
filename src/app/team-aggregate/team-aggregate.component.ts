import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MeetScore } from '../models/meet';
import { AthleteMeetSummary } from '../models/meet-aggregate';
import { TeamAggregateDataSource, TeamAggregateItem } from './team-aggregate-datasource';
import { MeetDataService } from '../services/meet-data-service';

@Component({
  selector: 'app-team-aggregate',
  templateUrl: './team-aggregate.component.html',
  styleUrls: ['./team-aggregate.component.css']
})
export class TeamAggregateComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AthleteMeetSummary>;
  dataSource: TeamAggregateDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Name', 'Level', 'AAAvg', 'BestAA', 'BestVault', 'BestBars', 'BestBeam', 'BestFloor', 'NumPlacements'];

  constructor() {
    this.dataSource = new TeamAggregateDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
