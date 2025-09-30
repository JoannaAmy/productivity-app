import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig, Session } from "next-auth";
import prisma from "./lib/db";

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // scope: [
          //   "openid",
          //   "https://www.googleapis.com/auth/userinfo.email",
          //   "https://www.googleapis.com/auth/userinfo.profile",
          //   "https://www.googleapis.com/auth/calendar.events",
          // ].join(""),
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.events",
          respose: "code",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  basePath: "/api/auth",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      // if (account?.provider === "google" && user.email) {
      console.log("google signin account error", account);
      console.log(" google user error", user);
      console.log("google profile  error", profile);
      // }

      await prisma.user.upsert({
        where: { email: user.email },

        update: {},
        create: {
          email: user.email,
          name: user.name,
          image: user.image,
          id: user.id,
        },
      });
      return true;
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          // refreshToken: account.refresh_token,
          // accessTokenExpires: account.expires_in,
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000,
          idToken: account.id_token,
          user,
        };
      } else if (Date.now() < Number(token.expires_at)) {
        return token;
      } else {
        console.log("Access token expired getting new one");

        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID as string,
              client_secret: process.env.AUTH_GOOGLE_SECRET as string,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
            method: "POST",
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Date.now() + Number(tokens.expires_in) * 1000,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },

    async session({ session, token }) {
      console.log("Final Session Object:", session);
      console.log("Token Data:", token);

      return {
        ...session,
        accessToken: String(token.access_token),
        refreshToken: String(token.refresh_token),
        accessTokenIssuedAt: Number(token.issued_at),
        accessTokenExpiresAt: Number(token.expires_at),
      } satisfies EnrichedSession;
    },
  },
} satisfies NextAuthConfig);

// import bcrypt from "bcryptjs";
// import Credentials from "next-auth/providers/credentials";

// Credentials({
//   name: "Credentials",
//   credentials: {
//     email: { label: "Email", type: "text" },
//     password: { label: "Password", type: "password" },
//   },
//   async authorize(credentials) {
//     if (!credentials?.email) {
//       throw new Error("invalid email");
//     }

//     if (!credentials?.password) {
//       throw new Error("invalid email");
//     }

//     const user = await prisma.user.findUnique({
//       where: { email: credentials.email as string },
//     });

//     if (!user) {
//       throw new Error("No User found with this email");
//     }
//     if (!user.password) {
//       throw new Error("This account doesn't support password login");
//     }

//     const isPasswordValid = await bcrypt.compare(
//       credentials.password as string,
//       user.password
//     );

//     if (!isPasswordValid) {
//       throw new Error("Invalid Password");
//     }
//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//     };
//   },
// }),

// const existingUser = await prisma.user.findUnique({
// where: { email: user.email },
// });

// if (existingUser && existingUser.id !== user.id) {
//   await prisma.account.updateMany({
//     where: {
//       provider: "google",
//       providerAccountId: account.providerAccountId,
//     },
//     data: { userId: existingUser.id },
//   });

//   user.id = existingUser.id;
//   return "/dashboard";
// }

// if (session.user) {
//   session.user.id = token.id as string;
// }
