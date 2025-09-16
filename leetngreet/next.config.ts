import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  
  webpackDevMiddleware: config => {
  config.watchOptions = {
    poll: 1000,             // check for file changes every 1s
    aggregateTimeout: 300,  // wait 300ms before rebuilding
  }
  return config
}
};

export default nextConfig;

