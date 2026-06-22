import { REASONING_CHAIN, type RecommendationInput, type RecommendationOutput } from "./types";

export function generateRecommendation(input: RecommendationInput): RecommendationOutput {
  const strongestObservation = [...input.observations].sort((a, b) => b.confidence - a.confidence)[0];
  const campaign = input.campaign_library[0];
  const benchmark = input.benchmarks[0];
  const confidence = calculateConfidence(input, strongestObservation?.confidence || 60);

  return {
    business_health: confidence >= 80 ? "strong" : confidence >= 65 ? "stable" : "needs_attention",
    best_next_move: campaign?.campaign_description || "Prepare the next money-making action.",
    why: [
      strongestObservation?.finding || "Business data shows a clear opportunity.",
      input.market_context.momentum === "favorable"
        ? "Seasonal demand is favorable."
        : "Market context is stable enough to act.",
      benchmark
        ? `${benchmark.platform} ${benchmark.metric} benchmark supports this direction.`
        : "Available examples support this recommendation.",
    ],
    expected_impact: campaign?.expected_result || "Improved customer activity and revenue potential.",
    confidence_score: confidence,
    action_label: "View Plan",
    reasoning_chain: Object.fromEntries(
      REASONING_CHAIN.map((stage) => [stage, summarizeStage(stage, input, campaign?.campaign_description)])
    ) as RecommendationOutput["reasoning_chain"],
  };
}

function calculateConfidence(input: RecommendationInput, baseConfidence: number): number {
  const trendBoost = Math.round((input.market_context.trend_score - 50) / 10);
  const learningBoost = input.results.some((result) => (result.sales || 0) > 0 || (result.roi || 0) > 0) ? 5 : 0;
  return Math.max(35, Math.min(95, baseConfidence + trendBoost + learningBoost));
}

function summarizeStage(stage: string, input: RecommendationInput, campaignDescription?: string): string {
  const profile = input.business_profile;
  const observation = input.observations[0];

  const summaries: Record<string, string> = {
    data: `${profile.business_name}, ${profile.business_type}, ${profile.city}`,
    diagnosis: observation?.finding || "Business context reviewed",
    opportunity: input.market_context.opportunities[0] || "Revenue opportunity",
    objective: profile.main_goal,
    strategy: observation?.framework || "Business growth strategy",
    campaign: campaignDescription || "Prepared campaign",
    execution: "Create a simple action plan",
    results: input.results.length ? "Use saved campaign performance" : "Track first result",
    learning: "Adjust confidence from feedback",
  };

  return summaries[stage] || "Reviewed";
}

