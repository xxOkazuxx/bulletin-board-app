/**
 * @fileoverview アプリケーション全体で使用する型定義
 */

export type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    comments?: Comment[];
};

export type Comment = {
    id: number;
    content: string;
    author: string;
    createdAt: Date;
    postId: number;
}; 