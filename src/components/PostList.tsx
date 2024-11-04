/**
 * @fileoverview 投稿一覧を表示するコンポーネント
 */

import { Post } from '@/types';

type PostListProps = {
    posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                    <div className="mt-2 text-sm text-gray-500">
                        {post.author} - {new Date(post.createdAt).toLocaleString('ja-JP')}
                    </div>
                </div>
            ))}
        </div>
    );
} 