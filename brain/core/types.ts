export type ReasoningStage =
  | "data"
  | "diagnosis"
  | "opportunity"
  | "objective"
  | "strategy"
  | "campaign"
  | "execution"
  | "results"
  | "learning";

export const REASONING_CHAIN: ReasoningStage[] = [
  "data",
  "diagnosis",
  "opportunity",
  "objective",
  "strategy",
  "campaign",
  "execution",
  "results",
  "learning",
];

export type BusinessProfile = {
  id: string;
  business_name: string;
  business_type: string;
  city: string;
  target_customer: string[];
  main_goal: string;
  budget_level: "low" | "medium" | "high";
  preferred_language: string;
  social_channels: string[];
  instagram_handle?: string;
  whatsapp_number?: string;
};

export type MarketContext = {
  season: string;
  momentum: "quiet" | "stable" | "favorable" | "high";
  trend_score: number;
  opportunities: string[];
};

export type SpecialistObservation = {
  specialist:
    | "strategic"
    | "customer"
    | "marketing"
    | "growth"
    | "financial"
    | "psychology"
    | "competition"
    | "seasonal"
    | "priority"
    | "prediction"
    | "learning";
  framework: string;
  stage: Exclude<ReasoningStage, "campaign" | "execution">;
  finding: string;
  evidence: string[];
  confidence: number;
  hidden: true;
};

export type CampaignExample = {
  id: string;
  industry: string;
  objective: string;
  platform: string;
  offer_type: string;
  caption_style: string;
  cta: string;
  season: string;
  source: "Meta Ad Library" | "Internal data" | "Manual examples";
  campaign_description: string;
  why_it_worked: string;
  expected_result: string;
};

export type Benchmark = {
  id: string;
  industry: string;
  platform: string;
  metric: string;
  average_value: number;
  good_value: number;
  source: "HubSpot" | "Mailchimp" | "Internal benchmarks";
};

export type RecommendationInput = {
  business_profile: BusinessProfile;
  market_context: MarketContext;
  observations: SpecialistObservation[];
  campaign_library: CampaignExample[];
  benchmarks: Benchmark[];
  results: LearningResult[];
};

export type RecommendationOutput = {
  business_health: "strong" | "stable" | "needs_attention";
  best_next_move: string;
  why: string[];
  expected_impact: string;
  confidence_score: number;
  action_label: string;
  reasoning_chain: Record<ReasoningStage, string>;
};

export type LearningResult = {
  campaign_id: string;
  impressions?: number;
  reach?: number;
  clicks?: number;
  leads?: number;
  sales?: number;
  roi?: number;
  owner_feedback?: "worked" | "neutral" | "did_not_work";
};

