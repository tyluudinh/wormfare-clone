import { useEffect, useState } from 'react';

export const useImagesPreload = (imagesUrls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const imagesLoaded = loadedImages.length === imagesUrls.length;

  useEffect(() => {
    imagesUrls.forEach((url) => {
      const img = new Image();

      img.src = url;
      img.onload = () => {
        setLoadedImages((prev) => [...prev, url]);
      };
      img.onerror = (e) => console.error(e);
    });
  }, [imagesUrls]);

  return imagesLoaded;
};
