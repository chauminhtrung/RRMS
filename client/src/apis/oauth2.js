import { apiBaseUrl, redirectUri } from "~/configs/environment";

export const ACCESSTOKEN = "accessToken";

export const GOOGLE_AUTH_URL = `${apiBaseUrl}/oauth2/authorization/google?redirect_uri=${redirectUri}`;

