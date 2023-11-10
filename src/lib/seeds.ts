export interface Seed {
  image: string;
  prompt: string;
}

const seeds: Seed[] = [
  {
    image: '/public/baby_cake.jpg',
    prompt: 'make his jacket out of leather',
  },
  // {
  //   image:
  //     "https://user-images.githubusercontent.com/2289/215241066-654c5acf-8293-4fb1-a85d-c87a0297a30b.jpg",
  //   prompt: "what would it look like if it were snowing?",
  // },
  {
    image: '/public/eiffel.jpg',
    prompt: 'add fireworks to the sky',
  },
];

export function getRandomSeed(): Seed {
  return seeds[Math.floor(Math.random() * seeds.length)];
}
