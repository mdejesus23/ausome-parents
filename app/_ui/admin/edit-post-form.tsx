'use client';

import { useState, useEffect } from 'react';
import QuillEditor from '@/app/_ui/admin/quill-editor';
import { useFormStatus } from 'react-dom';
import Button from '../button';
import type { Tag, Post } from '@/types';
import { CldUploadWidget } from 'next-cloudinary';
import { Image as ImageIcon } from 'lucide-react';
import { updatePost, State } from '@/app/_lib/posts/action';
import { useActionState } from 'react';
import slugify from '@/app/_utils/slugify';
import { toast } from 'react-hot-toast';

import Image from 'next/image';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : <>Save Post</>}
    </Button>
  );
}

export default function EditPostForm({
  tags,
  post,
}: {
  tags: Tag[];
  post: Post;
}) {
  const [content, setContent] = useState<string>(post.content || '');
  const [image, setImage] = useState<string>(post.image || '');
  const [slug, setSlug] = useState<string>(post.slug || '');

  const updatePostWithId = updatePost.bind(null, post.id);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updatePostWithId, initialState);

  useEffect(() => {
    if (state.message === null) return;

    if (!state.errors && state.message) {
      toast.success(state.message);
    } else if (state.errors && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="mx-auto flex max-w-4xl flex-col gap-6">
      {/* title field  */}
      <div>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          defaultValue={post.title}
          className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
          aria-describedby="title-error"
          onChange={(e) => {
            setSlug(slugify(e.target.value));
          }}
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title &&
            state.errors.title.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <input
          type="text"
          name="author"
          placeholder="Author"
          defaultValue={post.author}
          aria-describedby="author-error"
          className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
        />
        <div id="author-error" aria-live="polite" aria-atomic="true">
          {state.errors?.author &&
            state.errors.author.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <input
          readOnly
          value={slug}
          type="text"
          name="slug"
          placeholder="Slug"
          aria-describedby="slug-error"
          className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
        />
        <div id="slug-error" aria-live="polite" aria-atomic="true">
          {state.errors?.slug &&
            state.errors.slug.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <input
          type="date"
          name="pubDate"
          defaultValue={
            post.pub_date
              ? new Date(post.pub_date).toISOString().split('T')[0]
              : ''
          }
          aria-describedby="pubDate-error"
          className="focus:ring-primary-500 focus:border-primary-500 w-40 rounded-md border border-gray-300 px-4 py-2"
        />

        <div id="pubDate-error" aria-live="polite" aria-atomic="true">
          {state.errors?.pubDate &&
            state.errors.pubDate.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <input
          type="hidden"
          name="image"
          value={image}
          aria-describedby="image-error"
        />

        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          options={{
            folder: 'ausome_parents_images',
          }}
          onSuccess={(results) => {
            // @ts-expect-error cloudinary type
            setImage(results.info.secure_url);
          }}
        >
          {({ open }) => {
            return (
              <Button
                size="sm"
                className="w-40"
                type="button"
                onClick={() => open()}
              >
                Upload <ImageIcon size={20} />
              </Button>
            );
          }}
        </CldUploadWidget>

        {image && (
          <Image
            src={image}
            alt="Preview"
            width={200}
            height={200}
            className="mt-2 w-40 rounded border border-gray-300"
          />
        )}

        <div id="image-error" aria-live="polite" aria-atomic="true">
          {state.errors?.image &&
            state.errors.image.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Short Description"
          defaultValue={post.description}
          aria-describedby="description-error"
          className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
        />
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description &&
            state.errors.description.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium">Select Multiple Tags (Optional)</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="tags[]"
                value={tag.id}
                defaultChecked={post.tags?.includes(tag.name)}
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
        <input type="hidden" name="content" value={content} />
        <div id="content-error" aria-live="polite" aria-atomic="true">
          {state.errors?.content &&
            state.errors.content.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
