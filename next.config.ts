import type { NextConfig } from "next";
import withPWAInit from "next-pwa";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore
  turbopack: {},
};

// @ts-ignore
export default withNextIntl(withPWA(nextConfig));
