const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    index:"./src/js/index.js",
    
    game: "./src/js/game.js", 
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  mode:"production",
 
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "imgs/",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),
   
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "node_modules/bootstrap/dist/css/bootstrap.min.css",
          to: "css",
        }, 
        {
          from: "node_modules/bootstrap/dist/css/bootstrap.min.css.map",
          to: "css",
        },
        {
          from: "node_modules/bootstrap-icons/font/bootstrap-icons.css",
          to: "css",
        },
        {
          from: "node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff",
          to: "css/fonts",
        },
        {
          from: "node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2",
          to: "css/fonts",
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
  },
};
