/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dqjdiwbccnakimxezkhn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/images/**'
      }
    ]
  }
}

export default nextConfig;
