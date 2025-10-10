export default function Loading() {
    return (
        <div className="min-h-[50vh] max-w-4xl mx-auto px-4 py-12 animate-pulse">
            <div className="h-8 w-48 bg-muted rounded mb-8" />
            <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border pb-4">
                        <div className="h-5 w-2/3 bg-muted rounded" />
                        <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
