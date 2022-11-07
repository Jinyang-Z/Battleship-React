export function RandomPosition(min: number = 0, max: number = 9) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function RandomRotation(position: number[] = [90, 180]) {
  return position[RandomPosition(0, position.length - 1)];
}
