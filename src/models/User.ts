export type User = {
	id: string;
	username: string;
	createdAt: Date;
	profilePicture?: string;
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

export type UserInformation = User & {
	numberOfWins: number;
	numberOfLoses: number,
	followersCount: number;
	followedCount: number;
	isAccountPrivate: boolean;
	followers: Follow[];
	followed: Follow[];
	whoFollow: { id: string, userToFollow: User }[]
	haveAccess: number;
	isAlreadyApplicating: boolean,
	games: Game[];
};