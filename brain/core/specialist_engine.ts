import type { BusinessProfile, SpecialistObservation } from "./types";

export type SpecialistEngine = {
  name: SpecialistObservation["specialist"];
  framework: string;
  analyze: (profile: BusinessProfile) => SpecialistObservation[];
};

export function createSpecialistEngine(
  name: SpecialistObservation["specialist"],
  framework: string,
  stage: SpecialistObservation["stage"],
  defaultFinding: string,
): SpecialistEngine {
  return {
    name,
    framework,
    analyze(profile) {
      return [
        {
          specialist: name,
          framework,
          stage,
          finding: defaultFinding,
          evidence: [
            `${profile.business_type} in ${profile.city}`,
            `Main goal: ${profile.main_goal}`,
          ],
          confidence: 60,
          hidden: true,
        },
      ];
    },
  };
}

