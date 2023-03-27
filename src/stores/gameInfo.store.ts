import { writable } from 'svelte/store';
import type { GameInfo } from '@models/Game';

export const gameInfo = writable<GameInfo | null>(null);