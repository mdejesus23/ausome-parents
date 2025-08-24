import { ModalRoot, ModalOpen, ModalWindow } from '@/app/_ui/Modal';
import { Menus, MenuButton, MenuToggle, MenuList } from '@/app/_ui/menus';
import { Pencil, Trash2 } from 'lucide-react';
import type { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import ConfirmDelete from '@/app/_ui/admin/confirm-delete';
import { getFilteredPosts } from '@/app/_lib/posts/data-services';

interface Props {
  query: string;
  currentPage: number;
}

export default async function PostTable({ query, currentPage }: Props) {
  const posts: Post[] = await getFilteredPosts(query, currentPage);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">
              Image
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">
              Date
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">
              Title
            </th>

            <th className="px-4 py-3 text-sm font-semibold text-gray-600"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {posts?.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="h-12 w-12 overflow-hidden rounded">
                  <Image
                    src={post.image || '/fallback.webp'}
                    alt={post.title}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {new Date(post.pub_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-gray-800">
                {post.title}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-gray-800">
                <ModalRoot>
                  <Menus>
                    <MenuToggle id={post.id.toString()} />

                    <MenuList id={post.id.toString()}>
                      <ModalOpen opens="edit">
                        <MenuButton icon={<Pencil size={18} />}>
                          <Link href={`/admin/dashboard/posts/${post.id}/edit`}>
                            Edit
                          </Link>
                        </MenuButton>
                      </ModalOpen>

                      <ModalOpen opens="delete">
                        <MenuButton icon={<Trash2 size={18} />}>
                          Delete
                        </MenuButton>
                      </ModalOpen>
                    </MenuList>

                    <ModalWindow name="delete">
                      <ConfirmDelete id={post.id} />
                    </ModalWindow>
                  </Menus>
                </ModalRoot>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
