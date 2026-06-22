export function selectObjective(mainGoal: string, opportunity: string): string {
  return opportunity ? `${mainGoal}: ${opportunity}` : mainGoal;
}

