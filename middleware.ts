import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    console.log('mw ran')
    return NextResponse.next()
}