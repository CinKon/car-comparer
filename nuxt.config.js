const join = require('path').join;
const pkg = require('./package');
const tailwindJS = join(__dirname, 'tailwind.config.js');

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '~/assets/css/tailwind.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '@/plugins/toCurrency.filter.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
  ],

  elementUI: {
    components: ['Select', 'Option', 'Button', 'Form', 'FormItem', 'Input'],
    locale: 'de',
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    /*
     ** PostCSS
     */
    postcss: {
      plugins: [
        require('postcss-normalize'),
        require('tailwindcss')(tailwindJS),
        require('autoprefixer'),
      ],
    },
  },

  /*
   ** Apollo Config
   */
  apollo: {
    tokenExpires: 10, // optional, default: 7 (days)
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Basic', // optional, default: 'Bearer'
    // optional
    // errorHandler(error) {
    //   console.log(
    //     '%cError',
    //     'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
    //     error.message,
    //   )
    // },
    // required
    clientConfigs: {
      default: '~/apollo/clientConfig.js',
    },
  },
};
