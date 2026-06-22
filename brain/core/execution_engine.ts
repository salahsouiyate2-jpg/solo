export function createExecutionPlan(bestNextMove: string): string[] {
  return [
    `Prepare: ${bestNextMove}`,
    "Assign the simplest owner action",
    "Track one measurable result",
  ];
}

