export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16 animate-pulse">
            <div className="h-6 w-24 bg-muted rounded mb-6" />
            <div className="h-10 w-2/3 bg-muted rounded mb-4" />
            <div className="h-4 w-40 bg-muted rounded mb-10" />
            <div className="aspect-video w-full bg-muted rounded-lg mb-10" />
            <div className="space-y-3">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-11/12 bg-muted rounded" />
                <div className="h-4 w-10/12 bg-muted rounded" />
                <div className="h-4 w-9/12 bg-muted rounded" />
            </div>
        </div>
    );
}
