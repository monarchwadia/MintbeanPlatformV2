// vue.config.js
module.exports = {
  // options...
  devServer: {
    port: process.env.PORT || 3000,
    proxy: {
      "^/api/v1": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api/v1": "/api/v1" },
        logLevel: "debug"
      }
    },
    disableHostCheck: true // required for nginx to recognize the devserver in local dev mode
  },
  chainWebpack: (/*config*/) => {
    // // markdown Loader
    // config.module
    //   .rule("markdown")
    //   .test(/\.md$/)
    //   .use("markdown-loader")
    //   .loader("markdown-loader")
    //   .end();
    //   .end()
    //   // Add another loader
    //   .use("markdown-loader")
    //   .loader("markdown-loader")
    //   .end()
    //   .use("handlebars-resolver")
    //   .loader("./markdown-routes-loader.js")
    //   .end()
    //   .use("ejs-loader")
    //   .loader("ejs-loader");
    // .tap(options => {
    //   console.log("OPTIONS",options);
    //   return {
    //     render: {
    //       test: 'Test'
    //     }
    //   };
    // });
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        sassOptions: {
          indentedSyntax: false
        }
      }
    }
  }
};
