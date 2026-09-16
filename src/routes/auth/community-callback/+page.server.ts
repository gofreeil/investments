import type { PageServerLoad } from './$types';
import { oauthEnabled } from '../../../auth';

export const prerender = false;

/**
 * חזרה מ-SSO של "יוצאים לחירות" (community.gofreeil.com/sso).
 * הקהילה כבר קבעה את העוגייה המשותפת gofreeil-auth על .gofreeil.com; כאן רק
 * מחלצים את יעד החזרה ומסמנים אם הקהילה החזירה שגיאה (לא רשום/לא מחובר).
 * oauth: אילו ספקים פעילים — למסך "עוד רגע ואתם בפנים" (הרשמה בלחיצה).
 */
export const load: PageServerLoad = async ({ url }) => {
	const raw = url.searchParams.get('returnTo') ?? '/';
	const returnTo = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/';
	return { returnTo, error: url.searchParams.get('error'), oauth: oauthEnabled };
};
