'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showMessage, setShowMessage] = useState<boolean>(false)

    const handleSignIn = async () => {
        try {
            const user = await signIn('credentials', { username, password, redirect: false })
            if (user?.status === 401) {
                setShowMessage(true)
                return
            }
            router.push('/')
            return;
        } catch (err) {
            console.log('Error', err)
        }
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className='border p-4'>
                {showMessage && (<div>บัญชีผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง</div>)}
                <p>Username</p>
                <input className='border' onChange={(e) => setUsername(e.target.value)} />
                <p>Password</p>
                <input className='border' onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button className='border' onClick={() => handleSignIn()}>Sign In</button>
            </div>

        </div>
    )
}
