import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null
                }

                const user = await prisma.user.findFirst({
                    where: {
                        username: credentials.username
                    }
                })


                if (!user || !user.password) {
                    return null
                }

                if (!user.username || !user.email || !user.role) {
                    return null
                }


                const checkPassword = await bcrypt.compare(credentials.password, user.password)

                if (!checkPassword) {
                    return null
                }
                return {
                    id: user.id.toString(),
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            }
        })
    ],
    pages: {
        signIn: '../../signin'
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.username = user.username
                token.email = user.email
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.username = token.username
                session.user.email = token.email
                session.user.role = token.role
            }
            return session
        }
    }
})

export { handler as GET, handler as POST }