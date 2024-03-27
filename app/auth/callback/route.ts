import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

interface AuthTokenResponse {
  data: {
    user: any; // Adjust according to the actual structure
    session: any; // Adjust according to the actual structure
    redirectType: any;
  };
  error: any;
}

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const source = requestUrl.searchParams.get("source");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    // const { data: session, error } = await supabase.auth.exchangeCodeForSession(
    //   code
    // );

    const result = (await supabase.auth.exchangeCodeForSession(
      code
    )) as AuthTokenResponse;

    console.log("result: ", result);

    const redirectType = result.data?.redirectType;

    if (redirectType == "PASSWORD_RECOVERY") {
      return NextResponse.redirect(`${origin}/update-password`);
    } else {
      return NextResponse.redirect(`${origin}`);
    }
  }

  // Fallback redirect if no code is present
  return NextResponse.redirect(origin);
}
