/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/8",
        destination: "https://edu-git-search-lachlanjc.vercel.app/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
