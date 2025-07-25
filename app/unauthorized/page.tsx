import Link from 'next/link';

// /app/unauthorized/page.tsx (App Router)
export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4">You do not have permission to view this page.</p>
      <Link
        href="/"
        className="mx-auto max-w-[20rem] rounded-md border-blue-600 bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm text-white shadow-lg hover:border-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:ring-blue-500 active:from-blue-800 active:to-blue-900"
      >
        Go back home
      </Link>
    </div>
  );
}
