// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from '@models/User';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: Omit<User, 'profilePicture'>;
			otpAuthenticated?: boolean;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
