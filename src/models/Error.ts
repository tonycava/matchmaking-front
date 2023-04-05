import type { ActionResult } from '@sveltejs/kit';

export type FormResponse = {
	internalError: string;
};

export type FormActionResponse = ({ result }: { result: ActionResult }) => Promise<void>;
