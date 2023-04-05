export type Chat = {
	id: string;
	userId: string;
	content: string;
	createdAt: Date;
	user: { username: string };
};

export type Range = {
	start: number;
	end: number;
};
