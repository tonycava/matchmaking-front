import type { Role } from 'matchmaking-shared';

export type User = {
	id: string;
	username: string;
	createdAt: Date;
	profilePicture?: string;
	role: Role,
};

export type Follow = {
	id: string
	followerId: string;
	followedId: string;
}

export type Application = {
	id: string
	createdAt: Date
	userIdToFollow: string
	userIdWhoFollow: string
}

export type Game = {
	id: string;
	createdAt: Date;
	loserId: string;
	winnerId: string;
	result: string;
}

export type UserDemand = {
	id: string,
	createdAt: Date,
	username: string,
	profilePicture: string,
}

export type UserInformation = User & {
	numberOfWins: number;
	numberOfLoses: number,
	role: Role;
	followersCount: number;
	followedCount: number;
	isAccountPrivate: boolean;
	followers: Follow[];
	followed: Follow[];
	whoFollow: {
		id: string,
		userToFollow: UserDemand,
	}[]
	haveAccess: number;
	isAlreadyApplicating: boolean,
	games: Game[];
};