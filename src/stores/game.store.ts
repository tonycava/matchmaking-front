import { writable } from 'svelte/store';
import type { GameInfo } from '@models/User';

export const game = writable<GameInfo | null>(null);