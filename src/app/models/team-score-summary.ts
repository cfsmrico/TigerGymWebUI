import { TeamScore } from "./meet";

export class TeamAggregate {
  Year: number = 2023
  TeamScoreSummaries: Map<number, TeamScoreSummary> // k: number, v: TeamScoreSummary
  Count: number = 0
}

/**
 *  Team score summary
 */
export class TeamScoreSummary extends TeamScore {
  Name: string = ''
  Date: string = ''
}
