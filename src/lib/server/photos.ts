interface Photo {
    src: string;
    alt?: string;
    location?: string;
    date?: string;
}

// This function would ideally fetch from your CMS, API, or filesystem
// For now, we'll return an array of sample photos
export function getPhotos(): Photo[] {
    // Replace these with your actual photos
    return [
        {
            src: "/images/pov/vitopia.jpeg",
            alt: "VITOPIA-2024",
            location: "VIT-AP, Amaravati",
            date: "2024-02-25"
        },

    ];
}

// Optional: Function to get photo metadata if you want to display it
export function getPhotoMetadata(photoId: string) {
    const photos = getPhotos();
    return photos.find(photo => photo.src.includes(photoId));
}