import { NextResponse, type NextRequest } from "next/server";
import { authenticateUser } from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
    const DASHBOARD_URL = "/dashboard";

    const response = NextResponse.next();
    const user = await authenticateUser({ request, response });

    // evalutate in admin or general users and keep in variables
    const isOnDashboard = request.nextUrl.pathname.startsWith(DASHBOARD_URL);
    const isOnAdminArea = request.nextUrl.pathname.startsWith(`${DASHBOARD_URL}/admins`);

    console.log(`isOnDashboard: ${isOnDashboard}`);
    console.log(`isOnAdminArea: ${isOnAdminArea}`);
    console.log(`isAdmin: ${user?.isAdmin}`);
    if (isOnDashboard) {

        if (!user) {
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }

        if (isOnAdminArea && !user.isAdmin) {
            return NextResponse.redirect(new URL(DASHBOARD_URL, request.nextUrl));
        }

        return response;
    } else if (user) {
        return NextResponse.redirect(new URL(DASHBOARD_URL, request.nextUrl));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}