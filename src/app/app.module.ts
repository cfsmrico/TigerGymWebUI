import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TeamAggregateComponent } from './team-aggregate/team-aggregate.component';
import { MeetDataService } from './services/meet-data-service';
import { TeamScoresComponent } from './team-scores/team-scores.component';

const appRoutes: Routes = [
  { path: '', component: TeamAggregateComponent },
  { path: 'teamScores', component: TeamScoresComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TeamAggregateComponent,
    TeamScoresComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here
  ],
  providers: [MeetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
