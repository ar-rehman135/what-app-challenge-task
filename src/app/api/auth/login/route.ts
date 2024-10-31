// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {

        const body = await request.json()
        const cookieStore = cookies();
        cookieStore.set('authToken', body.token, { maxAge: 60 * 60 * 24 })
        return NextResponse.json({ message: "Token updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: error });

    }
}
