'use client';

export default function AdminPanel() {
  return (
    <section className="mx-auto mb-20 w-full max-w-4xl px-4">
      <h2 className="mb-6 text-2xl font-semibold">Welcome, Admin!</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl border p-4 shadow-sm">
          <h3 className="text-text-secondary mb-2 text-lg font-medium">
            Manage Users
          </h3>
          <p className="text-text-secondary text-sm">
            View and edit user roles, activity, and access.
          </p>
        </div>
        <div className="rounded-xl border p-4 shadow-sm">
          <h3 className="text-text-secondary mb-2 text-lg font-medium">
            Themes & Readings
          </h3>
          <p className="text-text-secondary text-sm">
            Create, update, or delete theme-related content.
          </p>
        </div>
        <div className="rounded-xl border p-4 shadow-sm">
          <h3 className="text-text-secondary mb-2 text-lg font-medium">
            Site Settings
          </h3>
          <p className="text-text-secondary text-sm">
            Customize SEO, layout, and feature toggles.
          </p>
        </div>
        <div className="rounded-xl border p-4 shadow-sm">
          <h3 className="text-text-secondary mb-2 text-lg font-medium">
            Newsletter
          </h3>
          <p className="text-text-secondary text-sm">
            Send updates or view subscribers.
          </p>
        </div>
      </div>
    </section>
  );
}
