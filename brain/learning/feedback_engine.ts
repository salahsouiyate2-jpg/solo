import type { LearningResult } from "../core/types";

export function calculateLearningAdjustment(results: LearningResult[]): number {
  if (!results.length) return 0;
  const positiveSignals = results.filter((result) => (result.sales || 0) > 0 || (result.roi || 0) > 0 || result.owner_feedback === "worked");
  const negativeSignals = results.filter((result) => result.owner_feedback === "did_not_work");
  return Math.max(-10, Math.min(10, positiveSignals.length * 3 - negativeSignals.length * 4));
}

