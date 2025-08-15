import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const { email, username, password } = await request.json()

        if (!email) {
            return Response.json({ status: 401, message: 'กรุณาใส่อีเมล' })
        }
        if (!username) {
            return Response.json({ status: 401, message: 'กรุณาใส่บัญชีผู้ใช้งาน' })
        }
        if (!password) {
            return Response.json({ status: 401, message: 'กรุณาใส่รหัสผ่าน' })
        }

        const checkEmail = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (checkEmail) {
            return Response.json({ status: 401, message: 'อีเมลนี้มีผู้ใช้งานแล้ว' })
        }

        const checkUsername = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if (checkUsername) {
            return Response.json({ status: 401, message: 'บัญชีผู้ใช้งานนี้มีผู้ใช้งานแล้ว' })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashPassword
            }
        })
        console.log(user)
        return Response.json({ status: 201, user })
    } catch (err) {
        return Response.json({ status: 401, err })
    }
}