import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
            <h2 className="text-2xl font-semibold">Work not found</h2>
            <p className="text-muted-foreground">The work experience you’re looking for doesn’t exist or was moved.</p>
            <Link href="/work" className="text-primary underline underline-offset-4">Back to work</Link>
        </div>
    );
}
