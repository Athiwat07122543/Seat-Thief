import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    console.log(' Middleware is running');
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const { pathname } = req.nextUrl

    if (
        pathname.startsWith('/admin') && (!token || token.role !== 'ADMIN')
    ) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}