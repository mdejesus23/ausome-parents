'use client';

import Button from '../../button';
import { DeletePost } from '@/app/_ui/admin/posts/delete-post';

export default function ConfirmDelete({
  id,
  resourceName = 'Post',
  onCloseModal,
}: {
  id: string;
  resourceName?: string;
  onCloseModal?: () => void;
}) {
  return (
    <div className="flex w-full max-w-[90vw] flex-col items-center justify-center gap-3 p-4 sm:p-6 md:p-8">
      <h1 className="font-headfont text-center text-lg sm:text-xl md:text-2xl">
        Delete {resourceName}
      </h1>

      <p className="mb-3 text-center text-sm text-gray-500 sm:text-base">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onCloseModal}>
          Cancel
        </Button>

        <DeletePost id={id} />
      </div>
    </div>
  );
}
