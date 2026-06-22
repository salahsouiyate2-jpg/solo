export function selectStrategy(objective: string): string {
  if (/review|trust|visibility/i.test(objective)) return "Social Proof";
  if (/repeat|retention|customer/i.test(objective)) return "Retention";
  if (/sales|revenue|orders/i.test(objective)) return "Sales Activation";
  return "Growth Strategy";
}

