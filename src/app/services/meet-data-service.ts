import { MeetData, MeetScore, TeamScore } from '../models/meet';
import * as Meet1 from '../../assets/meets/1.json';
import * as Meet2 from '../../assets/meets/2.json';
import * as Meet3 from '../../assets/meets/3.json';
import { MeetAggregate } from '../models/meet-aggregate';

/**
 *  Provides meet data
 */
export class MeetDataService {
  static readonly Meets : Array<MeetData> = [Meet1, Meet2, Meet3]
  static MeetAggregate : MeetAggregate

  // populate SummaryMeetDataAggregate
  static BuildMeetDataAggregates() {
    MeetDataService.MeetAggregate.Year = 2023;

    // build athlete roster
    var roster = {};

    // extract all athlete names
    MeetDataService.Meets.forEach(meet => {
      if (roster[meet.name] == undefined) {
        roster[meet.name] = meet.name
      }
    });

    for (var i = 0; i < Object.keys(roster).length; ++i) {


      };
    }
  }
