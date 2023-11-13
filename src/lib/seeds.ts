export interface Seed {
  image: string;
}

const seeds: Seed[] = [
  {
    image: '/eiffel.jpg',
  },
  {
    image: '/arc.jpg',
  },
];

export function getRandomSeed(): Seed {
  return seeds[Math.floor(Math.random() * seeds.length)];
}

export async function convertImageToBase64(url: string) {
  // Check if the URL is already a base64 string
  if (url.startsWith('data:image/')) {
    return url; // It's already a base64 string, so return as-is
  }

  // If the URL is a relative path, prepend the origin
  if (!url.startsWith('http') && typeof window !== 'undefined') {
    url = window.location.origin + url;
  }

  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
