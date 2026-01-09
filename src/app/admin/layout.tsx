import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-border border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-foreground text-xl">Admin Panel</h1>
            <a
              className="text-muted-foreground text-sm hover:text-foreground"
              href="/"
            >
              ← Back to Public Site
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
