import axios, { type  AxiosResponse } from 'axios';
import type { AMLResponse } from '@models/Chat';
import type { Application, Follow } from '@models/User';
import { getBaseURL } from '$lib/utils';

const unfollowUser = (token: string, userIdToUnFollow: string): Promise<AxiosResponse<AMLResponse<{
	follow: Follow
}>>> => {
	return axios.post(`${getBaseURL()}/social/remove-follow`, { userIdToUnFollow }, { headers: { Authorization: token } });
};

const followUser = (token: string, userIdToFollow: string): Promise<AxiosResponse<AMLResponse<{
	unfollow: Follow
}>>> => {
	return axios.post(`${getBaseURL()}/social/add-follow`, { userIdToFollow }, { headers: { Authorization: token } });
};

const addApplication = (token: string, userIdToApply: string): Promise<AxiosResponse<AMLResponse<{
	application: Application
}>>> => {
	return axios.post(`${getBaseURL()}/social/add-application`, { userIdToApply }, { headers: { Authorization: token } });
};

const removeApplication = (token: string, applicationIdToUnApply: string): Promise<AxiosResponse<AMLResponse<{
	application: Application
}>>> => {
	return axios.post(`${getBaseURL()}/social/remove-application`, { applicationIdToUnApply }, { headers: { Authorization: token } });
};

const acceptApplication = (token: string, applicationIdToApply: string, userIdToFollow: string): Promise<AxiosResponse<AMLResponse<{
	application: Application
	follow: Follow
}>>> => {
	return axios.post(`${getBaseURL()}/social/accept-application`, {
		applicationIdToApply, userIdToFollow
	}, { headers: { Authorization: token } });
};

const removeWaitingApplication = (token: string, userIdToUnWait: string) => {
	return axios.post(`${getBaseURL()}/social/remove-waiting-application`, {
		userIdToUnWait
	}, { headers: { Authorization: token } });
};

export default {
	addApplication,
	removeApplication,
	acceptApplication,
	unfollowUser,
	followUser,
	removeWaitingApplication
};