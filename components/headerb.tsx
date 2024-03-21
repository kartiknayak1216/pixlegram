import React from 'react';

export default function HeaderB({ userbio, userlink }: {
    userbio: string;
    userlink: string;
}) {
    return (
        <div className='flex flex-col space-x-3'>
            <div>{userbio}</div>
            <div>
                <a href={userlink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {userlink}
                </a>
            </div>
        </div>
    );
}
