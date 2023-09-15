export const randomInt = (min: number, max: number) => Math.floor(randomFloat(min, max + 1));

export const randomFloat = (min: number, max: number) => min + (max - min) * Math.random();
