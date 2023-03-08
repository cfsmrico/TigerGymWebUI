import { MeetData, MeetScore, TeamScore } from '../models/meet';
import * as Meet1 from '../../assets/meets/1.json';
import * as Meet2 from '../../assets/meets/2.json';
import * as Meet3 from '../../assets/meets/3.json';
import * as Meet4 from '../../assets/meets/4.json';
import { AthleteMeetSummary, MeetAggregate } from '../models/meet-aggregate';
import * as _ from "lodash";

/**
 *  Provides meet data
 */
export class MeetDataService {
  static readonly Meets : Array<MeetData> = [Meet1, Meet2, Meet3, Meet4]
  static MeetAggregate : MeetAggregate = new MeetAggregate()

  // populate SummaryMeetDataAggregate
  static BuildMeetDataAggregates() {
    MeetDataService.MeetAggregate.Year = 2023;

    // build athlete roster
    var roster = {};

    // extract all athlete names
    MeetDataService.Meets.forEach(meet => {
      meet.scores.forEach(score => {
        if (roster[score.Name] == undefined) {
          roster[score.Name] = score.Name;
        }
      });
    });

    var aNames = _.keys(roster);
    MeetDataService.MeetAggregate.AthleteMeetSummaries = new Map<string, AthleteMeetSummary>();

    // build profile for each athlete
    aNames.forEach(aName => {
      var summary = new AthleteMeetSummary();
      summary.Name = aName;

      // iterate meets and grab totals
      this.Meets.forEach(m => {
        var matchedMeet = m.scores.find(x => x.Name == aName);  // match meet by aName

        if (matchedMeet != undefined) {
          summary.Level = matchedMeet.Level;
          summary.AATotal += matchedMeet.AA;
          summary.VaultTotal += matchedMeet.Vault;
          summary.BarsTotal += matchedMeet.Bars;
          summary.BeamTotal += matchedMeet.Beam;
          summary.FloorTotal += matchedMeet.Floor;
          summary.NumMeetsAttended += 1;

          // record personal records
          if (matchedMeet.AA > summary.BestAA)
            summary.BestAA = matchedMeet.AA;
          if (matchedMeet.Vault > summary.BestVault)
            summary.BestVault = matchedMeet.Vault;
          if (matchedMeet.Bars > summary.BestBars)
          summary.BestBars = matchedMeet.Bars;
          if (matchedMeet.Beam > summary.BestBeam)
          summary.BestBeam = matchedMeet.Beam;
          if (matchedMeet.Floor > summary.BestFloor)
          summary.BestFloor = matchedMeet.Floor;

          if (matchedMeet.AA >= 39) {
            summary.Count39PlusAA += 1;
          } else if (matchedMeet.AA >= 38) {
            summary.Count38PlusAA += 1;
          } else if (matchedMeet.AA >= 37) {
            summary.Count37PlusAA += 1;
          } else if (matchedMeet.AA >= 36) {
            summary.Count36PlusAA += 1;
          }

          if (matchedMeet.Bars >= 9.9) {
            summary.Count99PlusScores += 1;
          } else if (matchedMeet.Bars >= 9.8) {
            summary.Count98PlusScores += 1;
          } else if (matchedMeet.Bars >= 9.7) {
            summary.Count97PlusScores += 1;
          } else if (matchedMeet.Bars >= 9.6) {
            summary.Count96PlusScores += 1;
          } else if (matchedMeet.Bars >= 9.5) {
            summary.Count95PlusScores += 1;
          }

          if (matchedMeet.Beam >= 9.9) {
            summary.Count99PlusScores += 1;
          } else if (matchedMeet.Beam >= 9.8) {
            summary.Count98PlusScores += 1;
          } else if (matchedMeet.Beam >= 9.7) {
            summary.Count97PlusScores += 1;
          } else if (matchedMeet.Beam >= 9.6) {
            summary.Count96PlusScores += 1;
          } else if (matchedMeet.Beam >= 9.5) {
            summary.Count95PlusScores += 1;
          }

          if (matchedMeet.Floor >= 9.9) {
            summary.Count99PlusScores += 1;
          } else if (matchedMeet.Floor >= 9.8) {
            summary.Count98PlusScores += 1;
          } else if (matchedMeet.Floor >= 9.7) {
            summary.Count97PlusScores += 1;
          } else if (matchedMeet.Floor >= 9.6) {
            summary.Count96PlusScores += 1;
          } else if (matchedMeet.Floor >= 9.5) {
            summary.Count95PlusScores += 1;
          }

          if (matchedMeet.Vault >= 9.9) {
            summary.Count99PlusScores += 1;
          } else if (matchedMeet.Vault >= 9.8) {
            summary.Count98PlusScores += 1;
          } else if (matchedMeet.Vault >= 9.7) {
            summary.Count97PlusScores += 1;
          } else if (matchedMeet.Vault >= 9.6) {
            summary.Count96PlusScores += 1;
          } else if (matchedMeet.Vault >= 9.5) {
            summary.Count95PlusScores += 1;
          }

          // record placements
          if (matchedMeet.AARank == 1) {
            summary.NumPlacements += 1;
            summary.NumGold += 1;
          } else if (matchedMeet.AARank == 2) {
            summary.NumPlacements += 1;
            summary.NumSilver += 1;
          } else if (matchedMeet.AARank == 3) {
            summary.NumPlacements += 1;
            summary.NumBronze += 1;
          }

          // record placements
          if (matchedMeet.VaultRank == 1) {
            summary.NumPlacements += 1;
            summary.NumGold += 1;
          } else if (matchedMeet.VaultRank == 2) {
            summary.NumPlacements += 1;
            summary.NumSilver += 1;
          } else if (matchedMeet.VaultRank == 3) {
            summary.NumPlacements += 1;
            summary.NumBronze += 1;
          }

          // record placements
          if (matchedMeet.BarsRank == 1) {
            summary.NumPlacements += 1;
            summary.NumGold += 1;
          } else if (matchedMeet.BarsRank == 2) {
            summary.NumPlacements += 1;
            summary.NumSilver += 1;
          } else if (matchedMeet.BarsRank == 3) {
            summary.NumPlacements += 1;
            summary.NumBronze += 1;
          }

          // record placements
          if (matchedMeet.BeamRank == 1) {
            summary.NumPlacements += 1;
            summary.NumGold += 1;
          } else if (matchedMeet.BeamRank == 2) {
            summary.NumPlacements += 1;
            summary.NumSilver += 1;
          } else if (matchedMeet.BeamRank == 3) {
            summary.NumPlacements += 1;
            summary.NumBronze += 1;
          }

          // record placements
          if (matchedMeet.FloorRank == 1) {
            summary.NumPlacements += 1;
            summary.NumGold += 1;
          } else if (matchedMeet.FloorRank == 2) {
            summary.NumPlacements += 1;
            summary.NumSilver += 1;
          } else if (matchedMeet.FloorRank == 3) {
            summary.NumPlacements += 1;
            summary.NumBronze += 1;
          }
        }
      });

      // at this point we've grabbed totals, so we can get avg
      summary.AAAvg = summary.AATotal / summary.NumMeetsAttended;

      MeetDataService.MeetAggregate.AthleteMeetSummaries.set(aName, summary);
    });

    var allAthleteSummaries : Array<AthleteMeetSummary> = Array.from(summary.values());
    console.log('Success!');
  }
}
