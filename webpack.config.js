

const path = require('path');
const webpack = require("webpack")

// плагины
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

// production and dev
const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[contenthash].${ext}`

const optimization = () => {
  const configObf = {
    splitChunks: {
      chunks: "all",
    },
    mangleExports: "size",
  }
  if (isProd) {
    configObf.minimizer = [
      new CssMinimizerPlugin({
        minimizerOptions: {
          level: {
            1: {
              roundingPrecision: "all=3,px=5",
            },
          },
        },
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
      new TerserPlugin(),
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          collapseWhitespace: true,
        },
        minify: [
          HtmlMinimizerPlugin.htmlMinifierTerser
        ]
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          }
        },
      }),

    ]
  }

  return configObf
}

const plugins = () => {
  const basePlugins = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      // favicon: path.resolve(__dirname, "src/assets/favicon.ico"),
    }),
    new HtmlWebpackPlugin({
      filename: 'services.html',
      template: path.resolve(__dirname, "src/services.html"),
    }),
    new HtmlWebpackPlugin({
      filename: 'services-inner.html',
      template: path.resolve(__dirname, "src/services-inner.html"),
    }),
    new HtmlWebpackPlugin({
      filename: 'work.html',
      template: path.resolve(__dirname, "src/work.html"),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./styles/${filename("css")}`
    }),
    new SpriteLoaderPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/assets'),
    //       to: path.resolve(__dirname, 'dist/assets')
    //     },
    //   ]
    // }),
  ]

  return basePlugins
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: "development",
  entry: "./js/index.js",
  output: {
    filename: `./js/${filename("js")}`,
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: `./assets/${filename("[ext]")}`
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    compress: true,
    port: 3000,
  },
  plugins: plugins(),
  devtool: isProd ? false : "source-map",
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   loader: "html-loader",
      //   options: {
      //     interpolate: true
      //   }
      // },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ]
              }
            }
          },
          {
            loader: "sass-loader",
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
        },
        include: [
          path.resolve(__dirname, './src/img/svg'),
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|mp4)$/i,
        type: 'asset/resource',
        exclude: [
          path.resolve(__dirname, './src/img/svg'),
        ]
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/i,
        type: 'asset/resource'
      },

    ],
  },
  optimization: optimization()
};