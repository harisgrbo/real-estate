import redirectSSL from 'redirect-ssl'

export default {
  version: "0.0.1",

  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production'
    }),
  ],

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
    ],
    script: [
      {
        src:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyB4GymIRnVaYW3CgDrOEJo06NNtua7-eYw&map_ids=90b8b95b1bbd0bc9&callback=initMap"
      },
      {
        src:
          "https://www.googletagmanager.com/gtag/js?id=UA-213471793-1"
      },
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3745186233711216",
        async: true,
        crossorigin: "anonymous"
      },
      {
        src: "https://cse.google.com/cse.js?cx=92d96ea2aebcec638",
      },
      {
        hid: 'gtm-script1',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-VMWBZZM8WD',
        defer: true,
        async: true
      },
      {
        hid: 'gtm-script3',
        innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-213471793-1');`,
        type: 'text/javascript',
        charset: 'utf-8'
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
    "~plugins/moment.js",
    {
      src: "~plugins/progress.js",
      mode: "client"
    },
    { src: "~plugins/star-rating.js", mode: "client" },
    { src: "~plugins/swiper.js", mode: "client" },
    { src: "~plugins/vue2-editor.js", mode: "client" },
    { src: "~plugins/modal.js", mode: "client" },
    { src: "~plugins/vue-stories.js", mode: "client" },
    { src: "~plugins/datepicker.js", mode: "client" },
    { src: "~plugins/infiniteloading.js", mode: "client" },
    { src: "~plugins/vue-lightbox.js", mode: "client" },
    { src: "~plugins/security-code.js", mode: "client" },
    { src: "~plugins/apex-charts.js", mode: "client" },
    { src: "~plugins/emoji.js", mode: "client" },
    { src: "~plugins/toast.js", mode: "client" },
    { src: "~plugins/calendar.js", mode: "client" },
    { src: "~plugins/masonry.js", mode: "client" },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ["@nuxtjs/tailwindcss"],
    '@nuxtjs/google-analytics',
    '@nuxt/image',
    ["@nuxtjs/device"],
    [
      "@nuxtjs/laravel-echo",
      {
        broadcaster: "pusher",
        authEndpoint:
          "https://api.mojkvadrat.ba/broadcasting/auth",
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

  i18n: {
    vueI18n: {
      locale: 'ba',
      fallbackLocale: ['hr', 'rs'],
    }
  },

  modules: [
    "nuxt-ssr-cache",
    '@nuxtjs/sitemap',
    "@nuxtjs/auth",
    "@nuxtjs/axios",
    ["nuxt-material-design-icons"],
    '@nuxtjs/i18n',
    // ['@nuxtjs/google-adsense', {
    //   id: 'ca-pub-3745186233711216'
    // }]
  ],

  sitemap: {
    hostname: 'https://www.mojkvadrat.ba',
    gzip: true,
    exclude: [],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },

  axios: {
    baseURL: "https://api.mojkvadrat.ba/",
  },

  auth: {
    redirect: {
      login: "/prijava"
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

  loading: {
    color: '#FC8709',
    height: '5px'
  },

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
