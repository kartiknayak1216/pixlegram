import React from 'react';
import { Button } from './ui/button';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function Header({ username, isCurrentUser,id }: {
    username: string;
    isCurrentUser: boolean;
    id:string
}) {
    return (
        <div className='flex flex-col items-center justify-center gap-3 px-4  md:flex-row md:justify-start'>
            <div className='font-bold text-lg'>
                {username}
            </div>

            {isCurrentUser && (
                <div className='flex flex-row gap-3'>
                    <Link href={`/edit/${id}`}>
                        <Button size='lg' variant='secondary'>
                            Edit Profile
                        </Button>
                    </Link>
                    <Link href="/settings">
                        <Button size='icon' variant='secondary'>
                            <Settings/>
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
