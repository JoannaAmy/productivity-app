import prisma from "@/lib/db";
import Link from "next/link";

export default async function Home() {
    const todo = await prisma.user.findMany()
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000',
                color: '#FFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <pre
                style={{
                    color: 'inherit',
                    backgroundColor: 'brown',
                    padding: '1rem',
                    // width: '10rem'
                }}
            >
                From Prisma
                {JSON.stringify(todo, null, 2)}
            </pre>
            <Link
                style={{
                    color: 'inherit',
                    backgroundColor: 'grey',
                    padding: '1rem'
                }}
                href={'/signin'}
            >
                Sign in
            </Link>
        </div>
    );
}
