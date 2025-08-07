'use client';

import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function FilterPost() {
  const searchParams = useSearchParams(); // searchParams is read-only / immutable
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  function handleResetFilter() {
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-text-secondary mb-6 text-xl font-bold">
          Filter Posts
        </h2>

        {/* Search */}
        <div className="mb-6">
          <label
            htmlFor="search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
            placeholder="Search posts..."
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>

        {/* Date Range Filter */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Date Range
          </label>

          <div>
            <label
              htmlFor="from-date"
              className="mb-1 block text-xs text-gray-500"
            >
              From
            </label>
            <input
              type="date"
              id="from-date"
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="to-date"
              className="mb-1 block text-xs text-gray-500"
            >
              To
            </label>
            <input
              type="date"
              id="to-date"
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={handleResetFilter}
          id="reset-filters"
          className="mt-6 w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
