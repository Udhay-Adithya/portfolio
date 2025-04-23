import { getPhotos } from '@/lib/server/photos';
import Image from 'next/image';

export default function PointOfViewPage() {
    // Get photos from your collection
    const photos = getPhotos();

    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Title section - takes 1 column on mobile, 1 column on desktop */}
                <div className="mb-12 lg:mb-0">
                    <h1 className="text-4xl font-medium mb-2">point of view</h1>
                    <p className="text-muted-foreground">through my digital eyes</p>
                </div>

                {/* Photo grid - takes full width on mobile, 2 columns on desktop */}
                <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className="aspect-[3/4] relative overflow-hidden"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt || "Photography"}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}