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

export type UserInformation = User & { numberOfWins: number; numberOfLoses: number, followersCount: number; followedCount: number; followers: Follow[]; followed: Follow[]; };