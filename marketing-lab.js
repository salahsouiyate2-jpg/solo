/*
 * Developer-only Marketing Lab experiment.
 * Remove this file and its script tag in index.html to remove the experiment.
 * This component intentionally does not read from or write to the SOLO Brain or demo state.
 */
(function marketingLabExperiment() {
  "use strict";

  if (typeof isDeveloperDemoMode !== "function" || !isDeveloperDemoMode()) return;

  const labPageId = "marketing-lab";
  const labState = { videoUrl: "", fileName: "" };

  const styles = document.createElement("style");
  styles.dataset.marketingLabStyles = "true";
  styles.textContent = `
    .marketing-lab-page { max-width: 1040px; margin: 0 auto; padding: 36px 28px 72px; color: var(--solo-ink, #1a2420); }
    .marketing-lab-header { margin-bottom: 24px; }
    .marketing-lab-header span { color: var(--solo-green, #1d9e75); font-size: .75rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .marketing-lab-header h2 { margin: 8px 0; font-size: clamp(1.8rem, 4vw, 3rem); }
    .marketing-lab-header p { max-width: 680px; margin: 0; color: var(--solo-muted, #66736d); line-height: 1.6; }
    .marketing-lab-card { margin-top: 18px; padding: 24px; border: 1px solid var(--solo-line, #dfe4e1); border-radius: 18px; background: #fff; }
    .marketing-lab-card h3 { margin: 0 0 6px; font-size: 1.15rem; }
    .marketing-lab-card > p { margin: 0 0 18px; color: var(--solo-muted, #66736d); line-height: 1.5; }
    .marketing-lab-upload { display: grid; place-items: center; min-height: 150px; padding: 24px; border: 1px dashed #9fb7ad; border-radius: 14px; background: #f7faf8; text-align: center; cursor: pointer; }
    .marketing-lab-upload strong { display: block; margin-bottom: 6px; }
    .marketing-lab-upload span { color: var(--solo-muted, #66736d); font-size: .85rem; }
    .marketing-lab-upload input { position: absolute; width: 1px; height: 1px; opacity: 0; }
    .marketing-lab-preview { display: none; margin-top: 18px; }
    .marketing-lab-preview.is-visible { display: grid; gap: 10px; }
    .marketing-lab-preview video { width: min(100%, 430px); max-height: 560px; border-radius: 16px; background: #111; }
    .marketing-lab-preview small { color: var(--solo-muted, #66736d); }
    .marketing-lab-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .marketing-lab-field { display: grid; gap: 7px; }
    .marketing-lab-field--wide { grid-column: 1 / -1; }
    .marketing-lab-field span { font-size: .82rem; font-weight: 750; }
    .marketing-lab-field input, .marketing-lab-field select, .marketing-lab-field textarea { width: 100%; box-sizing: border-box; padding: 12px 13px; border: 1px solid var(--solo-line, #dfe4e1); border-radius: 10px; background: #fff; color: inherit; font: inherit; }
    .marketing-lab-field textarea { min-height: 90px; resize: vertical; }
    .marketing-lab-submit { grid-column: 1 / -1; justify-self: start; padding: 12px 18px; border: 0; border-radius: 10px; background: var(--solo-green-dark, #176c54); color: #fff; font-weight: 800; cursor: pointer; }
    .marketing-lab-submit:disabled { opacity: .5; cursor: not-allowed; }
    .marketing-lab-message { grid-column: 1 / -1; min-height: 20px; margin: 0; color: #a14b35; font-size: .85rem; }
    .marketing-lab-results { display: grid; gap: 0; margin-top: 24px; overflow: hidden; border: 1px solid var(--solo-line, #dfe4e1); border-radius: 18px; background: #fff; }
    .marketing-lab-result { padding: 22px 24px; border-bottom: 1px solid var(--solo-line, #dfe4e1); }
    .marketing-lab-result:last-of-type { border-bottom: 0; }
    .marketing-lab-result h3 { margin: 0 0 10px; font-size: .78rem; font-weight: 850; letter-spacing: .055em; text-transform: uppercase; color: var(--solo-green-dark, #176c54); }
    .marketing-lab-result p { margin: 0; line-height: 1.65; white-space: pre-line; }
    .marketing-lab-result--priority { background: #f2f8f5; }
    .marketing-lab-confidence strong { display: block; margin-bottom: 5px; font-size: 1.4rem; }
    .marketing-lab-disclaimer { padding: 18px 24px; background: #f8f7f3; color: var(--solo-muted, #66736d); font-size: .88rem; }
    .marketing-lab-developer { margin-top: 18px; border: 1px solid var(--solo-line, #dfe4e1); border-radius: 14px; background: #fff; }
    .marketing-lab-developer summary { padding: 17px 20px; cursor: pointer; font-weight: 800; }
    .marketing-lab-developer-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; padding: 0 20px 20px; }
    .marketing-lab-developer-grid div { padding: 14px; border-radius: 10px; background: #f7f7f4; }
    .marketing-lab-developer-grid strong { display: block; margin-bottom: 5px; font-size: .82rem; }
    .marketing-lab-developer-grid span { color: var(--solo-muted, #66736d); font-size: .82rem; line-height: 1.45; }
    @media (max-width: 700px) { .marketing-lab-page { padding: 24px 16px 56px; } .marketing-lab-form, .marketing-lab-developer-grid { grid-template-columns: 1fr; } .marketing-lab-field--wide { grid-column: auto; } }
  `;
  document.head.appendChild(styles);

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function buildMockAnalysis(input) {
    const business = input.businessName || "the business";
    const audience = input.targetAudience || "the right local audience";
    const goal = input.goal || "turn attention into new customers";
    const isMma = /mma|martial|fight|combat|gym|fitness/i.test(`${input.businessType} ${input.businessName}`);
    const experience = isMma ? "the energy, discipline and coaching inside the club" : "the real customer experience";
    const action = isMma ? "Book a free trial session" : "Contact us today";

    return {
      owner: [
        ["What this advertisement is trying to achieve", `Make ${audience} notice ${business} and take the next step toward ${goal.toLowerCase()}.`],
        ["What already works", `Video is the right format for showing ${experience}. Movement can earn attention quickly and make the business feel real.`],
        ["What is limiting this advertisement", `The viewer may see an exciting video without immediately understanding who it is for, what makes ${business} different, or what to do next.`],
        ["The single biggest improvement I would make first", `Make the first two seconds speak directly to ${audience}, then show one clear reason to choose ${business}.`],
        ["Why this matters", `Most people decide very quickly whether to keep watching. A clearer opening gives the rest of the advertisement a better chance to create interest and action.`],
        ["Here is how I would improve this advertisement", `Open with the result the customer wants. Show a coach and a real training moment. Add one short proof point. End with one simple invitation: “${action}.”`],
        ["Improved script", `Want to become stronger, more confident and more disciplined?\n\nAt ${business}, beginners train alongside experienced coaches in a serious but welcoming environment.\n\nSee what one session feels like. ${action}.`],
        ["Improved hook", isMma ? "You do not need experience to start MMA." : `A better way to experience ${business}.`],
        ["Improved CTA", `${action}. Send us a message now.`],
        ["Improved caption", `You do not have to be ready. You only have to start.\n\n${business} helps ${audience} build real progress in a supportive environment.\n\n${action} — send us a message to reserve your place.`],
        ["Suggested filming improvements", `Start with the strongest human moment, not a logo. Use close shots of faces, coaching and movement. Keep clips short. Add readable on-screen words. Let the final frame hold long enough to read the invitation.`],
        ["Expected business impact", `A clearer opening and invitation should help more of the right people understand the offer, watch longer, and message ${business} about taking the next step.`],
        ["Confidence", `78% — the recommendation is based on the business goal and audience provided. Confidence will improve when the real video can be evaluated frame by frame.`],
      ],
      developer: {
        "Hook analysis": "The opening should identify the viewer and remove the biggest reason they hesitate.",
        "CTA analysis": "Use one action only. A direct-message or trial-session action is easier to understand than a general invitation.",
        "Brand analysis": "The business should feel disciplined, credible and welcoming rather than intimidating.",
        "Audience fit": `Language is aimed at ${audience}, with special care for first-time customers.`,
        "Offer clarity": `The next step should be a specific, low-friction offer such as “${action}.”`,
        "Trust": "Show a real coach, real members and the training environment. Specific proof is stronger than broad claims.",
        "Storytelling": "Move from customer desire, to proof, to invitation. Keep one message throughout.",
        "Visual rhythm": "Use the strongest moment first, short cuts through the middle, and a slower final frame for the action.",
      },
    };
  }

  // This adapter is the only boundary that needs replacing for a future AI analysis call.
  async function analyzeAdvertisement(input) {
    return buildMockAnalysis(input);
  }

  function renderResults(analysis) {
    const results = document.querySelector("#marketing-lab-results");
    results.innerHTML = `
      <div class="marketing-lab-results">
        ${analysis.owner.map(([title, body], index) => `
          <section class="marketing-lab-result${index === 3 ? " marketing-lab-result--priority" : ""}${title === "Confidence" ? " marketing-lab-confidence" : ""}">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(body)}</p>
          </section>
        `).join("")}
        <div class="marketing-lab-disclaimer"><strong>Remember:</strong> This is a recommendation. Not a guarantee.</div>
      </div>
      <details class="marketing-lab-developer">
        <summary>Developer Analysis</summary>
        <div class="marketing-lab-developer-grid">
          ${Object.entries(analysis.developer).map(([title, body]) => `<div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span></div>`).join("")}
        </div>
      </details>
    `;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderLab() {
    document.title = "SOLO · Marketing Lab";
    pageTitle.textContent = "Marketing Lab";
    document.body.dataset.page = labPageId;
    document.querySelectorAll(".nav-item").forEach((item) => {
      const active = item.dataset.page === labPageId;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-current", active ? "page" : "false");
    });

    contentStage.innerHTML = `
      <main class="marketing-lab-page">
        <header class="marketing-lab-header">
          <span>Developer Experiment</span>
          <h2>🧪 Marketing Lab</h2>
          <p>Upload an advertisement and get one clear recommendation for making the next version stronger.</p>
        </header>
        <section class="marketing-lab-card">
          <h3>Upload the Instagram Reel</h3>
          <p>The video stays in this browser and is not added to SOLO.</p>
          <label class="marketing-lab-upload">
            <input id="marketing-lab-video" type="file" accept="video/mp4,video/quicktime,.mp4,.mov" />
            <strong>Choose an MP4 or MOV video</strong>
            <span>Preview it here before analysis</span>
          </label>
          <div class="marketing-lab-preview" id="marketing-lab-preview">
            <video controls playsinline></video>
            <small></small>
          </div>
        </section>
        <section class="marketing-lab-card">
          <h3>Tell SOLO what this advertisement needs to do</h3>
          <p>This context keeps the recommendation focused on the business outcome.</p>
          <form class="marketing-lab-form" id="marketing-lab-form">
            <label class="marketing-lab-field"><span>Business name</span><input name="businessName" required placeholder="Example: Atlas MMA Club" /></label>
            <label class="marketing-lab-field"><span>Business type</span><input name="businessType" required value="MMA club" /></label>
            <label class="marketing-lab-field marketing-lab-field--wide"><span>Goal of this advertisement</span><textarea name="goal" required placeholder="Example: Get more people to book a free trial session"></textarea></label>
            <label class="marketing-lab-field"><span>Target audience</span><input name="targetAudience" required placeholder="Example: Beginners aged 18–35 in Casablanca" /></label>
            <label class="marketing-lab-field"><span>Platform</span><select name="platform"><option selected>Instagram</option><option>Facebook</option><option>TikTok</option></select></label>
            <p class="marketing-lab-message" id="marketing-lab-message" role="alert"></p>
            <button class="marketing-lab-submit" type="submit">Analyze advertisement</button>
          </form>
        </section>
        <div id="marketing-lab-results"></div>
      </main>
    `;

    document.querySelector("#marketing-lab-video").addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      const message = document.querySelector("#marketing-lab-message");
      if (!file) return;
      if (!/\.(mp4|mov)$/i.test(file.name) && !["video/mp4", "video/quicktime"].includes(file.type)) {
        message.textContent = "Please choose an MP4 or MOV video.";
        event.target.value = "";
        return;
      }
      if (labState.videoUrl) URL.revokeObjectURL(labState.videoUrl);
      labState.videoUrl = URL.createObjectURL(file);
      labState.fileName = file.name;
      const preview = document.querySelector("#marketing-lab-preview");
      preview.querySelector("video").src = labState.videoUrl;
      preview.querySelector("small").textContent = file.name;
      preview.classList.add("is-visible");
      message.textContent = "";
    });

    document.querySelector("#marketing-lab-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = document.querySelector("#marketing-lab-message");
      if (!labState.videoUrl) {
        message.textContent = "Upload the advertisement before starting the analysis.";
        return;
      }
      const button = event.currentTarget.querySelector("button[type=submit]");
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      button.disabled = true;
      button.textContent = "Analyzing…";
      message.textContent = "";
      try {
        renderResults(await analyzeAdvertisement({ ...data, fileName: labState.fileName }));
      } finally {
        button.disabled = false;
        button.textContent = "Analyze advertisement";
      }
    });
  }

  const navButton = document.createElement("button");
  navButton.className = "nav-item nav-item--developer";
  navButton.type = "button";
  navButton.dataset.page = labPageId;
  navButton.innerHTML = `<span aria-hidden="true">🧪</span><span>Marketing Lab</span>`;
  navButton.addEventListener("click", () => {
    history.pushState({ page: labPageId }, "", routeFor(labPageId));
    renderLab();
  });
  navList.appendChild(navButton);

  window.addEventListener("popstate", () => {
    if (normalizePageId(location.hash || location.pathname.split("/").pop()) === labPageId) renderLab();
  });

  if (normalizePageId(location.hash || location.pathname.split("/").pop()) === labPageId) renderLab();
})();
