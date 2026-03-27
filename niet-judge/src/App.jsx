import { useState } from "react";

const sections = [
  { id: "stack", label: "Tech Stack" },
  { id: "auth", label: "ERP Auth" },
  { id: "schema", label: "DB Schema" },
  { id: "judge", label: "Judge Engine" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "roadmap", label: "Roadmap" },
];

const CodeBlock = ({ code, lang = "text" }) => (
  <pre style={{
    background: "#0d1117", border: "1px solid #30363d", borderRadius: 8,
    padding: "16px 20px", overflowX: "auto", fontSize: 13, lineHeight: 1.7,
    color: "#e6edf3", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", margin: "12px 0"
  }}>
    <code>{code}</code>
  </pre>
);

const Badge = ({ children, color = "#238636" }) => (
  <span style={{
    background: color + "22", color, border: `1px solid ${color}44`,
    borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700,
    letterSpacing: 0.5, textTransform: "uppercase", marginRight: 6
  }}>{children}</span>
);

const Card = ({ title, icon, children, accent = "#58a6ff" }) => (
  <div style={{
    background: "#161b22", border: `1px solid #30363d`, borderRadius: 12,
    padding: "20px 24px", marginBottom: 20,
    borderLeft: `3px solid ${accent}`
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <h3 style={{ color: "#e6edf3", fontSize: 16, fontWeight: 700, margin: 0 }}>{title}</h3>
    </div>
    {children}
  </div>
);

const Step = ({ num, title, children }) => (
  <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
    <div style={{
      minWidth: 36, height: 36, borderRadius: "50%",
      background: "linear-gradient(135deg, #238636, #2ea043)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0
    }}>{num}</div>
    <div>
      <div style={{ color: "#e6edf3", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "#8b949e", fontSize: 14, lineHeight: 1.7 }}>{children}</div>
    </div>
  </div>
);

const Flow = ({ steps }) => (
  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, margin: "16px 0" }}>
    {steps.map((s, i) => (
      <>
        <div key={i} style={{
          background: "#21262d", border: "1px solid #30363d", borderRadius: 8,
          padding: "8px 14px", color: "#e6edf3", fontSize: 13, fontWeight: 600
        }}>{s}</div>
        {i < steps.length - 1 && <span style={{ color: "#58a6ff", fontSize: 18, fontWeight: 700 }}>→</span>}
      </>
    ))}
  </div>
);

const TableSchema = ({ name, fields, accent }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{
      background: accent + "22", border: `1px solid ${accent}44`,
      borderRadius: "8px 8px 0 0", padding: "8px 16px",
      color: accent, fontWeight: 700, fontSize: 13, fontFamily: "monospace"
    }}>📋 {name}</div>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#21262d" }}>
          {["Column", "Type", "Notes"].map(h => (
            <th key={h} style={{
              padding: "8px 12px", textAlign: "left", color: "#8b949e",
              fontSize: 12, fontWeight: 600, borderBottom: "1px solid #30363d"
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fields.map(([col, type, note], i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "#161b22" : "#0d1117" }}>
            <td style={{ padding: "7px 12px", color: "#e6edf3", fontSize: 13, fontFamily: "monospace" }}>{col}</td>
            <td style={{ padding: "7px 12px", color: "#79c0ff", fontSize: 12, fontFamily: "monospace" }}>{type}</td>
            <td style={{ padding: "7px 12px", color: "#8b949e", fontSize: 12 }}>{note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function App() {
  const [active, setActive] = useState("stack");

  const content = {
    stack: (
      <div>
        <p style={{ color: "#8b949e", fontSize: 15, marginBottom: 24, lineHeight: 1.8 }}>
          A production-ready, scalable architecture designed for 5,000+ NIET students — built for performance, security, and developer velocity.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
          {[
            { layer: "Frontend", icon: "🖥️", stack: "React 18 + TypeScript", detail: "Vite build, Monaco Editor (VS Code engine) for code input, Tailwind CSS, React Query for data fetching", accent: "#58a6ff" },
            { layer: "Backend API", icon: "⚙️", stack: "Node.js + Express / NestJS", detail: "REST + WebSocket (Socket.io) for real-time verdicts. JWT auth + ERP integration middleware.", accent: "#3fb950" },
            { layer: "Judge Service", icon: "🔒", stack: "Python FastAPI + Docker SDK", detail: "Isolated microservice. Spawns Docker containers per submission. Enforces CPU/memory/time limits.", accent: "#f78166" },
            { layer: "Database", icon: "🗄️", stack: "PostgreSQL + Redis", detail: "PostgreSQL for persistent data (users, problems, submissions). Redis for leaderboard (Sorted Sets) & job queues.", accent: "#d2a8ff" },
            { layer: "Queue", icon: "📨", stack: "Bull (Redis-backed)", detail: "Submission queue to handle traffic spikes gracefully. Workers pull jobs and dispatch to Docker sandbox.", accent: "#ffa657" },
            { layer: "DevOps", icon: "🚀", stack: "Docker Compose / K8s", detail: "Containerized deployment. Nginx reverse proxy. CI/CD with GitHub Actions. Monitoring via Prometheus + Grafana.", accent: "#79c0ff" },
          ].map(({ layer, icon, stack, detail, accent }) => (
            <div key={layer} style={{
              background: "#161b22", border: `1px solid #30363d`,
              borderTop: `3px solid ${accent}`, borderRadius: 10, padding: "18px 20px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span>{icon}</span>
                <span style={{ color: accent, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>{layer}</span>
              </div>
              <div style={{ color: "#e6edf3", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{stack}</div>
              <div style={{ color: "#8b949e", fontSize: 13, lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </div>

        <Card title="Why This Stack?" icon="💡" accent="#ffa657">
          <div style={{ color: "#8b949e", fontSize: 14, lineHeight: 1.8 }}>
            <strong style={{ color: "#e6edf3" }}>NestJS</strong> provides enterprise-grade structure (decorators, DI, modules) familiar to Spring Boot devs — ideal for a growing student team.
            {" "}<strong style={{ color: "#e6edf3" }}>FastAPI</strong> for the judge is Python-native so Docker SDK integration is seamless.
            {" "}<strong style={{ color: "#e6edf3" }}>Redis Sorted Sets</strong> make real-time leaderboard ranking O(log N) — instant.
            {" "}<strong style={{ color: "#e6edf3" }}>Monaco Editor</strong> gives users VS Code-quality syntax highlighting and autocomplete for free.
          </div>
        </Card>
      </div>
    ),

    auth: (
      <div>
        <p style={{ color: "#8b949e", fontSize: 15, marginBottom: 20, lineHeight: 1.8 }}>
          The platform must be <strong style={{ color: "#e6edf3" }}>exclusively accessible to NIET students</strong>. Three strategies are provided in order of preference:
        </p>

        {[
          {
            title: "Strategy 1 (Best): ERP OAuth2 / SAML Bridge", accent: "#3fb950",
            badge: "RECOMMENDED",
            desc: "Ask NIET's IT department if the ERP supports OAuth2 or SAML. Most modern ERPs (Fedena, EduNxt, MasterSoft) do. Your platform acts as an OAuth2 client.",
            flow: ["User clicks 'Login with NIET ERP'", "Redirect to ERP /authorize", "User enters ERP creds", "ERP redirects back with auth code", "Exchange code for JWT", "Create/sync local user record"],
          },
          {
            title: "Strategy 2: LDAP / Active Directory", accent: "#58a6ff",
            badge: "COMMON",
            desc: "If the college uses Microsoft AD or OpenLDAP (very common), bind to the LDAP server directly using the student's enrollment number + password.",
            flow: ["Student submits enrollment + password", "Backend binds to LDAP server", "LDAP validates credentials", "Fetch cn, mail, department attributes", "Issue platform JWT"],
          },
          {
            title: "Strategy 3: ERP API Proxy (Fallback)", accent: "#ffa657",
            badge: "FALLBACK",
            desc: "If no LDAP/OAuth exists, build a thin proxy that POSTs credentials to the ERP's login endpoint and validates the session response. Requires coordination with IT.",
            flow: ["User submits credentials", "Backend proxies POST to ERP", "Parse ERP response (200 = valid)", "Issue platform JWT", "Cache validity for 1 hour"],
          },
        ].map(({ title, accent, badge, desc, flow }) => (
          <Card key={title} title={title} icon="🔐" accent={accent}>
            <Badge color={accent}>{badge}</Badge>
            <p style={{ color: "#8b949e", fontSize: 14, margin: "10px 0", lineHeight: 1.7 }}>{desc}</p>
            <Flow steps={flow} />
          </Card>
        ))}

        <Card title="JWT Payload After Authentication" icon="🎫" accent="#d2a8ff">
          <CodeBlock code={`{
  "sub": "2021BTCS001",          // Enrollment number
  "name": "Aryan Sharma",
  "email": "aryan@niet.co.in",
  "branch": "CSE",
  "year": 3,
  "role": "student",             // or "admin", "faculty"
  "iat": 1720000000,
  "exp": 1720086400              // 24h expiry
}`} />
        </Card>
      </div>
    ),

    schema: (
      <div>
        <p style={{ color: "#8b949e", fontSize: 15, marginBottom: 20, lineHeight: 1.8 }}>
          PostgreSQL schema designed for the full DSA curriculum with topic hierarchy, multi-language support, and efficient submission tracking.
        </p>

        <TableSchema name="users" accent="#58a6ff" fields={[
          ["id", "UUID PK", "Primary key"],
          ["enrollment_no", "VARCHAR(20) UNIQUE", "From ERP — e.g. 2021BTCS001"],
          ["name", "VARCHAR(100)", "Full name"],
          ["email", "VARCHAR(100) UNIQUE", "NIET email"],
          ["branch", "VARCHAR(10)", "CSE, IT, ECE..."],
          ["year", "SMALLINT", "1–4"],
          ["role", "ENUM", "'student' | 'admin' | 'faculty'"],
          ["rating", "INTEGER DEFAULT 0", "Computed score"],
          ["problems_solved", "INTEGER DEFAULT 0", "Cached count"],
          ["created_at", "TIMESTAMPTZ", "Account creation"],
        ]} />

        <TableSchema name="topics" accent="#3fb950" fields={[
          ["id", "SERIAL PK", ""],
          ["name", "VARCHAR(50)", "e.g. 'Arrays', 'Graphs'"],
          ["category", "ENUM", "'linear' | 'non_linear'"],
          ["slug", "VARCHAR(50) UNIQUE", "URL-safe identifier"],
          ["order_index", "SMALLINT", "Display order"],
        ]} />

        <TableSchema name="problems" accent="#ffa657" fields={[
          ["id", "UUID PK", ""],
          ["title", "VARCHAR(200)", "Problem title"],
          ["slug", "VARCHAR(200) UNIQUE", "URL slug"],
          ["topic_id", "FK → topics.id", ""],
          ["difficulty", "ENUM", "'easy' | 'medium' | 'hard'"],
          ["description", "TEXT", "Markdown content"],
          ["constraints", "TEXT", "Time/memory limits text"],
          ["time_limit_ms", "INTEGER DEFAULT 2000", "Per test case"],
          ["memory_limit_mb", "INTEGER DEFAULT 256", "Per test case"],
          ["score", "INTEGER", "10 / 30 / 60 for E/M/H"],
          ["is_published", "BOOLEAN", "Draft vs live"],
          ["created_by", "FK → users.id", "Admin who created it"],
        ]} />

        <TableSchema name="test_cases" accent="#d2a8ff" fields={[
          ["id", "UUID PK", ""],
          ["problem_id", "FK → problems.id", ""],
          ["input", "TEXT", "Stored encrypted or on disk"],
          ["expected_output", "TEXT", ""],
          ["is_sample", "BOOLEAN", "Visible to user if true"],
          ["order_index", "SMALLINT", "Evaluation order"],
        ]} />

        <TableSchema name="submissions" accent="#f78166" fields={[
          ["id", "UUID PK", ""],
          ["user_id", "FK → users.id", ""],
          ["problem_id", "FK → problems.id", ""],
          ["language", "ENUM", "'python' | 'cpp' | 'java'"],
          ["code", "TEXT", "User's submitted code"],
          ["verdict", "ENUM", "AC / WA / TLE / MLE / RE / CE"],
          ["score", "INTEGER", "0 or problem score"],
          ["exec_time_ms", "INTEGER", "Max across test cases"],
          ["memory_used_mb", "INTEGER", "Max across test cases"],
          ["test_results", "JSONB", "[{case_id, verdict, time}...]"],
          ["submitted_at", "TIMESTAMPTZ", ""],
        ]} />

        <Card title="DSA Topic Seed Data" icon="🌱" accent="#3fb950">
          <CodeBlock code={`INSERT INTO topics (name, category, order_index) VALUES
  ('Arrays',        'linear',      1),
  ('Linked Lists',  'linear',      2),
  ('Stacks',        'linear',      3),
  ('Queues',        'linear',      4),
  ('Trees',         'non_linear',  5),
  ('Graphs',        'non_linear',  6),
  ('Heaps',         'non_linear',  7),
  ('Hashing',       'non_linear',  8);`} />
        </Card>
      </div>
    ),

    judge: (
      <div>
        <p style={{ color: "#8b949e", fontSize: 15, marginBottom: 20, lineHeight: 1.8 }}>
          The judge engine is the most critical component. Every submission runs in a <strong style={{ color: "#e6edf3" }}>fresh, isolated Docker container</strong> that is destroyed after execution — preventing any persistence, network access, or system manipulation.
        </p>

        <Card title="Full Execution Workflow" icon="⚡" accent="#58a6ff">
          <Flow steps={[
            "User writes code in Monaco Editor",
            "POST /submit → API Server",
            "Validate & save submission (pending)",
            "Push job to Bull Queue",
            "Judge Worker picks job",
            "Spawn Docker container",
            "Run against each test case",
            "Collect results",
            "Update DB verdict",
            "WebSocket pushes result to browser"
          ]} />
        </Card>

        <Card title="Docker Sandbox — Security Constraints" icon="🔒" accent="#f78166">
          <CodeBlock code={`// judge-worker/src/runner.ts
import Docker from 'dockerode';

const docker = new Docker();

async function runInSandbox(code: string, language: string, testCase: TestCase) {
  const image = {
    python: 'python:3.11-alpine',
    cpp:    'gcc:12-alpine',
    java:   'eclipse-temurin:17-alpine'
  }[language];

  const container = await docker.createContainer({
    Image: image,
    Cmd: getRunCommand(language),       // e.g. ['python3', 'solution.py']
    AttachStdout: true,
    AttachStderr: true,
    HostConfig: {
      Memory: 256 * 1024 * 1024,        // 256 MB hard limit
      CpuQuota: 50000,                  // 50% of 1 CPU core
      NetworkMode: 'none',              // ❌ No internet access
      ReadonlyRootfs: true,             // ❌ No filesystem writes
      SecurityOpt: ['no-new-privileges'],
      PidsLimit: 64,                    // ❌ No fork bombs
      Ulimits: [{ Name: 'nofile', Soft: 64, Hard: 64 }],
    },
    WorkingDir: '/sandbox',
    // Code + input injected via bind mount from temp dir
    Binds: [\`\${tempDir}:/sandbox:ro\`],
  });

  await container.start();

  // Race: execution vs timeout
  const result = await Promise.race([
    collectOutput(container),
    timeout(problemTimeLimitMs).then(() => ({ verdict: 'TLE' }))
  ]);

  await container.remove({ force: true });   // Always clean up
  return result;
}`} />
        </Card>

        <Card title="Verdict Decision Logic" icon="⚖️" accent="#3fb950">
          <CodeBlock code={`function getVerdict(result, expected, timeTaken, memUsed, limits) {
  if (result.compileError)              return 'CE';  // Compile Error
  if (result.runtimeError)             return 'RE';  // Runtime Error  
  if (timeTaken > limits.time_ms)      return 'TLE'; // Time Limit Exceeded
  if (memUsed > limits.memory_mb)      return 'MLE'; // Memory Limit Exceeded
  if (result.stdout.trim() !== expected.trim()) return 'WA'; // Wrong Answer
  return 'AC'; // Accepted ✅
}`} />
        </Card>

        <Card title="Supported Languages — Docker Images" icon="🐳" accent="#d2a8ff">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { lang: "Python 3", image: "python:3.11-alpine", run: "python3 solution.py" },
              { lang: "C++ 17", image: "gcc:12-alpine", run: "g++ -O2 -o sol sol.cpp && ./sol" },
              { lang: "Java 17", image: "eclipse-temurin:17-alpine", run: "javac Main.java && java Main" },
            ].map(({ lang, image, run }) => (
              <div key={lang} style={{ background: "#0d1117", border: "1px solid #30363d", borderRadius: 8, padding: 14 }}>
                <div style={{ color: "#e6edf3", fontWeight: 700, marginBottom: 6 }}>{lang}</div>
                <div style={{ color: "#79c0ff", fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>{image}</div>
                <div style={{ color: "#8b949e", fontSize: 11, fontFamily: "monospace" }}>{run}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    ),

    leaderboard: (
      <div>
        <p style={{ color: "#8b949e", fontSize: 15, marginBottom: 20, lineHeight: 1.8 }}>
          A real-time ranking system using <strong style={{ color: "#e6edf3" }}>Redis Sorted Sets</strong> for O(log N) rank queries, with a comprehensive scoring formula.
        </p>

        <Card title="Scoring Formula" icon="🏆" accent="#ffa657">
          <CodeBlock code={`// Weighted scoring system
const DIFFICULTY_WEIGHTS = { easy: 10, medium: 30, hard: 60 };

// Base score per problem
score = DIFFICULTY_WEIGHTS[difficulty];

// Penalty for wrong attempts before AC
// (inspired by ICPC-style scoring)
penalty = wrong_attempts_before_ac * 5;  // -5 per WA

// Speed bonus: if solved within contest time
speed_bonus = max(0, (time_limit - time_taken_mins) / time_limit * 10);

// Final score added to user's total
final_score = score - penalty + speed_bonus;`} />
        </Card>

        <Card title="Redis Leaderboard Implementation" icon="⚡" accent="#3fb950">
          <CodeBlock code={`import { redis } from './redis';

const LEADERBOARD_KEY = 'niet:leaderboard:global';

// Called after every Accepted submission
async function updateLeaderboard(userId: string, scoreToAdd: number) {
  await redis.zincrby(LEADERBOARD_KEY, scoreToAdd, userId);
}

// Get top 50 students (0-indexed)
async function getTopStudents(limit = 50) {
  const entries = await redis.zrevrange(
    LEADERBOARD_KEY, 0, limit - 1, 'WITHSCORES'
  );
  // Hydrate with user details from PostgreSQL
  return hydrateUsers(entries);
}

// Get a student's rank (1-indexed)
async function getUserRank(userId: string) {
  const rank = await redis.zrevrank(LEADERBOARD_KEY, userId);
  return rank !== null ? rank + 1 : null;
}

// Branch-wise leaderboard (e.g. CSE only)
const BRANCH_KEY = (branch: string) => \`niet:leaderboard:branch:\${branch}\`;`} />
        </Card>

        <Card title="Leaderboard Tiers" icon="🥇" accent="#d2a8ff">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
            {[
              { tier: "🥇 Grand Master", range: "Top 1%", color: "#ffa657" },
              { tier: "🥈 Master", range: "Top 5%", color: "#8b949e" },
              { tier: "🥉 Expert", range: "Top 15%", color: "#79c0ff" },
              { tier: "🔵 Specialist", range: "Top 35%", color: "#3fb950" },
              { tier: "⚪ Pupil", range: "Rest", color: "#6e7681" },
            ].map(({ tier, range, color }) => (
              <div key={tier} style={{
                background: color + "11", border: `1px solid ${color}33`,
                borderRadius: 8, padding: "12px 14px", textAlign: "center"
              }}>
                <div style={{ color, fontWeight: 700, fontSize: 13 }}>{tier}</div>
                <div style={{ color: "#8b949e", fontSize: 12, marginTop: 4 }}>{range}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Real-time Updates via WebSocket" icon="📡" accent="#58a6ff">
          <CodeBlock code={`// server: emit after leaderboard update
io.emit('leaderboard:updated', { 
  topChanges: [...],  // Only changed entries 
  timestamp: Date.now() 
});

// client: React hook
function useLeaderboard() {
  const [board, setBoard] = useState([]);
  useEffect(() => {
    socket.on('leaderboard:updated', ({ topChanges }) => {
      setBoard(prev => mergeChanges(prev, topChanges));
    });
    return () => socket.off('leaderboard:updated');
  }, []);
  return board;
}`} />
        </Card>
      </div>
    ),

    roadmap: (
      <div>
        <p style={{ color: "#8b949e", fontSize: 15, marginBottom: 24, lineHeight: 1.8 }}>
          A realistic 6-phase roadmap for a team of 2–4 student developers. Total estimated time: <strong style={{ color: "#e6edf3" }}>16–20 weeks</strong>.
        </p>

        {[
          {
            phase: "Phase 1", title: "Foundation & Auth (Weeks 1–2)", accent: "#58a6ff",
            steps: [
              ["Setup monorepo", "Create /frontend (React + Vite), /backend (NestJS), /judge (FastAPI) with Docker Compose orchestrating all services."],
              ["Database setup", "PostgreSQL with Prisma ORM. Run migrations for users, topics, problems, test_cases, submissions tables."],
              ["ERP Authentication", "Implement LDAP bind or OAuth2 flow. Issue JWTs. Protect all API routes with auth middleware."],
              ["Basic UI shell", "Login page, dashboard layout, nav with topic sidebar. Monaco Editor integration."],
            ]
          },
          {
            phase: "Phase 2", title: "Problem Management (Weeks 3–5)", accent: "#3fb950",
            steps: [
              ["Admin panel", "CRUD interface for problems — rich markdown editor, difficulty selection, topic assignment, set time/memory limits."],
              ["Test case manager", "Upload bulk test cases (input/output pairs). Mark sample vs hidden. Validate format."],
              ["Problem viewer", "Student-facing problem page: description, constraints, sample I/O, code editor with language selector."],
            ]
          },
          {
            phase: "Phase 3", title: "Judge Engine (Weeks 6–9)", accent: "#f78166",
            steps: [
              ["Docker sandbox", "Build the FastAPI judge service. Test Python, C++, Java containers with security constraints from the schema section."],
              ["Bull queue integration", "Connect backend submission endpoint → Redis queue → judge worker. Handle job states: pending/running/done/failed."],
              ["Verdict pipeline", "Implement CE/RE/TLE/MLE/WA/AC logic. Store per-test-case results as JSONB. Update submission record."],
              ["WebSocket results", "Real-time verdict push to the submitting user's browser using Socket.io rooms."],
            ]
          },
          {
            phase: "Phase 4", title: "Leaderboard & Profiles (Weeks 10–12)", accent: "#ffa657",
            steps: [
              ["Redis leaderboard", "Implement sorted set updates on every AC. Build global + branch-wise boards. Add rank computation."],
              ["User profile page", "Solved problems heatmap (GitHub-style), topic-wise progress bars, submission history, current rank badge."],
              ["Scoring system", "Implement weighted difficulty scoring + WA penalties. Backfill historical submissions."],
            ]
          },
          {
            phase: "Phase 5", title: "Polish & Contests (Weeks 13–15)", accent: "#d2a8ff",
            steps: [
              ["Contest module", "Time-bounded contest with its own leaderboard. Freeze standings in last hour (ICPC style)."],
              ["Notifications", "Email + in-app notifications for: contest starting, new problems, rank changes."],
              ["Code plagiarism", "Integrate MOSS or custom token-based similarity detection for contest submissions."],
            ]
          },
          {
            phase: "Phase 6", title: "Deployment & Hardening (Weeks 16–18)", accent: "#79c0ff",
            steps: [
              ["Production Docker Compose", "Nginx reverse proxy + SSL (Let's Encrypt). Separate Docker networks for judge isolation."],
              ["Monitoring", "Prometheus metrics + Grafana dashboards for: queue depth, container spawn time, p95 latency."],
              ["Load testing", "Use k6 to simulate 500 concurrent submissions. Tune worker concurrency and container pool."],
              ["Security audit", "Rate limiting, input sanitization, SQL injection prevention (Prisma handles this), OWASP checklist."],
            ]
          },
        ].map(({ phase, title, accent, steps }) => (
          <div key={phase} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Badge color={accent}>{phase}</Badge>
              <span style={{ color: "#e6edf3", fontWeight: 700, fontSize: 16 }}>{title}</span>
            </div>
            {steps.map(([title, desc], i) => (
              <Step key={i} num={i + 1} title={title}>{desc}</Step>
            ))}
          </div>
        ))}

        <Card title="Recommended Learning Resources" icon="📚" accent="#3fb950">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {[
              "NestJS Official Docs — architecture patterns",
              "Docker SDK for Python — sandbox control",
              "Prisma ORM — type-safe DB queries",
              "Bull/BullMQ — Redis job queues",
              "Socket.io — real-time communication",
              "Monaco Editor React — code editor integration",
              "Redis ZADD/ZREVRANK — sorted set ops",
              "Codeforces Judge — open source reference",
            ].map(r => (
              <div key={r} style={{
                background: "#0d1117", border: "1px solid #30363d",
                borderRadius: 6, padding: "8px 12px",
                color: "#8b949e", fontSize: 12
              }}>📖 {r}</div>
            ))}
          </div>
        </Card>
      </div>
    ),
  };

  return (
    <div style={{
      background: "#0d1117", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e6edf3"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #161b22 0%, #0d1117 100%)",
        borderBottom: "1px solid #30363d", padding: "32px 40px 24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 28 }}>⚔️</span>
          <h1 style={{
            margin: 0, fontSize: 26, fontWeight: 800,
            background: "linear-gradient(90deg, #58a6ff, #3fb950)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>NIET Online Judge — System Blueprint</h1>
        </div>
        <p style={{ color: "#8b949e", margin: 0, fontSize: 14 }}>
          Full-stack architecture design for a college-exclusive competitive programming platform
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          <Badge color="#58a6ff">React + NestJS</Badge>
          <Badge color="#3fb950">Docker Sandbox</Badge>
          <Badge color="#ffa657">PostgreSQL + Redis</Badge>
          <Badge color="#d2a8ff">WebSocket Real-time</Badge>
          <Badge color="#f78166">ERP Auth</Badge>
        </div>
      </div>

      {/* Nav */}
      <div style={{
        display: "flex", gap: 2, padding: "0 40px",
        borderBottom: "1px solid #30363d", background: "#161b22",
        overflowX: "auto"
      }}>
        {sections.map(({ id, label }) => (
          <button key={id} onClick={() => setActive(id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "14px 18px", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap",
            color: active === id ? "#58a6ff" : "#8b949e",
            borderBottom: active === id ? "2px solid #58a6ff" : "2px solid transparent",
            transition: "all 0.15s"
          }}>{label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "32px 40px", maxWidth: 900 }}>
        {content[active]}
      </div>
    </div>
  );
}