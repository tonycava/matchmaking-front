export type AMLResponse<T> = {
	code: number;
	message: string;
	data: T;
};
