import { useState, useEffect, useCallback } from "react";

const PHASES = [
  {
    id: "phase1", label: "Phase 1", title: "Foundations", months: "Months 1–3", color: "#1a4a7a",
    sections: [
      { title: "Python", items: ["Data types, variables, loops, conditionals, functions","File I/O, working with JSON, error handling","OOP basics — classes, methods, inheritance","Virtual environments, pip, requirements.txt"] },
      { title: "Prompt Engineering", items: ["Zero-shot, few-shot, chain-of-thought prompting","System prompts and role definition","Structured output (JSON mode)","Prompt chaining and iterative refinement","Anthropic-specific guidance — Constitutional AI"] },
      { title: "API Usage", items: ["REST API concepts — requests, responses, headers, auth","Anthropic API — messages endpoint","Handling rate limits and errors","Streaming responses","Managing conversation history / context windows"] },
      { title: "LangChain", items: ["Chains — basic sequential chains","Prompt templates","Memory — conversation buffer, summary memory","Agents and tools","Document loaders and text splitters"] },
      { title: "Scripting (Bash & PowerShell)", items: ["Bash — variables, loops, conditionals, functions","File management scripts — copying, moving, archiving","PowerShell — cmdlets, pipelines, scripts","Automation scripts for system tasks","Scheduled tasks and cron job basics"] },
      { title: "IT Networking", items: ["OSI model and TCP/IP stack","IP addressing, subnetting, CIDR notation","DNS, DHCP, HTTP/HTTPS, SSH protocols","Firewalls, VPNs, network security basics","Network troubleshooting — ping, tracert, nslookup, netstat"] },
      { title: "CompSci Algorithms & Data Structures", items: ["Big O notation — time and space complexity","Data structures — arrays, linked lists, stacks, queues","Trees and graphs — traversal, BFS, DFS","Sorting algorithms — merge sort, quick sort, binary search","Dynamic programming basics"] },
    ],
  },
  {
    id: "phase2", label: "Phase 2", title: "Backend & Data", months: "Months 3–7", color: "#1e6b4a",
    sections: [
      { title: "Node.js & Express", items: ["JavaScript fundamentals — async/await, promises, modules","Building REST APIs with Express","Middleware, routing, error handling","Authentication — JWT, sessions","Environment variables and secrets management"] },
      { title: "Databases & SQL", items: ["SQL fundamentals — SELECT, JOIN, GROUP BY, indexes","Subqueries, CTEs, and window functions","Stored procedures and triggers","Query optimisation and execution plans","Transactions and ACID properties","PostgreSQL — setup, querying, schema design","Supabase — hosted Postgres, auth, row-level security","Data modelling — relational design, normalisation"] },
      { title: "Authentication & Security", items: ["OAuth 2.0 concepts","Supabase Auth or Auth0","Role-based access control (RBAC)","Securing API endpoints"] },
      { title: "Deployment & DevOps", items: ["Docker — containers, images, docker-compose","CI/CD — GitHub Actions","Environment management — dev/staging/prod","Azure cloud basics"] },
      { title: "Linux & Windows Servers", items: ["Linux command line — navigation, permissions, file management","User and process management, services (systemd)","Windows Server basics — Active Directory, Group Policy","SSH, remote desktop, and server hardening basics","Logs, monitoring, and basic troubleshooting"] },
      { title: "Developer Tools", items: ["Git advanced — branching strategies, rebasing, stashing","VS Code — extensions, debugging, keyboard shortcuts","Postman / Insomnia for API testing","Browser DevTools — network tab, console, performance","Terminal productivity — aliases, dotfiles, shell customisation"] },
      { title: "Application Development Skills", items: ["Software design patterns — MVC, repository, factory","SOLID principles","Unit testing, integration testing, TDD basics","Code review practices and standards","API design — RESTful conventions, versioning, documentation"] },
    ],
  },
  {
    id: "phase3", label: "Phase 3", title: "AI Engineering Core", months: "Months 5–10", color: "#6b3a1e",
    sections: [
      { title: "RAG — Retrieval Augmented Generation", items: ["Embeddings and vector representations","Vector databases — Pinecone, Chroma, pgvector","Chunking strategies for documents","Retrieval pipelines — similarity search, hybrid search","Build a document Q&A system"] },
      { title: "Agents & Agentic Systems", items: ["ReAct pattern — reasoning + acting","Tool use / function calling","Multi-step agent workflows","Human-in-the-loop design","LangGraph — agent orchestration"] },
      { title: "LLM Ops", items: ["Prompt versioning and management","Evaluation — measuring LLM output quality","Logging and observability — LangSmith","Cost management and token optimisation","Fine-tuning concepts"] },
      { title: "Structured Outputs & Data Extraction", items: ["Getting reliable JSON from LLMs","Pydantic for output validation","Entity extraction pipelines","End-to-end extraction workflows"] },
    ],
  },
  {
    id: "phase4", label: "Phase 4", title: "Domain Specialisation", months: "Months 8–14", color: "#5a1e6b",
    sections: [
      { title: "Data & Analytics", items: ["Pandas — DataFrames, filtering, grouping, merging","NumPy basics — arrays, numerical operations","Data visualisation — Matplotlib, Plotly","Working with unstructured data — PDFs, emails, documents"] },
      { title: "Graph & Network Analysis", items: ["Graph theory basics — nodes, edges, paths, centrality","NetworkX — Python graph library","Entity resolution — record linkage, deduplication","Knowledge graphs — Neo4j intro"] },
      { title: "Machine Learning Fundamentals", items: ["Supervised vs unsupervised learning","Classification, clustering, anomaly detection","Scikit-learn — end-to-end ML pipelines","Evaluation — precision, recall, F1, ROC curves"] },
      { title: "Security & Adversarial AI", items: ["Prompt injection attacks and mitigation","AI red-teaming concepts","Bias and fairness in AI systems","EU AI Act, UK regulation, ethics frameworks"] },
    ],
  },
  {
    id: "phase5", label: "Phase 5", title: "Portfolio & Job Readiness", months: "Months 12–18", color: "#1e3d6b",
    sections: [
      { title: "Certifications", items: ["Azure AI Engineer Associate (AI-102)","Azure Developer Associate (AZ-204)","Kaggle — Python, Pandas, ML certs","DeepLearning.AI specialisations"] },
      { title: "Open Source & Community", items: ["Contribute to LangChain or related project","Complete a Kaggle competition","Clean GitHub profile — good READMEs, consistent commits","Attend AI UK or PyData London"] },
      { title: "Interview Preparation", items: ["System design — RAG pipelines, agent systems at scale","LLM questions — RAG vs fine-tuning, hallucination, safety","Python coding — LeetCode easy/medium","Domain Q&A — AI ethics, GDPR, DPIA, bias in policing AI"] },
      { title: "Project Management", items: ["Agile and Scrum fundamentals — sprints, standups, retros","Kanban methodology and WIP limits","Project scoping — requirements, timelines, risk management","Stakeholder communication and reporting","Tools — Jira, Trello, or GitHub Projects"] },
    ],
  },
];

const PROJECTS = [
  { id: "p1",  title: "Two-Way Reporting App",        phase: "Phase 2/3", initStatus: "in-progress" },
  { id: "p2",  title: "Supervisor Toolkit",            phase: "Phase 2",   initStatus: "in-progress" },
  { id: "p3",  title: "Digital Forms & Workflow",      phase: "Phase 2",   initStatus: "not-started" },
  { id: "p4",  title: "Risk Assessment Tool",          phase: "Phase 3",   initStatus: "not-started" },
  { id: "p5",  title: "Document Intelligence Tool",    phase: "Phase 3",   initStatus: "not-started" },
  { id: "p6",  title: "Network / Association Mapper",  phase: "Phase 4",   initStatus: "not-started" },
  { id: "p7",  title: "OSINT Aggregator",              phase: "Phase 4",   initStatus: "not-started" },
  { id: "p8",  title: "Financial Pattern Analysis",    phase: "Phase 4",   initStatus: "not-started" },
  { id: "p9",  title: "Transcription & Analysis Tool", phase: "Phase 4",   initStatus: "not-started" },
  { id: "p10", title: "CCU Dashboard",                 phase: "Phase 4",   initStatus: "not-started" },
  { id: "p11", title: "CCU Case Management System",    phase: "Phase 5",   initStatus: "not-started" },
  { id: "p12", title: "Integrity Assessment Tool",     phase: "Phase 5",   initStatus: "not-started" },
  { id: "p13", title: "Disclosure Management Tool",    phase: "Phase 5",   initStatus: "not-started" },
  { id: "p14", title: "Scenario Training Simulator",   phase: "Phase 5",   initStatus: "not-started" },
  { id: "p15", title: "Secure Briefing Tool",          phase: "Phase 5",   initStatus: "not-started" },
];

const STORAGE_KEY = "d2d-roadmap-state";
const STATUS_CYCLE = { "not-started": "in-progress", "in-progress": "complete", "complete": "not-started" };
const STATUS_STYLE = {
  "not-started": { bg: "#1e1e1e", color: "#555", label: "Not Started" },
  "in-progress":  { bg: "#0d2540", color: "#5ba3e0", label: "In Progress" },
  "complete":     { bg: "#0d2b1e", color: "#4caf82", label: "Complete" },
};

function ProgressBar({ pct, color }) {
  return (
    <div style={{ background: "#222", borderRadius: 99, height: 6, overflow: "hidden", flex: 1 }}>
      <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 99, transition: "width 0.4s ease" }} />
    </div>
  );
}

function Tick({ done, color }) {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: 6, flexShrink: 0, cursor: "pointer",
      border: done ? "none" : "2px solid #383838",
      background: done ? color : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.15s",
    }}>
      {done && (
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default function App() {
  const [checked, setChecked] = useState({});
  const [projStatus, setProjStatus] = useState({});
  const [tab, setTab] = useState("learning");
  const [openPhase, setOpenPhase] = useState("phase1");
  const [openSection, setOpenSection] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setChecked(parsed.checked || {});
        setProjStatus(parsed.projStatus || {});
      }
    } catch (e) {}
    setLoaded(true);
  }, []);

  const persist = useCallback(function(c, p) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ checked: c, projStatus: p }));
    } catch (e) {}
  }, []);

  function toggleItem(key) {
    const next = Object.assign({}, checked, { [key]: !checked[key] });
    setChecked(next);
    persist(next, projStatus);
  }

  function cycleProject(id) {
    const current = projStatus[id] || PROJECTS.find(function(p) { return p.id === id; }).initStatus;
    const next = Object.assign({}, projStatus, { [id]: STATUS_CYCLE[current] });
    setProjStatus(next);
    persist(checked, next);
  }

  function phaseProgress(phase) {
    var keys = [];
    phase.sections.forEach(function(s) {
      s.items.forEach(function(_, i) {
        keys.push(phase.id + "-" + s.title + "-" + i);
      });
    });
    var done = keys.filter(function(k) { return checked[k]; }).length;
    return { done: done, total: keys.length, pct: keys.length ? Math.round(done / keys.length * 100) : 0 };
  }

  var totalItems = 0;
  PHASES.forEach(function(p) { p.sections.forEach(function(s) { totalItems += s.items.length; }); });
  var totalDone = Object.values(checked).filter(Boolean).length;
  var totalPct = Math.round(totalDone / totalItems * 100);

  var projComplete = PROJECTS.filter(function(p) { return (projStatus[p.id] || p.initStatus) === "complete"; }).length;
  var projInProgress = PROJECTS.filter(function(p) { return (projStatus[p.id] || p.initStatus) === "in-progress"; }).length;

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#444", fontFamily: "monospace", fontSize: 13 }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", color: "#e0e0e0", fontFamily: "Georgia, serif", paddingBottom: 60 }}>

      <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #160a28 100%)", borderBottom: "1px solid #1a1a1a", padding: "28px 20px 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#5ba3e0", fontFamily: "monospace", marginBottom: 6 }}>DETECTIVE TO DEVELOPER</div>
          <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>Learning Roadmap</h1>
          <p style={{ margin: "0 0 18px", color: "#555", fontSize: 12 }}>18-Month AI Engineering Programme</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ProgressBar pct={totalPct} color="#5ba3e0" />
            <span style={{ fontSize: 12, color: "#5ba3e0", fontFamily: "monospace", whiteSpace: "nowrap" }}>{totalDone}/{totalItems}</span>
            <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 99, background: "#5ba3e015", border: "1px solid #5ba3e030", color: "#5ba3e0" }}>{totalPct}%</span>
          </div>
        </div>
      </div>

      <div style={{ background: "#0c0c0c", borderBottom: "1px solid #161616" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex" }}>
          {["learning", "projects"].map(function(t) {
            return (
              <button key={t} onClick={function() { setTab(t); }} style={{
                background: "none", border: "none", cursor: "pointer", padding: "13px 22px",
                fontSize: 13, fontFamily: "Georgia, serif",
                color: tab === t ? "#fff" : "#444",
                borderBottom: tab === t ? "2px solid #5ba3e0" : "2px solid transparent",
                transition: "all 0.2s",
              }}>
                {t === "learning" ? "Learning Topics" : "Projects"}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 14px" }}>

        {tab === "learning" && PHASES.map(function(phase) {
          var prog = phaseProgress(phase);
          var isPhaseOpen = openPhase === phase.id;
          return (
            <div key={phase.id} style={{ marginBottom: 10, border: "1px solid #1c1c1c", borderRadius: 12, overflow: "hidden", background: "#0f0f0f" }}>
              <div onClick={function() { setOpenPhase(isPhaseOpen ? null : phase.id); }} style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, background: isPhaseOpen ? "#141414" : "#0f0f0f" }}>
                <div style={{ width: 42, height: 42, borderRadius: 9, background: phase.color, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>PHASE</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{phase.label.split(" ")[1]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{phase.title}</span>
                    <span style={{ fontSize: 11, color: "#444" }}>{phase.months}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ProgressBar pct={prog.pct} color={phase.color} />
                    <span style={{ fontSize: 10, color: "#444", fontFamily: "monospace", whiteSpace: "nowrap" }}>{prog.done}/{prog.total}</span>
                  </div>
                </div>
                <span style={{ color: "#333", fontSize: 18, display: "inline-block", transform: isPhaseOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
              </div>

              {isPhaseOpen && (
                <div style={{ borderTop: "1px solid #181818" }}>
                  {phase.sections.map(function(section) {
                    var sKey = phase.id + "-" + section.title;
                    var isSectionOpen = openSection === sKey;
                    var secDone = section.items.filter(function(_, i) { return checked[phase.id + "-" + section.title + "-" + i]; }).length;
                    return (
                      <div key={section.title} style={{ borderBottom: "1px solid #141414" }}>
                        <div onClick={function() { setOpenSection(isSectionOpen ? null : sKey); }} style={{ padding: "11px 18px 11px 26px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: isSectionOpen ? "#121212" : "transparent" }}>
                          <span style={{ flex: 1, fontSize: 13, color: "#bbb", fontWeight: 600 }}>{section.title}</span>
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: secDone === section.items.length ? "#4caf82" : "#444" }}>{secDone}/{section.items.length}</span>
                          <span style={{ color: "#2a2a2a", fontSize: 14, display: "inline-block", transform: isSectionOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
                        </div>
                        {isSectionOpen && (
                          <div style={{ padding: "2px 18px 10px 26px" }}>
                            {section.items.map(function(item, i) {
                              var key = phase.id + "-" + section.title + "-" + i;
                              var done = !!checked[key];
                              return (
                                <div key={i} onClick={function() { toggleItem(key); }} style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "8px 0", cursor: "pointer", borderBottom: i < section.items.length - 1 ? "1px solid #141414" : "none" }}>
                                  <div style={{ paddingTop: 1 }}><Tick done={done} color={phase.color} /></div>
                                  <span style={{ fontSize: 13, lineHeight: 1.5, color: done ? "#3a3a3a" : "#aaa", textDecoration: done ? "line-through" : "none", transition: "all 0.2s" }}>{item}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {tab === "projects" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              {[
                { label: "Complete",    count: projComplete,                                    color: "#4caf82", bg: "#0d2b1e" },
                { label: "In Progress", count: projInProgress,                                  color: "#5ba3e0", bg: "#0d2540" },
                { label: "Remaining",   count: PROJECTS.length - projComplete - projInProgress, color: "#555",    bg: "#181818" },
              ].map(function(s) {
                return (
                  <div key={s.label} style={{ background: s.bg, border: "1px solid " + s.color + "25", borderRadius: 10, padding: "10px 16px", flex: 1, minWidth: 90 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.count}</div>
                    <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 10, color: "#333", marginBottom: 10, fontFamily: "monospace", letterSpacing: 1 }}>TAP TO CYCLE STATUS</div>
            {PROJECTS.map(function(project, i) {
              var status = projStatus[project.id] || project.initStatus;
              var st = STATUS_STYLE[status];
              return (
                <div key={project.id} onClick={function() { cycleProject(project.id); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", marginBottom: 7, background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: 10, cursor: "pointer" }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: "#181818", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#333", fontFamily: "monospace", flexShrink: 0 }}>
                    {(i + 1) < 10 ? "0" + (i + 1) : "" + (i + 1)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: status === "complete" ? "#3a3a3a" : "#ccc", fontWeight: 500 }}>{project.title}</div>
                    <div style={{ fontSize: 11, color: "#333", marginTop: 2 }}>{project.phase}</div>
                  </div>
                  <div style={{ padding: "3px 10px", borderRadius: 99, background: st.bg, color: st.color, fontSize: 11, border: "1px solid " + st.color + "30", whiteSpace: "nowrap" }}>
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
