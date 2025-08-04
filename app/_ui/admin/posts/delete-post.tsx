'use client';

import { useFormStatus } from 'react-dom';
import { deletePost } from '@/app/_lib/posts/action';
import Button from '../../button';
import Loader from '../../loader';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline">
      {pending ? <Loader /> : 'Delete Post'}
    </Button>
  );
}

export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id);

  return (
    <form action={deletePostWithId}>
      <SubmitButton />
    </form>
  );
}
