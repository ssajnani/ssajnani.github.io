// Portfolio content — replaces the old external gatheredFacts endpoint.
// Everything the constellation reads lives here so the site works fully offline.
// {{TODO}} tags = realistic placeholder copy Samar should replace with real numbers.

var PORTFOLIO = {

  // ─── First constellation (LEFT): Projects · Education · Research · Talks · Work ───
  projects: [
    { name: 'System Design — Ingestion', description: 'Click to open an interactive architecture diagram (Mermaid) with tradeoff notes.', html_url: 'arch://ingestion' },
    { name: 'FaStack', description: 'Cross-platform daily-stack productivity app. React Native + Electron, offline-first sync.', html_url: 'https://github.com/ssajnani' },
    { name: 'Life Vector', description: 'Location-based time-management app that vectorises daily patterns from home base.', html_url: 'https://github.com/ssajnani' },
    { name: 'This Site', description: 'Custom WebGL portfolio engine — shaders, bloom composer, orbit raycasting, local Llama chatbot.', html_url: 'https://github.com/ssajnani/ssajnani.github.io' },
    { name: '3D Hologram Snake', description: 'Presented at Harvard — Pepper’s Ghost illusion driving a browser game via WebGL.', html_url: 'https://github.com/ssajnani' },
    { name: 'k8s Reconfig', description: 'POJO-based Kubernetes cluster metamodel with policy-driven reconfiguration.', html_url: 'https://github.com/ssajnani' }
  ],

  education: [
    { name: 'BSc CS (Honours)', school: 'Western University', grade: 'GPA 3.95/4', url: 'https://www.uwo.ca' },
    { name: 'BSc Biochem (Honours)', school: 'Western University', grade: 'GPA 3.6/4', url: 'https://www.uwo.ca' },
    { name: 'AI II', school: 'Western University', grade: 'Advanced coursework', url: 'https://www.uwo.ca' },
    { name: 'Internet Algorithmics', school: 'Western University', grade: 'Advanced coursework', url: 'https://www.uwo.ca' },
    { name: 'Computer Graphics', school: 'Western University', grade: 'Advanced coursework', url: 'https://www.uwo.ca' }
  ],

  research: [
    { name: 'Kubernetes Reconfig', title: 'Policy-based Reconfiguration for the Cloud',
      description: 'Built a POJO metamodel of a live k8s cluster using the Java API; wired custom policies into the control plane to trigger reconfiguration actions.',
      supervisor: 'Prof. Nazim Madhavji', school: 'Western University',
      html_url: 'https://github.com/ssajnani' },
    { name: 'Cancer Biosensor', title: 'Fluorescence-Based Cancer Biosensor (Biochem Thesis)',
      description: 'Protein extraction, cloning, and fluorescence microscopy to characterise a candidate cancer biosensor.',
      supervisor: 'Dr. David Litchfield (Chair, Biochemistry)', school: 'Western University',
      html_url: 'https://github.com/ssajnani' },
    { name: 'Twitter Health Mining', title: 'Health-Related Twitter Data Mining',
      description: 'Labelled thousands of health-related tweets by condition & sentiment; drove classifier accuracy from 65% → 82%.',
      supervisor: 'Western Research Group', school: 'Western University',
      html_url: 'https://github.com/ssajnani' }
  ],

  // "Talks" replaces the old YouTube star.
  talks: [
    { title: 'Growing Senior Engineers Without Burning Them Out', venue: '{{TODO}} Internal Eng Guild', date: '2025', url: 'https://linkedin.com/in/samarsajnani' },
    { title: 'From IC to Team Lead: The 90-Day Rewire', venue: '{{TODO}} Meetup Talk', date: '2024', url: 'https://linkedin.com/in/samarsajnani' },
    { title: 'On-Call is a Team Sport (redesigning our rotation)', venue: '{{TODO}} SRECon-style writeup', date: '2024', url: 'https://linkedin.com/in/samarsajnani' },
    { title: 'DSX Poster: ICP4D Installer Architecture', venue: 'IBM Watson Data Platform', date: '2018', url: 'https://linkedin.com/in/samarsajnani' },
    { title: '3D Hologram Snake', venue: 'Harvard University', date: '2016', url: 'https://linkedin.com/in/samarsajnani' }
  ],

  // Work — reframed for leadership. Numbers marked {{TODO}} — swap for real ones.
  work: [
    { position: 'Engineering Manager — {{TODO Company}}', dates: '2025 – Present',
      bullets: '• Manage a platform team of {{TODO 6}} engineers across {{TODO 2}} time zones. • Own hiring loop, on-call rotation, quarterly planning. • First 90 days: rewrote 1:1 cadence, shipped growth ladder, cut incident MTTR {{TODO 45m → 12m}}.' },
    { position: 'Team Lead — {{TODO Company}}', dates: '2022 – 2025',
      bullets: '• Led {{TODO 4→8}} engineers building {{TODO the platform layer}}. • Cut deploy time {{TODO 45m → 4m}}. • Grew {{TODO 2}} engineers to senior. • Owned architecture reviews and hiring bar.' },
    { position: 'Senior Software Engineer', dates: '2019 – 2022',
      bullets: '• Shipped {{TODO the ingestion pipeline}} serving {{TODO 2B events/day}}. • Mentored 3 juniors into full independence. • Owned SLOs & error budgets.' },
    { position: 'IBM Watson Data Platform — Private Cloud Intern', dates: 'May 2017 – Aug 2018',
      bullets: '• 1,300+ commits on IBM enterprise GitHub. • Lead dev on ICP4D installer — product made $12M in 6 months. • Won DSX poster award & CrushIT. • Cut CI/CD time 50%+ with automated provisioning framework. • Built JDBC/HDFS dataframe fns for Python, R, Scala.' },
    { position: 'CS Teaching Assistant — Web Dev', dates: 'Jan – Apr 2019',
      bullets: '• Mentored 50+ first-year students. • Graded & gave detailed feedback. • Introduced supplementary "how-this-is-used-in-industry" links each week.' }
  ],

  // ─── Second constellation (RIGHT): Impact · Leadership · Decisions · Writing · Now ───

  impact: [
    { title: 'Cut deploy time 45m → 4m', desc: '{{TODO}} Championed a rewrite of the CI graph — parallelised test shards, killed serial artifact hops. Team-wide productivity multiplier.', url: 'https://linkedin.com/in/samarsajnani' },
    { title: 'Grew team 4 → 8, zero regrettable attrition', desc: '{{TODO}} Ran full hiring loop in 6 months. Onboarding doc so tight new hires shipped in week 2. 12-month retention: 100%.', url: 'https://linkedin.com/in/samarsajnani' },
    { title: 'MTTR 45m → 12m', desc: '{{TODO}} Rebuilt runbook culture. On-call rotation redesigned so severities map to a first-responder tier, not the whole team.', url: 'https://linkedin.com/in/samarsajnani' },
    { title: 'ICP4D installer: $12M in 6 months', desc: 'Lead developer at IBM Watson Data Platform. Owned the installer from architecture to shipping.', url: 'https://linkedin.com/in/samarsajnani' },
    { title: 'Model accuracy 65% → 82%', desc: 'Twitter health-data research: labelled thousands of tweets by condition and sentiment; retrained classifier on cleaner labels.', url: 'https://linkedin.com/in/samarsajnani' }
  ],

  leadership: [
    { title: 'Build the team, not the hero', desc: 'A team where the tech lead is a bus-factor is a team on borrowed time. I optimise for the second-best decision being made without me.', url: '#' },
    { title: 'Blameless retros, sharp postmortems', desc: 'The system failed. Ask what invariants broke, not who forgot what. Fix the invariant.', url: '#' },
    { title: 'Ship small, ship weekly', desc: 'Big bang launches hide risk. A shippable Friday is a healthier signal than a full sprint burndown chart.', url: '#' },
    { title: '1:1s are for them', desc: 'My agenda is the fallback. Their agenda is the point. If they ever say "I have nothing" three weeks running, something is wrong.', url: '#' },
    { title: 'Hiring bar > headcount', desc: 'One senior hire beats three mid hires you have to manage into shape. I’d rather run under-staffed for a quarter than lower the bar.', url: '#' }
  ],

  // Decisions open a rich modal (Context / Options / Chose / Result).
  decisions: [
    { id: 'd1', title: 'Retire the monolith deploy script', label: 'Deploy pipeline rewrite',
      context: 'Deploys took 45 minutes and required a human to sit and watch a Jenkins job. On-call anxiety was structurally tied to shipping.',
      options: ['Buy a vendor CD platform (fast, ~$60k/yr, lock-in).', 'Rewrite in-house on GitHub Actions + our existing k8s (slower, cheaper, portable).', 'Do nothing and add more parallelism to the existing script (band-aid).'],
      chose: 'Rewrite in-house on GH Actions with sharded test runs and cached container layers. The vendor pitch was seductive but the {{TODO}} cost + integration story didn’t pay back inside 2 years.',
      result: 'Deploy time 45m → 4m. On-call ergonomics dramatically improved. Two junior engineers grew significantly by owning shards of the migration.',
      lesson: 'When the pain is structural, don’t buy a bigger band-aid.' },

    { id: 'd2', title: 'Split platform from product', label: 'Team topology',
      context: 'Product engineers were paged for infrastructure incidents. Feature velocity was tanking and burnout was rising.',
      options: ['Keep one team, hire more.', 'Split into Product + Platform teams with an explicit paved-road contract.', 'Outsource infra to another org.'],
      chose: 'Split. Wrote a paved-road doc listing what Platform owns, what Product owns, and what a "self-serve" upgrade looks like. Hired a Platform lead 3 months in.',
      result: 'Incident load on Product engineers fell {{TODO ~70%}}. Platform team now owns a real product with real users.',
      lesson: 'Team topology is a design decision. Draw the boxes before hiring into them.' },

    { id: 'd3', title: 'Promote 2, don’t hire 1', label: 'Growth over headcount',
      context: 'Had budget for one senior hire. Two internal engineers were 80% of the way to senior.',
      options: ['Hire senior externally (fast, safe, expensive on culture).', 'Promote both internal engineers with a mentorship plan.', 'Do both — hire and promote.'],
      chose: 'Promoted both. Committed the mentorship investment publicly so I couldn’t back out.',
      result: 'Both promoted within 9 months. Team retention signal spiked; recruiting pipeline warmed because engineers started referring friends.',
      lesson: 'Promotion is a hiring channel.' },

    { id: 'd4', title: 'Kill the "everyone on-call" rotation', label: 'On-call redesign',
      context: 'Everyone was on-call for everything. Juniors got paged for things they couldn’t triage; seniors resented the noise.',
      options: ['Add more docs, keep rotation.', 'Introduce tiered on-call (first-responder rotation + escalation squad).', 'Contract out overnight coverage.'],
      chose: 'Tiered on-call. Designed the escalation matrix with the team, not for them.',
      result: 'Pager volume for juniors dropped ~60%. Escalation SLA held. Team said, unprompted, that on-call felt "fair" for the first time.',
      lesson: 'Fairness is a technical spec, not a vibe.' },

    { id: 'd5', title: 'Say no to the executive ask', label: 'Scope defense',
      context: 'A VP asked for a "quick" side-project mid-quarter that would have delayed the roadmap 3 weeks.',
      options: ['Absorb it silently.', 'Say no with a counter-proposal.', 'Delegate it to the most bored engineer.'],
      chose: 'Wrote a 1-page "what this costs, here’s a smaller version, here’s who else could own it." Presented to VP in 15 minutes.',
      result: 'VP took the smaller version. Team saw scope being defended publicly and started raising concerns earlier themselves.',
      lesson: 'Saying no once, in writing, is worth 10 slack pushbacks.' }
  ],

  // Talks / posts / writing (mirrored orbit for the "Writing" star).
  writing: [
    { title: 'The 90-Day EM Rewire', desc: '{{TODO}} Post on the first 90 days transitioning from tech lead to EM. Draft in progress.', url: '#' },
    { title: 'Tiered On-Call: A Design Doc', desc: '{{TODO}} How we redesigned the pager rotation with the team, not for them.', url: '#' },
    { title: 'Promotion is a Hiring Channel', desc: '{{TODO}} Argument for over-investing in internal senior growth over external hire.', url: '#' },
    { title: '1:1s Are For Them', desc: '{{TODO}} My template + why the "manager’s agenda" is the fallback, never the plan.', url: '#' },
    { title: 'Why This Site Runs a Local Llama', desc: '{{TODO}} Notes on wiring the chatbot to a home-server Ollama instance instead of an API.', url: '#' }
  ],

  // "Now" — current focus (visible in the Now panel).
  now: {
    updated: '{{TODO YYYY-MM}}',
    focus: [
      'Managing a platform team of {{TODO 6}} engineers. Rewriting our incident review culture.',
      'Reading: <i>Staff Engineer</i> (Larson), <i>Resilient Management</i> (Hogan), <i>An Elegant Puzzle</i> (Larson).',
      'Learning: distributed transactions in Rust; making peace with async runtimes.',
      'Building: this site’s local Llama chatbot on a home-server Ollama box.',
      'Not doing: side projects I can’t finish in a weekend.'
    ]
  },

  // Architecture diagrams — clicking the "System Design" project opens a modal.
  architectures: {
    ingestion: {
      title: 'Event Ingestion Pipeline (illustrative)',
      mermaid: 'flowchart LR\n  A[Client SDKs] -->|batched| B(Edge Ingest)\n  B --> C{Schema Valid?}\n  C -- yes --> D[Kafka Topic: raw]\n  C -- no --> E[DLQ]\n  D --> F[Stream Processor]\n  F --> G[(Warehouse)]\n  F --> H[Realtime KV]\n  E --> I[Auto-repair Worker]\n  I --> D',
      notes: 'Decision points: (1) Validate at edge, not in stream — bad events don’t clog Kafka. (2) DLQ has an auto-repair worker so ops isn’t the DLQ. (3) Realtime KV is a peer output, not derived — halves p99 read latency.'
    }
  }
};

// Legacy shim so the old code paths that referenced `tweets` don't break.
var tweets = [];
