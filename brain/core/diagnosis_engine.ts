import type { SpecialistObservation } from "./types";

export function diagnose(observations: SpecialistObservation[]): string[] {
  return observations
    .filter((observation) => observation.stage === "diagnosis")
    .sort((a, b) => b.confidence - a.confidence)
    .map((observation) => observation.finding);
}

