/**
 * @fileoverview 投稿に関するAPI エンドポイント
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, content, author } = body;

        if (!title || !content || !author) {
            return NextResponse.json(
                { error: '必須項目が入力されていません' },
                { status: 400 }
            );
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                author,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            { error: '投稿の作成に失敗しました', details: error instanceof Error ? error.message : '不明なエラー' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: '投稿の取得に失敗しました', details: error instanceof Error ? error.message : '不明なエラー' },
            { status: 500 }
        );
    }
}