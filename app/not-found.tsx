import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <p className="mb-6 text-xl text-gray-600">
        Sorry, the page you&apos;re looking for does not exist.
      </p>

      <Link
        href="/"
        className="rounded bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700"
      >
        Go back home
      </Link>
    </main>
  );
}
