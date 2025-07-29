'use client';

import { useState } from 'react';
import QuillEditor from '@/app/_ui/admin/posts/quill-editor';
import { useFormStatus } from 'react-dom';
import Button from '../../button';
import type { Tag } from '@/types';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : <>Create Post</>}
    </Button>
  );
}

export default function CreatePostForm({ tags }: { tags: Tag[] }) {
  const [content, setContent] = useState<string>('');

  return (
    <form className="mx-auto flex max-w-4xl flex-col gap-6">
      <input
        type="text"
        name="title"
        placeholder="Post Title"
        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
        required
      />

      <input
        type="text"
        name="slug"
        placeholder="Slug"
        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
        required
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
      />

      <textarea
        name="description"
        placeholder="Short Description"
        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
      />
      <div>
        <p className="mb-2 font-medium">Select Tags (Multiple)</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="tags[]"
                value={tag.id}
                className="text-primary-600 focus:ring-primary-500 h-4 w-4 border-gray-300"
              />
              {tag.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">Post Content</label>
        <QuillEditor value={content} onChange={setContent} />
        {/* Hidden input to pass the HTML to server action */}
        <input type="hidden" name="content" value={content} />
      </div>

      <SubmitButton />
    </form>
  );
}
