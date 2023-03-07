/**
 *  Meet scores aggregated across a year
 */
export class MeetAggregate {
  Year: number
  AthleteMeetSummaries : Map<string, AthleteMeetSummary> // k: name, v: AthleteMeetSummary
}

// Summary of an athlete's performances across a year
export class AthleteMeetSummary {
  Name: string = ''
  Level: string = ''
  NumMeetsAttended: number = 0
  AATotal: number = 0.0
  VaultTotal: number = 0.0
  BarsTotal: number = 0.0
  BeamTotal: number = 0.0
  FloorTotal: number = 0.0
  AAAvg: number = 0.0
  BestAA: number = 0.0
  BestVault: number = 0.0
  BestBars: number = 0.0
  BestBeam: number = 0.0
  BestFloor: number = 0.0
  NumPlacements: number = 0 // 1-3
  NumGold: number = 0
  NumSilver: number = 0
  NumBronze: number = 0
  Count36PlusAA: number = 0     // [3.6, 3.7)
  Count37PlusAA: number = 0     // [3.7, 3.8)
  Count38PlusAA: number = 0     // [3.8, 3.9)
  Count39PlusAA: number = 0     // 3.9+
  CountTop100Scores: number = 0
  Count95PlusScores: number = 0 // [9.5, 8.6)
  Count96PlusScores: number = 0 // [9.6, 9.7)
  Count97PlusScores: number = 0 // [9.7, 9.7)
  Count98PlusScores: number = 0 // [9.8, 9.9)
  Count99PlusScores: number = 0 // 9.9+
}
