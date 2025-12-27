export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Kameleon</h1>
      <p className="text-muted-foreground">
        Your PRD authoring assistant that adapts to reviewer preferences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <DashboardCard
          title="Documents"
          description="Create and manage your PRDs"
          href="/documents"
        />
        <DashboardCard
          title="Personas"
          description="Configure reviewer profiles"
          href="/personas"
        />
        <DashboardCard
          title="Templates"
          description="Manage document templates"
          href="/templates"
        />
        <DashboardCard
          title="Axioms"
          description="Set your writing principles"
          href="/axioms"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block p-6 bg-card rounded-lg border hover:border-primary transition-colors"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  );
}
