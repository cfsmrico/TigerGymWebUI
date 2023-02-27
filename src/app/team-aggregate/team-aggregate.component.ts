import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MeetScore } from '../models/meet';
import { TeamAggregateDataSource, TeamAggregateItem } from './team-aggregate-datasource';
import { SharedService } from '../services/shared-service';

@Component({
  selector: 'app-team-aggregate',
  templateUrl: './team-aggregate.component.html',
  styleUrls: ['./team-aggregate.component.css']
})
export class TeamAggregateComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MeetScore>;
  dataSource: TeamAggregateDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Name', 'Level', 'Division', 'Vault', 'VaultRank', 'Bars', 'BarsRank', 'Beam', 'BeamRank', 'Floor', 'FloorRank', 'AA', 'AARank'];

  constructor() {
    this.dataSource = new TeamAggregateDataSource();
    console.log(SharedService.AggregateItem)
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
