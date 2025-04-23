import { getPhotoMetadata } from '@/lib/server/photos';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        id: string;
    };
};

export default function PhotoPage({ params }: Props) {
    const { id } = params;
    const photo = getPhotoMetadata(id);

    if (!photo) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4 flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full">
                <div className="mb-6">
                    <Link href="/pov" className="text-muted-foreground hover:text-foreground transition-colors">
                        ← Back to gallery
                    </Link>
                </div>

                <div className="relative aspect-[4/3] w-full">
                    <Image
                        src={photo.src}
                        alt={photo.alt || "Photography"}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        priority
                    />
                </div>

                <div className="mt-4 flex justify-between">
                    {photo.location && (
                        <span className="text-sm text-muted-foreground">{photo.location}</span>
                    )}
                    {photo.date && (
                        <span className="text-sm text-muted-foreground">
                            {new Date(photo.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}