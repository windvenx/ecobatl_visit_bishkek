import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../navigation';

// Can be imported from a shared config
export const locales = ['en', 'ru', 'ky'];

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale: locale as any,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});
