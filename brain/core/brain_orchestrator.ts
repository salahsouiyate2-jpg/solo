import type { BusinessProfile, CampaignExample, Benchmark, LearningResult, MarketContext, RecommendationOutput } from "./types";
import { generateRecommendation } from "./recommendation_engine";
import { swotEngine } from "../strategy/swot_engine";
import { pestelEngine } from "../strategy/pestel_engine";
import { porterEngine } from "../strategy/porter_engine";
import { personaEngine } from "../customer/persona_engine";
import { stpEngine } from "../customer/stp_engine";
import { jtbdEngine } from "../customer/jtbd_engine";
import { marketingMixEngine } from "../marketing/marketing_mix_engine";
import { customerJourneyEngine } from "../marketing/customer_journey_engine";
import { funnelEngine } from "../marketing/funnel_engine";
import { competitorEngine } from "../competition/competitor_engine";
import { benchmarkEngine } from "../competition/benchmark_engine";
import { aarrrEngine } from "../growth/aarrr_engine";
import { northStarEngine } from "../growth/north_star_engine";
import { growthLoopEngine } from "../growth/growth_loop_engine";
import { roiEngine } from "../finance/roi_engine";
import { roasEngine } from "../finance/roas_engine";
import { cacEngine } from "../finance/cac_engine";
import { clvEngine } from "../finance/clv_engine";
import { cialdiniEngine } from "../psychology/cialdini_engine";
import { pricingEngine } from "../psychology/pricing_engine";
import { behaviorEngine } from "../psychology/behavior_engine";
import { seasonalEngine } from "../seasonality/seasonal_engine";
import { iceEngine } from "../prioritization/ice_engine";
import { riceEngine } from "../prioritization/rice_engine";
import { forecastingEngine } from "../prediction/forecasting_engine";

const specialistEngines = [
  swotEngine,
  pestelEngine,
  porterEngine,
  personaEngine,
  stpEngine,
  jtbdEngine,
  marketingMixEngine,
  customerJourneyEngine,
  funnelEngine,
  competitorEngine,
  benchmarkEngine,
  aarrrEngine,
  northStarEngine,
  growthLoopEngine,
  roiEngine,
  roasEngine,
  cacEngine,
  clvEngine,
  cialdiniEngine,
  pricingEngine,
  behaviorEngine,
  seasonalEngine,
  iceEngine,
  riceEngine,
  forecastingEngine,
];

export type BrainInput = {
  business_profile: BusinessProfile;
  market_context: MarketContext;
  campaign_library: CampaignExample[];
  benchmarks: Benchmark[];
  results: LearningResult[];
};

export function runSoloBrain(input: BrainInput): RecommendationOutput {
  const observations = specialistEngines.flatMap((engine) => engine.analyze(input.business_profile));

  return generateRecommendation({
    ...input,
    observations,
  });
}

