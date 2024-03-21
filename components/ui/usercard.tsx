"use client"
import React, { useState, useEffect } from 'react'
import { onlyuser } from '@/lib/data'
import Link from 'next/link'
import { Button } from './button'
import UserAvatar from '../UserAvtar'
import ProfileAvatar from '../profileavtar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function UserCard({ id }: { id: string }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await onlyuser(id)
      setUser(userData)
    }
    fetchUser()
  }, [id])

  if (!user) {
    return null // or loading indicator
  }

  return (
    <div>
      <Link href={`/profile/${user?.id}`}>
        <Button variant="secondary" className="w-full flex flex-row justify-start gap-10 h-12">
          <ProfileAvatar username={user?.name ?? ''} image={user?.image ?? ''} isupdate={false} islive={true} size={0} />
          <div className="text-center font-extrabold">{user?.name}</div>
        </Button>
      </Link>
    </div>
  )
}
