export class MeetData {
  url: string = ''
  name: string = ''
  start: Date = new Date
  end: Date = new Date
  scores: MeetScore[] = []
  team: TeamScore[] = []
}

export class MeetScore {
  Name: string = ''
  Level: string = ''
  Division: string = ''
  Vault: number = 0.0
  VaultRank: number = 0
  Bars: number = 0.0
  BarsRank: number = 0
  Beam: number = 0.0
  BeamRank: number = 0
  Floor: number = 0.0
  FloorRank: number = 0
  AA: number = 0.0
  AARank: number = 0
}

export class TeamScore {
  Order: number = 0
  Level: string = ''
  Vault: number = 0.0
  VaultRank: number = 0
  Bars: number = 0.0
  BarsRank: number = 0
  Beam: number = 0.0
  BeamRank: number = 0
  Floor: number = 0.0
  FloorRank: number = 0
  AA: number = 0.0
  AARank: number = 0
}