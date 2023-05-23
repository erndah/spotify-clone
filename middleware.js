import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // Token will exist if user logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET});

    const url = req.nextUrl.clone();
    const{ pathname } = req.nextUrl;
    url.pathname = "/login";
    
    // Allow the request if the following is true
    // 1. its request for next-auth session & provider fetching
    // 2. the token exist

    if(pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }
    
    // redirect to login if they dont have token AND are requesting a protected route
    
    if(!token && pathname !== "/login"){
        return NextResponse.rewrite(url);
    }
}
export const config = {
    matcher: "/",
    };