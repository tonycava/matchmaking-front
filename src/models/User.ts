export type User = {
	id: string;
	username: string;
	createdAt: Date;
}

export type GameInfo = {
	gameId: string;

	users: { users: [string, string] }
}

export type Game = {
	state: 'choosing' | 'reveal' | 'finished';
	round: number;
	timerPlay: number;
	timerRev: number;
	players: [string, string];
	whoWin: [Some, Some, Some]

	actualPlay: Record<string, Move>
}

type Some = string | null;
export type Move = 'rock' | 'paper' | 'scissors';