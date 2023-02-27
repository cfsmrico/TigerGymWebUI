import { Component } from '@angular/core';
import { GlobalDataService } from './services/global-data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TigerGymWebUI';
  public aggregate : string = ''

  constructor() {
    console.log('app component constructing...')
    this.readJson()
    this.buildAggregateModels()
    GlobalDataService.AggregateItem = 'some shared string here'
  }

  readJson() {
    console.log('read json');
  }

  buildAggregateModels() {
    console.log('build aggregate models')
  }
}
