import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

// halaman mana yang mau di redirect?
export default withAuth(mainMiddleware, [
  "/product",
  "/about",
  "/profile",
  "/admin",
  // "/api/product
]);
