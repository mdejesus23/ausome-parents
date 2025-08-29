'use client';

import { useState, useEffect } from 'react';
import QuillEditor from '@/app/_ui/admin/quill-editor';
import { useFormStatus } from 'react-dom';
import Button from '../button';
import { CldUploadWidget } from 'next-cloudinary';
import { Image as ImageIcon } from 'lucide-react';
import { createSaint, State } from '@/app/_lib/saints-in-focus/action';
import { useActionState } from 'react';
import slugify from '@/app/_utils/slugify';
import { toast } from 'react-hot-toast';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : <>Create Saint</>}
    </Button>
  );
}

export default function CreateSaintForm() {
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [slug, setSlug] = useState<string>('');

  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSaint, initialState);

  useEffect(() => {
    if (state.message === null) return;

    if (!state.errors && state.message) {
      toast.success(state.message);
      setImage('');
      setSlug('');
      setContent('');
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
          name="name"
          placeholder="Saint name"
          className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
          aria-describedby="name-error"
          onChange={(e) => {
            setSlug(slugify(e.target.value));
          }}
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
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
        <label htmlFor="pub_date" className="mb-2 block font-medium">
          Publish date
        </label>
        <input
          type="date"
          name="pub_date"
          aria-describedby="pub_date-error"
          className="focus:ring-primary-500 focus:border-primary-500 w-40 rounded-md border border-gray-300 px-4 py-2"
        />

        <div id="pub_date-error" aria-live="polite" aria-atomic="true">
          {state.errors?.pub_date &&
            state.errors.pub_date.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <label htmlFor="feast_day" className="mb-2 block font-medium">
          Feast day
        </label>
        <input
          type="date"
          name="feast_day"
          aria-describedby="feast_day-error"
          className="focus:ring-primary-500 focus:border-primary-500 w-40 rounded-md border border-gray-300 px-4 py-2"
        />

        <div id="feast_day-error" aria-live="polite" aria-atomic="true">
          {state.errors?.feast_day &&
            state.errors.feast_day.map((error: string) => (
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
          className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
        />

        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          options={{
            folder: 'ausome_parents_images', // Your folder in Cloudinary
          }}
          onSuccess={(results) => {
            // @ts-expect-error test
            setImage(results.info.secure_url);
          }}
        >
          {({ open }) => {
            return (
              <Button size="sm" className="w-40" onClick={() => open()}>
                Upload <ImageIcon size={20} />
              </Button>
            );
          }}
        </CldUploadWidget>
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
        <label className="mb-2 block font-medium">Post Content</label>
        <QuillEditor value={content} onChange={setContent} />
        {/* Hidden input to pass the HTML to server action */}
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
