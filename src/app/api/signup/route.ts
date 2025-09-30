// // app/api/auth/signup/route.ts
// import { NextResponse } from "next/server";
// import { signUpAction } from "@/lib/action"; // adjust path if needed

// export async function POST(req: Request) {
//   try {
//     // read FormData from request (we'll send FormData from client)
//     const formData = await req.formData();

//     // call your server action (already server side)
//     const result = await signUpAction(formData);

//     return NextResponse.json(result, { status: result.success ? 200 : 400 });
//   } catch (err) {
//     console.error("API /signup error:", err);
//     return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
//   }
// }
