import type { CampaignExample } from "./types";

export function selectCampaign(campaigns: CampaignExample[], strategy: string): CampaignExample | undefined {
  return campaigns.find((campaign) => campaign.objective.toLowerCase().includes(strategy.toLowerCase())) || campaigns[0];
}

