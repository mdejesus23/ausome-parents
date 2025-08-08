// app/posts/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/app/_lib/data-services';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export const alt = 'My images alt text';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: '#f9fafb',
            color: '#111827',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Post not found
        </div>
      ),
      {
        ...size,
      },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          background: '#f9fafb',
          color: '#111827',
          width: '100%',
          height: '100%',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 20 }}>📚 Blog Post</div>
        <div>{post.title}</div>
      </div>
    ),
    {
      ...size,
    },
  );
}
