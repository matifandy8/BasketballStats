import { Player } from '../types/sportradar.types';

export interface PlayerWithImage extends Player {
  image_url?: string;
}

const BASE_URL =
  'https://cdn.jsdelivr.net/gh/matifandy8/BasketballStats@main/apps/backend/images/players-headshot';

export function attachPlayerImage(player: Player): PlayerWithImage {
  if (!player?.full_name) return player;

  const nameParts = player.full_name.trim().split(/\s+/);

  // Remove trailing dot if exists
  const lastPart = nameParts[nameParts.length - 1];
  if (lastPart.endsWith('.')) {
    nameParts[nameParts.length - 1] = lastPart.slice(0, -1);
  }

  const formattedName = nameParts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('_');

  const filename = `${formattedName}.png`;

  return {
    ...player,
    image_url: `${BASE_URL}/${filename}`,
  };
}

export function attachImagesToPlayers(players: Player[]): Player[] {
  return players.map(attachPlayerImage);
}
