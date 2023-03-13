import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AthleteMeetSummary } from '../models/meet-aggregate';
import { TeamScoreSummary } from '../models/team-score-summary';
import { TeamScoresDataSource } from './team-scores-datasource';

@Component({
  selector: 'app-team-scores',
  templateUrl: './team-scores.component.html',
  styleUrls: ['./team-scores.component.css']
})
export class TeamScoresComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TeamScoreSummary>;
  dataSource: TeamScoresDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Name', 'Level', 'AA', 'Vault', 'Bars', 'Beam', 'Floor'];

  constructor() {
    this.dataSource = new TeamScoresDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
