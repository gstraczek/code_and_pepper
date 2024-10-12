
import { AuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })
        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name || ""
          }
        }
        else {
          return null
        }
      }
    })
  ],
  //   pages: {
  //     signIn: "/auth/signin",
  //     signOut: "/auth/signout",
  //     error: "/auth/error",
  //     verifyRequest: "/auth/verify-request"
  //   },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token
    },
    async session({ session, token }) {
      if (token.id && typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session
    }
  }
}


const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }