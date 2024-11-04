/**
 * @fileoverview メインページコンポーネント
 */

import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import prisma from '@/lib/prisma';
import { Post } from '@/types';

export default async function Home() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });

    return (
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">掲示板</h1>
        <PostForm />
        <PostList posts={posts} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p className="text-red-500">投稿の取得中にエラーが発生しました。</p>
      </div>
    );
  }
}