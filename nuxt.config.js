export default {
  version: "0.0.1",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    title: "mojkvadrat - sve nekretnine na jednom mjestu!",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
    ],
    script: [
      {
        src:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPijVFzKPk9M21q2dCj3-_1Yrve0mDx60&map_ids=90b8b95b1bbd0bc9&callback=initMap"
      },
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3745186233711216",
      },
      {
        hid: 'gtm-script1',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-VMWBZZM8WD',
        defer: true
      },
      {
        hid: 'gtm-script2',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-VMWBZZM8WD');
        `,
        type: 'text/javascript',
        charset: 'utf-8'
      },
      { src: "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js" }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/css/app.css",
    "@/assets/styles/global.scss",
    "@/assets/styles/custom_components.scss",
    '@/assets/fonts/outfit.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~plugins/snackbar/index.js",
    "~plugins/moment.js",
    {
      src: "~plugins/progress.js",
      mode: "client"
    },
    { src: "~plugins/swiper.js", mode: "client" },
    { src: "~plugins/vue2-editor.js", mode: "client" },
    { src: "~plugins/modal.js", mode: "client" },
    { src: "~plugins/datepicker.js", mode: "client" },
    { src: "~plugins/infiniteloading.js", mode: "client" },
    { src: "~plugins/vue-lightbox.js", mode: "client" },
    { src: "~plugins/security-code.js", mode: "client" },
    { src: "~plugins/apex-charts.js", mode: "client" },
    { src: "~plugins/emoji.js", mode: "client" },
    { src: "~plugins/calendar.js", mode: "client" }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ["@nuxtjs/tailwindcss"],
    '@nuxtjs/google-analytics',
    ["@nuxtjs/device"],
    [
      "@nuxtjs/laravel-echo",
      {
        broadcaster: "pusher",
        authEndpoint:
          "https://polar-cove-31327.herokuapp.com/broadcasting/auth",
        key: "273b7047e16aaf0ad6e0",
        cluster: "eu",
        encrypted: true,
        authModule: true,
        connectOnLogin: true,
        disconnectOnLogout: true
      }
    ]
  ],

  moment: {
    defaultLocale: "bs",
    locales: ["bs"]
  },

  googleAnalytics: {
    id: 'G-VMWBZZM8WD'
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "nuxt-ssr-cache",
    '@nuxtjs/sitemap',
    "@nuxtjs/auth",
    "@nuxtjs/axios",
    ["nuxt-material-design-icons"],
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-###########'
    }]
  ],

  sitemap: {
    hostname: 'https://mojkvadrat.ba',
    gzip: true,
    exclude: [
      '/exclude-one',
      '/exclude-two'
    ],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },

  axios: {
    baseURL: "https://polar-cove-31327.herokuapp.com/",
  },

  auth: {
    redirect: {
      login: "/auth/login"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/oauth/token",
            method: "post",
            propertyName: "access_token"
          },
          logout: false,
          user: { url: "/me", method: "get", propertyName: "data" }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
        // autoFetchUser: true
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  loading: '@/components/LoadingBar.vue',

  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      // these are prefixes of pages that need to be cached
      // if you want to cache all pages, just include '/'
      // '/page1',
      // '/page2',

      // you can also pass a regular expression to test a path
      // /^\/page3\/\d+$/,

      // to cache only root route, use a regular expression
      '/'
    ],

    store: {
      type: "memory",

      // maximum number of pages to store in memory
      // if limit is reached, least recently used page
      // is removed.
      max: 100,

      // number of seconds to store this page in cache
      ttl: 120
    }
  }
};
