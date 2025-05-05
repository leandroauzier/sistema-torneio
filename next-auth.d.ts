// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nome: string;
      email: string;
    };
  }

  interface User {
    id: number;
    nome: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nome: string;
    email: string;
  }
}