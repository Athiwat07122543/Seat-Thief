'use client'
import React, { useState } from 'react'

export default function Page() {
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const handleRegister = async () => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password })
            })
            setEmail('')
            setUsername('')
            setPassword('')
            const user = await res.json()
            console.log('ok', user)
            if (user.status === 401) {
                setShowMessage(true)
                setMessage(user.message)
            }
            return
        } catch (err) {
            console.log('Error', err)
        }
    }
    return (
        <div className='flex h-screen items-center justify-center'>
            <div className='border p-4'>
                {showMessage && <div>{message}</div>}
                <p>Email</p>
                <input className='border' value={email} onChange={(e) => setEmail(e.target.value)} />
                <p>Username</p>
                <input className='border' value={username} onChange={(e) => setUsername(e.target.value)} />
                <p>Password</p>
                <input className='border' value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button className='border' onClick={() => handleRegister()}>สมัครสมาชิก</button>
            </div>
        </div>
    )
}
