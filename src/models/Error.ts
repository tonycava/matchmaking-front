import type { ActionResult } from '@sveltejs/kit';

export type FormResponse = {
	internalError: string;
};

export type FormActionResponse = ({ result, update }: { result: ActionResult, update: () => void }) => Promise<void>;
