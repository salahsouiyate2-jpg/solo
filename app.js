const pages = [
  {
    id: "today",
    label: "Aujourd'hui",
    icon: "M8 2v3m8-3v3M4 9h16M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3 9 2 2 5-5",
    kicker: "Focus",
    heading: "Aujourd'hui",
    description: "Choose the business outcome you want SOLO to improve.",
  },
  {
    id: "campaigns",
    label: "Campagnes",
    icon: "M3 11v2a2 2 0 0 0 2 2h2l4 4V5L7 9H5a2 2 0 0 0-2 2Zm15.5-3.5a5 5 0 0 1 0 9M21 5a9 9 0 0 1 0 14",
    kicker: "Marketing",
    heading: "Campaigns foundation",
    description: "A premium placeholder for campaign planning, launch, and performance review.",
  },
  {
    id: "customers",
    label: "Customers",
    icon: "M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m11-10a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm8 10v-2a4 4 0 0 0-3-3.87m-2-12a4 4 0 0 1 0 7.75",
    kicker: "Relationships",
    heading: "Customers foundation",
    description: "A focused placeholder for customer relationships, follow-ups, and opportunities.",
  },
  {
    id: "studio",
    label: "Studio",
    icon: "M15 10 21 7v10l-6-3v-4ZM3 6h12v12H3V6Z",
    kicker: "Content",
    heading: "Studio foundation",
    description: "A clean placeholder for content planning, capture, and prepared marketing assets.",
  },
  {
    id: "results",
    label: "Résultats",
    icon: "M4 19V5m0 14h16M8 16v-5m4 5V8m4 8v-7",
    kicker: "Progress",
    heading: "Results foundation",
    description: "A simple results view with optional detail.",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: "M8 2v3m8-3v3M4 9h16M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
    kicker: "Coming",
    heading: "Calendar foundation",
    description: "A quiet planning overview for automatic marketing events.",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Zm8-3.5a7.8 7.8 0 0 0-.09-1.2l2.02-1.57-2-3.46-2.38.96a8.24 8.24 0 0 0-2.07-1.2L15.12 3h-4l-.36 2.53a8.24 8.24 0 0 0-2.07 1.2l-2.38-.96-2 3.46 2.02 1.57a7.8 7.8 0 0 0 0 2.4L4.31 14.77l2 3.46 2.38-.96a8.24 8.24 0 0 0 2.07 1.2l.36 2.53h4l.36-2.53a8.24 8.24 0 0 0 2.07-1.2l2.38.96 2-3.46-2.02-1.57c.06-.39.09-.79.09-1.2Z",
    kicker: "Business",
    heading: "Settings",
    description: "Business profile and demo controls.",
  },
];

const navList = document.querySelector("#nav-list");
const pageTitle = document.querySelector("#page-title");
const contentStage = document.querySelector("#content-stage");
let demoPanel;
let demoBusinessStage = "active";
let routeContext = {};

const DEMO_STATE_KEY = "solo-pizzeria-demo-state";

function safeStorageGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeStorageSet(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch (error) {
    // Demo still works in memory when browser storage is unavailable.
  }
}

function safeStorageRemove(storage, key) {
  try {
    storage.removeItem(key);
  } catch (error) {
    // Storage may be unavailable in some file/browser contexts.
  }
}

function defaultStudioMission() {
  return {
    id: "cheese-pull-reel",
    created: true,
    name: "Cheese Pull Reel",
    linkedCampaign: "Signature Reel Series",
    objective: "Increase visibility and appetite appeal",
    expectedOutcome: "More Instagram engagement and restaurant visits",
    platform: "Instagram Reels",
    requiredAssets: ["5 vertical clips", "Natural light", "Clean table", "Restaurant entrance"],
    status: "ready",
    currentClip: 0,
    published: false,
    clipOrder: [0, 1, 2, 3, 4],
    clips: [
      { status: "pending", attempts: 0 },
      { status: "pending", attempts: 0 },
      { status: "pending", attempts: 0 },
      { status: "pending", attempts: 0 },
      { status: "pending", attempts: 0 },
    ],
    package: {
      hook: "La vraie pizza napolitaine, préparée sous vos yeux.",
      caption: "La vraie pizza napolitaine, préparée sous vos yeux. Du four à votre table, chaque détail compte.",
      hashtags: "#PizzaNapoletana #CasablancaFood #SoloPizzeria #PizzaLovers",
      cta: "Réservez votre table aujourd’hui.",
      postingTime: "Friday 19:00",
      musicStyle: "Warm Italian instrumental with a modern rhythm",
      thumbnail: "Use the clearest cheese-stretch frame",
    },
  };
}

function defaultBusinessIntelligenceProfile() {
  return {
    version: "1.0",
    updatedAt: "",
    identity: {
      businessName: "Solo Pizzeria Napoletana",
      industry: "Food & Beverage",
      businessCategory: "Premium Italian restaurant",
      city: "Casablanca",
      numberOfLocations: 1,
      yearsInBusiness: 3,
      numberOfEmployees: 8,
    },
    goals: {
      primaryGoal: "More Reviews",
      secondaryGoal: "More Reservations",
      currentBiggestChallenge: "Review acquisition is not systematic",
      successMetric: "Reach 500 Google reviews",
      desiredTimeHorizon: "4 months",
    },
    products: {
      bestSellingProducts: "Neapolitan pizza, tiramisu",
      highestMarginProducts: "Signature pizzas, desserts",
      productsNeedingPromotion: "Weekend family menu",
      seasonalProducts: "Summer drinks, Ramadan family menu",
      averageOrderValue: 140,
    },
    customers: {
      targetAudience: "Families, professionals, young adults",
      customerSegments: "Families on weekends, office workers at lunch, food lovers at night",
      buyingMotivations: "Authentic Italian taste, premium atmosphere, social dining",
      peakDays: "Friday, Saturday, Sunday",
      peakHours: "19:00-22:00",
      returningCustomerPercentage: "",
    },
    marketing: {
      instagram: "@solopizzeria",
      facebook: "",
      tiktok: "",
      whatsapp: "Available",
      googleBusinessProfile: "Active",
      website: "",
      postingFrequency: "2 posts per week",
      runningAds: "No",
      previousCampaigns: "Google Review Growth System, Signature Reel Series",
      currentContentTypes: "Pizza preparation, restaurant atmosphere, customer moments",
    },
    resources: {
      monthlyMarketingBudget: "",
      advertisingBudget: "",
      availableTime: "30 minutes per week",
      canCreatePhotos: "Yes",
      canCreateVideos: "Yes",
      staffAvailable: "Yes",
      ownerPersonallyInvolved: "Sometimes",
    },
    performance: {
      revenueTrend: "Stable",
      weeklyCustomers: "",
      averageOrderValue: 140,
      reviews: 334,
      averageRating: 4.5,
      bestPerformingDays: "Friday, Saturday",
      weakestDays: "Tuesday, Wednesday",
    },
    competition: {
      mainCompetitors: "",
      biggestCompetitiveAdvantage: "Premium Neapolitan positioning and strong product visuals",
      biggestWeaknessComparedToCompetitors: "Review acquisition and repeat customer system are not yet consistent",
    },
    context: {
      opportunities: "Ramadan, summer, families, office area, weekend demand",
      constraints: "Weekday traffic weaker than weekends",
      localEvents: "Football nights, holidays, summer season",
    },
    observations: {
      consultantNotes: "Customers already trust the product. Food visuals are strong. Review collection should become a habit before scaling visibility.",
    },
  };
}

function defaultDemoState() {
  return {
    businessProfile: {
      businessName: "Solo Pizzeria Napoletana",
      businessType: "Restaurant",
      city: "Casablanca",
      brandPositioning: "Premium Italian",
      averageTicket: 140,
      mainGoal: "More customers and stronger trust",
      customerType: ["Families", "Professionals", "Young Adults"],
      googleRating: 4.5,
      numberOfReviews: 334,
      instagramHandle: "@solopizzeria",
      postingFrequency: 2,
      whatsappAvailable: true,
      biggestProblem: "Weak review acquisition",
      busyDays: "weekends",
      weekdayTraffic: "weak",
      seasonality: ["Ramadan", "Summer", "Football Events"]
    },
    todayStep: 0,
    studioView: "prepared",
    weeklyCompleted: 2,
    reviews: 334,
    customers: 31,
    revenue: 31400,
    momentum: "Strong",
    returningCustomersThisMonth: 4,
    whatsappCommunityMembers: 86,
    lastContentPublishedAt: "2026-06-24T18:30:00.000Z",
    harvestRecalculating: false,
    recentWins: [
      "+3 Google reviews this week"
    ],
    recentActivity: [
      "Google review received this week",
      "Google Review Growth System prepared",
      "Staff review script ready"
    ],
    campaigns: {
      "google-review-growth-system": "Active",
      "signature-reel-series": "Active",
      "story-mention-system": "Planned",
      "whatsapp-vip-list": "Planned",
      "weekend-family-menu": "Planned"
    },
    results: [],
    learning_events: [],
    completedPlanSteps: {},
    completedCampaigns: [],
    studio: {},
    studioMission: defaultStudioMission(),
    businessIntelligenceProfile: defaultBusinessIntelligenceProfile(),
    completedCalendarItems: []
  };
}

function deepMergeProfile(defaults, saved) {
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return defaults;
  return Object.fromEntries(Object.entries(defaults).map(([key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return [key, deepMergeProfile(value, saved[key])];
    }
    return [key, saved[key] !== undefined ? saved[key] : value];
  }));
}

let demoState = loadDemoState();

function loadDemoState() {
  const defaults = defaultDemoState();
  try {
    const saved = safeStorageGet(localStorage, DEMO_STATE_KEY);
    if (!saved) return defaults;
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      safeStorageRemove(localStorage, DEMO_STATE_KEY);
      return defaults;
    }
    return {
      ...defaults,
      ...parsed,
      businessProfile: { ...defaults.businessProfile, ...(parsed.businessProfile || {}) },
      campaigns: { ...defaults.campaigns, ...(parsed.campaigns || {}) },
      completedPlanSteps: { ...defaults.completedPlanSteps, ...(parsed.completedPlanSteps || {}) },
      businessIntelligenceProfile: deepMergeProfile(defaults.businessIntelligenceProfile, parsed.businessIntelligenceProfile),
      results: Array.isArray(parsed.results) ? parsed.results : defaults.results,
      learning_events: Array.isArray(parsed.learning_events) ? parsed.learning_events : defaults.learning_events,
      completedCampaigns: Array.isArray(parsed.completedCampaigns) ? parsed.completedCampaigns : defaults.completedCampaigns,
      recentWins: Array.isArray(parsed.recentWins) ? parsed.recentWins : defaults.recentWins,
      recentActivity: Array.isArray(parsed.recentActivity) ? parsed.recentActivity : defaults.recentActivity,
      completedCalendarItems: Array.isArray(parsed.completedCalendarItems) ? parsed.completedCalendarItems : defaults.completedCalendarItems,
      studio: parsed.studio && typeof parsed.studio === "object" ? parsed.studio : defaults.studio,
      studioMission: {
        ...defaults.studioMission,
        ...(parsed.studioMission && typeof parsed.studioMission === "object" ? parsed.studioMission : {}),
        clips: Array.isArray(parsed.studioMission?.clips) && parsed.studioMission.clips.length === 5
          ? parsed.studioMission.clips.map((clip, index) => ({ ...defaults.studioMission.clips[index], ...(clip || {}) }))
          : defaults.studioMission.clips,
        package: { ...defaults.studioMission.package, ...(parsed.studioMission?.package || {}) },
      },
    };
  } catch (error) {
    safeStorageRemove(localStorage, DEMO_STATE_KEY);
    return defaults;
  }
}

function saveDemoState() {
  safeStorageSet(localStorage, DEMO_STATE_KEY, JSON.stringify(demoState));
}

function updateDemoState(updater, message = "Progress updated") {
  updater(demoState);
  saveDemoState();
  showDemoPanel(message);
  setActivePage(document.body.dataset.page || "today", false);
}

function resetDemoState() {
  demoState = defaultDemoState();
  safeStorageRemove(localStorage, DEMO_STATE_KEY);
  saveDemoState();
  closeDemoModal();
  showDemoPanel("Demo reset", "Solo Pizzeria demo state restored.");
  setActivePage(document.body.dataset.page || "today", false);
}

function openDemoModal(title, body) {
  const existing = document.querySelector(".demo-modal-backdrop");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.className = "demo-modal-backdrop";
  modal.dataset.demoAction = "close-modal-backdrop";
  modal.innerHTML = `
    <div class="demo-modal" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="demo-modal__top">
        <div>
          <p class="section-label">SOLO Demo</p>
          <h3>${title}</h3>
        </div>
        <button type="button" class="demo-modal__close" data-demo-action="close-modal" aria-label="Close">Close</button>
      </div>
      <div class="demo-modal__body">${body}</div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeDemoModal() {
  document.querySelector(".demo-modal-backdrop")?.remove();
}

const demoActionMessages = {
  "Prepare": "Prepared for Solo Pizzeria. This stays as a draft until execution is approved.",
  "Prepare Campaign": "Campaign reasoning prepared for Solo Pizzeria with the full chain visible.",
  "Prepare Request": "Review request message prepared for recent customers.",
  "Prepare Message": "Message prepared using Solo Pizzeria's premium Italian tone.",
  "Prepare Response": "Response campaign prepared for the competitor activity.",
  "Launch": "Demo launch queued. Campaign status updated for Solo Pizzeria.",
  "Open": "Opened the prepared item in demo mode.",
  "Open Campaign": "WhatsApp Reactivation Campaign opened with the next cafÃ© customer action ready.",
  "Review": "Review mode opened with the recommended next action.",
  "Generate Message": "Follow-up message generated for the waiting customer.",
  "Generate Offer": "Return offer prepared for an inactive customer.",
  "Generate Requests": "Review requests prepared for eligible customers.",
  "Generate Report": "Report generated with the latest Solo Pizzeria results.",
  "Follow Up": "Follow-up marked as ready. Customer value is tracked against the 50-customer goal.",
  "Contact": "Contact action prepared with the latest customer context.",
  "Reactivate": "Reactivation action prepared. Potential value uses 60 MAD average ticket.",
  "Launch Campaign": "Campaign launch prepared for the selected customer group.",
  "Create": "CafÃ© campaign draft created with revenue opportunity and expected customers.",
  "Create Promotion": "Weekend brunch campaign prepared for the remaining 19-customer gap.",
  "Copy": "Copied in demo mode.",
  "Copy Caption": "Caption copied in demo mode.",
  "Copy Hashtags": "Hashtags copied in demo mode.",
  "Mark Published": "Publishing marked complete in demo mode. Results tracking is ready.",
  "Mark Complete": "Campaign marked complete in demo mode.",
  "Track Results": "Results panel updated with customer and revenue outcomes.",
  "Duplicate Campaign": "Campaign duplicated for the next Solo Pizzeria promotion.",
  "Schedule": "Campaign scheduled in demo mode with the prepared calendar timing.",
  "Upload Clip": "Clip upload accepted in demo mode. Validation feedback is ready.",
  "Review Feedback": "Clip feedback opened. Only the clip needing work will be repeated.",
  "Retry Clip": "Retry set for this clip only. The mission continues.",
  "Start Mission": "New filming mission prepared from the current campaign context.",
  "Continue Mission": "Mission resumed from the current recording step.",
  "View Results": "Results opened with customers, reviews, and revenue outcomes.",
  "Open Results": "Results opened with the latest campaign outcome.",
  "Review Customers": "Customer list opened for follow-up review.",
  "Open Plan": "Customer goal plan opened: 31 complete, 19 remaining.",
  "View Revenue": "Revenue view opened: 31,400 MAD influenced this month.",
  "View Customers": "Customer view opened: 31 of 50 customers reached.",
  "Plan Follow Up": "Follow-up plan prepared for the remaining 19 customers.",
  "Review Goal": "Goal review opened for the 50-customer target.",
  "Export": "Export prepared in demo mode.",
  "Share": "Share link prepared in demo mode.",
  "Download": "Download prepared in demo mode.",
  "View Summary": "Summary opened with the latest customer and revenue results.",
  "Save Changes": "Business profile saved in demo mode.",
  "Update Business": "Solo Pizzeria profile updated in demo mode.",
  "Connect Channel": "Channel connection prepared in demo mode.",
  "Enable": "Notification enabled in demo mode.",
  "Disable": "Notification disabled in demo mode.",
  "Business fact updated": "This fact is saved for SOLO diagnosis and future business understanding.",
  "Start": "Google Review Engine opened for Solo Pizzeria. Execution assets unlock in the next phase.",
  "Continue": "Next step opened for Solo Pizzeria. SOLO keeps the owner focused on one action at a time.",
  "View Plan": "Review Growth plan opened for Solo Pizzeria. The recommendation stays focused on the next professional priority.",
  "Logout": "Logout is disabled in demo mode.",
  "Search": "Search is ready in demo mode. Try customers, campaigns, reports, or revenue."
};

function iconPath(path) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"></path></svg>`;
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(Number(value) || 0, min), max);
}

function daysSince(dateValue) {
  const date = dateValue ? new Date(dateValue) : null;
  if (!date || Number.isNaN(date.getTime())) return Infinity;
  return Math.max(0, (Date.now() - date.getTime()) / 86400000);
}

function calculateBusinessHealth(state = stableState()) {
  const reviewsCurrent = clampNumber(state.reviews || state.businessProfile?.numberOfReviews, 0, 500);
  const reviewsTarget = 500;
  const activeCampaigns = Object.values(state.campaigns || {}).filter((status) => String(status).toLowerCase() === "active").length;
  const contentAge = daysSince(state.lastContentPublishedAt);
  const returningCustomers = clampNumber(state.returningCustomersThisMonth, 0, 5);
  const whatsappMembers = clampNumber(state.whatsappCommunityMembers, 0, 100000);
  const missionStatus = String(state.studioMission?.status || "").toLowerCase();
  const clipsApproved = Array.isArray(state.studioMission?.clips)
    ? state.studioMission.clips.filter((clip) => clip.status === "approved").length
    : 0;
  const missionCompleted = state.studioMission?.published || missionStatus === "published" || clipsApproved >= 5;
  const missionInProgress = ["filming", "assembly", "ready"].includes(missionStatus) || clipsApproved > 0;

  const signals = [
    {
      label: "Avis Google",
      value: `${reviewsCurrent}/${reviewsTarget}`,
      points: Math.min((reviewsCurrent / reviewsTarget) * 25, 25),
      max: 25,
    },
    {
      label: "Campagnes actives",
      value: `${activeCampaigns}/3`,
      points: Math.min(activeCampaigns, 3) * 10,
      max: 30,
    },
    {
      label: "Contenu récent",
      value: contentAge < 7 ? "moins de 7 jours" : contentAge < 14 ? "moins de 14 jours" : "à relancer",
      points: contentAge < 7 ? 15 : contentAge < 14 ? 8 : 0,
      max: 15,
    },
    {
      label: "Clients récurrents",
      value: `${returningCustomers}/5`,
      points: Math.min(returningCustomers, 5) * 4,
      max: 20,
    },
    {
      label: "Communauté WhatsApp",
      value: whatsappMembers > 0 ? `${whatsappMembers} membres` : "à créer",
      points: whatsappMembers > 0 ? 10 : 0,
      max: 10,
    },
    {
      label: "Mission Studio",
      value: missionCompleted ? "terminée" : missionInProgress ? "en cours" : "à démarrer",
      points: missionCompleted ? 10 : missionInProgress ? 5 : 0,
      max: 10,
    },
  ].map((signal) => ({
    ...signal,
    points: Math.round(signal.points),
    ratio: signal.max ? signal.points / signal.max : 0,
  }));

  const score = Math.min(100, Math.round(signals.reduce((total, signal) => total + signal.points, 0)));
  const status = score >= 70 ? "EN PROGRESSION" : score >= 40 ? "À SURVEILLER" : "ACTION REQUISE";
  const color = score >= 70 ? "#4ade80" : score >= 40 ? "#f59e0b" : "#f87171";
  const explanation = score >= 70
    ? "La dynamique est bonne, mais certains leviers peuvent encore accélérer la croissance."
    : score >= 40
      ? "Le commerce avance, mais quelques signaux demandent une attention rapide."
      : "Les signaux principaux sont faibles et demandent une action aujourd'hui.";
  const lowestSignals = [...signals].sort((a, b) => a.ratio - b.ratio).slice(0, 3);

  return { score, status, color, explanation, signals, lowestSignals };
}

function animateBusinessHealthScore() {
  const scoreNode = contentStage.querySelector("[data-health-score]");
  const circleNode = contentStage.querySelector("[data-health-circle]");
  if (!scoreNode) return;
  const target = Number(scoreNode.dataset.healthScore || 0);
  const getNow = () => (window.performance?.now ? window.performance.now() : Date.now());
  const frame = window.requestAnimationFrame?.bind(window) || ((callback) => window.setTimeout(() => callback(getNow()), 16));
  const start = getNow();
  const duration = 800;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    scoreNode.textContent = String(Math.round(target * eased));
    if (circleNode) {
      circleNode.style.setProperty("--health-progress", `${target * eased * 3.6}deg`);
    }
    if (progress < 1) {
      frame(tick);
    }
  };
  scoreNode.textContent = "0";
  frame(tick);
}

function frenchTodayDate() {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function normalizePageId(pageId = "") {
  const clean = String(pageId || "").replace(/^#/, "").replace(/^\//, "").trim();
  const [rawPage] = clean.split("?");
  const aliases = {
    home: "today",
    aujourd: "today",
    "aujourd'hui": "today",
    campagne: "campaigns",
    campagnes: "campaigns",
    resultat: "results",
    resultats: "results",
    "résultat": "results",
    "résultats": "results",
    result: "results",
    dashboard: "today",
    "": "today",
  };
  return aliases[rawPage] || rawPage || "today";
}

function readRouteContext(route = "") {
  const cleaned = String(route || "").replace(/^#/, "");
  const hashQuery = cleaned.includes("?") ? cleaned.slice(cleaned.indexOf("?") + 1) : "";
  const searchQuery = window.location?.search ? window.location.search.slice(1) : "";
  const params = new URLSearchParams([searchQuery, hashQuery].filter(Boolean).join("&"));
  return {
    campaignId: params.get("campaign_id") || params.get("id") || "",
    action: params.get("action") || "",
  };
}

function routeFor(pageId, params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  });
  return `#${pageId}${query.toString() ? `?${query.toString()}` : ""}`;
}

function navigateWithContext(pageId, params = {}) {
  const route = routeFor(pageId, params);
  routeContext = readRouteContext(route);
  setActivePage(route, false);
  history.pushState({ page: pageId, ...routeContext }, "", route);
}

function campaignNameFromId(campaignId = "") {
  const names = {
    "google-review-growth-system": "Google Review Growth System",
    "signature-reel-series": "Signature Reel Series",
    "weekend-family-menu": "Weekend Family Menu",
    "story-mention-system": "Story Mention System",
    "whatsapp-vip-list": "WhatsApp VIP List",
  };
  return names[campaignId] || campaignId.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function missionForCampaign(campaignId = "signature-reel-series", currentMission = defaultStudioMission()) {
  const id = campaignId || "signature-reel-series";
  if (id === "google-review-growth-system") {
    return {
      ...currentMission,
      activeCampaignId: id,
      name: "Review Growth Content Package",
      linkedCampaign: "Google Review Growth System",
      objective: "Make review collection visible and easy",
      expectedOutcome: "+5 reviews per week and stronger Google trust",
      platform: "Google Business / WhatsApp",
      requiredAssets: ["QR review card", "Staff script", "WhatsApp reminder", "Bill insert"],
    };
  }
  if (id === "weekend-family-menu") {
    return {
      ...currentMission,
      activeCampaignId: id,
      name: "Weekend Family Menu Package",
      linkedCampaign: "Weekend Family Menu",
      objective: "Increase weekend group revenue",
      expectedOutcome: "More family orders and higher average ticket",
      platform: "Instagram / WhatsApp",
      requiredAssets: ["Menu visual", "Story frame", "WhatsApp copy", "Table reminder"],
    };
  }
  return {
    ...currentMission,
    activeCampaignId: id,
    name: "Cheese Pull Reel",
    linkedCampaign: campaignNameFromId(id),
    objective: "Increase visibility and appetite appeal",
    expectedOutcome: "More Instagram engagement and restaurant visits",
    platform: "Instagram Reels",
    requiredAssets: ["5 vertical clips", "Natural light", "Clean table", "Restaurant entrance"],
  };
}

function statusStrip(items) {
  return `<div class="status-strip">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
}

function showDemoPanel(action, detailOverride) {
  if (!demoPanel) {
    demoPanel = document.createElement("div");
    demoPanel.className = "demo-panel";
    demoPanel.setAttribute("role", "status");
    demoPanel.setAttribute("aria-live", "polite");
    document.body.appendChild(demoPanel);
  }

  demoPanel.innerHTML = `
    <strong>${action}</strong>
    <span>${detailOverride || demoActionMessages[action] || "Action completed in demo mode for Solo Pizzeria."}</span>
  `;
  demoPanel.classList.add("is-visible");
  window.clearTimeout(showDemoPanel.timer);
  showDemoPanel.timer = window.setTimeout(() => {
    demoPanel.classList.remove("is-visible");
  }, 2600);
}

function enhancePageActions() {
  contentStage.querySelectorAll("button").forEach((button) => {
    const label = button.textContent.trim();
    button.classList.add("solo-button");

    if (/prepare|launch|generate|schedule|start|continue|save|update/i.test(label)) {
      button.classList.add("solo-button--primary");
    } else {
      button.classList.add("solo-button--secondary");
    }

    if (/revenue|offer|promotion|customer|goal|results|track/i.test(label)) {
      button.classList.add("solo-button--money");
    }
  });
}

document.addEventListener("click", (event) => {
  if (event.target.classList?.contains("demo-modal-backdrop")) {
    closeDemoModal();
    return;
  }

  const button = event.target.closest("button");
  if (button && button.closest(".nav-list")) return;

  const action = button?.dataset.demoAction;
  if (button && action) {
    handleDemoAction(action, button);
    return;
  }

  if (!button) return;
  if (button.type === "submit") return;

  if (button.dataset.why) {
    showDemoPanel("WHY?", button.dataset.why);
    return;
  }

  if (button.closest(".option-chip-group")) {
    button.classList.toggle("is-selected");
    showDemoPanel("Business fact updated");
    return;
  }

  const label = button.textContent.trim();
  if (!label && button.getAttribute("aria-label") !== "Search") return;
  if (button.getAttribute("aria-label") === "Search") {
    showDemoPanel("Search");
    return;
  }
  showDemoPanel(label);
});

function saveBusinessIntelligenceInput(control) {
  const field = control?.dataset?.biField;
  if (!field) return;
  const state = stableState();
  const rawValue = String(control.value ?? "").trim();
  const value = control.type === "number" && rawValue !== "" ? Number(rawValue) : rawValue;
  const numericValue = Number(value);
  const hasNumericValue = rawValue !== "" && Number.isFinite(numericValue);
  setNestedValue(state.businessIntelligenceProfile, field, value);
  state.businessIntelligenceProfile.updatedAt = new Date().toISOString();

  if (field === "identity.businessName") state.businessProfile.businessName = value || state.businessProfile.businessName;
  if (field === "identity.businessCategory") state.businessProfile.brandPositioning = value || state.businessProfile.brandPositioning;
  if (field === "identity.city") state.businessProfile.city = value || state.businessProfile.city;
  if ((field === "products.averageOrderValue" || field === "performance.averageOrderValue") && hasNumericValue) {
    state.businessProfile.averageTicket = numericValue;
  }
  if (field === "performance.reviews") {
    if (hasNumericValue) {
      state.reviews = numericValue;
      state.businessProfile.numberOfReviews = numericValue;
    }
  }
  if (field === "performance.averageRating" && hasNumericValue) state.businessProfile.googleRating = numericValue;
  if (field === "marketing.instagram") state.businessProfile.instagramHandle = value || state.businessProfile.instagramHandle;

  saveDemoState();
  const memoryOutput = document.querySelector("[data-bi-memory-output]");
  if (memoryOutput) memoryOutput.textContent = JSON.stringify(buildBusinessIntelligenceMemory(state.businessIntelligenceProfile), null, 2);
  const status = document.querySelector("[data-bi-save-status]");
  if (status) {
    status.textContent = "Saved";
    window.clearTimeout(saveBusinessIntelligenceInput.timer);
    saveBusinessIntelligenceInput.timer = window.setTimeout(() => {
      status.textContent = "Auto-saves as you type";
    }, 1400);
  }
}

document.addEventListener("input", (event) => {
  const control = event.target.closest?.("[data-bi-field]");
  if (control) saveBusinessIntelligenceInput(control);
});

document.addEventListener("change", (event) => {
  const control = event.target.closest?.("[data-bi-field]");
  if (control) saveBusinessIntelligenceInput(control);
});

document.addEventListener("submit", (event) => {
  const studioForm = event.target.closest("[data-demo-form='studio-assets']");
  if (studioForm) {
    event.preventDefault();
    const data = new FormData(studioForm);
    const state = stableState();
    state.studioMission.package.caption = String(data.get("caption") || state.studioMission.package.caption).trim();
    state.studioMission.package.cta = String(data.get("cta") || state.studioMission.package.cta).trim();
    state.studioMission.package.hashtags = String(data.get("hashtags") || state.studioMission.package.hashtags).trim();
    stableSave("Publishing assets updated");
    closeDemoModal();
    setActivePage("studio", false);
    return;
  }

  const form = event.target.closest("[data-demo-form='add-result']");
  if (!form) return;

  event.preventDefault();
  const data = new FormData(form);
  const reviews = Number(data.get("reviews") || 0);
  const views = Number(data.get("views") || 0);
  const messages = Number(data.get("messages") || 0);
  const reservations = Number(data.get("reservations") || 0);
  const customers = Number(data.get("customers") || 0);
  const revenue = Number(data.get("revenue") || 0);
  const notes = String(data.get("notes") || "").trim();

  updateDemoState((state) => {
    state.reviews += reviews;
    state.customers += customers;
    state.revenue += revenue;
    state.results.push({ reviews, views, messages, reservations, customers, revenue, notes, savedAt: new Date().toISOString() });
    state.learning_events.push({
      campaign: generateSoloBrain().selected.campaign,
      impressions: 0,
      reach: 0,
      clicks: 0,
      leads: reviews + customers,
      sales: customers,
      roi: revenue,
      savedAt: new Date().toISOString()
    });
    state.momentum = reviews + customers + revenue > 0 ? "Growing" : state.momentum;
    if (reviews > 0) state.recentWins.unshift(`+${reviews} reviews saved`);
    if (customers > 0) state.recentWins.unshift(`+${customers} customers gained`);
    state.recentActivity.unshift(`Result saved: ${views} views, ${messages} messages, ${reservations} reservations, +${customers} customers`);
    if (notes) state.recentActivity.unshift(`Note: ${notes}`);
  }, "Result saved");
  closeDemoModal();
});

function handleDemoAction(action, button) {
  if (action === "close-modal") {
    closeDemoModal();
    return;
  }

  if (action === "reset-demo") {
    resetDemoState();
    return;
  }

  if (action === "open-settings") {
    setActivePage("settings");
    return;
  }

  if (action === "search") {
    showDemoPanel("Recherche", "La recherche est prête en mode démo.");
    return;
  }

  if (action === "home-best-move") {
    const campaignId = button?.dataset?.campaignId || "google-review-growth-system";
    const target = button?.dataset?.targetPage || "campaigns";
    if (target === "studio") {
      navigateWithContext("studio", { campaign_id: campaignId });
    } else {
      navigateWithContext("campaigns", { action: "launch", id: campaignId });
    }
    return;
  }

  if (action === "campaign-to-studio") {
    const campaignId = button?.dataset?.campaignId || "signature-reel-series";
    state.studioMission = missionForCampaign(campaignId, state.studioMission);
    state.studioMission.created = true;
    saveDemoState();
    navigateWithContext("studio", { campaign_id: campaignId });
    return;
  }

  if (action === "today-continue") {
    updateDemoState((state) => {
      state.todayStep = Math.min(state.todayStep + 1, todaySteps.length - 2);
    }, "Next step opened");
    closeDemoModal();
    return;
  }

  if (action === "today-complete") {
    updateDemoState((state) => {
      state.todayStep = todaySteps.length - 1;
      state.weeklyCompleted = Math.max(state.weeklyCompleted, 3);
      if (!state.recentWins.includes("Google Review action completed")) {
        state.recentWins.unshift("Google Review action completed");
      }
      state.recentActivity.unshift("Action completed: Google Review Engine");
    }, "Action completed");
    closeDemoModal();
    return;
  }

  if (action === "view-plan") {
    openPlanModal();
    return;
  }

  if (action === "plan-step-complete") {
    completePlanStep(button.dataset.campaignId, button.dataset.stepId);
    return;
  }

  if (action === "campaign-detail") {
    navigateWithContext("studio", { campaign_id: button.dataset.campaignId || "google-review-growth-system" });
    return;
  }

  if (action === "advance-campaign") {
    advanceCampaign(button.dataset.campaignId);
    return;
  }

  if (action === "studio-prepare") {
    const campaignId = button.dataset.campaignId || routeContext.campaignId || "signature-reel-series";
    demoState.studioMission = missionForCampaign(campaignId, stableState().studioMission);
    demoState.studioMission.created = true;
    saveDemoState();
    navigateWithContext("studio", { campaign_id: campaignId });
    return;
  }

  if (action === "approve-clip") {
    approveClip(button.dataset.reelId, button.dataset.clipId);
    return;
  }

  if (action === "calendar-complete") {
    showDemoPanel("Calendar", "Calendar is an orientation view in the stable demo.");
    closeDemoModal();
  }
}

function renderPlaceholderPage(page) {
  contentStage.innerHTML = `
    <div class="page-hero">
      <div>
        <p class="section-label" id="page-kicker">${page.kicker}</p>
        <h2 id="page-heading">${page.heading}</h2>
        <p id="page-description">${page.description}</p>
      </div>
      <div class="page-orbit" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="placeholder-grid">
      <article class="placeholder-card">
        <span class="placeholder-line placeholder-line--short"></span>
        <span class="placeholder-line"></span>
        <span class="placeholder-line placeholder-line--wide"></span>
      </article>
      <article class="placeholder-card placeholder-card--featured">
        <span class="placeholder-line placeholder-line--short"></span>
        <span class="placeholder-block"></span>
      </article>
    </div>
  `;
}

function focusStep(number, title, detail, state = "") {
  return `
    <article class="focus-step ${state}">
      <span>${number}</span>
      <div>
        <strong>${title}</strong>
        <small>${detail}</small>
      </div>
    </article>
  `;
}

function recentWin(title, detail) {
  return `
    <article class="today-win-card">
      <span>âœ“</span>
      <div>
        <strong>${title}</strong>
        <small>${detail}</small>
      </div>
    </article>
  `;
}

const businessStageData = {
  new: {
    label: "New Business",
    progressText: "0 / 5 actions completed",
    progressValue: 0,
    focus: "Get your first 10 Google reviews.",
    recommendation: "Launch Google Review Engine.",
    monthlyProgress: "0 / 50 customers",
    monthlyDetail: "Start with one trust-building action.",
    wins: [],
  },
  active: {
    label: "Active Business",
    progressText: "2 / 5 actions completed",
    progressValue: 60,
    focus: "Increase Social Proof",
    recommendation: "Google Review Engine.",
    monthlyProgress: "334 / 500 reviews",
    monthlyDetail: "67% review goal progress.",
    wins: [
      ["+3 Google reviews", "This week"],
    ],
  },
  mature: {
    label: "Mature Business",
    progressText: "4 / 5 actions completed",
    progressValue: 84,
    focus: "Protect strongest growth channel.",
    recommendation: "Continue best-performing workflow.",
    monthlyProgress: "46 / 50 customers",
    monthlyDetail: "Momentum is strong this month.",
    wins: [
      ["Best campaign identified", "Google reviews are driving trust"],
      ["Revenue trend up", "Returning customers increased"],
      ["Seasonal plan ready", "Calendar is filled for the month"],
    ],
  },
};

function currentStageData() {
  return businessStageData[demoBusinessStage] || businessStageData.new;
}

function guidedEmptyState(title, text, cta) {
  return `
    <article class="guided-empty-state">
      <span>Not enough data yet</span>
      <strong>${title}</strong>
      <p>${text}</p>
      <button type="button">${cta}</button>
    </article>
  `;
}

const todaySteps = [
  ["Current Focus", "Strengthen Trust & Visibility", "Reviews do not reflect customer satisfaction."],
  ["Recommended Action", "Google Review Engine", "Start with one daily review action."],
  ["Execution Plan", "Ask recent guests for reviews", "Use QR cards, staff script and WhatsApp reminder."],
  ["Mark Complete", "Complete today's action", "Progress will update and the next action will appear."],
  ["Results Updated", "Progress updated", "Next recommended action is ready."]
];

const campaignDetails = {
  "google-review-engine": {
    name: "Google Review Engine",
    objective: "Move from 334 to 500 Google reviews.",
    why: "Review acquisition is weaker than customer satisfaction.",
    steps: ["Print QR review card", "Brief staff", "Ask happy guests", "Track weekly reviews"],
    assets: ["QR card", "Staff script", "WhatsApp reminder"],
    result: "Expected: +5 reviews per week"
  },
  "signature-reel-series": {
    name: "Signature Reel Series",
    objective: "Increase visibility through premium product moments.",
    why: "Pizza preparation is highly visual and supports brand perception.",
    steps: ["Film cheese pull", "Film oven moment", "Publish best clip", "Track messages"],
    assets: ["Clip checklist", "Caption", "Posting time"],
    result: "Expected: 5k-15k views"
  },
  "story-challenge": {
    name: "Story Challenge",
    objective: "Increase customer mentions.",
    why: "Guests already share food and atmosphere naturally.",
    steps: ["Prepare table prompt", "Ask guests to tag", "Reshare mentions"],
    assets: ["Story prompt", "Reshare template"],
    result: "Expected: 20 story mentions/month"
  },
  "whatsapp-vip-club": {
    name: "WhatsApp VIP Club",
    objective: "Increase repeat visits.",
    why: "Customer ownership is still weak.",
    steps: ["Create opt-in list", "Invite loyal guests", "Track returning customers"],
    assets: ["Invite message", "VIP list"],
    result: "Expected: stronger repeat visits"
  },
  "weekday-menu-campaign": {
    name: "Weekday Menu Campaign",
    objective: "Increase weekday visits.",
    why: "Demand is concentrated on weekends while weekday traffic is weak.",
    steps: ["Choose weekday window", "Prepare menu message", "Share with regulars", "Track weekday visits"],
    assets: ["Menu text", "WhatsApp message", "Story copy"],
    result: "Expected: more weekday customers"
  }
};

const reelDetails = {
  "cheese-pull": "Cheese Pull Reel",
  "pizza-oven": "Pizza Oven Reel",
  "tiramisu": "Tiramisu Preparation Reel",
  "atmosphere": "Restaurant Atmosphere Reel",
  "customer-reactions": "Customer Reactions Reel"
};

const clipNames = ["Hook", "Product close-up", "Atmosphere", "Customer moment", "Call to action"];

const calendarDetails = {
  "review-push": ["Review Push", "Strengthen social proof", "Tuesday"],
  "weekend-family-menu": ["Weekend Family Menu", "Increase weekend traffic", "Friday"],
  "signature-reel": ["Signature Reel", "Increase visibility", "Sunday"],
  "ramadan-preparation": ["Ramadan Preparation", "Prepare the next seasonal focus", "Starts in 3 weeks"],
  "match-night": ["Match Night", "Community traffic moment", "Friday"],
  "summer-menu": ["Summer Menu", "Seasonal revenue opportunity", "July"],
  "back-to-school": ["Back To School", "Family and student planning", "September"],
  "autumn-campaign": ["Autumn Campaign", "Next visibility theme", "October"]
};

function totalResults(field) {
  return (demoState.results || []).reduce((sum, result) => sum + Number(result[field] || 0), 0);
}

const intelligenceDatabase = {
  business_profiles: [],
  campaign_examples: [
    {
      id: "cmp-review-engine-restaurant-instagram",
      industry: "Restaurant",
      objective: "Increase reviews",
      platform: "Google + WhatsApp",
      offer_type: "Review request",
      caption_style: "Direct and polite",
      cta: "WhatsApp",
      season: "Always",
      source: "Internal data",
      campaign_description: "Ask satisfied guests to leave Google reviews using QR cards and follow-up messages.",
      why_it_worked: "It captures satisfaction while the restaurant experience is still fresh.",
      expected_result: "+3 to +5 reviews per week",
      target_audience: ["Families", "Professionals", "Young Adults"],
      campaignId: "google-review-engine",
      campaign_name: "Google Review Engine",
      title: "Strengthen Trust & Visibility",
      commitment: "5 minutes daily",
      benefits: ["Stronger trust", "Better Google visibility", "More customer confidence"],
    },
    {
      id: "cmp-signature-reel-restaurant-instagram",
      industry: "Restaurant",
      objective: "Increase visibility",
      platform: "Instagram",
      offer_type: "Signature product content",
      caption_style: "Premium and sensory",
      cta: "Reserve on WhatsApp",
      season: "Always",
      source: "Manual examples",
      campaign_description: "Publish short signature product reels: cheese pull, oven, tiramisu and atmosphere.",
      why_it_worked: "Restaurants with strong visuals can convert product appeal into attention and visits.",
      expected_result: "5k to 15k views per reel",
      target_audience: ["Families", "Professionals", "Young Adults"],
      campaignId: "signature-reel-series",
      campaign_name: "Signature Reel Series",
      title: "Increase Content Visibility",
      commitment: "15 minutes per reel",
      benefits: ["Stronger brand image", "More customer attention", "More reasons to visit"],
    },
    {
      id: "cmp-whatsapp-vip-restaurant",
      industry: "Restaurant",
      objective: "Increase repeat customers",
      platform: "WhatsApp",
      offer_type: "VIP community",
      caption_style: "Warm and direct",
      cta: "Join WhatsApp",
      season: "Always",
      source: "Internal data",
      campaign_description: "Create an opt-in WhatsApp list for regular customers and returning visits.",
      why_it_worked: "Moroccan customer behavior strongly supports direct WhatsApp communication.",
      expected_result: "More returning customers",
      target_audience: ["Families", "Groups", "Professionals"],
      campaignId: "whatsapp-vip-club",
      campaign_name: "WhatsApp VIP Club",
      title: "Build Customer Ownership",
      commitment: "10 minutes weekly",
      benefits: ["More returning customers", "Better customer ownership", "More stable revenue"],
    },
    {
      id: "cmp-weekday-menu-restaurant",
      industry: "Restaurant",
      objective: "Increase weekday visits",
      platform: "Instagram + WhatsApp",
      offer_type: "Weekday menu",
      caption_style: "Calm and practical",
      cta: "Reserve on WhatsApp",
      season: "Always",
      source: "Manual examples",
      campaign_description: "Introduce a clear weekday reason to visit without damaging premium positioning.",
      why_it_worked: "It balances weekend-heavy demand and improves weekly capacity use.",
      expected_result: "More weekday customers",
      target_audience: ["Professionals", "Families"],
      campaignId: "weekday-menu-campaign",
      campaign_name: "Weekday Menu Campaign",
      title: "Balance Weekday Demand",
      commitment: "20 minutes weekly",
      benefits: ["Better weekday activity", "More stable operations", "Less dependence on weekends"],
    }
  ],
  market_trends: [
    { id: "trend-summer-casablanca", keyword: "summer dining", location: "Casablanca", trend_score: 78, date: "2026-06", season: "Summer" },
    { id: "trend-football-casablanca", keyword: "football night", location: "Casablanca", trend_score: 72, date: "2026-06", season: "Football Events" },
    { id: "trend-reviews-casablanca", keyword: "best restaurant near me", location: "Casablanca", trend_score: 84, date: "2026-06", season: "Always" },
    { id: "trend-ramadan-morocco", keyword: "ramadan restaurant", location: "Morocco", trend_score: 88, date: "2026-06", season: "Ramadan" }
  ],
  benchmarks: [
    { id: "bench-restaurant-instagram-engagement", industry: "Restaurant", platform: "Instagram", metric: "Engagement", average_value: 3, good_value: 6, source: "Internal benchmarks" },
    { id: "bench-restaurant-google-reviews", industry: "Restaurant", platform: "Google", metric: "Reviews", average_value: 250, good_value: 500, source: "Internal benchmarks" },
    { id: "bench-whatsapp-response", industry: "Restaurant", platform: "WhatsApp", metric: "Lead response", average_value: 60, good_value: 15, source: "Internal benchmarks" },
    { id: "bench-email-open-rate", industry: "General", platform: "Email", metric: "Open rate", average_value: 21, good_value: 35, source: "Mailchimp-style benchmark" }
  ],
  recommendations: []
};

const BusinessProfileEngine = {
  normalize(rawProfile = {}) {
    const defaults = defaultDemoState().businessProfile;
    const profile = { ...defaults, ...rawProfile };
    const customerType = Array.isArray(profile.customerType || profile.target_customer)
      ? (profile.customerType || profile.target_customer)
      : defaults.customerType;
    const socialChannels = Array.isArray(profile.socialChannels || profile.social_channels)
      ? (profile.socialChannels || profile.social_channels)
      : ["Instagram", "Google", "WhatsApp"];
    const seasonality = Array.isArray(profile.seasonality) ? profile.seasonality : defaults.seasonality;
    return {
      id: profile.id || "solo-pizzeria",
      business_name: profile.businessName || profile.business_name,
      business_type: profile.businessType || profile.business_type,
      city: profile.city,
      target_customer: customerType,
      main_goal: profile.mainGoal || profile.main_goal,
      budget_level: profile.budgetLevel || profile.budget_level || "Low",
      preferred_language: profile.preferredLanguage || profile.preferred_language || "French / Darija",
      social_channels: socialChannels,
      instagram_handle: profile.instagramHandle || profile.instagram_handle,
      whatsapp_number: profile.whatsappNumber || profile.whatsapp_number || "",
      brand_positioning: profile.brandPositioning,
      average_ticket: Number(profile.averageTicket || profile.average_ticket || 0),
      google_rating: Number(profile.googleRating || profile.google_rating || 0),
      number_of_reviews: Number(profile.numberOfReviews || profile.number_of_reviews || 0),
      posting_frequency: Number(profile.postingFrequency || profile.posting_frequency || 0),
      whatsapp_available: Boolean(profile.whatsappAvailable ?? profile.whatsapp_available),
      biggest_problem: profile.biggestProblem || profile.biggest_problem || "",
      busy_days: profile.busyDays || profile.busy_days || "",
      weekday_traffic: profile.weekdayTraffic || profile.weekday_traffic || "",
      seasonality,
    };
  }
};

const MarketContextEngine = {
  evaluate(profile) {
    const month = new Date().getMonth();
    const season = month >= 5 && month <= 7 ? "Summer" : profile.seasonality[0] || "Always";
    const relevantTrends = intelligenceDatabase.market_trends.filter((trend) => {
      return (trend.location === profile.city || trend.location === "Morocco") && (trend.season === season || trend.season === "Always" || profile.seasonality.includes(trend.season));
    });
    const trendScore = relevantTrends.length
      ? Math.round(relevantTrends.reduce((sum, trend) => sum + trend.trend_score, 0) / relevantTrends.length)
      : 50;
    return {
      season,
      momentum: trendScore >= 75 ? "Favorable" : trendScore >= 55 ? "Stable" : "Quiet",
      trend_score: trendScore,
      opportunities: relevantTrends.map((trend) => trend.keyword)
    };
  }
};

const CampaignLibraryEngine = {
  search({ industry, objective, season, targetCustomer }) {
    return intelligenceDatabase.campaign_examples.filter((campaign) => {
      const industryMatch = campaign.industry === industry;
      const objectiveMatch = !objective || campaign.objective.toLowerCase().includes(objective.toLowerCase());
      const seasonMatch = campaign.season === "Always" || campaign.season === season;
      const audienceMatch = !targetCustomer?.length || campaign.target_audience.some((audience) => targetCustomer.includes(audience));
      return industryMatch && objectiveMatch && seasonMatch && audienceMatch;
    });
  },
  byCampaignId(campaignId) {
    return intelligenceDatabase.campaign_examples.find((campaign) => campaign.campaignId === campaignId);
  }
};

const BenchmarkEngine = {
  for(profile, platform, metric) {
    return intelligenceDatabase.benchmarks.find((benchmark) => {
      return benchmark.industry === profile.business_type && benchmark.platform === platform && benchmark.metric === metric;
    }) || intelligenceDatabase.benchmarks.find((benchmark) => benchmark.industry === "General" && benchmark.metric === metric);
  },
  diagnose(profile) {
    const googleBenchmark = this.for(profile, "Google", "Reviews");
    const instagramBenchmark = this.for(profile, "Instagram", "Engagement");
    return {
      googleBenchmark,
      instagramBenchmark,
      reviewGap: googleBenchmark ? Math.max(googleBenchmark.good_value - profile.number_of_reviews, 0) : 0,
      postingGap: Math.max(3 - profile.posting_frequency, 0)
    };
  }
};

const LearningEngine = {
  summarize(results = []) {
    const reviews = results.reduce((sum, result) => sum + Number(result.reviews || 0), 0);
    const customers = results.reduce((sum, result) => sum + Number(result.customers || 0), 0);
    const revenue = results.reduce((sum, result) => sum + Number(result.revenue || 0), 0);
    return { reviews, customers, revenue, resultCount: results.length };
  },
  confidenceAdjustment(rule, results = []) {
    const summary = this.summarize(results);
    if (rule.id === "social-proof" && summary.reviews >= 3) return -34;
    if (rule.id === "content-visibility" && summary.reviews >= 3) return 8;
    if (rule.id === "retention" && summary.customers >= 2) return 6;
    if (summary.resultCount === 0) return 0;
    return 2;
  }
};

const RecommendationEngine = {
  rules: [
    {
      id: "social-proof",
      test: ({ profile, benchmarks }) => profile.google_rating >= 4.3 && benchmarks.reviewGap > 0 && totalResults("reviews") < 3,
      diagnosis: "Strong reputation but weak review acquisition",
      opportunity: "Social proof opportunity",
      objective: "Reach 500 reviews",
      objectiveSearch: "Increase reviews",
      strategy: "Social proof strategy",
      campaignId: "google-review-engine",
      whyNow: "Reviews do not fully reflect customer satisfaction.",
      expectedImpact: "Higher trust and stronger Google visibility.",
      baseConfidence: 88,
      reasons: ["Similar restaurants use review capture to convert satisfaction into trust.", "Google review benchmark shows room to grow.", "Platform and audience match local customer behavior."]
    },
    {
      id: "content-visibility",
      test: ({ profile, benchmarks }) => profile.business_type === "Restaurant" && benchmarks.postingGap > 0,
      diagnosis: "Underused visual content",
      opportunity: "Content visibility opportunity",
      objective: "Increase visibility",
      objectiveSearch: "Increase visibility",
      strategy: "Content strategy",
      campaignId: "signature-reel-series",
      whyNow: "The product is visual, but posting frequency is still low.",
      expectedImpact: "More attention from high-value product moments.",
      baseConfidence: 78,
      reasons: ["Restaurants benefit from visual proof.", "Instagram benchmark supports consistent content.", "Premium product moments fit the audience."]
    },
    {
      id: "retention",
      test: ({ profile }) => !profile.whatsapp_available || /repeat|returning/i.test(profile.biggest_problem),
      diagnosis: "Weak retention system",
      opportunity: "Customer ownership opportunity",
      objective: "Increase repeat customers",
      objectiveSearch: "Increase repeat customers",
      strategy: "WhatsApp CRM",
      campaignId: "whatsapp-vip-club",
      whyNow: "Repeat visits need a simple follow-up system.",
      expectedImpact: "More returning customers and more stable revenue.",
      baseConfidence: 82,
      reasons: ["Moroccan customers rely heavily on WhatsApp.", "Retention supports revenue stability.", "The business has premium repeat-visit potential."]
    },
    {
      id: "weekday-demand",
      test: ({ profile }) => /weekend/i.test(profile.busy_days) && /weak/i.test(profile.weekday_traffic),
      diagnosis: "Demand imbalance",
      opportunity: "Weekday traffic opportunity",
      objective: "Increase weekday visits",
      objectiveSearch: "Increase weekday visits",
      strategy: "Offer strategy",
      campaignId: "weekday-menu-campaign",
      whyNow: "Traffic appears concentrated around weekends.",
      expectedImpact: "More consistent activity across the week.",
      baseConfidence: 72,
      reasons: ["Weekend demand is strong.", "Weekday traffic is weaker.", "A calm weekday menu can protect premium positioning."]
    }
  ],
  recommend(rawProfile, results = []) {
    const profile = BusinessProfileEngine.normalize(rawProfile);
    intelligenceDatabase.business_profiles = [profile];
    const market = MarketContextEngine.evaluate(profile);
    const benchmarks = BenchmarkEngine.diagnose(profile);
    const context = { profile, market, benchmarks, results };
    const candidates = this.rules
      .filter((rule) => rule.test(context))
      .map((rule) => this.buildRecommendation(rule, context))
      .filter((recommendation) => passesMoroccanRecommendationFilter(recommendation, profile))
      .sort((a, b) => b.confidence_score - a.confidence_score);
    const selected = candidates[0] || this.buildRecommendation(this.rules[1], context);
    intelligenceDatabase.recommendations.unshift({
      id: `rec-${Date.now()}`,
      business_id: profile.id,
      objective: selected.objective,
      strategy: selected.strategy,
      recommendation: selected.best_next_move,
      why: selected.why.join(" "),
      confidence_score: selected.confidence_score,
      expected_impact: selected.expected_impact,
      created_at: new Date().toISOString()
    });
    return { profile, market, benchmarks, recommendations: candidates, selected };
  },
  buildRecommendation(rule, context) {
    const campaign = CampaignLibraryEngine.byCampaignId(rule.campaignId);
    const confidence = Math.max(45, Math.min(96, rule.baseConfidence + marketConfidence(context.market) + LearningEngine.confidenceAdjustment(rule, context.results)));
    return {
      id: rule.id,
      best_next_move: campaign?.campaign_description || rule.objective,
      title: campaign?.title || rule.objective,
      whyNow: rule.whyNow,
      recommended_campaign: campaign?.campaign_description || rule.campaignId,
      campaign: campaign?.campaign_name || rule.campaignId,
      campaignId: rule.campaignId,
      diagnosis: rule.diagnosis,
      opportunity: rule.opportunity,
      objective: rule.objective,
      strategy: rule.strategy,
      benefits: campaign?.benefits || [],
      commitment: campaign?.commitment || "15 minutes",
      basis: ["Business data", context.market.season, context.market.momentum, "Benchmark support"].slice(0, 4),
      why: rule.reasons,
      expected_impact: rule.expectedImpact,
      confidence_score: confidence,
      value: rule.expectedImpact,
      market,
      benchmark: context.benchmarks.googleBenchmark || context.benchmarks.instagramBenchmark,
    };
  }
};

function marketConfidence(market) {
  if (market.trend_score >= 80) return 5;
  if (market.trend_score >= 70) return 3;
  if (market.trend_score >= 55) return 1;
  return -2;
}

function generateSoloBrain() {
  const result = RecommendationEngine.recommend(demoState.businessProfile, demoState.results || []);
  const selected = result.selected;
  return {
    profile: result.profile,
    market: result.market,
    benchmarks: result.benchmarks,
    recommendations: result.recommendations,
    selected,
    diagnosis: selected.diagnosis,
    opportunity: selected.opportunity,
    objective: selected.objective,
    strategy: selected.strategy,
    campaign: selected.campaign,
  };
}

function passesMoroccanRecommendationFilter(recommendation, profile) {
  const safeSegments = ["Families", "Friends", "Groups", "Professionals", "Young Adults", "Tourists"];
  const hasSafeSegment = (profile.target_customer || []).some((type) => safeSegments.includes(type));
  const protectedBrand = !/couple|dating|valentine/i.test(recommendation.campaign || recommendation.best_next_move);
  const localFit = ["Ramadan", "Summer", "Football Events", "Eid"].some((season) => (profile.seasonality || []).includes(season));
  return protectedBrand && (hasSafeSegment || localFit);
}

function recommendationProgressText() {
  const reviewsGained = totalResults("reviews");
  if (reviewsGained > 0) return `+${reviewsGained} reviews saved in demo results`;
  return `${demoState.reviews} / 500 reviews`;
}

function campaignPlanFor(recommendation) {
  const plans = {
    "google-review-engine": {
      goal: "Reach 500 Google reviews",
      steps: ["Add QR code to tables", "Add review request to bill", "Train staff with short script", "Send WhatsApp review reminder", "Track new reviews weekly"],
      assets: ["Review request message", "Staff script", "QR card text", "Follow-up message"],
      kpis: ["New reviews per week", "Rating evolution", "Customer mentions", "Google visibility"],
    },
    "signature-reel-series": {
      goal: "Increase visibility with premium product moments",
      steps: ["Film cheese pull", "Film pizza oven moment", "Capture atmosphere", "Publish best clip", "Track messages and saves"],
      assets: ["Shot list", "Caption", "Hook", "Posting time"],
      kpis: ["Messages", "Profile visits", "Customer mentions", "Reservations"],
    },
    "whatsapp-vip-club": {
      goal: "Increase repeat customers",
      steps: ["Create opt-in list", "Invite loyal guests", "Send weekly update", "Track returning customers"],
      assets: ["Invite message", "Customer list", "Weekly broadcast"],
      kpis: ["Returning customers", "Replies", "Reservations"],
    },
    "weekday-menu-campaign": {
      goal: "Increase weekday visits",
      steps: ["Select weekday window", "Prepare menu message", "Share with regular customers", "Track weekday visits"],
      assets: ["Menu text", "WhatsApp message", "Story copy"],
      kpis: ["Weekday customers", "Revenue influenced", "Repeat visits"],
    }
  };
  return plans[recommendation.campaignId] || plans["google-review-engine"];
}

function getDemoOpenAiKey() {
  return safeStorageGet(localStorage, "solo-openai-api-key") || window.SOLO_OPENAI_API_KEY || "";
}

async function maybeImproveRecommendationWording(recommendation) {
  const key = getDemoOpenAiKey();
  const titleNode = contentStage.querySelector("[data-recommendation-title]");
  const reasonNode = contentStage.querySelector("[data-recommendation-reason]");
  if (!key || !titleNode || !reasonNode) return;

  const cacheKey = `solo-ai-copy-${recommendation.id}`;
  try {
    const cached = safeStorageGet(sessionStorage, cacheKey);
    const copy = cached ? JSON.parse(cached) : await fetchAiRecommendationCopy(key, recommendation);
    if (!cached) safeStorageSet(sessionStorage, cacheKey, JSON.stringify(copy));
    if (copy.title && copy.whyNow) {
      titleNode.textContent = copy.title;
      reasonNode.textContent = copy.whyNow;
    }
  } catch (error) {
    // AI wording is optional. Rule-based recommendations remain the source of truth.
  }
}

async function fetchAiRecommendationCopy(key, recommendation) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: safeStorageGet(localStorage, "solo-openai-model") || "gpt-4.1-mini",
      input: `Rewrite this recommendation as compact executive copy for a Moroccan restaurant owner. Return JSON only with keys title and whyNow. Title max 5 words. WhyNow max 12 words. Keep logic unchanged.\nTitle: ${recommendation.title}\nWhy now: ${recommendation.whyNow}`,
    }),
  });
  if (!response.ok) throw new Error("AI wording unavailable");
  const data = await response.json();
  const text = data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("") || "";
  return JSON.parse(text);
}

function openPlanModal() {
  const brain = generateSoloBrain();
  const recommendation = brain.selected;
  const plan = campaignPlanFor(recommendation);
  const completedSteps = demoState.completedPlanSteps[recommendation.campaignId] || [];
  const nextStepIndex = plan.steps.findIndex((_, index) => !completedSteps.includes(String(index)));
  const progress = Math.round((completedSteps.length / plan.steps.length) * 100);
  openDemoModal(`${recommendation.campaign} Plan`, `
    <div class="demo-plan-stack">
      <article><span>Campaign</span><strong>${recommendation.campaign}</strong></article>
      <article><span>Goal</span><strong>${plan.goal}</strong></article>
      <article><span>Expected commitment</span><strong>${recommendation.commitment}</strong></article>
      <article><span>Progress</span><strong>${completedSteps.length}/${plan.steps.length} steps complete</strong></article>
      <article><span>Confidence</span><strong>${recommendation.confidence_score}%</strong></article>
      <article><span>Expected impact</span><strong>${recommendation.expected_impact}</strong></article>
    </div>
    <div class="demo-reasoning-chain">
      <span>${recommendationProgressText()}</span><span>${recommendation.diagnosis}</span><span>${recommendation.opportunity}</span><span>${recommendation.objective}</span><span>${recommendation.strategy}</span><span>${recommendation.campaign}</span><span>${recommendation.confidence_score}% confidence</span>
    </div>
    <div class="demo-studio-progress">
      <strong>${progress}% execution progress</strong>
      <div class="today-progress-track"><span style="width: ${progress}%"></span></div>
    </div>
    <div class="demo-check-list">
      ${plan.steps.map((step, index) => {
        const done = completedSteps.includes(String(index));
        return `<button type="button" data-demo-action="plan-step-complete" data-campaign-id="${recommendation.campaignId}" data-step-id="${index}" class="${done ? "is-complete" : ""}">${done ? "Done" : "Mark Step Complete"} · ${step}</button>`;
      }).join("")}
    </div>
    <p class="demo-modal-note">Assets: ${plan.assets.join(", ")}.</p>
    <p class="demo-modal-note">KPIs: ${plan.kpis.join(", ")}.</p>
    ${nextStepIndex === -1 ? `<button type="button" data-demo-action="today-complete">Mark Complete</button>` : ""}
  `);
}

function openCampaignModal(campaignId) {
  const campaign = campaignDetails[campaignId] || campaignDetails["google-review-engine"];
  const status = demoState.campaigns[campaignId] || "Planned";
  openDemoModal(campaign.name, `
    <div class="demo-plan-stack">
      <article><span>Status</span><strong>${status}</strong></article>
      <article><span>Objective</span><strong>${campaign.objective}</strong></article>
      <article><span>Why this campaign</span><strong>${campaign.why}</strong></article>
      <article><span>Result tracking</span><strong>${campaign.result}</strong></article>
    </div>
    <div class="demo-check-list">
      ${campaign.steps.map((step) => `<span>${step}</span>`).join("")}
    </div>
    <p class="demo-modal-note">Assets needed: ${campaign.assets.join(", ")}.</p>
    <button type="button" data-demo-action="advance-campaign" data-campaign-id="${campaignId}">${nextCampaignAction(status)}</button>
  `);
}

function nextCampaignAction(status) {
  if (status === "Planned") return "Start Campaign";
  if (status === "Active") return "Mark Complete";
  return "Completed";
}

function advanceCampaign(campaignId) {
  updateDemoState((state) => {
    const current = state.campaigns[campaignId] || "Planned";
    if (current === "Planned") {
      state.campaigns[campaignId] = "Active";
      state.recentActivity.unshift(`${campaignDetails[campaignId].name} started`);
    } else if (current === "Active") {
      state.campaigns[campaignId] = "Completed";
      if (!state.completedCampaigns.includes(campaignId)) state.completedCampaigns.push(campaignId);
      state.recentWins.unshift(`${campaignDetails[campaignId].name} completed`);
      state.recentActivity.unshift(`${campaignDetails[campaignId].name} completed`);
    }
  }, "Campaign updated");
  closeDemoModal();
}

function completePlanStep(campaignId, stepId) {
  updateDemoState((state) => {
    const steps = state.completedPlanSteps[campaignId] || [];
    if (!steps.includes(stepId)) steps.push(stepId);
    state.completedPlanSteps[campaignId] = steps;
    state.recentActivity.unshift(`Plan step completed for ${campaignDetails[campaignId]?.name || "campaign"}`);
  }, "Plan step completed");
  openPlanModal();
}

function openStudioModal(reelId) {
  const approved = demoState.studio[reelId] || [];
  openDemoModal(reelDetails[reelId] || "Prepared Reel", `
    <div class="demo-studio-progress">
      <strong>${approved.length}/5 clips approved</strong>
      <div class="today-progress-track"><span style="width: ${(approved.length / 5) * 100}%"></span></div>
    </div>
    <div class="demo-check-list">
      ${clipNames.map((clip, index) => {
        const clipId = String(index);
        const done = approved.includes(clipId);
        return `<button type="button" data-demo-action="approve-clip" data-reel-id="${reelId}" data-clip-id="${clipId}" class="${done ? "is-complete" : ""}">${done ? "Approved" : "Approve"} · ${clip}</button>`;
      }).join("")}
    </div>
  `);
}

function approveClip(reelId, clipId) {
  const approved = demoState.studio[reelId] || [];
  if (!approved.includes(clipId)) approved.push(clipId);
  updateDemoState((state) => {
    state.studio[reelId] = approved;
    if (approved.length === 5) {
      state.recentWins.unshift(`${reelDetails[reelId]} ready`);
      state.recentActivity.unshift(`${reelDetails[reelId]} clips approved`);
    }
  }, approved.length === 5 ? "Reel ready" : "Clip approved");
  openStudioModal(reelId);
}

function openCalendarDetail(calendarId) {
  const detail = calendarDetails[calendarId] || calendarDetails["review-push"];
  const completed = demoState.completedCalendarItems.includes(calendarId);
  openDemoModal(detail[0], `
    <div class="demo-plan-stack">
      <article><span>Date</span><strong>${detail[2]}</strong></article>
      <article><span>Purpose</span><strong>${detail[1]}</strong></article>
      <article><span>Status</span><strong>${completed ? "Completed" : "Planned"}</strong></article>
    </div>
    <button type="button" data-demo-action="calendar-complete" data-calendar-item="${calendarId}">${completed ? "Completed" : "Mark Complete"}</button>
  `);
}

function completeCalendarItem(calendarId) {
  updateDemoState((state) => {
    if (!state.completedCalendarItems.includes(calendarId)) {
      state.completedCalendarItems.push(calendarId);
      state.recentWins.unshift(`${calendarDetails[calendarId][0]} completed`);
      state.recentActivity.unshift(`Calendar item completed: ${calendarDetails[calendarId][0]}`);
    }
  }, "Calendar updated");
  closeDemoModal();
}

function renderTodayPage() {
  const brain = generateSoloBrain();
  const recommendation = brain.selected;
  const currentStep = todaySteps[demoState.todayStep] || todaySteps[0];
  const progressValue = Math.min((demoState.weeklyCompleted / 5) * 100, 100);
  const actionLabel = demoState.todayStep >= 3 ? "Mark Complete" : "Continue";
  const actionName = demoState.todayStep >= 3 ? "today-complete" : "today-continue";
  const nextAction = demoState.todayStep >= 4 ? "Signature Cheese Pull Reel" : recommendation.campaign;
  contentStage.innerHTML = `
    <div class="today-page">
      <section class="today-hero">
        <div>
          <p class="hero-greeting">Hello Hiba ðŸ‘‹</p>
          <h2>Solo Pizzeria Napoletana</h2>
          <p>Here's what SOLO recommends for Solo Pizzeria today.</p>
        </div>
        <div class="weekly-progress-card" aria-label="Weekly progress">
          <div class="weekly-progress-card__top">
            <span>Weekly progress</span>
            <strong>${demoState.weeklyCompleted} / 5</strong>
          </div>
          <div class="today-progress-track"><span style="width: ${progressValue}%"></span></div>
          <p>${demoState.weeklyCompleted} / 5 actions completed</p>
        </div>
      </section>

      <section class="current-focus-section" aria-label="Guided workflow">
        <div class="focus-label-row">
          <span>${currentStep[0]}</span>
          <small>${demoState.todayStep + 1} / ${todaySteps.length}</small>
        </div>
        <article class="current-focus-card">
          <span class="focus-icon">✓</span>
          <div class="current-focus-copy">
            <h3>${currentStep[1]}</h3>
            <p>${currentStep[2]}</p>
          </div>
          <button type="button" data-demo-action="${actionName}">${actionLabel}</button>
        </article>
      </section>

      <section class="current-focus-section" aria-label="Current focus">
        <div class="focus-label-row">
          <span>Recommended Priority</span>
          <small>Executive summary</small>
        </div>
        <article class="consultant-recommendation-card">
          <div class="consultant-recommendation-main">
            <span>Recommended Priority</span>
            <h3 data-recommendation-title>${recommendation.title}</h3>
            <p class="executive-recommendation-reason" data-recommendation-reason>${recommendation.whyNow}</p>
            <div class="executive-benefits">
              <strong>Benefits</strong>
              <ul>
                ${recommendation.benefits.slice(0, 3).map((benefit) => `<li>${benefit}</li>`).join("")}
              </ul>
            </div>
            <div class="recommendation-rationale">
              <strong>Based on</strong>
              ${recommendation.basis.slice(0, 4).map((item) => `<span>${item}</span>`).join("")}
            </div>
            <div class="recommendation-confidence">
              <span>Confidence</span>
              <strong>${recommendation.confidence_score}%</strong>
              <small>${recommendation.expected_impact}</small>
            </div>
            <details class="executive-analysis">
              <summary>See reasoning</summary>
              <div>
                <strong>Why SOLO recommends this</strong>
                <p>${recommendation.value}</p>
                <div class="demo-reasoning-chain">
                  <span>${recommendationProgressText()}</span><span>${recommendation.diagnosis}</span><span>${recommendation.opportunity}</span><span>${recommendation.objective}</span><span>${recommendation.strategy}</span><span>${recommendation.campaign}</span><span>${recommendation.confidence_score}% confidence</span>
                </div>
                <span>${demoState.businessProfile.googleRating} rating</span>
                <span>${demoState.businessProfile.numberOfReviews} reviews</span>
                <span>${demoState.businessProfile.city}</span>
                <span>${recommendation.market.momentum} market context</span>
              </div>
            </details>
          </div>
          <button type="button" data-demo-action="view-plan">View Plan</button>
        </article>
      </section>

      <section class="progressive-density-row pizzeria-action-row">
        ${simpleWorkflowCard(nextAction, "Next prepared action for the restaurant.", "SOLO keeps only one priority in front.", "Continue", "today-continue")}
        ${simpleWorkflowCard(`${recommendation.campaign} Plan`, recommendation.objective, `Expected commitment: ${recommendation.commitment}`, "View Plan", "view-plan")}
      </section>

      <section class="guided-flow-section">
        <div class="section-heading">
          <div><p class="section-label">Recent Wins</p><h3>${demoState.recentWins[0] || "+3 Google reviews this week"}</h3></div>
          <span class="section-note">Momentum: Strong â†—</span>
        </div>
      </section>

      <section class="today-support-grid">
        <article class="today-kpi-block">
          <span>Review progress</span>
          <strong>334 / 500 reviews</strong>
          <div class="today-progress-track"><span style="width: 67%"></span></div>
          <small>67% progress toward the social proof goal.</small>
        </article>
        <article class="today-kpi-block">
          <span>Recent win</span>
          <div class="today-wins-list">
            ${demoState.recentWins.slice(0, 3).map((win) => recentWin(win, "Demo activity")).join("")}
          </div>
        </article>
      </section>
      <button type="button" class="demo-reset-button" data-demo-action="reset-demo">Reset Demo</button>
    </div>
  `;
  maybeImproveRecommendationWording(recommendation);
}

function simpleWorkflowCard(title, detail, meta, action = "Continue", demoAction = "", extraData = "") {
  return `
    <article class="simple-workflow-card">
      <div>
        <strong>${title}</strong>
        <p>${detail}</p>
        <small>${meta}</small>
      </div>
      <button type="button"${demoAction ? ` data-demo-action="${demoAction}"${extraData}` : ""}>${action}</button>
    </article>
  `;
}

function renderFocusedCampaignsPage() {
  const brain = generateSoloBrain();
  const activeCampaigns = Object.entries(campaignDetails);
  const completed = demoState.completedCampaigns;
  contentStage.innerHTML = `
    <div class="focus-workflow-page">
      <section class="focus-workflow-hero">
        <div>
          <p class="section-label">Campaigns</p>
          <h2>Prepared campaigns for Solo Pizzeria.</h2>
          <p>Current recommendation: ${brain.selected.campaign} because SOLO diagnosed ${brain.selected.diagnosis.toLowerCase()}.</p>
        </div>
      </section>
      <section class="focus-workflow-section">
        <div class="section-heading"><div><p class="section-label">Active Campaigns</p><h3>What SOLO is working on</h3></div></div>
        <div class="focus-workflow-grid">
          ${activeCampaigns.map(([id, campaign]) => {
            const status = demoState.campaigns[id] || "Planned";
            if (status === "Completed") return "";
            return simpleWorkflowCard(campaign.name, campaign.objective, `Status: ${status} · ${campaign.result}`, "Continue", "campaign-detail", ` data-campaign-id="${id}"`);
          }).join("")}
        </div>
      </section>
      <section class="focus-workflow-section">
        <div class="section-heading"><div><p class="section-label">Completed Campaigns</p><h3>Finished work</h3></div></div>
        ${completed.length
          ? `<div class="focus-workflow-grid">${completed.map((id) => simpleWorkflowCard(campaignDetails[id].name, "Completed inside the demo.", campaignDetails[id].result, "See Details", "campaign-detail", ` data-campaign-id="${id}"`)).join("")}</div>`
          : `<article class="guided-empty-state"><span>No completed campaigns yet</span><strong>Your results will appear here after actions are marked complete.</strong><p>Campaigns move here automatically when you complete them during the demo.</p></article>`}
      </section>
    </div>
  `;
}

function renderFocusedCustomersPage() {
  contentStage.innerHTML = `
    <div class="focus-workflow-page">
      <section class="focus-workflow-hero">
        <div>
          <p class="section-label">Customers</p>
          <h2>Solo Pizzeria customer signals.</h2>
          <p>Reviews, community, returning customers and WhatsApp potential in one simple view.</p>
        </div>
      </section>
      <section class="focus-workflow-grid">
        ${simpleWorkflowCard("Reviews", "334 reviews toward a 500 review objective.", "Trend: growing", "See Details")}
        ${simpleWorkflowCard("Community", "Strong", "Customers naturally share food moments", "See Details")}
        ${simpleWorkflowCard("Returning customers", "Unknown", "Potential contribution: revenue stability", "See Details")}
        ${simpleWorkflowCard("WhatsApp community", "Not built yet", "Potential contribution: customer ownership", "View Plan")}
      </section>
      <section class="focus-workflow-section">
        <div class="section-heading"><div><p class="section-label">Recent Reviews</p><h3>Latest Google signals</h3></div></div>
        <div class="focus-workflow-grid">
          ${simpleWorkflowCard("Google review", "Excellent pizza and warm service.", "This week", "See Details")}
          ${simpleWorkflowCard("Google review", "Authentic Neapolitan taste in Casablanca.", "This week", "See Details")}
          ${simpleWorkflowCard("Google review", "Great atmosphere and tiramisu.", "This week", "See Details")}
        </div>
      </section>
    </div>
  `;
}

function renderFocusedStudioPage() {
  contentStage.innerHTML = `
    <div class="focus-workflow-page">
      <section class="focus-workflow-hero">
        <div>
          <p class="section-label">Studio</p>
          <h2>Prepared reel ideas.</h2>
          <p>Creative work starts from the restaurant's strongest visual assets: pizza, oven, atmosphere and customers.</p>
        </div>
      </section>
      <section class="focus-workflow-grid">
        ${Object.entries(reelDetails).map(([id, title]) => {
          const approved = (demoState.studio[id] || []).length;
          return simpleWorkflowCard(title, "Prepared filming checklist and clip list.", `Progress: ${approved}/5 clips approved`, "Prepare", "studio-prepare", ` data-reel-id="${id}"`);
        }).join("")}
      </section>
    </div>
  `;
}

function renderFocusedResultsPage() {
  const brain = generateSoloBrain();
  const reviewProgress = Math.min((demoState.reviews / 500) * 100, 100).toFixed(0);
  contentStage.innerHTML = `
    <div class="focus-workflow-page">
      <section class="focus-workflow-hero">
        <div>
          <p class="section-label">Results</p>
          <h2>Is Solo Pizzeria growing?</h2>
          <p>Simple proof first. Details stay collapsed until needed.</p>
        </div>
      </section>
      <section class="results-level-one">
        ${simpleWorkflowCard("Reviews", String(demoState.reviews), `Goal: 500 · ${reviewProgress}%`, "See Details")}
        ${simpleWorkflowCard("Momentum", demoState.momentum, "Status improving", "See Details")}
        ${simpleWorkflowCard("Reputation", "Excellent", "4.5 rating", "See Details")}
        ${simpleWorkflowCard("Community", "Growing", "Strong visual sharing potential", "See Details")}
        ${simpleWorkflowCard("Revenue influenced", `${demoState.revenue.toLocaleString()} MAD`, "Gold metric updated from saved results", "See Details")}
      </section>
      <section class="results-detail-panel">
        <div class="section-heading"><div><p class="section-label">Add Result</p><h3>Save new demo outcome</h3></div></div>
        <form class="demo-result-form" data-demo-form="add-result">
          <label><span>New reviews</span><input name="reviews" type="number" min="0" value="0"></label>
          <label><span>New customers</span><input name="customers" type="number" min="0" value="0"></label>
          <label><span>Revenue influenced</span><input name="revenue" type="number" min="0" value="0"></label>
          <label class="demo-result-form__wide"><span>Notes</span><input name="notes" type="text" placeholder="Example: review cards used at dinner"></label>
          <button type="submit">Add Result</button>
        </form>
      </section>
      <section class="results-detail-panel">
        <div class="section-heading"><div><p class="section-label">Recent Activity</p><h3>Saved demo updates</h3></div></div>
        <div class="results-detail-grid">
          ${demoState.recentActivity.slice(0, 6).map((item) => `<span>${item}</span>`).join("")}
        </div>
      </section>
      <section class="results-detail-panel">
        <div class="section-heading"><div><p class="section-label">Next Recommendation</p><h3>${brain.selected.title}</h3></div></div>
        <div class="demo-reasoning-chain">
          <span>${brain.selected.diagnosis}</span>
          <span>${brain.selected.opportunity}</span>
          <span>${brain.selected.strategy}</span>
          <span>${brain.selected.campaign}</span>
          <span>${brain.selected.confidence_score}% confidence</span>
        </div>
      </section>
      <details class="results-detail-panel">
        <summary>Expand Details</summary>
        <div class="results-detail-grid">
          <span>Review evolution</span>
          <span>Campaign performance</span>
          <span>Weekday vs weekend</span>
          <span>Customer trends</span>
          <span>Traffic patterns</span>
          <span>Seasonality</span>
          <span>Historical growth</span>
        </div>
      </details>
    </div>
  `;
}

function renderFocusedCalendarPage() {
  contentStage.innerHTML = `
    <div class="calendar-orientation-page">
      <section class="calendar-orientation-hero">
        <div>
          <p class="section-label">June 2026</p>
          <h2>Trust & Reputation</h2>
          <p>Calendar is here to orient the month, not create more work.</p>
        </div>
        <div class="calendar-progress-panel">
          <span>Current Goal</span>
          <strong>500 Reviews</strong>
          <p>347 / 500</p>
          <div class="today-progress-track"><span style="width: 69%"></span></div>
          <small>On Track</small>
        </div>
      </section>

      <section class="calendar-orientation-section">
        <div class="section-heading"><div><p class="section-label">This Week</p><h3>Three important moments</h3></div></div>
        <div class="calendar-week-focus">
          ${calendarMoment("Tuesday", "Review Push", "Strengthen social proof", "trust", "review-push")}
          ${calendarMoment("Friday", "Weekend Family Menu", "Increase weekend traffic", "revenue", "weekend-family-menu")}
          ${calendarMoment("Sunday", "Signature Reel", "Increase visibility", "content", "signature-reel")}
        </div>
      </section>

      <section class="calendar-orientation-section">
        <div class="section-heading"><div><p class="section-label">Upcoming Events</p><h3>Automatically watched by SOLO</h3></div></div>
        <div class="calendar-event-strip">
          ${calendarEvent("Ramadan Preparation", "Starts in 3 weeks", "community", "ramadan-preparation")}
          ${calendarEvent("Match Night", "Friday", "community", "match-night")}
          ${calendarEvent("Summer Menu", "July", "revenue", "summer-menu")}
          ${calendarEvent("Back To School", "September", "trust", "back-to-school")}
          ${calendarEvent("Autumn Campaign", "October", "content", "autumn-campaign")}
        </div>
      </section>

      <section class="calendar-orientation-section">
        <div class="section-heading"><div><p class="section-label">Month View</p><h3>Visual memory</h3></div></div>
        ${calendarMonthView()}
      </section>

      <section class="calendar-focus-grid">
        <article class="calendar-orientation-section">
          <div class="section-heading"><div><p class="section-label">Month Focus</p><h3>June Theme</h3></div></div>
          <div class="month-focus-list">
            <div><span>Theme</span><strong>Trust & Reputation</strong></div>
            <div><span>Analysis</span><p>Customer satisfaction is strong but social proof can be strengthened.</p></div>
            <div><span>Current Priority</span><strong>Review Growth</strong></div>
            <div><span>Expected Outcome</span><strong>500 Reviews</strong></div>
            <div><span>Other Areas Of Development</span><p>Customer Loyalty · Community · Content Visibility</p></div>
          </div>
        </article>

        <article class="calendar-orientation-section">
          <div class="section-heading"><div><p class="section-label">Recent Wins</p><h3>Completed this month</h3></div></div>
          <div class="calendar-wins-list">
            <span>+15 Reviews</span>
            <span>4 Reels Published</span>
            <span>Weekend Campaign Completed</span>
            <span>2 Returning Customers</span>
            ${demoState.completedCalendarItems.map((id) => `<span>${calendarDetails[id]?.[0] || "Calendar item"} completed</span>`).join("")}
          </div>
        </article>
      </section>

      <section class="calendar-orientation-section">
        <div class="section-heading"><div><p class="section-label">Timeline</p><h3>Themes over time</h3></div></div>
        <div class="calendar-timeline">
          ${timelineItem("Past", "May", "Community", "Completed")}
          ${timelineItem("Current", "June", "Trust & Reputation", "In Progress")}
          ${timelineItem("Next", "July", "Summer Visibility", "Planned")}
          ${timelineItem("Upcoming", "August", "Tourist Season", "Upcoming")}
        </div>
      </section>
    </div>
  `;
}

function calendarMoment(day, title, purpose, tone, id) {
  const completed = demoState.completedCalendarItems.includes(id);
  return `
    <article class="calendar-moment ${completed ? "completed" : tone}">
      <span>${day}</span>
      <strong>${title}</strong>
      <p>Purpose: ${completed ? "Completed" : purpose}</p>
    </article>
  `;
}

function calendarEvent(title, timing, tone, id) {
  const completed = demoState.completedCalendarItems.includes(id);
  return `
    <article class="calendar-event ${completed ? "completed" : tone}">
      <strong>${title}</strong>
      <span>${completed ? "Completed" : timing}</span>
    </article>
  `;
}

function calendarMonthView() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const labels = {
    2: ["Reviews", "trust", "review-push"],
    5: ["Weekend", "revenue", "weekend-family-menu"],
    7: ["Reel", "content", "signature-reel"],
    12: ["Match", "community", "match-night"],
    14: ["Done", "completed", "review-push"],
    18: ["Reviews", "trust", "review-push"],
    21: ["Reel", "content", "signature-reel"],
    25: ["Menu", "revenue", "summer-menu"],
    28: ["Done", "completed", "weekend-family-menu"],
  };

  return `
    <div class="apple-month-view">
      ${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => `<span class="calendar-week-label">${day}</span>`).join("")}
      ${days.map((day) => {
        const event = labels[day];
        return `
          <div class="apple-calendar-day">
            <b>${day}</b>
            ${event ? `<small class="apple-calendar-event ${demoState.completedCalendarItems.includes(event[2]) ? "completed" : event[1]}">${demoState.completedCalendarItems.includes(event[2]) ? "Done" : event[0]}</small>` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function timelineItem(position, month, theme, status) {
  return `
    <article class="timeline-item">
      <span>${position}</span>
      <strong>${month}</strong>
      <p>${theme}</p>
      <small>${status}</small>
    </article>
  `;
}

function attentionRow(task, value, deadline, action) {
  return `
    <article class="attention-row">
      <div><strong>${task}</strong><span>Value: ${value}</span></div>
      <span class="deadline">${deadline}</span>
      <button type="button">${action}</button>
    </article>
  `;
}

function preparedRow(deliverable, status, prepared, action) {
  return `
    <div class="table-row" role="row">
      <span role="cell">${deliverable}</span>
      <span role="cell"><mark>${status}</mark></span>
      <span role="cell">${prepared}</span>
      <span role="cell"><button type="button">${action}</button></span>
    </div>
  `;
}

function alertCard(title, response, action) {
  return `
    <article class="alert-card">
      <div>
        <h4>${title}</h4>
        <p>Suggested response: ${response}</p>
      </div>
      <button type="button">${action}</button>
    </article>
  `;
}

function workspaceTreatmentCard(stage, title, detail, action) {
  return `
    <article class="workspace-treatment-card">
      <span>${stage}</span>
      <h4>${title}</h4>
      <p>${detail}</p>
      <button type="button">${action}</button>
    </article>
  `;
}

const businessFacts = {
  businessName: "Solo Pizzeria Napoletana",
  businessType: "Restaurant",
  city: "Casablanca",
  positioning: "Premium Italian",
  customerProfile: ["Families", "Professionals", "Young Adults"],
  averageTicket: 140,
  googleRating: 4.5,
  reviewCount: 334,
  instagramFollowers: 3200,
  postingFrequency: "2 posts per week",
  storiesFrequency: "Sometimes",
  reelsFrequency: "Weekly",
  whatsappBusiness: true,
  catalog: false,
  customerTags: "Sometimes",
  asksForReviews: "Sometimes",
  customerFollowUp: "Never",
  promotions: "Rarely",
  busyPeriods: ["Lunch", "Evening", "Weekend"],
  weekdayTraffic: "Weak",
  seasonality: ["Ramadan", "Summer", "Football Events"],
  biggestProblem: "Few Returning Customers",
  customersThisMonth: 31,
  monthlyCustomerGoal: 50,
  customersThisWeek: 4,
  reviewsThisWeek: 6,
  returningCustomersThisWeek: 2,
};

const opportunityTestFacts = {
  businessName: "Solo Pizzeria Napoletana",
  businessType: "Restaurant",
  city: "Casablanca",
  positioning: "Premium Italian",
  customerProfile: ["Families", "Professionals", "Young Adults"],
  averageTicket: 140,
  googleRating: 4.6,
  reviewCount: 334,
  instagramFollowers: 3200,
  postingFrequency: "2 posts per week",
  storiesFrequency: "Sometimes",
  reelsFrequency: "Weekly",
  whatsappBusiness: true,
  catalog: false,
  customerTags: "Sometimes",
  asksForReviews: "Sometimes",
  customerFollowUp: "Never",
  promotions: "Rarely",
  busyPeriods: ["Lunch", "Evening", "Weekend"],
  weekdayTraffic: "Weak",
  seasonality: ["Summer", "Football Events", "Tourist Season"],
  biggestProblem: "Few Returning Customers",
  customersThisMonth: 31,
  monthlyCustomerGoal: 50,
  customersThisWeek: 4,
  reviewsThisWeek: 6,
  returningCustomersThisWeek: 2,
};

const diagnosisRules = [
  {
    category: "strengths",
    label: "Strong reputation",
    explanation: "Customers appear satisfied and the public rating is strong.",
    confidence: 95,
    why: "Google rating is 4.5, which signals high customer satisfaction.",
    test: (facts) => facts.googleRating >= 4.4,
  },
  {
    category: "weaknesses",
    label: "Weak social proof",
    explanation: "Customer satisfaction exists, but social proof is not being captured at full strength.",
    confidence: 75,
    why: "The rating is strong, but the review base is still too small to create visible trust at scale.",
    test: (facts) => facts.googleRating >= 4.4 && facts.reviewCount < 80,
  },
  {
    category: "weaknesses",
    label: "Weak review collection system",
    explanation: "Satisfied customers exist, but review collection does not look systematic.",
    confidence: 85,
    why: "Reviews are requested sometimes, not consistently, so satisfied customers are not captured reliably.",
    test: (facts) => facts.asksForReviews !== "Always",
  },
  {
    category: "strengths",
    label: "Strong community",
    explanation: "Customers show signs of public attachment to the business.",
    confidence: 80,
    why: "Customers tag the business, which shows people are willing to associate publicly with Solo Pizzeria.",
    test: (facts) => facts.customerTags === "Sometimes" || facts.customerTags === "Often",
  },
  {
    category: "opportunities",
    label: "Strong UGC potential",
    explanation: "There is potential for customer-created proof around the business.",
    confidence: 95,
    why: "Customer tagging behavior means the audience can create trust signals around the business.",
    test: (facts) => facts.customerTags === "Sometimes" || facts.customerTags === "Often",
  },
  {
    category: "weaknesses",
    label: "Weak retention system",
    explanation: "Customers visit, but ownership of the customer relationship is not strong enough yet.",
    confidence: 80,
    why: "Customer follow-up is marked as never, and the biggest problem is few returning customers.",
    test: (facts) => facts.customerFollowUp === "Never",
  },
  {
    category: "problems",
    label: "Few returning customers",
    explanation: "Repeat visits are not yet strong enough for the business goal.",
    confidence: 80,
    why: "The biggest problem selected in the business profile is Few Returning Customers.",
    test: (facts) => facts.biggestProblem === "Few Returning Customers",
  },
  {
    category: "problems",
    label: "Demand imbalance",
    explanation: "Customer demand appears stronger during specific moments than during the full week.",
    confidence: 80,
    why: "The business is busy on weekends while weekday traffic is weak.",
    test: (facts) => facts.busyPeriods.includes("Weekend") && facts.weekdayTraffic === "Weak",
  },
  {
    category: "problems",
    label: "Low weekday traffic",
    explanation: "The business appears more dependent on weekends than weekdays.",
    confidence: 75,
    why: "Weekday traffic is marked as weak in the business profile.",
    test: (facts) => facts.weekdayTraffic === "Weak",
  },
  {
    category: "strengths",
    label: "Strong visual content potential",
    explanation: "Food, drinks, interior design and atmosphere are naturally visual.",
    confidence: 95,
    why: "Restaurant dishes, atmosphere and preparation are visual, and Solo Pizzeria already has Instagram activity.",
    test: (facts) => ["Cafe", "Restaurant"].includes(facts.businessType) && facts.instagramFollowers >= 2000 && facts.reelsFrequency !== "Never",
  },
  {
    category: "strengths",
    label: "Strong product differentiation",
    explanation: "The business has a clearer premium identity than a generic cafÃ©.",
    confidence: 90,
    why: "The business positioning is Premium Italian, which gives Solo Pizzeria a clearer market identity.",
    test: (facts) => facts.positioning.includes("Premium") || facts.positioning === "Luxury",
  },
  {
    category: "strengths",
    label: "Premium positioning",
    explanation: "The experience supports a higher-quality perception.",
    confidence: 90,
    why: "Brand positioning is Premium Italian, supported by presentation and customer experience signals.",
    test: (facts) => facts.positioning.includes("Premium") || facts.positioning === "Luxury",
  },
  {
    category: "weaknesses",
    label: "Weak visibility",
    explanation: "The business would need more visible demand signals if digital reach were lower.",
    confidence: 65,
    why: "Both Instagram audience and Google rating signals would be below the visibility threshold.",
    test: (facts) => facts.instagramFollowers < 1000 && facts.googleRating < 4.3,
  },
  {
    category: "weaknesses",
    label: "Weak WhatsApp usage",
    explanation: "WhatsApp is present, but it is not fully structured as a customer ownership channel.",
    confidence: 75,
    why: "WhatsApp Business exists, but catalog is not enabled.",
    test: (facts) => facts.whatsappBusiness && !facts.catalog,
  },
  {
    category: "weaknesses",
    label: "Instagram underexploited",
    explanation: "The visual potential appears stronger than the current content rhythm.",
    confidence: 75,
    why: "Solo Pizzeria has strong visual signals, but posting is only 2 posts per week and stories are only used sometimes.",
    test: (facts) => ["Cafe", "Restaurant"].includes(facts.businessType) && facts.postingFrequency !== "Daily",
  },
  {
    category: "problems",
    label: "Need better customer acquisition",
    explanation: "Current growth appears dependent on organic discovery and walk-in behavior.",
    confidence: 60,
    why: "The profile shows premium demand, but no structured acquisition system is visible in the facts.",
    test: (facts) => facts.biggestProblem === "Few Returning Customers" || facts.weekdayTraffic === "Weak",
  },
  {
    category: "problems",
    label: "Weak customer ownership",
    explanation: "Customers visit, but the business does not fully own the relationship afterward.",
    confidence: 80,
    why: "No active follow-up habit is identified, and WhatsApp is not fully structured.",
    test: (facts) => facts.customerFollowUp === "Never",
  },
  {
    category: "opportunities",
    label: "High social proof opportunity",
    explanation: "Customer satisfaction can become more visible than it is today.",
    confidence: 90,
    why: "The rating is already 4.5, but review collection is not systematic.",
    test: (facts) => facts.googleRating >= 4.4 && facts.asksForReviews !== "Always",
  },
  {
    category: "opportunities",
    label: "Seasonal opportunity",
    explanation: "The business is exposed to seasonal demand changes.",
    confidence: 85,
    why: "The business is affected by Ramadan, summer, and football events.",
    test: (facts) => facts.seasonality.length > 0,
  },
  {
    category: "opportunities",
    label: "Student segment opportunity",
    explanation: "Students are already part of the customer profile.",
    confidence: 80,
    why: "Young adults and professionals are selected as customer profiles for Solo Pizzeria.",
    test: (facts) => facts.customerProfile.includes("Students") || facts.customerProfile.includes("Young Adults"),
  },
  {
    category: "opportunities",
    label: "Repeat customer potential",
    explanation: "Restaurants and cafÃ©s benefit strongly from visit frequency.",
    confidence: 90,
    why: "The business has returning customers this week, but retention is still marked as weak.",
    test: (facts) => facts.returningCustomersThisWeek > 0 && facts.customerFollowUp === "Never",
  },
  {
    category: "opportunities",
    label: "WhatsApp opportunity",
    explanation: "WhatsApp behavior is central in Moroccan customer relationships.",
    confidence: 95,
    why: "WhatsApp Business is present, but follow-up and catalog structure are not fully developed.",
    test: (facts) => facts.whatsappBusiness,
  },
];

function diagnoseBusiness(facts) {
  const goalProgress = Math.round((facts.customersThisMonth / facts.monthlyCustomerGoal) * 100);
  const diagnosis = {
    strengths: [],
    weaknesses: [],
    problems: [],
    opportunities: [],
    momentum: [],
    overallStatus: [],
  };

  diagnosisRules.forEach((rule) => {
    if (rule.test(facts)) {
      diagnosis[rule.category].push({
        label: rule.label,
        explanation: rule.explanation,
        confidence: rule.confidence,
        why: rule.why,
      });
    }
  });

  const momentumLabel = facts.customersThisWeek >= 4 && facts.reviewsThisWeek >= 6 ? "Strong â†—" : "Stable â†’";
  diagnosis.momentum.push({
    label: momentumLabel,
    explanation: "Momentum is based on customer, review and returning customer movement this week.",
    confidence: 90,
    why: `${facts.customersThisWeek} customers, ${facts.reviewsThisWeek} reviews, and ${facts.returningCustomersThisWeek} returning customers were recorded this week.`,
  });

  diagnosis.overallStatus.push({
    label: "Strong foundation with untapped potential",
    explanation: "The business has a healthy base, but some important systems are still not fully visible.",
    confidence: 90,
    why: `${facts.businessName || "The business"} has ${facts.googleRating} rating, ${facts.reviewCount} reviews, premium positioning, and ${goalProgress}% customer goal progress, but follow-up is not active.`,
  });

  return diagnosis;
}

function diagnosisGroup(title, items, tone = "") {
  return `
    <article class="diagnosis-card ${tone}">
      <span>${title}</span>
      <ul>
        ${items.map((item) => `
          <li>
            <strong>${item.label}</strong>
            <button type="button" data-why="${item.why}">WHY?</button>
          </li>
        `).join("")}
      </ul>
    </article>
  `;
}

function diagnosisUiCard(item, tone) {
  return `
    <article class="diagnosis-ui-card ${tone}">
      <div class="diagnosis-ui-card__top">
        <span aria-hidden="true"></span>
        <strong>${item.label}</strong>
      </div>
      <p>${item.explanation}</p>
      <div class="diagnosis-ui-card__footer">
        <small>Confidence: ${item.confidence}%</small>
        <button type="button" data-why="${item.why} Confidence: ${item.confidence}%">WHY?</button>
      </div>
    </article>
  `;
}

function diagnosisUiSection(title, items, tone) {
  return `
    <section class="diagnosis-ui-section">
      <div class="section-heading">
        <div><p class="section-label">Diagnosis</p><h3>${title}</h3></div>
      </div>
      <div class="diagnosis-ui-grid">
        ${items.map((item) => diagnosisUiCard(item, tone)).join("")}
      </div>
    </section>
  `;
}

function hasDiagnosis(diagnosis, category, label) {
  return diagnosis[category].some((item) => item.label === label);
}

const opportunityRules = [
  {
    title: "High Social Proof Opportunity",
    explanation: "Customers are satisfied, but review acquisition is not yet systematic.",
    impact: "High",
    difficulty: "Easy",
    priority: "High",
    confidence: 90,
    potentialValue: "Higher trust and more customer acquisition.",
    why: "4.6 stars, 334 reviews, strong satisfaction signals, and weak review collection.",
    test: (diagnosis) => hasDiagnosis(diagnosis, "strengths", "Strong reputation") && hasDiagnosis(diagnosis, "weaknesses", "Weak review collection system"),
  },
  {
    title: "Repeat Customer Opportunity",
    explanation: "The business has room to increase customer frequency and ownership.",
    impact: "High",
    difficulty: "Medium",
    priority: "High",
    confidence: 85,
    potentialValue: "Revenue stability and stronger community.",
    why: "Few returning customers is a diagnosed problem, and weak retention is visible in the business facts.",
    test: (diagnosis) => hasDiagnosis(diagnosis, "problems", "Few returning customers") || hasDiagnosis(diagnosis, "weaknesses", "Weak retention system"),
  },
  {
    title: "WhatsApp Community Opportunity",
    explanation: "Customer ownership can become stronger because WhatsApp is already present.",
    impact: "Medium",
    difficulty: "Easy",
    priority: "Medium",
    confidence: 95,
    potentialValue: "Better customer ownership.",
    why: "Moroccan customers rely heavily on WhatsApp communication, and WhatsApp Business exists but is not fully structured.",
    test: (diagnosis) => hasDiagnosis(diagnosis, "opportunities", "WhatsApp opportunity"),
  },
  {
    title: "UGC Opportunity",
    explanation: "Food, atmosphere and customer behavior create organic visibility potential.",
    impact: "High",
    difficulty: "Easy",
    priority: "Medium",
    confidence: 95,
    potentialValue: "Organic visibility.",
    why: "Customers tag the business, and the product experience is naturally visual.",
    test: (diagnosis) => hasDiagnosis(diagnosis, "opportunities", "Strong UGC potential") || hasDiagnosis(diagnosis, "strengths", "Strong visual content potential"),
  },
  {
    title: "Weekday Traffic Opportunity",
    explanation: "Demand appears concentrated on weekends while weekdays are weaker.",
    impact: "Medium",
    difficulty: "Medium",
    priority: "Medium",
    confidence: 70,
    potentialValue: "Better capacity utilization.",
    why: "Diagnosis shows demand imbalance and weak weekday traffic.",
    test: (diagnosis) => hasDiagnosis(diagnosis, "problems", "Demand imbalance") || hasDiagnosis(diagnosis, "problems", "Low weekday traffic"),
  },
];

function buildOpportunities(diagnosis) {
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };

  return opportunityRules
    .filter((rule) => rule.test(diagnosis))
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority] || b.confidence - a.confidence)
    .slice(0, 5)
    .map(({ test, ...opportunity }) => opportunity);
}

function opportunityCard(opportunity) {
  return `
    <article class="opportunity-engine-card priority-${opportunity.priority.toLowerCase()}">
      <div class="opportunity-engine-card__top">
        <span>${opportunity.priority} Priority</span>
        <strong>${opportunity.title}</strong>
        <p>${opportunity.explanation}</p>
      </div>
      <dl>
        <div><dt>Impact</dt><dd>${opportunity.impact}</dd></div>
        <div><dt>Difficulty</dt><dd>${opportunity.difficulty}</dd></div>
        <div><dt>Priority</dt><dd>${opportunity.priority}</dd></div>
        <div><dt>Confidence</dt><dd>${opportunity.confidence}%</dd></div>
      </dl>
      <div class="opportunity-value">
        <span>Potential Value</span>
        <p>${opportunity.potentialValue}</p>
      </div>
      <div class="opportunity-card-actions">
        <button type="button" data-why="${opportunity.why} Confidence: ${opportunity.confidence}%">WHY?</button>
        <button type="button" data-why="${opportunity.why} Potential value: ${opportunity.potentialValue}">Understand Opportunity</button>
        <button type="button" data-why="${opportunity.explanation} Impact: ${opportunity.impact}. Difficulty: ${opportunity.difficulty}. Priority: ${opportunity.priority}.">View Details</button>
      </div>
    </article>
  `;
}

const objectiveRules = [
  {
    opportunityTitle: "High Social Proof Opportunity",
    title: "Increase reviews",
    currentState: "334 reviews",
    targetState: "500 reviews",
    timeframe: "4 months",
    expectedPace: "+5 reviews/week",
    confidence: 90,
    why: "High Social Proof Opportunity exists because customer satisfaction is strong but review acquisition is weak.",
  },
  {
    opportunityTitle: "Repeat Customer Opportunity",
    title: "Increase repeat customers",
    currentState: "Unknown",
    targetState: "+20%",
    timeframe: "3 months",
    expectedPace: "Measured weekly after customer ownership improves",
    confidence: 80,
    why: "Repeat Customer Opportunity exists because retention is weak and restaurants benefit from frequency.",
  },
  {
    opportunityTitle: "WhatsApp Community Opportunity",
    title: "Increase customer ownership",
    currentState: "WhatsApp present, structure incomplete",
    targetState: "Owned customer communication base",
    timeframe: "3 months",
    expectedPace: "Weekly customer capture",
    confidence: 88,
    why: "WhatsApp Community Opportunity exists because Moroccan customers rely heavily on WhatsApp communication.",
  },
  {
    opportunityTitle: "UGC Opportunity",
    title: "Increase awareness",
    currentState: "Strong visuals, underused sharing potential",
    targetState: "More customer-created visibility",
    timeframe: "3 months",
    expectedPace: "Weekly public customer signals",
    confidence: 85,
    why: "UGC Opportunity exists because product and atmosphere naturally encourage sharing.",
  },
  {
    opportunityTitle: "Weekday Traffic Opportunity",
    title: "Increase weekday traffic",
    currentState: "Weak weekdays",
    targetState: "More balanced weekly demand",
    timeframe: "3 months",
    expectedPace: "Weekly traffic comparison",
    confidence: 70,
    why: "Weekday Traffic Opportunity exists because demand is concentrated on weekends.",
  },
];

function buildObjectives(opportunities) {
  return opportunities
    .map((opportunity) => {
      const rule = objectiveRules.find((item) => item.opportunityTitle === opportunity.title);
      if (!rule) return null;
      return {
        ...rule,
        sourceOpportunity: opportunity.title,
        sourceWhy: opportunity.why,
      };
    })
    .filter(Boolean);
}

const strategyRules = [
  {
    objectiveTitle: "Increase reviews",
    name: "Social Proof",
    why: "More visible customer proof supports trust before a first visit.",
    impact: "High",
    difficulty: "Easy",
    confidence: 92,
    expectedValue: "Higher trust and stronger customer acquisition.",
  },
  {
    objectiveTitle: "Increase repeat customers",
    name: "Retention",
    why: "Repeat visits create more stable revenue than relying only on new customers.",
    impact: "High",
    difficulty: "Medium",
    confidence: 84,
    expectedValue: "Revenue stability and stronger community.",
  },
  {
    objectiveTitle: "Increase awareness",
    name: "Content",
    why: "Visual products and atmosphere can increase recognition when used consistently.",
    impact: "Medium",
    difficulty: "Medium",
    confidence: 86,
    expectedValue: "More organic visibility.",
  },
  {
    objectiveTitle: "Increase weekday traffic",
    name: "Offer Strategy",
    why: "Weak weekday traffic requires a demand-balancing strategy before any specific offer exists.",
    impact: "Medium",
    difficulty: "Medium",
    confidence: 72,
    expectedValue: "Better capacity utilization.",
  },
  {
    objectiveTitle: "Increase customer ownership",
    name: "WhatsApp CRM",
    why: "Owned customer communication reduces dependence on walk-ins and platform visibility.",
    impact: "Medium",
    difficulty: "Easy",
    confidence: 90,
    expectedValue: "Better customer ownership.",
  },
];

function buildStrategies(objectives) {
  return objectives
    .map((objective) => {
      const rule = strategyRules.find((item) => item.objectiveTitle === objective.title);
      if (!rule) return null;
      return {
        ...rule,
        sourceObjective: objective.title,
        sourceOpportunity: objective.sourceOpportunity,
        objectiveWhy: objective.why,
      };
    })
    .filter(Boolean);
}

const campaignLibrary = {
  "Social Proof": [
    {
      name: "Google Review Engine",
      goal: "Increase trust",
      why: "Weak review acquisition requires a structured review system.",
      expectedImpact: "More visible trust before first visit.",
      difficulty: "Easy",
      timeRequired: "15 min setup",
      cost: "Low",
      confidence: 95,
      status: "Available",
      prepared: "Reasoning ready",
    },
    {
      name: "Customer Stories",
      goal: "Increase trust",
      why: "Satisfied customers can make the experience more believable.",
      expectedImpact: "Stronger credibility.",
      difficulty: "Medium",
      timeRequired: "30 min",
      cost: "Low",
      confidence: 88,
      status: "Available",
      prepared: "Reasoning ready",
    },
    {
      name: "QR Table Cards",
      goal: "Increase reviews",
      why: "Table-level review prompts fit restaurant behavior without pressure.",
      expectedImpact: "More review capture moments.",
      difficulty: "Easy",
      timeRequired: "20 min",
      cost: "Low",
      confidence: 90,
      status: "Available",
      prepared: "Reasoning ready",
    },
  ],
  Retention: [
    {
      name: "WhatsApp VIP Club",
      goal: "Increase repeat customers",
      why: "Customer ownership is weak and WhatsApp behavior is strong in Morocco.",
      expectedImpact: "Higher repeat customer contact.",
      difficulty: "Medium",
      timeRequired: "30 min",
      cost: "Low",
      confidence: 88,
      status: "Available",
      prepared: "Reasoning ready",
    },
    {
      name: "Customer Reactivation",
      goal: "Increase repeat customers",
      why: "Inactive customers are easier to regain than cold audiences.",
      expectedImpact: "More returning customers.",
      difficulty: "Medium",
      timeRequired: "25 min",
      cost: "Low",
      confidence: 82,
      status: "Available",
      prepared: "Reasoning ready",
    },
  ],
  Content: [
    {
      name: "Behind The Scenes",
      goal: "Increase awareness",
      why: "Premium preparation and atmosphere are visible trust signals.",
      expectedImpact: "More organic visibility.",
      difficulty: "Medium",
      timeRequired: "30 min",
      cost: "Low",
      confidence: 84,
      status: "Available",
      prepared: "Reasoning ready",
    },
    {
      name: "Customer Reactions",
      goal: "Increase awareness",
      why: "Customer proof connects awareness with credibility.",
      expectedImpact: "Stronger brand familiarity.",
      difficulty: "Medium",
      timeRequired: "30 min",
      cost: "Low",
      confidence: 86,
      status: "Available",
      prepared: "Reasoning ready",
    },
  ],
  "Offer Strategy": [
    {
      name: "Lunch Menu",
      goal: "Increase weekday traffic",
      why: "Weak weekdays require a weekday demand mechanism.",
      expectedImpact: "Better weekday capacity utilization.",
      difficulty: "Medium",
      timeRequired: "30 min",
      cost: "Medium",
      confidence: 72,
      status: "Available",
      prepared: "Reasoning ready",
    },
  ],
  "WhatsApp CRM": [
    {
      name: "VIP Club",
      goal: "Increase customer ownership",
      why: "WhatsApp is present but customer ownership is not structured.",
      expectedImpact: "Stronger owned communication.",
      difficulty: "Easy",
      timeRequired: "20 min",
      cost: "Low",
      confidence: 90,
      status: "Available",
      prepared: "Reasoning ready",
    },
    {
      name: "Review Requests",
      goal: "Increase trust",
      why: "WhatsApp can support review acquisition when customer satisfaction is high.",
      expectedImpact: "More visible social proof.",
      difficulty: "Easy",
      timeRequired: "15 min",
      cost: "Low",
      confidence: 88,
      status: "Available",
      prepared: "Reasoning ready",
    },
  ],
};

function passesMoroccanFilter(campaign, facts) {
  const lowRiskNames = [
    "Google Review Engine",
    "Customer Stories",
    "QR Table Cards",
    "WhatsApp VIP Club",
    "Customer Reactivation",
    "Behind The Scenes",
    "Customer Reactions",
    "Lunch Menu",
    "VIP Club",
    "Review Requests",
  ];

  return facts.city === "Casablanca"
    && facts.businessType === "Restaurant"
    && facts.positioning === "Premium"
    && lowRiskNames.includes(campaign.name);
}

function buildCampaignOptions(strategies, facts) {
  return strategies.flatMap((strategy) => {
    const campaigns = campaignLibrary[strategy.name] || [];

    return campaigns
      .filter((campaign) => passesMoroccanFilter(campaign, facts))
      .map((campaign) => ({
        ...campaign,
        sourceStrategy: strategy.name,
        sourceObjective: strategy.sourceObjective,
        sourceOpportunity: strategy.sourceOpportunity,
        reasoning: [
          "Weak review acquisition",
          strategy.sourceOpportunity,
          strategy.sourceObjective,
          `${strategy.name} strategy`,
          `${campaign.name} selected`,
        ],
      }));
  });
}

function renderOpportunitiesPage() {
  const diagnosis = diagnoseBusiness(opportunityTestFacts);
  const opportunities = buildOpportunities(diagnosis);

  contentStage.innerHTML = `
    <div class="opportunities-page">
      <section class="opportunities-hero">
        <div>
          <p class="section-label">Opportunity Engine</p>
          <h2>Opportunities</h2>
          <p>Diagnosis becomes opportunity. SOLO stops before strategy, campaigns or content.</p>
          ${statusStrip(["Test profile: Solo Pizzeria Napoletana", "Casablanca", "Diagnosis-based only"])}
        </div>
        <div class="opportunity-context-panel">
          <span>Input</span>
          <strong>Strong foundation with weak retention</strong>
          <p>Opportunities are derived from strengths, weaknesses, problems, momentum and business data.</p>
        </div>
      </section>

      <section class="opportunities-section">
        <div class="section-heading">
          <div>
            <p class="section-label">Top Opportunities</p>
            <h3>Only the clearest opportunities</h3>
          </div>
          <span class="section-note">${opportunities.length} opportunities identified Â· No solutions generated</span>
        </div>
        <div class="opportunity-engine-grid">
          ${opportunities.map(opportunityCard).join("")}
        </div>
      </section>
    </div>
  `;
}

function objectiveCard(objective) {
  return `
    <article class="reasoning-card">
      <span>From ${objective.sourceOpportunity}</span>
      <h3>${objective.title}</h3>
      <dl>
        <div><dt>Current State</dt><dd>${objective.currentState}</dd></div>
        <div><dt>Target State</dt><dd>${objective.targetState}</dd></div>
        <div><dt>Timeframe</dt><dd>${objective.timeframe}</dd></div>
        <div><dt>Expected Pace</dt><dd>${objective.expectedPace}</dd></div>
        <div><dt>Confidence</dt><dd>${objective.confidence}%</dd></div>
      </dl>
      <p>${objective.why}</p>
    </article>
  `;
}

function renderObjectivesPage() {
  const diagnosis = diagnoseBusiness(opportunityTestFacts);
  const opportunities = buildOpportunities(diagnosis);
  const objectives = buildObjectives(opportunities);

  contentStage.innerHTML = `
    <div class="reasoning-page objectives-page">
      <section class="reasoning-hero">
        <div>
          <p class="section-label">Objective Engine</p>
          <h2>Objectives</h2>
          <p>Opportunities become measurable goals. No strategies or campaigns are created on this page.</p>
          ${statusStrip(["Solo Pizzeria Napoletana", "Opportunity â†’ Objective", "No campaigns yet"])}
        </div>
      </section>
      <section class="reasoning-section">
        <div class="section-heading">
          <div><p class="section-label">Measurable Goals</p><h3>Objective candidates</h3></div>
          <span class="section-note">Derived from validated opportunities</span>
        </div>
        <div class="reasoning-grid">
          ${objectives.map(objectiveCard).join("")}
        </div>
      </section>
    </div>
  `;
}

function strategyCard(strategy) {
  return `
    <article class="reasoning-card strategy-card">
      <span>From ${strategy.sourceObjective}</span>
      <h3>${strategy.name}</h3>
      <p>${strategy.why}</p>
      <dl>
        <div><dt>Impact</dt><dd>${strategy.impact}</dd></div>
        <div><dt>Difficulty</dt><dd>${strategy.difficulty}</dd></div>
        <div><dt>Confidence</dt><dd>${strategy.confidence}%</dd></div>
        <div><dt>Expected Value</dt><dd>${strategy.expectedValue}</dd></div>
      </dl>
    </article>
  `;
}

function renderStrategyPage() {
  const diagnosis = diagnoseBusiness(opportunityTestFacts);
  const opportunities = buildOpportunities(diagnosis);
  const objectives = buildObjectives(opportunities);
  const strategies = buildStrategies(objectives);

  contentStage.innerHTML = `
    <div class="reasoning-page strategy-page">
      <section class="reasoning-hero">
        <div>
          <p class="section-label">Strategy Engine</p>
          <h2>Strategy</h2>
          <p>Objectives become strategic direction. Campaigns come later and only unlock from strategy.</p>
          ${statusStrip(["Objective â†’ Strategy", "Agency logic", "No campaigns yet"])}
        </div>
      </section>
      <section class="reasoning-section">
        <div class="section-heading">
          <div><p class="section-label">Strategy Layer</p><h3>Strategies selected by objective</h3></div>
          <span class="section-note">No black box</span>
        </div>
        <div class="reasoning-grid">
          ${strategies.map(strategyCard).join("")}
        </div>
      </section>
    </div>
  `;
}

function campaignLibraryCard(campaign) {
  return `
    <article class="campaign-library-card">
      <div class="campaign-library-card__top">
        <span>${campaign.sourceStrategy} Strategy</span>
        <h3>${campaign.name}</h3>
        <p>${campaign.why}</p>
      </div>
      <dl>
        <div><dt>Goal</dt><dd>${campaign.goal}</dd></div>
        <div><dt>Expected Impact</dt><dd>${campaign.expectedImpact}</dd></div>
        <div><dt>Difficulty</dt><dd>${campaign.difficulty}</dd></div>
        <div><dt>Time Required</dt><dd>${campaign.timeRequired}</dd></div>
        <div><dt>Cost</dt><dd>${campaign.cost}</dd></div>
        <div><dt>Confidence</dt><dd>${campaign.confidence}%</dd></div>
        <div><dt>Status</dt><dd>${campaign.status}</dd></div>
        <div><dt>Prepared</dt><dd>${campaign.prepared}</dd></div>
      </dl>
      <div class="reasoning-chain">
        <strong>WHY THIS?</strong>
        ${campaign.reasoning.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </article>
  `;
}

function renderCampaignLibraryPage() {
  const diagnosis = diagnoseBusiness(opportunityTestFacts);
  const opportunities = buildOpportunities(diagnosis);
  const objectives = buildObjectives(opportunities);
  const strategies = buildStrategies(objectives);
  const campaigns = buildCampaignOptions(strategies, opportunityTestFacts);

  contentStage.innerHTML = `
    <div class="reasoning-page campaign-library-page">
      <section class="reasoning-hero">
        <div>
          <p class="section-label">Campaign Library</p>
          <h2>Strategy unlocked campaigns</h2>
          <p>Campaigns appear only after Diagnosis â†’ Opportunity â†’ Objective â†’ Strategy. No execution assets yet.</p>
          ${statusStrip(["Test: Solo Pizzeria", "Moroccan filter applied", "Execution locked until Phase 19"])}
        </div>
      </section>
      <section class="reasoning-section">
        <div class="section-heading">
          <div><p class="section-label">Available Campaigns</p><h3>Reasoning-backed library</h3></div>
          <span class="section-note">${campaigns.length} culturally safe options</span>
        </div>
        <div class="campaign-library-grid">
          ${campaigns.map(campaignLibraryCard).join("")}
        </div>
      </section>
    </div>
  `;
}

function momentumSignal(title, status, direction, tone, why) {
  return `
    <article class="momentum-signal ${tone}">
      <span>${title}</span>
      <strong>${status} ${direction}</strong>
      <button type="button" data-why="${why}">WHY?</button>
    </article>
  `;
}

function knowledgeGap(question) {
  return `
    <article class="knowledge-gap-card">
      <span>Needs more context</span>
      <strong>${question}</strong>
    </article>
  `;
}

function renderDiagnosisPage() {
  const diagnosis = diagnoseBusiness(businessFacts);
  const knowledgeGaps = [
    "Weekday traffic?",
    "Average ticket?",
    "Customer profile?",
    "Tourists?",
    "Frequency of visits?",
    "Competitors?",
    "Delivery channels?",
    "Best-selling dishes?",
    "Seasonality?",
  ];

  contentStage.innerHTML = `
    <div class="diagnosis-page">
      <section class="diagnosis-hero">
        <div>
          <p class="hero-greeting">Hello Hiba ðŸ‘‹</p>
          <h2>Diagnosis</h2>
          <p>Understand your business before taking action.</p>
          <p class="diagnosis-hero__subtitle">Here's what SOLO sees about Solo Pizzeria today.</p>
        </div>
        <div class="diagnosis-status-panel">
          <div>
            <span>Status</span>
            <strong>Strong Foundation With Untapped Potential</strong>
          </div>
          <div>
            <span>Momentum</span>
            <strong>Strong â†—</strong>
          </div>
          <p><b>Because:</b> Strong reputation, premium positioning and healthy demand.</p>
        </div>
      </section>

      ${diagnosisUiSection("Strengths", diagnosis.strengths, "diagnosis-tone--green")}
      ${diagnosisUiSection("Weaknesses", diagnosis.weaknesses, "diagnosis-tone--orange")}
      ${diagnosisUiSection("Problems", diagnosis.problems, "diagnosis-tone--red")}
      ${diagnosisUiSection("Opportunities", diagnosis.opportunities, "diagnosis-tone--purple")}

      <section class="diagnosis-ui-section momentum-diagnosis-section">
        <div class="section-heading">
          <div><p class="section-label">Momentum</p><h3>Strong â†—</h3></div>
          <span class="section-note">Based on real movement, not a score</span>
        </div>
        <div class="momentum-signal-grid">
          ${momentumSignal("Reputation", "Strong", "â†—", "signal-green", "4.5 Google rating and 334 reviews indicate strong customer satisfaction.")}
          ${momentumSignal("Product", "Strong", "â†—", "signal-green", "Premium positioning and strong visual product signals show clear differentiation.")}
          ${momentumSignal("Visibility", "Healthy", "â†’", "signal-purple", "Instagram and Google presence are visible, but not fully exploited.")}
          ${momentumSignal("Retention", "Needs Attention", "â†˜", "signal-orange", "No active follow-up habit is identified, and few returning customers is the biggest problem.")}
          ${momentumSignal("Community", "Growing", "â†—", "signal-green", "Customers tag the business sometimes, which shows community movement.")}
        </div>
      </section>

      <section class="diagnosis-ui-section knowledge-gap-section">
        <div class="section-heading">
          <div><p class="section-label">Missing Knowledge</p><h3>Things SOLO needs to understand better</h3></div>
          <span class="section-note">These are not weaknesses</span>
        </div>
        <div class="knowledge-gap-grid">
          ${knowledgeGaps.map((question) => knowledgeGap(question)).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderDashboardPage() {
  const diagnosis = diagnoseBusiness(businessFacts);

  contentStage.innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-command-top">
        <div>
          <p class="hero-greeting">Hello Hiba ðŸ‘‹</p>
          <p class="hero-subtitle">Here's what's happening with Solo Pizzeria today.</p>
        </div>
        <div class="dashboard-controls" aria-label="Dashboard controls">
          <button type="button" class="dashboard-filter">This Month</button>
          <button type="button" class="dashboard-icon-button" aria-label="Notifications">3</button>
          <button type="button" class="dashboard-profile" aria-label="Hiba profile">H</button>
        </div>
      </div>

      <section class="dashboard-hero">
        <div class="hero-command-block hero-command-block--goal">
          <div class="hero-card-head">
            <span>Monthly Goal</span>
            <b>62%</b>
          </div>
          <div class="hero-number-row">
            <strong>31 <em>/ 50</em></strong>
            <small>customers this month</small>
          </div>
          <div class="goal-track"><span style="width: 62%"></span></div>
          <div class="hero-card-footer">
            <span>19 customers remaining</span>
            <strong>â‰ˆ 11,400 MAD opportunity</strong>
          </div>
        </div>

        <div class="hero-command-block hero-command-block--revenue">
          <div class="hero-card-head">
            <span>Revenue Opportunity</span>
            <b class="trend-pill">+18%</b>
          </div>
          <div class="hero-revenue-row">
            <strong>11,400 MAD</strong>
            <small>Potential value remaining this month</small>
          </div>
          <svg class="mini-revenue-chart" viewBox="0 0 320 96" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="revenueLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#D4AF37" stop-opacity="0.58" />
                <stop offset="0.7" stop-color="#F6D879" />
                <stop offset="1" stop-color="#D4AF37" />
              </linearGradient>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#D4AF37" stop-opacity="0.28" />
                <stop offset="1" stop-color="#D4AF37" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path d="M8 72 C42 42 68 52 98 56 C132 60 138 28 176 30 C214 32 220 58 252 49 C286 40 280 16 312 18 L312 92 L8 92 Z" fill="url(#revenueFill)" />
            <path d="M8 72 C42 42 68 52 98 56 C132 60 138 28 176 30 C214 32 220 58 252 49 C286 40 280 16 312 18" fill="none" stroke="url(#revenueLine)" stroke-width="3" stroke-linecap="round" />
            <circle cx="312" cy="18" r="5" fill="#F6D879" />
          </svg>
          <div class="hero-money-strip">
            <span>Revenue influenced</span>
            <strong>31,400 MAD</strong>
          </div>
        </div>

        <div class="hero-command-block hero-command-block--move">
          <div class="hero-card-head">
            <span>Today's Best Move</span>
            <b class="move-symbol">â†—</b>
          </div>
          <h2>WhatsApp Reactivation Campaign</h2>
          <dl>
            <div><dt>Expected</dt><dd>+5-8 customers</dd></div>
            <div><dt>Revenue opportunity</dt><dd>3,000-6,000 MAD</dd></div>
          </dl>
          <button type="button">Open Campaign</button>
        </div>
      </section>

      <section class="dashboard-section workspace-plan-section diagnosis-engine-section">
        <div class="section-heading">
          <div>
            <p class="section-label">Diagnosis Engine</p>
            <h3>Solo Pizzeria business diagnosis</h3>
          </div>
          <span class="section-note">Facts reviewed this morning Â· Diagnosis only</span>
        </div>
        <div class="diagnosis-summary">
          <article class="workspace-diagnosis-card">
            <span>What is happening</span>
            <strong>Good customer momentum, weak retention system.</strong>
            <p>SOLO reviewed the business facts for Solo Pizzeria: 31 of 50 customers reached, strong public reputation, active community signals, and returning customers still requiring attention.</p>
          </article>
          ${diagnosisGroup("Strengths", diagnosis.strengths, "diagnosis-card--strong")}
          ${diagnosisGroup("Weaknesses", diagnosis.weaknesses, "diagnosis-card--weak")}
          ${diagnosisGroup("Problems", diagnosis.problems, "diagnosis-card--problem")}
          ${diagnosisGroup("Opportunities", diagnosis.opportunities, "diagnosis-card--opportunity")}
          ${diagnosisGroup("Momentum", diagnosis.momentum, "diagnosis-card--momentum")}
          ${diagnosisGroup("Overall Status", diagnosis.overallStatus, "diagnosis-card--status")}
        </div>
      </section>

      <section class="business-health-section momentum-section" aria-label="Momentum">
        <div class="section-heading">
          <div><p class="section-label">Momentum</p><h3>Strong â†— this week</h3></div>
          <button type="button" class="ghost-button">View Results</button>
        </div>
        <div class="momentum-grid">
          <article><span>Customers</span><strong>+4</strong><small>This week</small></article>
          <article><span>Reviews</span><strong>+6</strong><small>Google reviews</small></article>
          <article><span>Returning customers</span><strong>+2</strong><small>Reactivated</small></article>
          <article class="momentum-money"><span>Revenue influenced</span><strong>3,600 MAD</strong><small>Tracked results</small></article>
        </div>
      </section>

      <section class="kpi-grid" aria-label="Business Snapshot">
        <article class="kpi-card">
          <span>Revenue This Month</span>
          <strong>31,400 MAD</strong>
          <small>Revenue influenced</small>
          <button type="button">View Revenue</button>
        </article>
        <article class="kpi-card">
          <span>Customers This Month</span>
          <strong>31 / 50</strong>
          <small>Monthly goal progress</small>
          <button type="button">View Customers</button>
        </article>
        <article class="kpi-card">
          <span>Customers Remaining</span>
          <strong>19</strong>
          <small>Needed this month</small>
          <button type="button">Plan Follow Up</button>
        </article>
        <article class="kpi-card kpi-card--gold">
          <span>Goal Progress</span>
          <strong>62%</strong>
          <small>Average ticket 60 MAD</small>
          <button type="button">Review Goal</button>
        </article>
      </section>

      <section class="dashboard-section">
        <div class="section-heading">
          <div>
          <p class="section-label">Opportunity</p>
          <h3>Top Opportunities</h3>
          </div>
          <span class="section-note">Prepared 2 hours ago</span>
        </div>
        <div class="opportunity-grid">
          <article class="action-card">
            <div><h4>WhatsApp Reactivation Campaign</h4><p>Expected: +5-8 customers</p></div>
            <dl><div><dt>Business Value</dt><dd>3,000-6,000 MAD</dd></div><div><dt>Time</dt><dd>15 min</dd></div></dl>
            <button type="button">Prepare</button>
          </article>
          <article class="action-card">
            <div><h4>Google Review Campaign</h4><p>Expected: +7 reviews</p></div>
            <dl><div><dt>Trust impact</dt><dd>High</dd></div><div><dt>Time</dt><dd>10 min</dd></div></dl>
            <button type="button">Launch</button>
          </article>
          <article class="action-card">
            <div><h4>Weekend Brunch Campaign</h4><p>Expected: +6-10 customers</p></div>
            <dl><div><dt>Business Value</dt><dd>4,000-8,000 MAD</dd></div><div><dt>Time</dt><dd>20 min</dd></div></dl>
            <button type="button">Create</button>
          </article>
          <article class="action-card">
            <div><h4>Student Offer Campaign</h4><p>Expected: +4-6 customers</p></div>
            <dl><div><dt>Business Value</dt><dd>2,400-3,600 MAD</dd></div><div><dt>Time</dt><dd>25 min</dd></div></dl>
            <button type="button">Prepare</button>
          </article>
        </div>
      </section>

      <div class="dashboard-columns">
        <section class="dashboard-section">
          <div class="section-heading"><div><p class="section-label">Follow Up</p><h3>Tasks Requiring Attention</h3></div></div>
          <div class="compact-list">
            ${attentionRow("3 WhatsApp customers waiting", "1,800 MAD", "Today", "Follow Up")}
            ${attentionRow("5 review requests pending", "High trust impact", "Tomorrow", "Send Requests")}
            ${attentionRow("2 inactive customers", "1,200 MAD", "Today", "Reactivate")}
          </div>
        </section>

        <section class="dashboard-section">
          <div class="section-heading"><div><p class="section-label">Business Pulse</p><h3>Real signals</h3></div></div>
          <div class="outcome-grid pulse-grid">
            <article class="outcome-card"><span>Customers</span><strong>Growing â†—</strong><button type="button">View Customers</button></article>
            <article class="outcome-card"><span>Reviews</span><strong>Growing â†—</strong><button type="button">Open Requests</button></article>
            <article class="outcome-card"><span>Retention</span><strong>Needs Attention â†˜</strong><button type="button">Reactivate</button></article>
            <article class="outcome-card"><span>Visibility</span><strong>Stable â†’</strong><button type="button">View Results</button></article>
            <article class="outcome-card"><span>Content</span><strong>Growing â†—</strong><button type="button">Start Mission</button></article>
          </div>
        </section>
      </div>

      <section class="dashboard-section">
        <div class="section-heading"><div><p class="section-label">Prepared</p><h3>Prepared For You</h3></div></div>
        <div class="data-table" role="table" aria-label="Prepared For You">
          <div class="table-row table-head" role="row">
            <span role="columnheader">Deliverable</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Prepared</span>
            <span role="columnheader">Action</span>
          </div>
          ${preparedRow("Follow-up messages", "Ready", "2 hours ago", "Open")}
          ${preparedRow("Weekend brunch campaign", "Ready", "Today 09:20", "Review")}
          ${preparedRow("Review request templates", "Ready", "Today 10:15", "Open")}
          ${preparedRow("CafÃ© competitor response plan", "Draft", "Yesterday", "Continue")}
        </div>
      </section>

      <section class="dashboard-section">
        <div class="section-heading"><div><p class="section-label">Activity</p><h3>Recent Activity</h3></div></div>
        <div class="alert-grid">
          ${alertCard("New customer", "Yassine B. joined 2 hours ago", "Open")}
          ${alertCard("New 5-star review", "Great coffee and service, received 4 hours ago", "Open")}
          ${alertCard("Campaign sent", "Weekend Brunch Campaign was sent 6 hours ago", "Track Results")}
        </div>
      </section>
    </div>
  `;
}

function clientTableRow(values, action) {
  return `
    <div class="client-table-row" role="row">
      ${values.map((value) => `<span role="cell">${value}</span>`).join("")}
      <span role="cell"><button type="button">${action}</button></span>
    </div>
  `;
}

function assistantAction(title, detail, action) {
  return `
    <article class="assistant-action">
      <div>
        <h4>${title}</h4>
        <p>${detail}</p>
      </div>
      <button type="button">${action}</button>
    </article>
  `;
}

function customerOpportunity(title, value, action, cta) {
  return `
    <article class="customer-opportunity">
      <div>
        <h4>${title}</h4>
        <p><strong>Business Value:</strong> ${value}</p>
        <p><strong>Suggested action:</strong> ${action}</p>
      </div>
      <button type="button">${cta}</button>
    </article>
  `;
}

function renderClientsLeadsPage() {
  contentStage.innerHTML = `
    <div class="clients-page">
      <section class="clients-hero">
        <div>
          <p class="section-label">Customer Follow-Up Assistant</p>
          <h2>Know who needs attention and what to send next.</h2>
          <p>Prioritized customer opportunities for Solo Pizzeria, focused on repeat visits, reviews, and prepared messages.</p>
          ${statusStrip(["12 pending leads", "7 follow-ups needed", "19 customers from goal"])}
        </div>
      </section>

      <section class="lead-summary-grid" aria-label="Lead Summary">
        <article class="lead-kpi-card">
          <span>Pending Leads</span>
          <strong>12</strong>
          <button type="button">Follow Up</button>
        </article>
        <article class="lead-kpi-card">
          <span>Follow-Ups Needed</span>
          <strong>7</strong>
          <button type="button">Generate Message</button>
        </article>
        <article class="lead-kpi-card">
          <span>Inactive Customers</span>
          <strong>18</strong>
          <button type="button">Reactivate</button>
        </article>
        <article class="lead-kpi-card lead-kpi-card--gold">
          <span>Potential Revenue</span>
          <strong>840 MAD</strong>
          <button type="button">Review</button>
        </article>
      </section>

      <section class="clients-section">
        <div class="section-heading">
          <div>
            <p class="section-label">Follow Up</p>
            <h3>Leads Requiring Attention</h3>
          </div>
          <span class="section-note">Waiting leads with clear next actions</span>
        </div>
        <div class="client-table client-table--leads" role="table" aria-label="Leads Requiring Attention">
          <div class="client-table-row client-table-head" role="row">
            <span role="columnheader">Name</span>
            <span role="columnheader">Source</span>
            <span role="columnheader">Last Contact</span>
            <span role="columnheader">Potential Value</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Action</span>
          </div>
          ${clientTableRow(["Ahmed", "Instagram", "2 days ago", "60 MAD", "Waiting"], "Follow Up")}
          ${clientTableRow(["Yassine", "WhatsApp", "Yesterday", "120 MAD", "Waiting"], "Generate Message")}
          ${clientTableRow(["Sara", "Referral", "3 days ago", "60 MAD", "Waiting"], "Contact")}
        </div>
      </section>

      <section class="clients-section">
        <div class="section-heading">
          <div>
            <p class="section-label">Customers</p>
            <h3>Inactive Customers</h3>
          </div>
          <span class="section-note">Customers who have not returned</span>
        </div>
        <div class="client-table client-table--inactive" role="table" aria-label="Inactive Customers">
          <div class="client-table-row client-table-head" role="row">
            <span role="columnheader">Name</span>
            <span role="columnheader">Last Visit</span>
            <span role="columnheader">Estimated Value</span>
            <span role="columnheader">Reason</span>
            <span role="columnheader">Action</span>
          </div>
          ${clientTableRow(["Omar", "45 days ago", "120 MAD", "Inactive"], "Reactivate")}
          ${clientTableRow(["Karim", "60 days ago", "180 MAD", "Inactive"], "Generate Offer")}
          ${clientTableRow(["Nadia", "35 days ago", "60 MAD", "Inactive"], "Send Message")}
        </div>
      </section>

      <section class="clients-section">
        <div class="section-heading">
          <div>
            <p class="section-label">Prepared Actions</p>
            <h3>Follow-Up Assistant</h3>
          </div>
        </div>
        <div class="assistant-grid">
          ${assistantAction("Lead Follow-Up", "3 customers waiting", "Generate Message")}
          ${assistantAction("Review Request", "5 customers eligible", "Prepare Request")}
          ${assistantAction("Loyalty Customer Campaign", "18 inactive customers", "Launch Campaign")}
          ${assistantAction("Referral Request", "7 loyal customers", "Prepare Message")}
        </div>
      </section>

      <section class="clients-section">
        <div class="section-heading">
          <div>
            <p class="section-label">Prepared</p>
            <h3>Ready Messages</h3>
          </div>
        </div>
        <div class="client-table client-table--messages" role="table" aria-label="Ready Messages">
          <div class="client-table-row client-table-head" role="row">
            <span role="columnheader">Message Type</span>
            <span role="columnheader">Prepared</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Action</span>
          </div>
          ${clientTableRow(["Lead Follow-Up", "Ready", "Today"], "Open")}
          ${clientTableRow(["Review Request", "Ready", "Today"], "Copy")}
          ${clientTableRow(["Loyalty Customer Campaign", "Ready", "2 hours ago"], "Open")}
          ${clientTableRow(["Referral Request", "Draft", "Today"], "Review")}
        </div>
      </section>

      <section class="clients-section">
        <div class="section-heading">
          <div>
            <p class="section-label">Opportunity</p>
            <h3>Customer Opportunities</h3>
          </div>
        </div>
        <div class="customer-opportunity-grid">
          ${customerOpportunity("18 inactive customers represent approximately 1,080 MAD in potential revenue.", "1,080 MAD", "Launch a loyalty customer campaign with a return offer.", "Reactivate")}
          ${customerOpportunity("5 recent customers have not been asked for reviews.", "High trust impact", "Prepare review requests for recent happy customers.", "Prepare Request")}
          ${customerOpportunity("7 loyal customers could bring friends for coffee or brunch.", "New cafÃ© visits", "Send a friendly referral request message to regular customers.", "Prepare Message")}
          ${customerOpportunity("Response times increased this week.", "7 follow-ups waiting", "Follow up with waiting leads before they go cold.", "Follow Up")}
        </div>
      </section>
    </div>
  `;
}

function campaignTableRow(values, action) {
  return `
    <div class="campaign-table-row" role="row">
      ${values.map((value) => `<span role="cell">${value}</span>`).join("")}
      <span role="cell"><button type="button">${action}</button></span>
    </div>
  `;
}

function campaignAsset(title, action) {
  return `
    <article class="campaign-asset">
      <span>${title}</span>
      <div>
        <button type="button">Open</button>
        <button type="button">${action}</button>
      </div>
    </article>
  `;
}

function campaignOpportunity(title, value, campaign, cta) {
  return `
    <article class="campaign-opportunity">
      <div>
        <h4>${title}</h4>
        <p><strong>Business Value:</strong> ${value}</p>
        <p><strong>Suggested Campaign:</strong> ${campaign}</p>
      </div>
      <button type="button">${cta}</button>
    </article>
  `;
}

function campaignPrescriptionCard(name, objective, expected, revenue, difficulty, time, status, assets, results, cta) {
  return `
    <article class="campaign-prescription-card">
      <div class="prescription-card-head">
        <div>
          <span>Prepared campaign</span>
          <h4>${name}</h4>
        </div>
        <mark>${status}</mark>
      </div>
      <dl>
        <div><dt>Objective</dt><dd>${objective}</dd></div>
        <div><dt>Expected customers</dt><dd>${expected}</dd></div>
        <div><dt>Revenue opportunity</dt><dd>${revenue}</dd></div>
        <div><dt>Difficulty</dt><dd>${difficulty}</dd></div>
        <div><dt>Time required</dt><dd>${time}</dd></div>
        <div><dt>Prepared assets</dt><dd>${assets}</dd></div>
        <div><dt>Results</dt><dd>${results}</dd></div>
      </dl>
      <button type="button">${cta}</button>
    </article>
  `;
}

function marketingCalendarCard(name, meta, expected, value, difficulty, time, status, prepared, cta) {
  return `
    <article class="marketing-calendar-card">
      <div>
        <span class="calendar-card-meta">${meta}</span>
        <h4>${name}</h4>
      </div>
      <dl>
        <div><dt>Expected</dt><dd>${expected}</dd></div>
        <div><dt>Business Value</dt><dd>${value}</dd></div>
        <div><dt>Difficulty</dt><dd>${difficulty}</dd></div>
        <div><dt>Time</dt><dd>${time}</dd></div>
      </dl>
      <div class="calendar-card-footer">
        <span>${status} Â· ${prepared}</span>
        <button type="button">${cta}</button>
      </div>
    </article>
  `;
}

function renderCampaignsPage() {
  contentStage.innerHTML = `
    <div class="campaigns-page">
      <section class="marketing-calendar-hero">
        <div>
          <p class="hero-greeting">Hello Hiba ðŸ‘‹</p>
          <p class="hero-subtitle">This month's marketing plan for Solo Pizzeria.</p>
          ${statusStrip(["Week progress: 2 / 5 actions completed", "Updated this morning", "Morocco Â· Casablanca"])}
        </div>
        <div class="calendar-hero-actions">
          <button type="button">Add Campaign</button>
          <button type="button">View Today</button>
        </div>
      </section>

      <section class="campaigns-section today-plan-section">
        <div class="section-heading">
          <div><p class="section-label">Today</p><h3>Today's Plan</h3></div>
          <span class="section-note">3 actions planned Â· You are done for today after these actions.</span>
        </div>
        <div class="today-plan-list">
          <article><div><strong>Google Review Push</strong><span>5 minutes Â· +3-5 reviews</span></div><button type="button">Launch</button></article>
          <article><div><strong>WhatsApp Reactivation</strong><span>10 minutes Â· +5 customers</span></div><button type="button">Prepare</button></article>
          <article><div><strong>Cheese Pull Reel</strong><span>15 minutes Â· prepared content idea</span></div><button type="button">Prepare</button></article>
        </div>
      </section>

      <section class="campaigns-section calendar-workspace">
        <div class="calendar-main">
          <div class="calendar-month-header">
            <div>
              <p class="section-label">Marketing Calendar</p>
              <h3>June 2026</h3>
            </div>
            <span class="section-note">SOLO already planned the month.</span>
          </div>
          <div class="month-calendar" aria-label="June 2026 Marketing Calendar">
            <div class="calendar-weekday">Mon</div><div class="calendar-weekday">Tue</div><div class="calendar-weekday">Wed</div><div class="calendar-weekday">Thu</div><div class="calendar-weekday">Fri</div><div class="calendar-weekday">Sat</div><div class="calendar-weekday">Sun</div>
            <div class="calendar-day is-muted"><span>1</span></div>
            <div class="calendar-day is-muted"><span>2</span></div>
            <div class="calendar-day is-muted"><span>3</span></div>
            <div class="calendar-day is-muted"><span>4</span></div>
            <div class="calendar-day"><span>5</span></div>
            <div class="calendar-day"><span>6</span></div>
            <div class="calendar-day"><span>7</span><button type="button" class="calendar-pill pill-revenue" data-calendar-id="family-menu">Weekend Family Menu</button></div>
            <div class="calendar-day"><span>8</span></div>
            <div class="calendar-day"><span>9</span></div>
            <div class="calendar-day"><span>10</span><button type="button" class="calendar-pill pill-followup" data-calendar-id="whatsapp-reactivation">WhatsApp Reactivation</button></div>
            <div class="calendar-day"><span>11</span></div>
            <div class="calendar-day is-today"><span>12</span><button type="button" class="calendar-pill pill-trust" data-calendar-id="review-push">Google Review Push</button></div>
            <div class="calendar-day"><span>13</span></div>
            <div class="calendar-day"><span>14</span><button type="button" class="calendar-pill pill-content" data-calendar-id="cheese-reel">Cheese Pull Reel</button><button type="button" class="calendar-pill pill-revenue" data-calendar-id="family-menu">Weekend Family Menu</button></div>
            <div class="calendar-day"><span>15</span><button type="button" class="calendar-pill pill-revenue" data-calendar-id="brunch-campaign">Weekend Brunch Campaign</button></div>
            <div class="calendar-day"><span>16</span></div>
            <div class="calendar-day"><span>17</span></div>
            <div class="calendar-day"><span>18</span><button type="button" class="calendar-pill pill-content" data-calendar-id="testimonial-story">Customer Testimonial Story</button></div>
            <div class="calendar-day"><span>19</span></div>
            <div class="calendar-day"><span>20</span></div>
            <div class="calendar-day"><span>21</span><button type="button" class="calendar-pill pill-trust" data-calendar-id="friday-review">Friday Review Request</button></div>
            <div class="calendar-day"><span>22</span></div>
            <div class="calendar-day"><span>23</span><button type="button" class="calendar-pill pill-later" data-calendar-id="results-check">Weekly Results Check</button></div>
            <div class="calendar-day"><span>24</span></div>
            <div class="calendar-day"><span>25</span></div>
            <div class="calendar-day"><span>26</span></div>
            <div class="calendar-day"><span>27</span><button type="button" class="calendar-pill pill-content" data-calendar-id="summer-drinks">Summer Drinks Reel</button><small>+2 more</small></div>
            <div class="calendar-day"><span>28</span><button type="button" class="calendar-pill pill-revenue" data-calendar-id="football-night">Football Match Night</button></div>
            <div class="calendar-day"><span>29</span></div>
            <div class="calendar-day"><span>30</span><button type="button" class="calendar-pill pill-followup" data-calendar-id="month-followup">Monthly WhatsApp Follow-Up</button></div>
          </div>
        </div>

        <aside class="calendar-detail-panel" aria-live="polite">
          <span class="calendar-detail-date">Wednesday 12 June</span>
          <h3>Google Review Push</h3>
          <p>Planned action prepared for Solo Pizzeria.</p>
          <dl>
            <div><dt>Expected</dt><dd>+3-5 reviews</dd></div>
            <div><dt>Business value</dt><dd>Higher trust before weekend visits</dd></div>
            <div><dt>Time</dt><dd>5 min</dd></div>
            <div><dt>Difficulty</dt><dd>Easy</dd></div>
          </dl>
          <div class="calendar-detail-actions">
            <button type="button">Launch</button>
            <button type="button">Prepare</button>
            <button type="button">Reschedule</button>
            <button type="button">Mark Complete</button>
          </div>
        </aside>
      </section>

      <div class="calendar-lower-grid">
        <section class="campaigns-section upcoming-calendar-section">
          <div class="section-heading"><div><p class="section-label">Upcoming</p><h3>Seasonal opportunities</h3></div></div>
          <div class="upcoming-list">
            <article><strong>Ramadan Ftour Campaign</strong><span>Evening cafÃ© habits Â· family groups</span></article>
            <article><strong>Summer Drinks Campaign</strong><span>Cold drinks and terrace visits</span></article>
            <article><strong>Back To School Student Offer</strong><span>Students and families</span></article>
            <article><strong>Football Match Night</strong><span>Friends and group visits</span></article>
          </div>
        </section>

        <section class="campaigns-section completed-calendar-section">
          <div class="section-heading"><div><p class="section-label">Completed</p><h3>Progress this month</h3></div></div>
          <div class="completed-list">
            <article><span>âœ“</span><div><strong>Review Push</strong><small>Completed Wednesday Â· +7 reviews Â· trust increase</small></div></article>
            <article><span>âœ“</span><div><strong>Weekend Brunch Campaign</strong><small>Completed Saturday Â· +4 customers Â· 2,400 MAD revenue influenced</small></div></article>
            <article><span>âœ“</span><div><strong>WhatsApp Follow-Up</strong><small>Completed Monday Â· 2 returning customers</small></div></article>
          </div>
        </section>
      </div>
    </div>
  `;
}

function storyboardClip(number, purpose, instructions, duration, status, action) {
  return `
    <article class="storyboard-clip">
      <div class="clip-number">Clip ${number}</div>
      <div>
        <span>Purpose</span>
        <strong>${purpose}</strong>
      </div>
      <div>
        <span>Instructions</span>
        <p>${instructions}</p>
      </div>
      <div>
        <span>Duration</span>
        <strong>${duration}</strong>
      </div>
      <div>
        <span>Status</span>
        <mark>${status}</mark>
      </div>
      <button type="button">${action}</button>
    </article>
  `;
}

function clipFeedback(clip, status, lines, action) {
  return `
    <article class="clip-feedback">
      <div>
        <span>${clip}</span>
        <strong>${status}</strong>
      </div>
      <ul>
        ${lines.map((line) => `<li>${line}</li>`).join("")}
      </ul>
      <button type="button">${action}</button>
    </article>
  `;
}

function contentPackageItem(label, value, action) {
  return `
    <article class="content-package-item">
      <span>${label}</span>
      <strong>${value}</strong>
      <button type="button">${action}</button>
    </article>
  `;
}

function filmingMetric(label, value) {
  return `
    <article class="filming-metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <button type="button">Track Results</button>
    </article>
  `;
}

function renderFilmingStudioPage() {
  contentStage.innerHTML = `
    <div class="filming-page">
      <section class="filming-mission">
        <div>
          <p class="section-label">Active Content Mission</p>
          <h2>Weekend Brunch Campaign</h2>
          <p>A simple recording plan for content that can bring more cafÃ© visits without needing a creator or agency.</p>
          ${statusStrip(["Recording in progress", "Updated 20 minutes ago", "4 clips recorded"])}
        </div>
        <div class="mission-panel">
          <dl>
            <div><dt>Goal</dt><dd>Increase weekend cafÃ© visits.</dd></div>
            <div><dt>Expected Result</dt><dd>+6-10 customers.</dd></div>
            <div><dt>Revenue Opportunity</dt><dd>360-600 MAD.</dd></div>
            <div><dt>Time Required</dt><dd>15-20 minutes.</dd></div>
            <div><dt>Status</dt><dd>Recording In Progress.</dd></div>
          </dl>
          <button type="button">Continue Mission</button>
        </div>
      </section>

      <section class="filming-section">
        <div class="section-heading">
          <div><p class="section-label">Content Plan</p><h3>Storyboard</h3></div>
          <button type="button">Start Mission</button>
        </div>
        <div class="storyboard-grid">
          ${storyboardClip("1", "Hook", "Film the cafÃ© entrance with fresh pastries visible.", "2-3 seconds", "Approved", "Review Feedback")}
          ${storyboardClip("2", "Atmosphere", "Film the busy cafÃ© atmosphere during brunch.", "3-4 seconds", "Needs Improvement", "Retry Clip")}
          ${storyboardClip("3", "Social Proof", "Capture customer testimonials or smiling regulars.", "3 seconds", "Pending", "Upload Clip")}
          ${storyboardClip("4", "Product", "Film coffee preparation and latte art.", "2-3 seconds", "Pending", "Upload Clip")}
          ${storyboardClip("5", "CTA", "Show pastries, coffee, and invite viewers to visit.", "2 seconds", "Pending", "Upload Clip")}
        </div>
      </section>

      <section class="filming-section">
        <div class="section-heading">
          <div><p class="section-label">Improve Clips</p><h3>Clip Validation</h3></div>
          <span class="section-note">Only the clip that needs work is repeated</span>
        </div>
        <div class="clip-feedback-grid">
          ${clipFeedback("Clip 1", "Approved", ["Strong opening.", "Good lighting."], "Review Feedback")}
          ${clipFeedback("Clip 2", "Needs Improvement", ["Camera movement too fast.", "Try a steadier shot."], "Retry Clip")}
          ${clipFeedback("Clip 3", "Retry Required", ["Video too dark.", "Increase lighting."], "Retry Clip")}
        </div>
      </section>

      <div class="filming-columns">
        <section class="filming-section">
          <div class="section-heading">
            <div><p class="section-label">Progress</p><h3>Filming Checklist</h3></div>
          </div>
          <div class="filming-checklist">
            <div><span>Storyboard Complete</span><strong>5/5</strong></div>
            <div><span>Recorded</span><strong>4/5</strong></div>
            <div><span>Approved</span><strong>3/5</strong></div>
            <div><span>Ready To Publish</span><strong>No</strong></div>
            <div class="filming-progress"><span style="width: 68%"></span></div>
            <button type="button">Upload Clip</button>
          </div>
        </section>

        <section class="filming-section">
          <div class="section-heading">
            <div><p class="section-label">Publishing</p><h3>Publishing Ready</h3></div>
          </div>
          <div class="publishing-ready">
            <div><span>Video Ready</span><strong>No</strong></div>
            <div><span>Caption Ready</span><strong>Yes</strong></div>
            <div><span>CTA Ready</span><strong>Yes</strong></div>
            <div><span>Posting Time Ready</span><strong>Yes</strong></div>
            <div class="publishing-actions">
              <button type="button">Copy Caption</button>
              <button type="button">Copy Hashtags</button>
              <button type="button">Mark Published</button>
            </div>
          </div>
        </section>
      </div>

      <section class="filming-section">
        <div class="section-heading">
          <div><p class="section-label">Generated Content</p><h3>Content Package</h3></div>
        </div>
        <div class="content-package-grid">
          ${contentPackageItem("Hook", "Your weekend coffee spot is ready.", "Copy Caption")}
          ${contentPackageItem("Caption", "Fresh coffee, warm pastries, and a calm neighbourhood cafÃ© atmosphere in Casablanca.", "Copy Caption")}
          ${contentPackageItem("Hashtags", "#Casablanca #SoloPizzeria #ItalianPizza", "Copy Hashtags")}
          ${contentPackageItem("Call To Action", "Visit Solo Pizzeria this weekend.", "Copy Caption")}
          ${contentPackageItem("Best Posting Time", "10:00", "Mark Published")}
        </div>
      </section>

      <section class="filming-section">
        <div class="section-heading">
          <div><p class="section-label">Results</p><h3>Results Tracking</h3></div>
          <button type="button">Track Results</button>
        </div>
        <div class="filming-results-grid">
          ${filmingMetric("Local Views", "540")}
          ${filmingMetric("Messages", "18")}
          ${filmingMetric("CafÃ© Visits", "6")}
          ${filmingMetric("Customers Generated", "4")}
          ${filmingMetric("Revenue", "360 MAD")}
        </div>
      </section>

      <section class="filming-section">
        <div class="section-heading">
          <div><p class="section-label">SOLO Memory</p><h3>What Worked</h3></div>
        </div>
        <div class="solo-memory-card">
          <div>
            <span>Brunch Content</span>
            <strong>Strong performance</strong>
            <p>Customers: 6. Revenue: 360 MAD. Recommendation: Repeat Similar Content.</p>
          </div>
          <button type="button">Start Mission</button>
        </div>
      </section>
    </div>
  `;
}

function reportTableRow(values, action) {
  return `
    <div class="report-table-row" role="row">
      ${values.map((value) => `<span role="cell">${value}</span>`).join("")}
      <span role="cell"><button type="button">${action}</button></span>
    </div>
  `;
}

function reportListCard(title, items, action) {
  return `
    <article class="report-list-card">
      <h4>${title}</h4>
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <button type="button">${action}</button>
    </article>
  `;
}

function competitorItem(observation, impact, response, cta) {
  return `
    <article class="competitor-item">
      <div>
        <span>Observation</span>
        <strong>${observation}</strong>
      </div>
      <div>
        <span>Impact</span>
        <p>${impact}</p>
      </div>
      <div>
        <span>Suggested Response</span>
        <p>${response}</p>
      </div>
      <button type="button">${cta}</button>
    </article>
  `;
}

function businessAction(label, value, action) {
  return `
    <article class="business-action">
      <span>${label}</span>
      <strong>${value}</strong>
      <button type="button">${action}</button>
    </article>
  `;
}

function renderReportsPage() {
  contentStage.innerHTML = `
    <div class="reports-page">
      <section class="reports-hero">
        <div>
          <p class="section-label">Marketing Review</p>
          <h2>Clear reports on what worked, what failed, and what should happen next.</h2>
          <p>Simple business outcomes prepared for Solo Pizzeria, with revenue, customers, and next actions in one place.</p>
          ${statusStrip(["Report generated this morning", "31,400 MAD revenue influenced", "31 of 50 customers reached"])}
        </div>
        <button type="button">Generate Report</button>
      </section>

      <section class="report-summary-grid" aria-label="Report Summary">
        <article class="report-kpi-card"><span>Reports Generated</span><strong>28</strong><button type="button">Open</button></article>
        <article class="report-kpi-card"><span>Campaigns Analyzed</span><strong>21</strong><button type="button">View Summary</button></article>
        <article class="report-kpi-card"><span>Customers Influenced</span><strong>37</strong><button type="button">Open</button></article>
        <article class="report-kpi-card report-kpi-card--gold"><span>Revenue Influenced</span><strong>31,400 MAD</strong><button type="button">Download</button></article>
      </section>

      <section class="reports-section">
        <div class="section-heading">
          <div><p class="section-label">Prepared</p><h3>Available Reports</h3></div>
          <span class="section-note">Ready reports for business review</span>
        </div>
        <div class="report-table report-table--available" role="table" aria-label="Available Reports">
          <div class="report-table-row report-table-head" role="row">
            <span role="columnheader">Report</span>
            <span role="columnheader">Period</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Prepared</span>
            <span role="columnheader">Action</span>
          </div>
          ${reportTableRow(["Weekly Marketing Report", "This Week", "Ready", "Today"], "Open")}
          ${reportTableRow(["Monthly Performance Report", "This Month", "Ready", "Today"], "Open")}
          ${reportTableRow(["Campaign Results Report", "Last 30 Days", "Ready", "Yesterday"], "Open")}
          ${reportTableRow(["Competitor Activity Report", "This Week", "Ready", "Today"], "Open")}
          ${reportTableRow(["Customer Growth Report", "This Month", "Ready", "Today"], "Open")}
        </div>
      </section>

      <section class="reports-section">
        <div class="section-heading">
          <div><p class="section-label">Weekly Report</p><h3>Weekly Marketing Report</h3></div>
          <button type="button">Export</button>
        </div>
        <div class="weekly-report-grid">
          ${reportListCard("Summary", ["+6 customers", "+7 reviews", "2 returning customers", "Estimated revenue: 360 MAD"], "View Summary")}
          ${reportListCard("Wins", ["Review campaign performed strongly.", "Brunch content generated customer interest.", "Follow-up response rate improved."], "Open")}
          ${reportListCard("Challenges", ["Response times remain slow.", "Inactive customers remain high."], "Open")}
          ${reportListCard("Recommendations", ["Launch loyalty customer campaign.", "Request reviews from recent customers.", "Repeat brunch and coffee preparation content."], "Generate Report")}
        </div>
      </section>

      <section class="reports-section">
        <div class="section-heading">
          <div><p class="section-label">Campaign Results</p><h3>Campaign Report</h3></div>
        </div>
        <div class="report-table report-table--campaign" role="table" aria-label="Campaign Report">
          <div class="report-table-row report-table-head" role="row">
            <span role="columnheader">Campaign</span>
            <span role="columnheader">Objective</span>
            <span role="columnheader">Result</span>
            <span role="columnheader">Revenue</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Action</span>
          </div>
          ${reportTableRow(["Weekend Brunch Campaign", "CafÃ© Visits", "+6 customers", "360 MAD", "Completed"], "Open")}
          ${reportTableRow(["Review Campaign", "Reviews", "+7 reviews", "Trust Increase", "Completed"], "Open")}
          ${reportTableRow(["Loyalty Customer Campaign", "Returning Customers", "+2 customers", "120 MAD", "Running"], "View Summary")}
        </div>
      </section>

      <section class="reports-section">
        <div class="section-heading">
          <div><p class="section-label">Market Response</p><h3>Competitor Report</h3></div>
        </div>
        <div class="competitor-grid">
          ${competitorItem("Competitor A launched breakfast promotion.", "Weekend morning visits may become harder to win.", "Differentiate through customer testimonials and fresh pastries.", "Generate Report")}
          ${competitorItem("Competitor B increased posting frequency.", "Customers are seeing more cafÃ© offers this week.", "Repeat latte art and brunch content with a clear visit CTA.", "Open")}
          ${competitorItem("Competitor C is running student discounts.", "Students may compare coffee offers.", "Use a student offer with loyalty follow-up.", "Share")}
        </div>
      </section>

      <div class="reports-columns">
        <section class="reports-section">
          <div class="section-heading">
            <div><p class="section-label">Customers</p><h3>Customer Growth Report</h3></div>
          </div>
          <div class="growth-report">
            <div><span>Customers This Month</span><strong>31</strong></div>
            <div><span>Goal</span><strong>50</strong></div>
            <div><span>Remaining</span><strong>19</strong></div>
            <div><span>Projected Result</span><strong>44</strong></div>
            <div><span>Gap</span><strong>6 customers</strong></div>
            <p>Recommendation: Increase reactivation efforts. Launch referral campaign.</p>
            <button type="button">Generate Report</button>
          </div>
        </section>

        <section class="reports-section">
          <div class="section-heading">
            <div><p class="section-label">Business Actions</p><h3>Business Actions</h3></div>
          </div>
          <div class="business-actions-grid">
            ${businessAction("Most successful campaign", "Customer testimonials.", "Open")}
            ${businessAction("Best posting day", "Friday.", "View Summary")}
            ${businessAction("Best content type", "Coffee preparation videos.", "Open")}
            ${businessAction("Highest conversion source", "WhatsApp follow-ups.", "Generate Report")}
          </div>
        </section>
      </div>

      <section class="reports-section executive-summary">
        <div>
          <p class="section-label">Executive Summary</p>
          <h3>This month SOLO helped generate measurable business results.</h3>
          <p>This month SOLO helped reach 31 customers toward a 50-customer goal, collect +14 reviews, generate +7 cafÃ© visits, and influence 31,400 MAD in revenue.</p>
        </div>
        <div class="executive-priorities">
          <span>Priority for next month</span>
          <strong>Improve customer reactivation. Increase review collection. Continue coffee preparation and testimonial content.</strong>
          <div>
            <button type="button">Export</button>
            <button type="button">Share</button>
            <button type="button">Download</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function fieldControl(label, value = "", type = "text") {
  return `
    <label class="settings-field">
      <span>${label}</span>
      <input type="${type}" value="${value}" />
    </label>
  `;
}

function textAreaControl(label, value = "") {
  return `
    <label class="settings-field settings-field--wide">
      <span>${label}</span>
      <textarea rows="4">${value}</textarea>
    </label>
  `;
}

function selectControl(label, options, selected) {
  return `
    <label class="settings-field">
      <span>${label}</span>
      <select>
        ${options.map((option) => `<option${option === selected ? " selected" : ""}>${option}</option>`).join("")}
      </select>
    </label>
  `;
}

function channelRow(channel, status) {
  const action = status === "Connected" ? "Disable" : "Connect Channel";
  return `
    <article class="channel-row">
      <div>
        <strong>${channel}</strong>
        <span>${status}</span>
      </div>
      <button type="button">${action}</button>
    </article>
  `;
}

function notificationToggle(label) {
  return `
    <article class="notification-row">
      <div>
        <strong>${label}</strong>
        <span>Enabled</span>
      </div>
      <button type="button">Disable</button>
    </article>
  `;
}

function optionChips(label, options, selected = []) {
  return `
    <div class="settings-field settings-field--wide option-chip-group">
      <span>${label}</span>
      <div>
        ${options.map((option) => `<button type="button" class="${selected.includes(option) ? "is-selected" : ""}">${option}</button>`).join("")}
      </div>
    </div>
  `;
}

function renderSettingsPage() {
  contentStage.innerHTML = `
    <div class="settings-page">
      <section class="settings-hero">
        <div>
          <p class="section-label">Data Foundation</p>
          <h2>Enter the facts. SOLO will create the strategy.</h2>
          <p>Simple business facts, customer context, channels, habits, seasons, and biggest problem. Setup should take less than 5 minutes.</p>
          ${statusStrip(["Facts only", "No strategy questions", "Ready for future diagnosis"])}
        </div>
        <button type="button">Save Changes</button>
      </section>

      <section class="settings-section">
        <div class="section-heading">
          <div><p class="section-label">Section 1</p><h3>Business Identity</h3></div>
          <span class="section-note">Basic facts about the business</span>
        </div>
        <div class="settings-form-grid">
          ${fieldControl("Business Name", "Solo Pizzeria")}
          ${selectControl("Business Type", ["Restaurant", "Cafe", "Bakery", "Gym", "Beauty Salon", "Clothing Store", "Agency"], "Restaurant")}
          ${fieldControl("Location", "Casablanca")}
          ${fieldControl("City", "Casablanca")}
          ${fieldControl("Neighborhood (optional)", "Maarif")}
          ${selectControl("Brand Positioning", ["Premium", "Family", "Student Friendly", "Luxury", "Modern", "Traditional"], "Premium")}
          ${selectControl("Main Goal", ["More Customers", "More Revenue", "More Reviews", "More Repeat Customers", "More Visibility"], "More Customers")}
          ${fieldControl("Average Ticket (MAD)", "140 DH")}
        </div>
        <button type="button">Save Changes</button>
      </section>

      <section class="settings-section">
        <div class="section-heading">
          <div><p class="section-label">Section 2</p><h3>Customer Profile</h3></div>
          <span class="section-note">Who visits and when</span>
        </div>
        <div class="settings-form-grid">
          ${optionChips("Who are your customers?", ["Families", "Students", "Professionals", "Tourists", "Young Adults"], ["Families", "Professionals", "Young Adults"])}
          ${optionChips("Busy periods", ["Breakfast", "Lunch", "Afternoon", "Evening", "Weekend"], ["Lunch", "Evening", "Weekend"])}
          ${optionChips("Customer Age", ["18-25", "25-40", "40+"], ["25-40"])}
          ${optionChips("What are customers most attracted to?", ["Food", "Atmosphere", "Service", "Location", "Price", "Quality"], ["Atmosphere", "Quality", "Location"])}
        </div>
        <button type="button">Save Changes</button>
      </section>

      <section class="settings-section">
        <div class="section-heading">
          <div><p class="section-label">Section 3</p><h3>Digital Presence</h3></div>
          <span class="section-note">Channels and visible reputation</span>
        </div>
        <div class="settings-form-grid">
          ${fieldControl("Instagram Handle", "@solopizzeria")}
          ${fieldControl("Followers", "2,450", "number")}
          ${selectControl("Posting Frequency", ["Daily", "3-5 times/week", "1-2 times/week", "Rarely"], "1-2 times/week")}
          ${selectControl("Stories Frequency", ["Daily", "Sometimes", "Rarely", "Never"], "Sometimes")}
          ${selectControl("Reels Frequency", ["Weekly", "Monthly", "Rarely", "Never"], "Weekly")}
          ${selectControl("WhatsApp Business", ["Yes", "No"], "Yes")}
          ${selectControl("Catalog", ["Yes", "No"], "No")}
          ${fieldControl("Google Rating", "4.5")}
          ${fieldControl("Number of Reviews", "334", "number")}
          ${fieldControl("Facebook (optional)", "Solo Pizzeria Casablanca")}
          ${fieldControl("TikTok (optional)", "@solopizzeria")}
          ${fieldControl("Website (optional)", "solopizzeria.ma")}
        </div>
        <button type="button">Save Changes</button>
      </section>

      <section class="settings-section">
        <div class="section-heading">
          <div><p class="section-label">Section 4</p><h3>Current Marketing Habits</h3></div>
          <span class="section-note">What already happens today</span>
        </div>
        <div class="settings-form-grid">
          ${fieldControl("Posts per week", "2", "number")}
          ${selectControl("Do customers tag you?", ["Never", "Sometimes", "Often"], "Sometimes")}
          ${selectControl("Do you ask for reviews?", ["Never", "Sometimes", "Always"], "Sometimes")}
          ${selectControl("Do you follow up customers?", ["Never", "Sometimes", "Always"], "Never")}
          ${selectControl("Do you run promotions?", ["Rarely", "Sometimes", "Often"], "Rarely")}
        </div>
        <button type="button">Save Changes</button>
      </section>

      <section class="settings-section">
        <div class="section-heading">
          <div><p class="section-label">Section 5</p><h3>Seasonal Context</h3></div>
          <span class="section-note">What affects the business during the year</span>
        </div>
        <div class="settings-form-grid">
          ${optionChips("Business affected by", ["Ramadan", "Summer", "Football Events", "Tourist Season", "Back To School", "Winter"], ["Ramadan", "Summer", "Football Events"])}
        </div>
        <button type="button">Save Changes</button>
      </section>

      <section class="settings-section">
        <div class="section-heading">
          <div><p class="section-label">Section 6</p><h3>Biggest Problem</h3></div>
          <span class="section-note">Choose only one</span>
        </div>
        <div class="settings-form-grid">
          ${selectControl("Biggest Problem", ["Few Customers", "Few Reviews", "Low Weekday Traffic", "Few Returning Customers", "Low Visibility", "Need Better Customers", "Need More Revenue"], "Few Returning Customers")}
        </div>
        <button type="button">Save Changes</button>
      </section>

      <section class="hidden-ai-foundation" aria-hidden="true">
        <div
          data-business-type="Restaurant"
          data-city="Casablanca"
          data-customer-type="Families, Professionals, Young Adults"
          data-positioning="Premium"
          data-average-ticket="140"
          data-channels="Instagram, WhatsApp Business, Google Business"
          data-reviews="334"
          data-google-rating="4.5"
          data-marketing-habits="posts:2/week; tags:sometimes; reviews:sometimes; followups:never; promotions:rarely"
          data-weekday-traffic="Weak"
          data-seasonality="Ramadan, Summer, Football Events"
          data-biggest-problem="Few Returning Customers"
        ></div>
      </section>

      <section class="settings-section account-section">
        <div class="section-heading">
          <div><p class="section-label">Account</p><h3>Owner Account</h3></div>
        </div>
        <div class="settings-form-grid">
          ${fieldControl("Owner Name", "Hiba")}
          ${fieldControl("Email", "owner@solopizzeria.ma", "email")}
          ${fieldControl("Phone", "+212 600 000 000", "tel")}
          ${fieldControl("Plan", "SOLO Growth Plan")}
        </div>
        <div class="account-actions">
          <button type="button">Update Business</button>
          <button type="button">Save Changes</button>
          <button type="button">Logout</button>
        </div>
      </section>
    </div>
  `;
}

function setActivePage(pageId, shouldPush = true) {
  const routeValue = String(pageId || "");
  routeContext = readRouteContext(routeValue);
  const normalizedPageId = normalizePageId(routeValue);
  const page = pages.find((item) => item.id === normalizedPageId) || pages[0];
  let renderedPageId = page.id;

  document.title = `SOLO · ${page.label}`;
  pageTitle.textContent = page.label;
  document.body.dataset.page = page.id;

  try {
    if (page.id === "today") {
      renderTodayPage();
    } else if (page.id === "campaigns") {
      renderFocusedCampaignsPage();
    } else if (page.id === "customers") {
      renderFocusedCustomersPage();
    } else if (page.id === "studio") {
      renderFocusedStudioPage();
    } else if (page.id === "results") {
      renderFocusedResultsPage();
    } else if (page.id === "calendar") {
      renderFocusedCalendarPage();
    } else if (page.id === "settings") {
      renderFocusedSettingsPage();
    } else {
      renderPlaceholderPage(page);
    }
  } catch (error) {
    demoState = defaultDemoState();
    saveDemoState();
    document.body.dataset.page = "today";
    pageTitle.textContent = "Today";
    renderedPageId = "today";
    renderTodayPage();
    showDemoPanel("Demo restored", "Saved demo data was reset because it could not be rendered.");
  }

  enhancePageActions();

  document.querySelectorAll(".nav-item").forEach((item) => {
    const isActive = item.dataset.page === renderedPageId;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-current", isActive ? "page" : "false");
  });

  if (shouldPush) {
    const params = {};
    if (routeContext.campaignId) params.campaign_id = routeContext.campaignId;
    if (routeContext.action) params.action = routeContext.action;
    history.pushState({ page: renderedPageId, ...routeContext }, "", routeFor(renderedPageId, params));
  }
}

function setupMarketingCalendarInteractions() {
  const details = {
    "family-menu": ["Friday 14 June", "Weekend Family Menu", "+6-8 customers", "2,000-4,000 MAD", "20 min", "Easy"],
    "whatsapp-reactivation": ["Monday 10 June", "WhatsApp Reactivation", "+5 customers", "1,500-3,000 MAD", "10 min", "Easy"],
    "review-push": ["Wednesday 12 June", "Google Review Push", "+3-5 reviews", "Higher trust before weekend visits", "5 min", "Easy"],
    "cheese-reel": ["Friday 14 June", "Cheese Pull Reel", "5k-10k views", "More cafÃ© visits", "15 min", "Easy"],
    "brunch-campaign": ["Saturday 15 June", "Weekend Brunch Campaign", "+6-10 customers", "4,000-8,000 MAD", "20 min", "Easy"],
    "testimonial-story": ["Tuesday 18 June", "Customer Testimonial Story", "+5 reviews", "Trust and reputation", "15 min", "Easy"],
    "friday-review": ["Friday 21 June", "Friday Review Request", "+5 reviews", "Trust increase", "8 min", "Easy"],
    "results-check": ["Sunday 23 June", "Weekly Results Check", "Clear next actions", "Progress confidence", "10 min", "Easy"],
    "summer-drinks": ["Friday 27 June", "Summer Drinks Reel", "+6-10 customers", "1,800-3,600 MAD", "20 min", "Easy"],
    "football-night": ["Saturday 28 June", "Football Match Night", "+4-6 groups", "2,400-3,600 MAD", "20 min", "Easy"],
    "month-followup": ["Monday 30 June", "Monthly WhatsApp Follow-Up", "+4 returning customers", "1,200-2,400 MAD", "10 min", "Easy"]
  };

  const panel = contentStage.querySelector(".calendar-detail-panel");
  if (!panel) {
    return;
  }

  const updatePanel = (item) => {
    const data = details[item.dataset.calendarId] || details["review-push"];
    panel.classList.add("is-active");
    panel.querySelector(".calendar-detail-date").textContent = data[0];
    panel.querySelector("h3").textContent = data[1];
    panel.querySelector("p").textContent = "Planned action prepared for Solo Pizzeria.";
    const values = panel.querySelectorAll("dd");
    [data[2], data[3], data[4], data[5]].forEach((value, index) => {
      values[index].textContent = value;
    });
  };

  contentStage.querySelectorAll(".calendar-pill").forEach((pill) => {
    pill.addEventListener("click", () => updatePanel(pill));
  });

  panel.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      panel.querySelector("p").textContent = `${button.textContent.trim()} demo state applied. SOLO will keep this plan updated.`;
    });
  });
}

function renderNavigation() {
  const label = document.createElement("div");
  label.className = "nav-section-label";
  label.textContent = "Navigation";
  navList.appendChild(label);

  const primaryPages = pages.filter((page) => ["today", "campaigns", "studio", "results"].includes(page.id));
  primaryPages.forEach((page) => {
    const button = document.createElement("button");
    button.className = "nav-item";
    button.type = "button";
    button.dataset.page = page.id;
    button.innerHTML = `${iconPath(page.icon)}<span>${page.label}</span>`;
    button.addEventListener("click", () => setActivePage(page.id));
    navList.appendChild(button);
  });
}

/* Stable demo layer: simple interactions only */
function stableState() {
  const defaults = defaultDemoState();
  const savedMission = demoState?.studioMission && typeof demoState.studioMission === "object"
    ? demoState.studioMission
    : {};
  demoState = {
    ...defaults,
    ...(demoState && typeof demoState === "object" ? demoState : {}),
    businessProfile: { ...defaults.businessProfile, ...((demoState && demoState.businessProfile) || {}) },
    recentWins: Array.isArray(demoState?.recentWins) ? demoState.recentWins : defaults.recentWins,
    recentActivity: Array.isArray(demoState?.recentActivity) ? demoState.recentActivity : defaults.recentActivity,
    results: Array.isArray(demoState?.results) ? demoState.results : defaults.results,
    businessIntelligenceProfile: deepMergeProfile(defaults.businessIntelligenceProfile, demoState?.businessIntelligenceProfile),
    studio: demoState?.studio && typeof demoState.studio === "object" ? demoState.studio : {},
    studioMission: {
      ...defaults.studioMission,
      ...savedMission,
      clips: Array.isArray(savedMission.clips) && savedMission.clips.length === 5
        ? savedMission.clips.map((clip, index) => ({ ...defaults.studioMission.clips[index], ...(clip || {}) }))
        : defaults.studioMission.clips,
      package: { ...defaults.studioMission.package, ...(savedMission.package || {}) },
      clipOrder: Array.isArray(savedMission.clipOrder) && savedMission.clipOrder.length === 5
        ? savedMission.clipOrder
        : defaults.studioMission.clipOrder,
    },
  };
  return demoState;
}

function stableSave(message = "Progress updated") {
  stableState();
  saveDemoState();
  showDemoPanel(message);
}

function stableBrain() {
  const state = stableState();
  const primaryCompleted = Number(state.weeklyCompleted || 2) >= 3;
  if (primaryCompleted) {
    return {
      title: "Increase Content Visibility",
      whyNow: "The review system is moving; visual content is the next useful step.",
      campaign: "Signature Reel Series",
      confidence_score: 86,
      expected_impact: "More Instagram discovery and stronger brand image.",
      benefits: ["More visual discovery", "Stronger premium image", "More reasons to visit"],
      basis: ["Pizza visuals", "Restaurant atmosphere", "Instagram behavior"],
      commitment: "3-4 reels per week",
      chain: ["Strong visual product", "Strong UGC potential", "Visibility opportunity", "Increase awareness", "Content strategy", "Signature Reel Series"],
    };
  }
  return {
    title: "Strengthen Trust & Visibility",
    whyNow: "Reviews do not fully reflect customer satisfaction.",
    campaign: "Google Review Growth System",
    confidence_score: 90,
    expected_impact: "+5 reviews per week toward 500 reviews.",
    benefits: ["Stronger Google visibility", "More customer confidence", "Better social proof before visit"],
    basis: ["4.5 rating", "334 reviews", "Premium positioning", "Local behavior"],
    commitment: "5 minutes daily",
    chain: ["4.5 rating + 334 reviews", "Strong satisfaction but weak review acquisition", "Social proof opportunity", "Reach 500 reviews", "Review growth strategy", "Google Review Growth System"],
  };
}

function generateSoloBrain() {
  const selected = stableBrain();
  return {
    selected,
    recommendations: [selected],
    diagnosis: selected.chain[1],
    opportunity: selected.chain[2],
    objective: selected.chain[3],
    strategy: selected.chain[4],
    campaign: selected.campaign,
  };
}

function homeRecommendation(state = stableState()) {
  const isContentNext = Number(state.weeklyCompleted || 2) >= 3;
  if (isContentNext) {
    return {
      eyebrow: "PLUS GRANDE OPPORTUNITÉ AUJOURD'HUI",
      title: "Préparer la série de reels signature",
      opportunity: "Highest ROI Opportunity",
      confidence: "86%",
      why: "La preuve sociale avance déjà. La prochaine source de croissance est la visibilité du produit.",
      impact: "+4 réservations/mois",
      duration: "15 minutes",
      targetPage: "studio",
      campaignId: "signature-reel-series",
      cta: "Aller au Studio",
      bullets: [
        "Les pizzas et la préparation sont naturellement visuelles.",
        "Instagram peut créer plus de découverte locale.",
        "La mission Studio est prête à transformer l'idée en contenu.",
      ],
      basedOn: ["Avis en hausse", "Produit visuel", "Ambiance premium", "Comportement Instagram"],
    };
  }
  return {
    eyebrow: "PLUS GRANDE OPPORTUNITÉ AUJOURD'HUI",
    title: "Continuer le système d'avis Google",
    opportunity: "Highest ROI Opportunity",
    confidence: "90%",
    why: "Les clients semblent satisfaits, mais les avis ne reflètent pas encore tout le potentiel du restaurant.",
    impact: "+5 avis/semaine",
    duration: "5 minutes",
    targetPage: "campaigns",
    campaignId: "google-review-growth-system",
    cta: "Lancer la campagne",
    bullets: [
      "La note Google est forte, donc demander un avis est peu risqué.",
      "334 avis sur 500 laisse une marge de confiance visible.",
      "L'effort demandé à l'équipe reste léger et répétable.",
    ],
    basedOn: ["4.5 Google", "334 avis", "Positionnement premium", "Habitudes locales"],
  };
}

function handleDemoAction(action, button) {
  const state = stableState();

  if (action === "close-modal" || action === "close-modal-backdrop") {
    closeDemoModal();
    return;
  }

  if (action === "reset-demo") {
    resetDemoState();
    return;
  }

  if (action === "open-settings") {
    setActivePage("settings");
    return;
  }

  if (action === "search") {
    showDemoPanel("Recherche", "La recherche est prête en mode démo.");
    return;
  }

  if (action === "home-best-move") {
    const campaignId = button?.dataset?.campaignId || "google-review-growth-system";
    const target = button?.dataset?.targetPage || "campaigns";
    if (target === "studio") {
      state.studioMission = missionForCampaign(campaignId, state.studioMission);
      state.studioMission.created = true;
      saveDemoState();
      navigateWithContext("studio", { campaign_id: campaignId });
    } else {
      navigateWithContext("campaigns", { action: "launch", id: campaignId });
    }
    return;
  }

  if (action === "campaign-to-studio") {
    const campaignId = button?.dataset?.campaignId || "signature-reel-series";
    state.studioMission = missionForCampaign(campaignId, state.studioMission);
    state.studioMission.created = true;
    saveDemoState();
    navigateWithContext("studio", { campaign_id: campaignId });
    return;
  }

  if (action === "today-continue") {
    state.todayStep = Math.min(Number(state.todayStep || 0) + 1, 4);
    stableSave("Next step opened");
    setActivePage("today", false);
    return;
  }

  if (action === "today-complete") {
    state.weeklyCompleted = Math.min(Number(state.weeklyCompleted || 2) + 1, 5);
    state.todayStep = 0;
    state.harvestRecalculating = true;
    state.recentWins.unshift("Review system activated");
    state.recentActivity.unshift("Review system activated · expected +5 reviews/week");
    stableSave("Harvest is recalculating your business...");
    closeDemoModal();
    setActivePage("today", false);
    window.setTimeout(() => {
      const nextState = stableState();
      nextState.harvestRecalculating = false;
      nextState.weeklyCompleted = Math.max(Number(nextState.weeklyCompleted || 0), 3);
      nextState.recentActivity.unshift("Next recommendation prepared: Signature Reel Series");
      saveDemoState();
      showDemoPanel("Next recommendation ready", "Harvest prepared the next highest ROI opportunity.");
      setActivePage("today", false);
    }, 1400);
    return;
  }

  if (action === "view-plan" || action === "campaign-detail") {
    openStableCampaignPanel(button?.dataset?.campaignId || "google-review-growth-system");
    return;
  }

  if (action === "studio-prepare") {
    const campaignId = button?.dataset?.campaignId || routeContext.campaignId || "signature-reel-series";
    state.studioMission = missionForCampaign(campaignId, state.studioMission);
    state.studioMission.created = true;
    state.studioMission.status = state.studioMission.status === "draft" ? "ready" : state.studioMission.status;
    saveDemoState();
    closeDemoModal();
    navigateWithContext("studio", { campaign_id: campaignId });
    return;
  }

  if (action === "confirm-studio-mission") {
    const campaignId = button?.dataset?.campaignId || routeContext.campaignId || "signature-reel-series";
    state.campaigns[campaignId] = "Active";
    state.studioMission = missionForCampaign(campaignId, defaultStudioMission());
    stableSave("Studio mission created");
    closeDemoModal();
    navigateWithContext("studio", { campaign_id: campaignId });
    return;
  }

  if (action === "studio-start") {
    state.studioMission.status = "filming";
    stableSave("Filming mission started");
    setActivePage("studio", false);
    return;
  }

  if (action === "studio-upload" || action === "studio-retry") {
    validateStudioClip(Number(button?.dataset?.clipIndex || 0));
    return;
  }

  if (action === "studio-open-package") {
    state.studioMission.status = "assembly";
    const campaignId = button?.dataset?.campaignId || state.studioMission.activeCampaignId || routeContext.campaignId || "signature-reel-series";
    state.studioMission.activeCampaignId = campaignId;
    state.recentActivity.unshift(`${campaignNameFromId(campaignId)} content package prepared`);
    stableSave("Content package prepared");
    navigateWithContext("results", { campaign_id: campaignId });
    return;
  }

  if (action === "studio-edit-assets") {
    openStudioAssetEditor();
    return;
  }

  if (action === "studio-replace-clip") {
    const index = Number(button?.dataset?.clipIndex || 0);
    if (state.studioMission.clips[index]) {
      state.studioMission.clips[index] = { status: "pending", attempts: 0 };
      state.studioMission.currentClip = index;
      state.studioMission.status = "filming";
      stableSave(`Clip ${index + 1} ready to replace`);
      setActivePage("studio", false);
    }
    return;
  }

  if (action === "studio-adjust-order") {
    const order = [...state.studioMission.clipOrder];
    [order[1], order[2]] = [order[2], order[1]];
    state.studioMission.clipOrder = order;
    stableSave("Clip order adjusted");
    setActivePage("studio", false);
    return;
  }

  if (action === "studio-copy-caption") {
    copyStudioCaption();
    return;
  }

  if (action === "studio-download-checklist") {
    downloadStudioChecklist();
    return;
  }

  if (action === "studio-publish") {
    state.studioMission.status = "published";
    state.studioMission.published = true;
    if (!state.recentWins.includes("Cheese Pull Reel published")) {
      state.recentWins.unshift("Cheese Pull Reel published");
    }
    state.recentActivity.unshift("Cheese Pull Reel marked as published");
    stableSave("Published. Results tracking is ready.");
    setActivePage("studio", false);
    return;
  }

  if (action === "studio-track-results") {
    openStableResultModal();
    return;
  }

  if (action === "add-result") {
    openStableResultModal();
    return;
  }

  if (action === "calendar-detail") {
    openStableCalendarPanel(button?.dataset?.calendarId || "google-review-push");
    return;
  }

  if (action === "start-later") {
    showDemoPanel("Saved for later", "Signature Reel Series remains next in the growth queue.");
    return;
  }

  if (action === "growth-area") {
    openGrowthAreaFlow(button?.dataset?.growthArea || "customers", "recommendation");
    return;
  }

  if (action === "growth-view-plan") {
    openGrowthAreaFlow(button?.dataset?.growthArea || "customers", "plan");
    return;
  }

  if (action === "growth-create-campaign") {
    const area = growthAreaDefinitions()[button?.dataset?.growthArea] || growthAreaDefinitions().customers;
    state.campaigns[area.campaignId] = "Active";
    state.activeGrowthArea = area.id;
    state.recentActivity.unshift(`${area.campaign} created from Growth Hub`);
    saveDemoState();
    closeDemoModal();
    showDemoPanel("Campaign created", `${area.campaign} is now ready in Campaigns.`);
    setActivePage("campaigns", false);
    return;
  }

  showDemoPanel(button?.textContent?.trim() || "Demo action");
}

function openStableCampaignPanel(campaignId) {
  const brain = stableBrain();
  const studioMissionReady = stableState().studioMission.created;
  const plans = {
    "google-review-growth-system": {
      title: "Google Review Growth System",
      objective: "Reach 500 Google reviews",
      why: "Satisfied customers are already present, but review collection is not systematic.",
      expected: "+5 reviews per week",
      commitment: "5 minutes daily",
      steps: [
        "Place QR review card on tables",
        "Add review reminder with the bill",
        "Train staff to ask satisfied customers politely",
        "Send WhatsApp review message after visit when possible",
        "Track new reviews weekly"
      ],
      assets: [
        "Table QR card",
        "Staff script",
        "WhatsApp review message",
        "Weekly review tracker"
      ],
      script: "Merci beaucoup pour votre visite. Si vous avez aime l'experience, un petit avis Google nous aide enormement.",
      message: "Bonsoir, merci encore pour votre visite chez Solo Pizzeria Napoletana. Si vous avez apprecie l'experience, votre avis Google nous aiderait beaucoup a faire connaitre le restaurant.",
      kpis: ["Reviews gained per week", "Google rating evolution", "Customer mentions", "New customers mentioning Google"],
      chain: ["Strong reputation", "Weak review acquisition", "Social proof opportunity", "500 reviews objective", "Review growth strategy", "Google Review Growth System"]
    },
    "signature-reel-series": {
      title: "Signature Reel Series",
      objective: "Increase visibility through visual content",
      why: "Pizza, tiramisu, the oven and restaurant atmosphere are highly visual.",
      expected: "More Instagram discovery and stronger brand image",
      commitment: "3-4 reels per week",
      steps: [
        "Film one cheese pull reel",
        "Film pizza oven preparation",
        "Capture tiramisu close-up",
        "Capture interior atmosphere",
        "Save customer reaction moments"
      ],
      assets: ["Cheese pull reel", "Pizza oven reel", "Tiramisu reel", "Atmosphere reel", "Customer reaction clip"],
      script: "Keep the focus on food, craft and atmosphere.",
      message: "Prepared for Instagram discovery.",
      kpis: ["Reels published", "Profile visits", "Messages", "Customers mentioning Instagram"],
      chain: ["Strong visual product", "UGC potential", "Visibility opportunity", "Increase awareness", "Content strategy", "Signature Reel Series"]
    },
    "story-mention-system": {
      title: "Story Mention System",
      objective: "Increase user-generated content",
      why: "Customers already share restaurant visits and can help build trust.",
      expected: "20 story mentions per month",
      commitment: "Light weekly follow-up",
      steps: ["Encourage tags", "Repost best stories", "Create best customer moment highlight"],
      assets: ["Story repost template", "Highlight cover", "Staff reminder"],
      script: "Ask naturally, without pressure.",
      message: "Keep it reputation-friendly and culturally safe.",
      kpis: ["Story mentions", "Reposts", "Profile visits"],
      chain: ["Strong community", "UGC potential", "Community opportunity", "Increase social proof", "Community strategy", "Story Mention System"]
    },
    "whatsapp-vip-list": {
      title: "WhatsApp VIP List",
      objective: "Increase repeat customers",
      why: "Moroccan customers rely heavily on WhatsApp communication.",
      expected: "More returning customers and stronger customer ownership",
      commitment: "Weekly message discipline",
      steps: ["Create opt-in list", "Add menu alerts", "Prepare weekend specials", "Add birthday dessert reminders"],
      assets: ["Opt-in script", "VIP list labels", "Menu alert template"],
      script: "Invite only interested customers.",
      message: "Use WhatsApp for useful updates, not noise.",
      kpis: ["VIP list size", "Replies", "Reservations", "Returning customers"],
      chain: ["Weak retention", "Untapped WhatsApp potential", "Repeat customer opportunity", "Increase repeat visits", "WhatsApp strategy", "WhatsApp VIP List"]
    },
    "weekend-family-menu": {
      title: "Weekend Family Menu",
      objective: "Increase weekend revenue",
      why: "Pizza works naturally for families and groups.",
      expected: "Higher average order and easier group visits",
      commitment: "Weekend-only preparation",
      steps: ["Define family menu", "Prepare visual menu card", "Mention it in Stories", "Track weekend orders"],
      assets: ["Menu card", "Story format", "Order tracker"],
      script: "Position for families and friends, not date night.",
      message: "Keep the offer premium and simple.",
      kpis: ["Weekend orders", "Average ticket", "Group reservations"],
      chain: ["Strong weekend demand", "Group dining fit", "Revenue opportunity", "Increase weekend revenue", "Offer strategy", "Weekend Family Menu"]
    }
  };
  const plan = plans[campaignId] || plans["google-review-growth-system"] || {
    title: brain.campaign,
    objective: brain.chain[3],
    why: brain.whyNow,
    expected: brain.expected_impact,
    commitment: brain.commitment || "Light owner involvement",
    steps: ["Complete one owner action", "Track result"],
    assets: ["Plan"],
    script: "",
    message: "",
    kpis: ["Reviews", "Customers", "Revenue"],
    chain: brain.chain
  };
  openDemoModal(plan.title, `
    <div class="demo-plan-stack">
      <article><span>Objective</span><strong>${plan.objective}</strong></article>
      <article><span>Why this campaign</span><strong>${plan.why}</strong></article>
      <article><span>Expected result</span><strong>${plan.expected}</strong></article>
      <article><span>Expected commitment</span><strong>${plan.commitment}</strong></article>
    </div>
    <div class="demo-check-list">
      ${plan.steps.map((step) => `<span>${step}</span>`).join("")}
    </div>
    <details class="executive-analysis" open>
      <summary>Prepared assets</summary>
      <div class="recommendation-rationale">${plan.assets.map((asset) => `<span>${asset}</span>`).join("")}</div>
    </details>
    <details class="executive-analysis">
      <summary>Staff script and message</summary>
      <p>${plan.script}</p>
      <p>${plan.message}</p>
    </details>
    <details class="executive-analysis">
      <summary>See reasoning</summary>
      <div class="demo-reasoning-chain">${plan.chain.map((item) => `<span>${item}</span>`).join("")}</div>
      <div class="recommendation-rationale">${plan.kpis.map((item) => `<span>${item}</span>`).join("")}</div>
    </details>
    ${campaignId === "google-review-growth-system" ? `
      <div class="modal-inspiration">
        <img src="assets/inspiration-review-card.png" alt="Premium QR review table card inspiration">
        <div>
          <span>What success looks like</span>
          <strong>A discreet QR card that makes leaving a review effortless.</strong>
          <p>Visible at the right moment, without pressuring the customer.</p>
        </div>
      </div>
    ` : campaignId === "signature-reel-series" ? `
      <div class="modal-inspiration">
        <img src="assets/inspiration-cheese-pull.png" alt="Neapolitan pizza cheese pull reel inspiration">
        <div>
          <span>What success looks like</span>
          <strong>One recognizable product moment with a clear visual payoff.</strong>
          <p>Close framing and real preparation make the restaurant easy to remember.</p>
        </div>
      </div>
    ` : campaignId === "weekend-family-menu" ? `
      <div class="modal-inspiration">
        <img src="assets/inspiration-family-menu.png" alt="Premium weekend family menu inspiration">
        <div>
          <span>What success looks like</span>
          <strong>A complete shared experience, presented before price.</strong>
          <p>The visual makes the family occasion easy to picture.</p>
        </div>
      </div>
    ` : ""}
    ${campaignId === "signature-reel-series" ? `
      <div class="campaign-confirmation">
        <div>
          <span>${studioMissionReady ? "Studio mission ready" : "Ready for execution"}</span>
          <strong>${studioMissionReady ? "The Cheese Pull Reel mission is ready for step-by-step filming." : "Confirm this campaign to create the Cheese Pull Reel mission in Studio."}</strong>
        </div>
        <button type="button" data-demo-action="${studioMissionReady ? "studio-prepare" : "confirm-studio-mission"}" data-campaign-id="${campaignId}">${studioMissionReady ? "Open Studio" : "Confirm & Open Studio"}</button>
      </div>
    ` : ""}
  `);
}

function studioClipDefinitions() {
  return [
    {
      purpose: "Hook",
      instruction: "Film the pizza being lifted with a clear cheese stretch.",
      duration: "2-3 seconds",
      goal: "Create immediate attention.",
    },
    {
      purpose: "Preparation",
      instruction: "Show the pizza going into the oven from a steady side angle.",
      duration: "2-3 seconds",
      goal: "Show authenticity and craft.",
    },
    {
      purpose: "Product close-up",
      instruction: "Film the finished pizza near the strongest natural light.",
      duration: "2 seconds",
      goal: "Make the product desirable.",
    },
    {
      purpose: "Atmosphere",
      instruction: "Capture a table, warm restaurant mood, or natural customer moment.",
      duration: "3 seconds",
      goal: "Show the full dining experience.",
    },
    {
      purpose: "Call to action",
      instruction: "Film the entrance or a ready table with space for the final message.",
      duration: "2 seconds",
      goal: "Invite people to visit.",
    },
  ];
}

function studioValidation(index, status) {
  const validations = {
    approved: [
      ["Strong hook.", "Good lighting.", "Clear food focus."],
      ["Steady movement.", "The oven is easy to recognize.", "Craft feels authentic."],
      ["Clear product detail.", "Good color and focus.", "The pizza looks desirable."],
      ["Warm atmosphere.", "Stable framing.", "The experience feels natural."],
      ["Clear location cue.", "Good space for the message.", "The ending feels intentional."],
    ],
    "needs-improvement": [
      ["The movement is too fast.", "Film slower and move closer to the oven."],
    ],
    "retry-required": [
      ["The product is too dark.", "Refilm near stronger light."],
    ],
  };
  if (status === "needs-improvement") return validations["needs-improvement"][0];
  if (status === "retry-required") return validations["retry-required"][0];
  return validations.approved[index] || validations.approved[0];
}

function validateStudioClip(index) {
  const state = stableState();
  const mission = state.studioMission;
  const clip = mission.clips[index];
  if (!clip || clip.status === "approved") return;

  clip.attempts = Number(clip.attempts || 0) + 1;
  if (index === 1 && clip.attempts === 1) {
    clip.status = "needs-improvement";
  } else if (index === 2 && clip.attempts === 1) {
    clip.status = "retry-required";
  } else {
    clip.status = "approved";
  }

  const nextIndex = mission.clips.findIndex((item) => item.status !== "approved");
  mission.currentClip = nextIndex === -1 ? 4 : nextIndex;
  mission.status = nextIndex === -1 ? "ready-to-assemble" : "filming";
  saveDemoState();

  if (clip.status === "approved") {
    showDemoPanel(`Clip ${index + 1} approved`, studioValidation(index, "approved").join(" "));
  } else {
    showDemoPanel(
      clip.status === "needs-improvement" ? `Clip ${index + 1} needs improvement` : `Clip ${index + 1} retry required`,
      studioValidation(index, clip.status).join(" ")
    );
  }
  setActivePage("studio", false);
}

function studioEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function openStudioAssetEditor() {
  const pkg = stableState().studioMission.package;
  openDemoModal("Edit Publishing Assets", `
    <form class="studio-assets-form" data-demo-form="studio-assets">
      <label><span>Caption</span><textarea name="caption" rows="4">${studioEscape(pkg.caption)}</textarea></label>
      <label><span>Call to action</span><input name="cta" type="text" value="${studioEscape(pkg.cta)}"></label>
      <label><span>Hashtags</span><input name="hashtags" type="text" value="${studioEscape(pkg.hashtags)}"></label>
      <button type="submit">Save Changes</button>
    </form>
  `);
}

function copyStudioCaption() {
  const caption = stableState().studioMission.package.caption;
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(caption).catch(() => {});
  }
  showDemoPanel("Caption ready", "Caption copied when browser permissions allow. It is also visible in the content package.");
}

function downloadStudioChecklist() {
  const mission = stableState().studioMission;
  const clips = studioClipDefinitions();
  const checklist = [
    mission.name,
    `Linked campaign: ${mission.linkedCampaign}`,
    "",
    ...clips.map((clip, index) => `${index + 1}. ${clip.purpose} - ${clip.instruction} (${clip.duration})`),
    "",
    `Caption: ${mission.package.caption}`,
    `CTA: ${mission.package.cta}`,
    `Posting time: ${mission.package.postingTime}`,
  ].join("\n");

  try {
    if (typeof Blob !== "undefined" && typeof URL !== "undefined" && document.createElement) {
      const url = URL.createObjectURL(new Blob([checklist], { type: "text/plain;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "solo-cheese-pull-reel-checklist.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
    showDemoPanel("Checklist ready", "The filming checklist has been downloaded.");
  } catch (error) {
    showDemoPanel("Checklist ready", "Download is unavailable here, but the complete checklist remains visible in Studio.");
  }
}

function openStableResultModal() {
  openDemoModal("Add Result", `
    <form class="demo-result-form" data-demo-form="add-result">
      <label><span>New reviews</span><input name="reviews" type="number" min="0" value="0"></label>
      <label><span>Views</span><input name="views" type="number" min="0" value="0"></label>
      <label><span>Messages</span><input name="messages" type="number" min="0" value="0"></label>
      <label><span>Reservations</span><input name="reservations" type="number" min="0" value="0"></label>
      <label><span>New customers</span><input name="customers" type="number" min="0" value="0"></label>
      <label><span>Revenue influenced</span><input name="revenue" type="number" min="0" value="0"></label>
      <label class="demo-result-form__wide"><span>Notes</span><input name="notes" type="text" placeholder="Optional note"></label>
      <button type="submit">Save Result</button>
    </form>
  `);
}

function openStableCalendarPanel(calendarId) {
  const events = {
    "staff-review-script": ["Staff review script", "Prepare the team to ask for reviews naturally", "Monday"],
    "qr-review-card": ["QR review card setup", "Make reviews easy at the table", "Tuesday"],
    "google-review-push": ["Google Review Push", "Strengthen social proof", "Wednesday"],
    "weekend-family-menu": ["Weekend Family Menu", "Increase weekend revenue", "Friday"],
    "signature-reel": ["Signature Reel", "Increase visibility", "Saturday"],
    "results-check": ["Results check", "Review new reviews, customers and revenue", "Sunday"],
  };
  const event = events[calendarId] || events["google-review-push"];
  openDemoModal(event[0], `
    <div class="demo-plan-stack">
      <article><span>Date</span><strong>${event[2]}</strong></article>
      <article><span>Purpose</span><strong>${event[1]}</strong></article>
    </div>
  `);
}

function inspirationCard(image, category, title, outcome, why, buttonLabel, action, data = "") {
  return `
    <article class="inspiration-card">
      <img src="${image}" alt="${title} inspiration">
      <div class="inspiration-card__body">
        <span>${category}</span>
        <h3>${title}</h3>
        <p>${why}</p>
        <small>${outcome}</small>
        <button type="button" data-demo-action="${action}"${data}>${buttonLabel}</button>
      </div>
    </article>
  `;
}

function operatingMetric(label, value, note = "") {
  return `
    <div class="operating-metric">
      <span>${label}</span>
      <strong>${value}</strong>
      ${note ? `<small>${note}</small>` : ""}
    </div>
  `;
}

function operatingChange(value, label, note = "") {
  return `
    <div class="operating-change">
      <strong>${value}</strong>
      <span>${label}</span>
      ${note ? `<small>${note}</small>` : ""}
    </div>
  `;
}

function operatingBlocker(title, detail, impact, campaignId) {
  return `
    <div class="operating-blocker">
      <div>
        <strong>${title}</strong>
        <p>${detail}</p>
        <small>${impact}</small>
      </div>
      <button type="button" class="button-secondary" data-demo-action="campaign-detail" data-campaign-id="${campaignId}">Fix</button>
    </div>
  `;
}

function operatingLoopRow(label, value, note = "") {
  return `
    <div class="operating-loop-row">
      <span>${label}</span>
      <strong>${value}</strong>
      ${note ? `<small>${note}</small>` : ""}
    </div>
  `;
}

function getNestedValue(source, path) {
  return path.split(".").reduce((current, key) => current?.[key], source);
}

function setNestedValue(source, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key] || typeof current[key] !== "object") current[key] = {};
    return current[key];
  }, source);
  target[last] = value;
}

function biField(path, placeholder = "", type = "text") {
  const profile = stableState().businessIntelligenceProfile;
  const value = getNestedValue(profile, path) ?? "";
  const safeValue = studioEscape(String(value));
  const safePath = studioEscape(path);
  const safePlaceholder = studioEscape(placeholder);
  if (type === "textarea") {
    return `<textarea data-bi-field="${safePath}" placeholder="${safePlaceholder}">${safeValue}</textarea>`;
  }
  const numberAttrs = type === "number" ? ' inputmode="decimal" step="any"' : "";
  return `<input data-bi-field="${safePath}" type="${studioEscape(type)}" value="${safeValue}" placeholder="${safePlaceholder}"${numberAttrs} />`;
}

function biSelect(path, options = []) {
  const profile = stableState().businessIntelligenceProfile;
  const value = String(getNestedValue(profile, path) ?? "");
  const safePath = studioEscape(path);
  const visibleOptions = value && !options.includes(value) ? [value, ...options] : options;
  return `
    <select data-bi-field="${safePath}">
      <option value="">Skip for now</option>
      ${visibleOptions.map((option) => `<option value="${studioEscape(option)}" ${option === value ? "selected" : ""}>${studioEscape(option)}</option>`).join("")}
    </select>
  `;
}

function biSection(title, purpose, fields) {
  return `
    <section class="bi-section">
      <div class="bi-section__intro">
        <span>${title}</span>
        <p>${purpose}</p>
      </div>
      <div class="bi-field-grid">${fields.join("")}</div>
    </section>
  `;
}

function biControl(label, control, hint = "Skip if unknown") {
  return `
    <label class="bi-field">
      <span>${label}</span>
      ${control}
      <small>${hint}</small>
    </label>
  `;
}

function buildBusinessIntelligenceMemory(profile = stableState().businessIntelligenceProfile) {
  return {
    memory_type: "business_intelligence_profile",
    version: profile.version || "1.0",
    updated_at: profile.updatedAt || new Date().toISOString(),
    business_context: profile.identity,
    decision_objectives: profile.goals,
    promotion_inputs: profile.products,
    customer_understanding: profile.customers,
    marketing_maturity: profile.marketing,
    execution_capacity: profile.resources,
    business_health_baseline: profile.performance,
    positioning_context: profile.competition,
    contextual_opportunities_and_constraints: profile.context,
    consultant_observations: profile.observations,
  };
}

function growthAreaDefinitions() {
  return {
    customers: {
      id: "customers",
      title: "Get More Customers",
      purpose: "Increase acquisition and visibility.",
      examples: ["Instagram reels", "Google visibility", "Local awareness", "Offers", "Referrals"],
      icon: "M3 17l6-6 4 4 8-9m-5 0h5v5",
      diagnosis: "Strong customer experience, but visibility does not yet match the quality of the restaurant.",
      recommendation: "Signature Reel Series",
      why: "Food preparation and atmosphere provide the clearest path to more local discovery.",
      impact: "Up to 15k views and approximately 4 reservations per month.",
      campaign: "Signature Reel Series",
      campaignId: "signature-reel-series",
      commitment: "15 minutes per reel",
      steps: ["Confirm the visual angle", "Create the Studio mission", "Film five guided clips", "Publish", "Track reservations"],
    },
    reputation: {
      id: "reputation",
      title: "Improve Reputation",
      purpose: "Increase trust and social proof.",
      examples: ["Google reviews", "Testimonials", "Customer stories", "Brand image"],
      icon: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 22 7 15.2 2 10.3l6.9-1L12 2Z",
      diagnosis: "Customer satisfaction is strong, but review acquisition remains below the restaurant's potential.",
      recommendation: "Google Review Growth System",
      why: "This is the highest-return trust opportunity with the lowest operational effort.",
      impact: "+5 reviews per week toward 500 reviews.",
      campaign: "Google Review Growth System",
      campaignId: "google-review-growth-system",
      commitment: "5 minutes daily",
      steps: ["Print QR cards", "Train staff", "Use the review message", "Track reviews", "Review weekly pace"],
    },
    retention: {
      id: "retention",
      title: "Bring Customers Back",
      purpose: "Increase retention and repeat visits.",
      examples: ["WhatsApp VIP", "Loyalty campaigns", "Birthday offers", "Repeat visits"],
      icon: "M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7",
      diagnosis: "Customer relationships currently end after the visit, leaving repeat demand unowned.",
      recommendation: "WhatsApp VIP Customer Loop",
      why: "WhatsApp matches local customer behavior and creates a practical permission-based relationship.",
      impact: "More repeat visits and a customer community the restaurant can reach directly.",
      campaign: "WhatsApp VIP List",
      campaignId: "whatsapp-vip-list",
      commitment: "One useful update per week",
      steps: ["Prepare opt-in language", "Create customer labels", "Invite interested guests", "Send one useful update", "Track returning visits"],
    },
    revenue: {
      id: "revenue",
      title: "Increase Revenue",
      purpose: "Increase average basket and sales.",
      examples: ["Bundles", "Menus", "Upsells", "Seasonal offers"],
      icon: "M12 2v20m5-16H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H6",
      diagnosis: "The restaurant has strong products, but the full shared-meal value is not consistently packaged.",
      recommendation: "Weekend Family Menu",
      why: "Families and groups naturally fit the product, making a complete menu easier to choose and more valuable.",
      impact: "Higher average ticket and approximately 1,200-3,000 MAD additional weekend influence.",
      campaign: "Weekend Family Menu",
      campaignId: "weekend-family-menu",
      commitment: "One weekend setup",
      steps: ["Define the menu", "Set the value clearly", "Prepare one visual", "Mention it before Friday", "Track menu sales"],
    },
    quietDays: {
      id: "quietDays",
      title: "Fill Quiet Days",
      purpose: "Improve traffic on weak days.",
      examples: ["Tuesday offers", "Football nights", "Lunch menus", "Events"],
      icon: "M8 2v3m8-3v3M4 9h16M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
      diagnosis: "Demand is concentrated on weekends, while weekday capacity remains underused.",
      recommendation: "Tuesday Neighbourhood Menu",
      why: "A simple weekday reason to visit can balance demand without weakening the premium position.",
      impact: "More weekday visits and better use of existing capacity.",
      campaign: "Weekend Family Menu",
      campaignId: "weekend-family-menu",
      commitment: "One recurring weekday action",
      steps: ["Choose the weak day", "Define the reason to visit", "Prepare one message", "Run for three weeks", "Compare traffic"],
    },
    community: {
      id: "community",
      title: "Build Community",
      purpose: "Create loyal followers and advocates.",
      examples: ["Stories", "UGC", "WhatsApp", "Referrals"],
      icon: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z",
      diagnosis: "Customers already share restaurant moments, but that participation is not yet a repeatable system.",
      recommendation: "Story Mention System",
      why: "Customer stories turn real visits into trusted community proof without requiring heavy production.",
      impact: "Up to 20 story mentions per month and stronger organic trust.",
      campaign: "Story Mention System",
      campaignId: "story-mention-system",
      commitment: "Light weekly follow-up",
      steps: ["Encourage natural tags", "Repost the best moments", "Create a customer highlight", "Thank participants", "Track mentions"],
    },
  };
}

function openGrowthAreaFlow(areaId, stage = "recommendation") {
  const area = growthAreaDefinitions()[areaId] || growthAreaDefinitions().customers;
  if (stage === "plan") {
    openDemoModal(area.campaign, `
      <div class="growth-flow-rail">
        <span class="is-complete">Growth Area</span><span class="is-complete">Diagnosis</span><span class="is-complete">Recommendation</span><span class="is-current">Plan</span><span>Campaign</span><span>Results</span>
      </div>
      <div class="growth-flow-plan">
        <div><span>Objective</span><strong>${area.purpose}</strong></div>
        <div><span>Expected impact</span><strong>${area.impact}</strong></div>
        <div><span>Commitment</span><strong>${area.commitment}</strong></div>
      </div>
      <div class="growth-flow-steps">
        ${area.steps.map((step, index) => `<div><span>${index + 1}</span><strong>${step}</strong></div>`).join("")}
      </div>
      <div class="growth-flow-actions">
        <button type="button" data-demo-action="growth-create-campaign" data-growth-area="${area.id}">Create Campaign</button>
      </div>
    `);
    return;
  }

  openDemoModal(area.title, `
    <div class="growth-flow-rail">
      <span class="is-complete">Growth Area</span><span class="is-current">Diagnosis</span><span>Recommendation</span><span>Plan</span><span>Campaign</span><span>Results</span>
    </div>
    <div class="growth-flow-diagnosis">
      <span>What SOLO sees</span>
      <strong>${area.diagnosis}</strong>
    </div>
    <div class="growth-flow-recommendation">
      <span>Highest return recommendation</span>
      <h3>${area.recommendation}</h3>
      <p>${area.why}</p>
      <div><span>Expected impact</span><strong>${area.impact}</strong></div>
      <div><span>Time required</span><strong>${area.commitment}</strong></div>
    </div>
    <div class="growth-flow-actions">
      <button type="button" data-demo-action="growth-view-plan" data-growth-area="${area.id}">View Plan</button>
    </div>
  `);
}

function renderTodayPage() {
  const state = stableState();
  const health = calculateBusinessHealth(state);
  const recommendation = homeRecommendation(state);
  const mission = missionForCampaign(state.studioMission?.activeCampaignId || recommendation.campaignId, state.studioMission);
  const missionApproved = Array.isArray(mission.clips) ? mission.clips.filter((clip) => clip.status === "approved").length : 0;
  const missionProgress = Math.max(Math.min((Number(state.weeklyCompleted || 2) / 5) * 100, 100), Math.min((missionApproved / 5) * 100, 100));
  const reviewProgress = Math.min((Number(state.reviews || 334) / 500) * 100, 100);
  const weekendRevenue = Number(state.revenue || 31400) > 0 ? "3 200 MAD" : "À suivre";
  pageTitle.textContent = `SOLO · ${frenchTodayDate()}`;

  contentStage.innerHTML = `
    <div class="solo-home-page">
      <header class="solo-home-heading">
        <p>Bonjour Hiba</p>
        <h2>Voici ce qu'il faut faire aujourd'hui.</h2>
      </header>

      <section class="business-health-card business-health-card--compact" aria-label="Santé du commerce">
        <div class="health-score-ring" data-health-circle style="--health-color:${health.color}; --health-progress:${health.score * 3.6}deg">
          <strong data-health-score="${health.score}">${health.score}</strong>
          <span>/100</span>
        </div>
        <div class="health-status-copy">
          <span style="color:${health.color}">${health.status}</span>
          <p>${health.explanation}</p>
        </div>
        <div class="health-signal-list" aria-label="Signaux à surveiller">
          ${health.lowestSignals.map((signal) => `
            <span>${signal.label} <strong>${signal.value}</strong></span>
          `).join("")}
        </div>
      </section>

      ${state.harvestRecalculating ? `
        <section class="harvest-recalculation-card" aria-live="polite">
          <span>Harvest recalcule</span>
          <h3>Harvest is recalculating your business...</h3>
          <p>Les derniers progrès sont pris en compte pour préparer la prochaine recommandation.</p>
          <div class="recalculation-dots" aria-hidden="true"><i></i><i></i><i></i></div>
        </section>
      ` : `
      <section class="best-next-move-card best-next-move-card--intelligent">
        <div class="best-next-move-copy">
          <div class="recommendation-title-row">
            <span>${recommendation.eyebrow}</span>
            <strong>${recommendation.confidence} confiance</strong>
          </div>
          <h3>${recommendation.title}</h3>
          <p>${recommendation.why}</p>
          <div class="why-recommendation">
            <span>Pourquoi Harvest recommande ceci</span>
            <ul>
              ${recommendation.bullets.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="decision-based-on">
            <span>Décision basée sur</span>
            <div>${recommendation.basedOn.map((item) => `<strong>${item}</strong>`).join("")}</div>
          </div>
        </div>
        <div class="best-next-move-footer">
          <div class="move-badges">
            <span>${recommendation.opportunity}</span>
            <span>${recommendation.impact}</span>
            <span>${recommendation.duration}</span>
          </div>
          <button type="button" data-demo-action="home-best-move" data-target-page="${recommendation.targetPage}" data-campaign-id="${recommendation.campaignId}">
            ${recommendation.cta}
          </button>
        </div>
      </section>
      `}

      <section class="home-mini-grid" aria-label="Résumé">
        <article class="home-mini-card">
          <div>
            <span>Mission actuelle</span>
            <h3>${mission.name}</h3>
            <p>${mission.objective}</p>
          </div>
          <div class="home-progress-row">
            <strong>${state.weeklyCompleted || 2} / 5 étapes</strong>
            <div class="today-progress-track"><span style="width:${missionProgress}%"></span></div>
          </div>
          <button type="button" class="home-text-link" data-demo-action="campaign-to-studio" data-campaign-id="${mission.activeCampaignId || recommendation.campaignId}">Continuer →</button>
        </article>

        <article class="home-mini-card">
          <div>
            <span>Opportunité du week-end</span>
            <h3>Menu famille du week-end</h3>
            <p>Mettre en avant une offre simple avant vendredi.</p>
          </div>
          <div class="home-progress-row">
            <strong>${weekendRevenue}</strong>
            <small>résultat estimé la semaine dernière</small>
          </div>
          <button type="button" class="home-text-link" data-demo-action="campaign-detail" data-campaign-id="weekend-family-menu">Voir →</button>
        </article>
      </section>

      <section class="recent-wins-card">
        <span>VICTOIRES RÉCENTES</span>
        <div class="recent-wins-list">
          <div>
            <i aria-hidden="true"></i>
            <strong>+1 avis Google</strong>
            <small>Aujourd'hui</small>
            <em>Confiance</em>
          </div>
          <div>
            <i aria-hidden="true"></i>
            <strong>+2 clients revenus</strong>
            <small>Hier</small>
            <em>Revenus</em>
          </div>
          <div>
            <i aria-hidden="true"></i>
            <strong>Preuve sociale renforcée</strong>
            <small>Cette semaine</small>
            <em>Visibilité</em>
          </div>
        </div>
      </section>
    </div>
  `;

  animateBusinessHealthScore();
}

function renderFocusedCampaignsPage() {
  const state = stableState();
  const reviewsGained = Math.max(Number(state.reviews || 334) - 317, 17);
  const progress = Math.min((reviewsGained / 166) * 100, 100);
  const studioApproved = state.studioMission.clips.filter((clip) => clip.status === "approved").length;
  const createdArea = state.activeGrowthArea ? growthAreaDefinitions()[state.activeGrowthArea] : null;
  const createdLoop = createdArea && !["customers", "reputation"].includes(createdArea.id) ? `
    <article class="growth-loop is-active">
      <div class="growth-loop__identity"><span>ACTIVE</span><h3>${createdArea.campaign}</h3><p>Goal: ${createdArea.purpose.toLowerCase()}</p></div>
      <div class="growth-loop__progress">
        <div><span>Status</span><strong>Ready to begin</strong><small>Created from Growth Hub</small></div>
        <div class="today-progress-track"><span style="width: 0%"></span></div>
      </div>
      <div class="growth-loop__facts">
        ${operatingLoopRow("Expected result", createdArea.impact, "Outcome selected on Home")}
        ${operatingLoopRow("Actual results", "Not started", "Results appear after execution")}
        ${operatingLoopRow("Problem", createdArea.diagnosis, "Diagnosis confirmed")}
        ${operatingLoopRow("Next action", createdArea.steps[0], createdArea.commitment)}
      </div>
      <button type="button" data-demo-action="campaign-to-studio" data-campaign-id="${createdArea.campaignId}">Continue</button>
    </article>
  ` : "";
  contentStage.innerHTML = `
    <div class="growth-os-page campaigns-os-page">
      <header class="growth-os-header">
        <p class="section-label">Growth Loops</p>
        <h2>Work that compounds.</h2>
        <p>Every loop connects an objective to actual results and one next action.</p>
      </header>

      <section class="loop-group">
        <div class="loop-group__heading"><span>Active</span><strong>2 loops moving</strong></div>
        <article class="growth-loop is-active">
          <div class="growth-loop__identity"><span>ACTIVE</span><h3>Google Review Growth System</h3><p>Goal: reach 500 reviews and strengthen customer trust.</p></div>
          <div class="growth-loop__progress">
            <div><span>Progress</span><strong>${reviewsGained} / 166 reviews gained</strong><small>${Math.round(progress)}% of objective</small></div>
            <div class="today-progress-track"><span style="width:${progress}%"></span></div>
          </div>
          <div class="growth-loop__facts">
            ${operatingLoopRow("Actual results", "+17 reviews", "+7 customers mentioning Google")}
            ${operatingLoopRow("Revenue influence", "3,200 MAD", "Estimated from customer mentions")}
            ${operatingLoopRow("Problem", "Requests inconsistent", "Staff habit not yet stable")}
            ${operatingLoopRow("Next action", "Train staff", "10 minutes")}
          </div>
          <button type="button" data-demo-action="campaign-to-studio" data-campaign-id="google-review-growth-system">Continue</button>
        </article>

        <article class="growth-loop is-active">
          <div class="growth-loop__identity"><span>ACTIVE</span><h3>Signature Reel Series</h3><p>Goal: turn strong food visuals into customer discovery.</p></div>
          <div class="growth-loop__progress">
            <div><span>Mission progress</span><strong>${studioApproved} / 5 clips approved</strong><small>${state.studioMission.status.replaceAll("-", " ")}</small></div>
            <div class="today-progress-track"><span style="width:${(studioApproved / 5) * 100}%"></span></div>
          </div>
          <div class="growth-loop__facts">
            ${operatingLoopRow("Expected result", "15k potential views", "4 reservations/month")}
            ${operatingLoopRow("Actual results", state.studioMission.published ? "Published" : "Not published yet", state.studioMission.published ? "Waiting for results" : "Execution in Studio")}
            ${operatingLoopRow("Problem", studioApproved ? "Complete remaining clips" : "Filming not started", "Approved clips remain locked")}
            ${operatingLoopRow("Next action", state.studioMission.status === "ready" ? "Start filming" : "Continue mission", "15 minutes")}
          </div>
          <button type="button" data-demo-action="campaign-to-studio" data-campaign-id="signature-reel-series">Continue</button>
        </article>
        ${createdLoop}
      </section>

      <section class="loop-group">
        <div class="loop-group__heading"><span>Planned</span><strong>Next systems</strong></div>
        <div class="planned-loop-list">
          <div><strong>WhatsApp Customer Loop</strong><span>Goal: build customer ownership</span><small>Expected: stronger repeat visits · Weekly effort</small><button type="button" class="button-secondary" data-demo-action="campaign-detail" data-campaign-id="whatsapp-vip-list">See Details</button></div>
          <div><strong>Weekend Family Menu</strong><span>Goal: increase group revenue</span><small>Expected: higher average ticket · Weekend execution</small><button type="button" class="button-secondary" data-demo-action="campaign-detail" data-campaign-id="weekend-family-menu">See Details</button></div>
          <div><strong>Story Mention System</strong><span>Goal: grow community proof</span><small>Expected: 20 mentions/month · Light effort</small><button type="button" class="button-secondary" data-demo-action="campaign-detail" data-campaign-id="story-mention-system">See Details</button></div>
        </div>
      </section>

      <section class="loop-group completed-loop-group">
        <div class="loop-group__heading"><span>Completed</span><strong>Results remain visible here</strong></div>
        <p>No completed loops yet. A loop moves here when its objective is achieved, with impact and learning preserved.</p>
      </section>
    </div>
  `;
}

function renderFocusedCustomersPage() {
  const state = stableState();
  contentStage.innerHTML = `
    <div class="growth-os-page customers-os-page">
      <header class="growth-os-header">
        <p class="section-label">Relationship System</p>
        <h2>Customers, not contacts.</h2>
        <p>See whether people are arriving, returning, reviewing, and staying connected.</p>
      </header>
      <section class="relationship-system">
        <div class="relationship-row"><span>New customers</span><strong>${state.customers}</strong><p>Monthly count · growing</p><small>Next action: keep acquisition loops active</small></div>
        <div class="relationship-row"><span>Returning customers</span><strong>4 this month</strong><p>Early signal · needs consistent tracking</p><small>Next action: build the WhatsApp relationship loop</small></div>
        <div class="relationship-row"><span>Google reviews</span><strong>${state.reviews} / 500</strong><p>+17 since the loop began</p><small>Next action: maintain +5 reviews/week</small></div>
        <div class="relationship-row"><span>WhatsApp community</span><strong>0 members</strong><p>Customer ownership has not started</p><small>Next action: permission-based opt-in system</small></div>
        <div class="relationship-row"><span>Repeat visits</span><strong>Needs tracking</strong><p>No reliable visit frequency yet</p><small>Next action: record returning customers weekly</small></div>
      </section>
      <section class="relationship-activity">
        <div class="system-lane__label"><span>Recent</span><strong>Customer movement</strong></div>
        <div class="relationship-activity__list">
          <div><time>Today</time><strong>New Google review received</strong><span>Trust loop</span></div>
          <div><time>Yesterday</time><strong>2 returning customers visited</strong><span>Relationship signal</span></div>
          <div><time>This week</time><strong>Customer story mention reposted</strong><span>Community proof</span></div>
          <div><time>This week</time><strong>7 customers mentioned Google</strong><span>Acquisition evidence</span></div>
        </div>
      </section>
    </div>
  `;
}

function renderFocusedStudioPage() {
  const state = stableState();
  const activeCampaignId = routeContext.campaignId || state.studioMission.activeCampaignId || "signature-reel-series";
  if (activeCampaignId && state.studioMission.activeCampaignId !== activeCampaignId) {
    state.studioMission = missionForCampaign(activeCampaignId, state.studioMission);
    state.studioMission.created = true;
    saveDemoState();
  }
  const mission = state.studioMission;
  const definitions = studioClipDefinitions();
  const approvedCount = mission.clips.filter((clip) => clip.status === "approved").length;
  const progress = (approvedCount / mission.clips.length) * 100;
  const currentIndex = Math.min(Number(mission.currentClip || 0), definitions.length - 1);
  const allApproved = approvedCount === definitions.length;
  const packageReady = ["assembly", "published"].includes(mission.status);
  const statusLabel = mission.published
    ? "Published"
    : packageReady
      ? "Ready to publish"
      : allApproved
        ? "Ready to assemble"
        : mission.status === "filming"
          ? "Filming in progress"
          : "Ready to film";

  const clipCards = definitions.map((definition, index) => {
    const clip = mission.clips[index];
    const isCurrent = index === currentIndex && clip.status !== "approved";
    const statusClass = clip.status.replaceAll("-", "_");
    const statusText = clip.status === "approved"
      ? "Approved"
      : clip.status === "needs-improvement"
        ? "Needs Improvement"
        : clip.status === "retry-required"
          ? "Retry Required"
          : isCurrent
            ? "Ready to film"
            : "Waiting";
    const feedback = clip.status === "pending" ? [] : studioValidation(index, clip.status);
    const action = clip.status === "needs-improvement" || clip.status === "retry-required"
      ? `<button type="button" data-demo-action="studio-retry" data-clip-index="${index}">Retry Clip ${index + 1}</button>`
      : clip.status === "pending" && isCurrent
        ? `<button type="button" data-demo-action="studio-upload" data-clip-index="${index}">Upload Clip</button>`
        : "";

    return `
      <article class="studio-clip-card ${isCurrent ? "is-current" : ""} is-${statusClass}">
        <div class="studio-clip-number">${clip.status === "approved" ? "✓" : index + 1}</div>
        <div class="studio-clip-content">
          <div class="studio-clip-heading">
            <div><span>Clip ${index + 1}</span><h3>${definition.purpose}</h3></div>
            <strong class="studio-status">${statusText}</strong>
          </div>
          <p>${definition.instruction}</p>
          <dl>
            <div><dt>Duration</dt><dd>${definition.duration}</dd></div>
            <div><dt>Goal</dt><dd>${definition.goal}</dd></div>
          </dl>
          ${feedback.length ? `
            <div class="studio-validation">
              ${feedback.map((item) => `<span>${item}</span>`).join("")}
            </div>
          ` : ""}
        </div>
        ${action}
      </article>
    `;
  }).join("");

  const orderedClips = mission.clipOrder.map((index, orderIndex) => {
    const definition = definitions[index];
    return `<span><small>${orderIndex + 1}</small>${definition.purpose}</span>`;
  }).join("");

  contentStage.innerHTML = `
    <div class="studio-mission-page">
      <section class="studio-mission-hero">
        <div class="studio-mission-copy">
          <p class="section-label">Active Studio Mission</p>
          <span class="studio-mission-status">${statusLabel}</span>
          <h2>${mission.name}</h2>
          <p>SOLO guides one clip at a time. Approved clips stay locked while weak clips are refilmed individually.</p>
        </div>
        <img src="assets/inspiration-cheese-pull.png" alt="Cheese pull reel visual reference">
      </section>

      <section class="studio-mission-summary">
        <div><span>Linked Campaign</span><strong>${mission.linkedCampaign}</strong></div>
        <div><span>Objective</span><strong>${mission.objective}</strong></div>
        <div><span>Expected Outcome</span><strong>${mission.expectedOutcome}</strong></div>
        <div><span>Platform</span><strong>${mission.platform}</strong></div>
        <div class="studio-required-assets"><span>Required Assets</span><strong>${mission.requiredAssets.join(" · ")}</strong></div>
      </section>

      <section class="studio-progress-section">
        <div class="studio-progress-heading">
          <div><p class="section-label">Mission Progress</p><h3>${approvedCount} / 5 clips approved</h3></div>
          <strong>${Math.round(progress)}%</strong>
        </div>
        <div class="today-progress-track"><span style="width: ${progress}%"></span></div>
        <div class="studio-stage-track" aria-label="Mission stages">
          <span class="${mission.status !== "ready" ? "is-complete" : "is-current"}">Plan</span>
          <span class="${approvedCount > 0 ? (allApproved ? "is-complete" : "is-current") : ""}">Film</span>
          <span class="${allApproved ? (packageReady ? "is-complete" : "is-current") : ""}">Assemble</span>
          <span class="${mission.published ? "is-complete" : packageReady ? "is-current" : ""}">Publish</span>
        </div>
      </section>

      ${mission.status === "ready" ? `
        <section class="studio-next-action">
          <div><span>Ready to begin</span><h3>Film five short clips in about 15 minutes.</h3><p>You will receive guidance and mock validation after each upload.</p></div>
          <div class="studio-package-actions">
            <button type="button" data-demo-action="studio-start">Start Filming</button>
            <button type="button" data-demo-action="studio-open-package" data-campaign-id="${activeCampaignId}">Create Content Package</button>
          </div>
        </section>
      ` : !packageReady ? `
        <section class="studio-clips-section">
          <div class="section-heading"><div><p class="section-label">Filming Steps</p><h3>${allApproved ? "All clips approved" : `Film Clip ${currentIndex + 1} next`}</h3></div></div>
          <div class="studio-validation-criteria"><span>Mock validation checks</span><strong>Lighting</strong><strong>Framing</strong><strong>Stability</strong><strong>Clarity</strong><strong>Energy</strong><strong>Brand Fit</strong><strong>Objective Fit</strong></div>
          <div class="studio-clip-list">${clipCards}</div>
          ${allApproved ? `
            <div class="studio-next-action">
              <div><span>Filming complete</span><h3>SOLO can now prepare the final content package.</h3><p>Your approved clips remain locked and ready.</p></div>
              <button type="button" data-demo-action="studio-open-package" data-campaign-id="${activeCampaignId}">Create Content Package</button>
            </div>
          ` : ""}
        </section>
      ` : `
        <section class="studio-package-section">
          <div class="section-heading"><div><p class="section-label">Final Content Package</p><h3>Ready for publishing</h3></div></div>
          <div class="studio-package-grid">
            <article class="studio-order-card">
              <span>Recommended Clip Order</span>
              <div class="studio-order-list">${orderedClips}</div>
              <button type="button" class="button-secondary" data-demo-action="studio-adjust-order">Adjust Order</button>
            </article>
            <article class="studio-copy-card">
              <span>Hook</span><strong>${studioEscape(mission.package.hook)}</strong>
              <span>Caption</span><p>${studioEscape(mission.package.caption)}</p>
              <span>Hashtags</span><p>${studioEscape(mission.package.hashtags)}</p>
              <span>Call To Action</span><strong>${studioEscape(mission.package.cta)}</strong>
            </article>
            <article class="studio-publish-details">
              <div><span>Posting Time</span><strong>${studioEscape(mission.package.postingTime)}</strong></div>
              <div><span>Music Style</span><strong>${studioEscape(mission.package.musicStyle)}</strong></div>
              <div><span>Thumbnail</span><strong>${studioEscape(mission.package.thumbnail)}</strong></div>
            </article>
          </div>
          <div class="studio-package-actions">
            <button type="button" data-demo-action="studio-edit-assets">Edit Assets</button>
            <button type="button" class="button-secondary" data-demo-action="studio-copy-caption">Copy Caption</button>
            <button type="button" class="button-secondary" data-demo-action="studio-download-checklist">Download Checklist</button>
          </div>
          <details class="studio-replace-details">
            <summary>Replace one approved clip</summary>
            <div>${definitions.map((definition, index) => `<button type="button" class="button-secondary" data-demo-action="studio-replace-clip" data-clip-index="${index}">Replace Clip ${index + 1} · ${definition.purpose}</button>`).join("")}</div>
          </details>
        </section>

        <section class="studio-publishing-section">
          ${mission.published ? `
            <div class="studio-published-state">
              <span>✓ Published</span>
              <h3>Cheese Pull Reel is ready for results.</h3>
              <p>Add views, messages, reservations, customers, and revenue when they arrive.</p>
              <button type="button" data-demo-action="studio-track-results">Track Results</button>
            </div>
          ` : `
            <div>
              <p class="section-label">Publishing</p>
              <h3>Upload manually for now.</h3>
              <p>Publishing integration is coming soon. Copy the assets, upload to Instagram, then mark the reel as published.</p>
            </div>
            <button type="button" data-demo-action="studio-publish">Mark As Published</button>
          `}
        </section>
      `}
    </div>
  `;
}

function renderFocusedResultsPage() {
  const state = stableState();
  const highlightedCampaignId = routeContext.campaignId || state.studioMission.activeCampaignId || "";
  const savedResults = state.results.slice(-4).reverse();
  const savedTimeline = savedResults.map((result, index) => `
    <div class="result-timeline-item">
      <div class="result-timeline-marker"></div>
      <time>Saved update ${savedResults.length - index}</time>
      <div>
        <strong>${result.reviews ? `+${result.reviews} reviews` : result.customers ? `+${result.customers} customers` : "Results updated"}</strong>
        <p>${Number(result.views || 0).toLocaleString()} views · ${Number(result.messages || 0).toLocaleString()} messages · ${Number(result.reservations || 0).toLocaleString()} reservations</p>
        <small>${Number(result.revenue || 0).toLocaleString()} MAD influenced${result.notes ? ` · ${result.notes}` : ""}</small>
      </div>
    </div>
  `).join("");

  contentStage.innerHTML = `
    <div class="growth-os-page results-os-page">
      <header class="growth-os-header has-action">
        <div><p class="section-label">Results Story</p><h2>Growth, week by week.</h2><p>Results are shown as movement over time, not a wall of analytics.</p></div>
        <button type="button" data-demo-action="add-result">Add Result</button>
      </header>

      <section class="result-summary-line">
        ${operatingMetric("Revenue influenced", `${Number(state.revenue || 0).toLocaleString()} MAD`, "Across active loops")}
        ${operatingMetric("Customers", `${state.customers}`, "Monthly total")}
        ${operatingMetric("Reviews", `${state.reviews}`, "Goal: 500")}
        ${operatingMetric("Returning", "4", "This month")}
      </section>

      <section class="results-timeline">
        <div class="loop-group__heading"><span>Timeline</span><strong>What changed</strong></div>
        <div class="results-timeline__body">
          <div class="result-timeline-item">
            <div class="result-timeline-marker"></div>
            <time>Week 1</time>
            <div><strong>+4 Google reviews</strong><p>Review request system started.</p><small>Trust began moving.</small></div>
          </div>
          <div class="result-timeline-item">
            <div class="result-timeline-marker"></div>
            <time>Week 2</time>
            <div><strong>+7 Google reviews</strong><p>QR cards added to the customer journey.</p><small>Review pace improved.</small></div>
          </div>
          <div class="result-timeline-item">
            <div class="result-timeline-marker"></div>
            <time>Week 3</time>
            <div><strong>+3 returning customers</strong><p>Early relationship signal appeared.</p><small>Retention tracking started.</small></div>
          </div>
          <div class="result-timeline-item">
            <div class="result-timeline-marker"></div>
            <time>Week 4</time>
            <div><strong>Weekend menu · +1,200 MAD</strong><p>Three family menus sold.</p><small>Revenue loop validated.</small></div>
          </div>
          ${savedTimeline}
        </div>
      </section>

      <section class="campaign-result-story">
        <div class="loop-group__heading"><span>By Loop</span><strong>Cause and effect</strong></div>
        <div class="campaign-result-line ${highlightedCampaignId === "google-review-growth-system" ? "is-highlighted" : ""}" data-campaign-result="google-review-growth-system"><span>Google Review Growth System</span><strong>+17 reviews</strong><p>+7 customers mentioning Google</p><small>Next: stabilize staff requests</small></div>
        <div class="campaign-result-line ${highlightedCampaignId === "weekend-family-menu" ? "is-highlighted" : ""}" data-campaign-result="weekend-family-menu"><span>Weekend Family Menu</span><strong>+1,200 MAD</strong><p>3 menu sales</p><small>Next: repeat on two Fridays</small></div>
        <div class="campaign-result-line ${highlightedCampaignId === "signature-reel-series" ? "is-highlighted" : ""}" data-campaign-result="signature-reel-series"><span>Signature Reel Series</span><strong>${state.studioMission.published ? "Published" : "In execution"}</strong><p>${state.studioMission.clips.filter((clip) => clip.status === "approved").length} / 5 clips approved</p><small>Next: ${state.studioMission.published ? "track views and reservations" : "complete Studio mission"}</small></div>
      </section>
    </div>
  `;

  if (highlightedCampaignId) {
    window.setTimeout(() => {
      contentStage.querySelector(`[data-campaign-result="${highlightedCampaignId}"]`)?.scrollIntoView?.({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  }
}

function renderFocusedSettingsPage() {
  const state = stableState();
  const profile = state.businessIntelligenceProfile;
  const memory = buildBusinessIntelligenceMemory(profile);
  contentStage.innerHTML = `
    <div class="growth-os-page settings-os-page business-intelligence-page">
      <header class="growth-os-header has-action">
        <div>
          <p class="section-label">Business Intelligence Profile</p>
          <h2>Business memory.</h2>
          <p>Answer what you know. Skip what you do not. Harvest will improve this profile over time before making decisions.</p>
        </div>
        <div class="bi-save-status" data-bi-save-status>Auto-saves as you type</div>
      </header>

      ${biSection("1. Business Identity", "Context for every future analysis.", [
        biControl("Business Name", biField("identity.businessName", "Ex: Café Atlas")),
        biControl("Industry", biSelect("identity.industry", ["Food & Beverage", "Beauty", "Fitness", "Retail", "Services", "Other"])),
        biControl("Business Category", biField("identity.businessCategory", "Ex: Neighbourhood café")),
        biControl("City", biField("identity.city", "Ex: Casablanca")),
        biControl("Number of Locations", biField("identity.numberOfLocations", "Ex: 1", "number")),
        biControl("Years in Business", biField("identity.yearsInBusiness", "Ex: 3", "number")),
        biControl("Number of Employees", biField("identity.numberOfEmployees", "Ex: 8", "number")),
      ])}

      ${biSection("2. Business Goals", "Recommendations will optimize for the owner's main objective.", [
        biControl("Primary Goal", biSelect("goals.primaryGoal", ["More Orders", "More Reservations", "More Leads", "More Revenue", "More Repeat Customers", "More Reviews", "More Brand Awareness"])),
        biControl("Secondary Goal", biSelect("goals.secondaryGoal", ["More Orders", "More Reservations", "More Leads", "More Revenue", "More Repeat Customers", "More Reviews", "More Brand Awareness"])),
        biControl("Current Biggest Challenge", biField("goals.currentBiggestChallenge", "Ex: Few weekday customers")),
        biControl("Success Metric", biField("goals.successMetric", "Ex: 500 Google reviews")),
        biControl("Desired Time Horizon", biSelect("goals.desiredTimeHorizon", ["This week", "1 month", "3 months", "4 months", "6 months", "12 months"])),
      ])}

      ${biSection("3. Products & Services", "The Brain must know what should actually be promoted.", [
        biControl("Best Selling Products", biField("products.bestSellingProducts", "Separate with commas")),
        biControl("Highest Margin Products", biField("products.highestMarginProducts", "Separate with commas")),
        biControl("Products Needing Promotion", biField("products.productsNeedingPromotion", "Separate with commas")),
        biControl("Seasonal Products", biField("products.seasonalProducts", "Ex: Ramadan menu, summer drinks")),
        biControl("Average Order Value", biField("products.averageOrderValue", "MAD", "number"), "Optional"),
      ])}

      ${biSection("4. Customers", "Understand who buys, why they buy, and when they buy.", [
        biControl("Target Audience", biField("customers.targetAudience", "Ex: Families, students, professionals")),
        biControl("Customer Segments", biField("customers.customerSegments", "Ex: Lunch workers, weekend families")),
        biControl("Buying Motivations", biField("customers.buyingMotivations", "Ex: Quality, atmosphere, price")),
        biControl("Peak Days", biField("customers.peakDays", "Ex: Friday, Saturday")),
        biControl("Peak Hours", biField("customers.peakHours", "Ex: 19:00-22:00")),
        biControl("Returning Customer Percentage", biField("customers.returningCustomerPercentage", "Ex: 35%", "text"), "Optional"),
      ])}

      ${biSection("5. Current Marketing", "Understand current marketing maturity and channels.", [
        biControl("Instagram", biField("marketing.instagram", "@moncommerce")),
        biControl("Facebook", biField("marketing.facebook", "Facebook page URL or name"), "Optional"),
        biControl("TikTok", biField("marketing.tiktok", "@moncommerce"), "Optional"),
        biControl("WhatsApp", biSelect("marketing.whatsapp", ["Available", "Not Available", "Unknown"])),
        biControl("Google Business Profile", biSelect("marketing.googleBusinessProfile", ["Active", "Not Active", "Unknown"])),
        biControl("Website", biField("marketing.website", "https://"), "Optional"),
        biControl("Posting Frequency", biField("marketing.postingFrequency", "Ex: 3 posts per week")),
        biControl("Running Ads?", biSelect("marketing.runningAds", ["Yes", "No", "Sometimes", "Unknown"])),
        biControl("Previous Campaigns", biField("marketing.previousCampaigns", "What has been tried?")),
        biControl("Current Content Posted", biField("marketing.currentContentTypes", "Ex: photos, reels, stories")),
      ])}

      ${biSection("6. Resources", "Recommendations must be realistic for time, team and budget.", [
        biControl("Monthly Marketing Budget", biField("resources.monthlyMarketingBudget", "MAD", "number"), "Optional"),
        biControl("Advertising Budget", biField("resources.advertisingBudget", "MAD", "number"), "Optional"),
        biControl("Available Time", biField("resources.availableTime", "Ex: 30 min/week")),
        biControl("Can Create Photos?", biSelect("resources.canCreatePhotos", ["Yes", "No", "Sometimes", "Unknown"])),
        biControl("Can Create Videos?", biSelect("resources.canCreateVideos", ["Yes", "No", "Sometimes", "Unknown"])),
        biControl("Staff Available?", biSelect("resources.staffAvailable", ["Yes", "No", "Sometimes", "Unknown"])),
        biControl("Owner Personally Involved?", biSelect("resources.ownerPersonallyInvolved", ["Yes", "No", "Sometimes", "Unknown"])),
      ])}

      ${biSection("7. Business Performance", "Baseline for future Business Health and progress tracking.", [
        biControl("Revenue Trend", biSelect("performance.revenueTrend", ["Growing", "Stable", "Declining", "Unknown"])),
        biControl("Weekly Customers", biField("performance.weeklyCustomers", "Ex: 120", "number"), "If available"),
        biControl("Average Order Value", biField("performance.averageOrderValue", "MAD", "number"), "If available"),
        biControl("Reviews", biField("performance.reviews", "Ex: 334", "number"), "If available"),
        biControl("Average Rating", biField("performance.averageRating", "Ex: 4.5", "number"), "If available"),
        biControl("Best Performing Days", biField("performance.bestPerformingDays", "Ex: Friday, Saturday")),
        biControl("Weakest Days", biField("performance.weakestDays", "Ex: Tuesday")),
      ])}

      ${biSection("8. Competition", "Understand positioning and where the business can win.", [
        biControl("Main Competitors", biField("competition.mainCompetitors", "Separate with commas"), "Optional"),
        biControl("Biggest Competitive Advantage", biField("competition.biggestCompetitiveAdvantage", "Ex: Better atmosphere")),
        biControl("Biggest Weakness Compared To Competitors", biField("competition.biggestWeaknessComparedToCompetitors", "Ex: Less visible on Instagram")),
      ])}

      ${biSection("9. Opportunities & Constraints", "Capture context that changes what should be recommended.", [
        biControl("Opportunities", biField("context.opportunities", "Ex: Ramadan, university nearby, tourist area")),
        biControl("Constraints", biField("context.constraints", "Ex: Parking issues, delivery limitations")),
        biControl("Local Events", biField("context.localEvents", "Ex: football nights, holidays")),
      ])}

      ${biSection("10. Consultant Observations", "Capture insight that structured questions cannot.", [
        biControl("Free Notes", biField("observations.consultantNotes", "Ex: Customers trust the product, but photos are outdated.", "textarea"), "Optional"),
      ])}

      <section class="bi-memory-output">
        <div>
          <span>Internal structured memory</span>
          <p>This object is saved for future Business Understanding, Knowledge Matching and Decision Engine phases. No recommendations are generated here.</p>
        </div>
        <pre data-bi-memory-output>${studioEscape(JSON.stringify(memory, null, 2))}</pre>
      </section>
    </div>
  `;
}

function renderFocusedCalendarPage() {
  const state = stableState();
  contentStage.innerHTML = `
    <div class="growth-os-page calendar-os-page">
      <header class="calendar-os-header">
        <div><p class="section-label">June 2026</p><h2>Trust & Reputation</h2><p>This month builds visible proof before the summer visibility loop.</p></div>
        <div class="calendar-goal-line"><span>Current goal</span><strong>${state.reviews} / 500 reviews</strong><div class="today-progress-track"><span style="width:${Math.min((state.reviews / 500) * 100, 100)}%"></span></div><small>On track</small></div>
      </header>

      <section class="calendar-orientation-lane">
        <div class="system-lane__label"><span>Now</span><strong>This week</strong></div>
        <div class="orientation-list">
          <button type="button" data-demo-action="calendar-detail" data-calendar-id="google-review-push"><time>Wednesday</time><strong>Google Review Push</strong><span>Strengthen social proof</span></button>
          <button type="button" data-demo-action="calendar-detail" data-calendar-id="weekend-family-menu"><time>Friday</time><strong>Weekend Family Menu</strong><span>Increase weekend revenue</span></button>
          <button type="button" data-demo-action="calendar-detail" data-calendar-id="signature-reel"><time>Saturday</time><strong>Signature Reel</strong><span>Increase visibility</span></button>
        </div>
      </section>

      <section class="calendar-orientation-lane">
        <div class="system-lane__label"><span>Next</span><strong>Seasonal horizon</strong></div>
        <div class="seasonal-timeline">
          <div><time>July</time><strong>Summer Visibility</strong><span>Terrace, cold drinks, tourist traffic</span></div>
          <div><time>August</time><strong>Tourist Season</strong><span>Location and premium experience</span></div>
          <div><time>September</time><strong>Back to School</strong><span>Students, families, weekday habits</span></div>
          <div><time>Weekly</time><strong>Friday Habits</strong><span>Family visits and group dining</span></div>
          <div><time>Event-led</time><strong>Football Matches</strong><span>Shared moments without discount pressure</span></div>
          <div><time>Seasonal</time><strong>Ramadan & Eid</strong><span>Family timing and reputation-safe planning</span></div>
        </div>
      </section>

      <section class="calendar-orientation-lane month-path">
        <div class="system-lane__label"><span>Path</span><strong>Where we are going</strong></div>
        <div class="month-path__line">
          <div class="is-complete"><span>May</span><strong>Community</strong><small>Completed</small></div>
          <div class="is-current"><span>June</span><strong>Trust & Reputation</strong><small>In progress</small></div>
          <div><span>July</span><strong>Summer Visibility</strong><small>Planned</small></div>
          <div><span>August</span><strong>Tourist Season</strong><small>Upcoming</small></div>
        </div>
      </section>
    </div>
  `;
}

renderNavigation();
setActivePage(location.hash || location.pathname.split("/").pop() || "today", false);

window.addEventListener("popstate", () => {
  setActivePage(location.hash || location.pathname.split("/").pop() || "today", false);
});

