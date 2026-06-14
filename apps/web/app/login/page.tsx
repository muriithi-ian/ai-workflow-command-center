import Link from "next/link";

const demoRoles = [
  {
    name: "Admin",
    email: "demo.admin@example.com",
    permissions: ["Dashboard metrics", "Document processing", "Audit log access"]
  },
  {
    name: "Reviewer",
    email: "demo.reviewer@example.com",
    permissions: ["Review queue", "Approve/reject outputs", "Source-grounded decisions"]
  }
];

export default function LoginPage() {
  return (
    <main className="shell min-h-screen">
      <section className="hero" aria-labelledby="login-title">
        <p className="eyebrow">Demo authentication</p>
        <h1 id="login-title">Role-aware access scaffold</h1>
        <p className="lede">
          The public portfolio demo uses a safe mock session while Supabase Auth is wired in later.
          No passwords, tokens, or private credentials are required for this scaffold.
        </p>
        <Link className="button-link" href="/dashboard">
          Continue as Demo Admin
        </Link>
      </section>

      <section className="auth-grid" aria-label="Demo role accounts">
        {demoRoles.map((role) => (
          <article className="panel" key={role.name}>
            <div className="panel-heading">
              <h2>{role.name}</h2>
              <span className="status-badge">Demo role</span>
            </div>
            <p className="muted-copy">{role.email}</p>
            <ul className="clean-list">
              {role.permissions.map((permission) => (
                <li key={permission}>{permission}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="panel" aria-labelledby="auth-next-title">
        <h2 id="auth-next-title">Next auth milestone</h2>
        <p className="muted-copy">
          Replace the mock session with Supabase Auth, persist roles in the database, and enforce
          reviewer/admin checks from the FastAPI backend.
        </p>
      </section>
    </main>
  );
}
