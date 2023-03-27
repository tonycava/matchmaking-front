
export type Game = {
	state: 'choosing' | 'reveal' | 'finished';
	round: number;
	timerPlay: number;
	timerRev: number;
	players: [string, string];
	whoWin: [Some, Some, Some]

	actualPlay: Record<string, Move>
}


export type GameInfo = {
	gameId: string;

	users: [string, string]
}

export type Some = string | null;
export type Move = 'rock' | 'paper' | 'scissors';