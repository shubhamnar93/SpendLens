"use client"
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function ClientGreeting() {
    const trpc = useTRPC();
    const greeting = useQuery(trpc.hello.queryOptions({ text: 'world' }));
    if (!greeting.data) return <div>Loading...</div>;
    return <div className='text-red-500'>{greeting.data.greeting}</div>;
}