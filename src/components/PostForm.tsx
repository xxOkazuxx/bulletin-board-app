'use client';
import { useState } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
}

interface PostFormProps {
    post?: Post;  // 編集時に使用
    onDelete?: (id: number) => Promise<void>;  // 削除ハンドラ
}

const PostForm = ({ post, onDelete }: PostFormProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    author: '名無しさん', // デフォルトの投稿者名
                }),
            });

            if (!response.ok) {
                throw new Error('投稿に失敗しました');
            }

            // フォームをリセット
            setTitle('');
            setContent('');

            // 親コンポーネントの投稿一覧を更新する必要があるため
            // location.reloadは一時的な対応です
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('投稿に失敗しました');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * 投稿を削除する
     * @param id 削除する投稿のID
     */
    const handleDelete = async (id: number) => {
        if (!window.confirm('本当にこの投稿を削除しますか？')) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/posts?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('削除に失敗しました');
            }

            if (onDelete) {
                await onDelete(id);
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('削除に失敗しました');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                    タイトル
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-black"
                    required
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                    本文
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg h-32 text-black"
                    required
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isLoading ? '投稿中...' : '投稿する'}
                </button>

                {post && (
                    <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        disabled={isLoading}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-red-300"
                    >
                        {isLoading ? '削除中...' : '削除する'}
                    </button>
                )}
            </div>
        </form>
    );
};

export default PostForm;