/* @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3|mp4)$/,
      use: {
        loader: 'file-loader',
      },
    });
    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/files/',
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
