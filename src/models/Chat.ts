export type Chat = {
	id: string;
	userId: string;
	content: string;
	createdAt: Date;
	user: { username: string };
};

export type AMLResponse<T> = {
	code: number;
	message: string;
	data: T;
};

export type Range = {
	start: number;
	end: number;
};
