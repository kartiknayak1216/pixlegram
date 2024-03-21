"use client"
import { Share1Icon } from '@radix-ui/react-icons'
import React, { ReactElement } from 'react'
import { Button } from '../ui/button'
import { postes } from '@/lib/defination'

import { Link } from 'lucide-react'
import { toast } from 'sonner'

export default function savebutton({ id }: { id: string }) {
    const copy = () => {
        navigator.clipboard.writeText(`localhost:300/post/${id}`)
        toast.success("Link copied to clipboard");
    }

    return (
        <Button  variant={'ghost'} onClick={copy}>
            <Share1Icon />
        </Button>
    )
}
