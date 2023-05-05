import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import { z } from 'zod';

export const getBaseURL = () => (browser ? env.PUBLIC_EXTERNAL_API_URL : env.PUBLIC_API_URL);

export const isValidUUID = (uuid: string) => z.string().uuid().safeParse(uuid).success;

export const getWinRateRation = (numberOfWins: number, numberOfLosses: number) => {
	if (numberOfWins === 0 && numberOfLosses === 0) return 'No game !';

	if (numberOfWins === 0 && numberOfLosses > 0) return '0%';
	if (numberOfLosses === 0) return '100%';

	return `${((numberOfWins / numberOfLosses) * 100).toFixed(0)}%`;
};
