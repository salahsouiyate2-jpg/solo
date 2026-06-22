import type { SpecialistObservation } from "./types";

export function identifyOpportunities(observations: SpecialistObservation[]): string[] {
  return observations
    .filter((observation) => observation.stage === "opportunity")
    .sort((a, b) => b.confidence - a.confidence)
    .map((observation) => observation.finding);
}

