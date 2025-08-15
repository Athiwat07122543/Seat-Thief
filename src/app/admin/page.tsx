'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Page() {
    const { data: session } = useSession()
    console.log('AdminPage', session)
    return (
        <div>Admin Page</div>
    )
}
