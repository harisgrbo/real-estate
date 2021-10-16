export default {
  version: "0.0.1",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "eNekretnine.ba - sve nekretnine na jednom mjestu!",
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
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100&display=swap"
      }
    ],
    script: [
      {
        src:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPijVFzKPk9M21q2dCj3-_1Yrve0mDx60&map_ids=90b8b95b1bbd0bc9&callback=initMap"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/styles/global.scss",
    "@/assets/styles/custom_components.scss"
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
    ["@nuxtjs/fontawesome"],
    ["@nuxtjs/tailwindcss"],
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

  fontawesome: {
    icons: {
      solid: [
        "faAngleRight",
        "faAngleLeft",
        "faUtensils",
        "faShoppingCart",
        "faGraduationCap",
        "faReceipt",
        "faSortDown",
        "faCoffee",
        "faCloudUploadAlt",
        "faHome",
        "faChartLine",
        "faArrowCircleRight",
        "faImages",
        "faReply",
        "faTrashAlt",
        "faMinusCircle",
        "faUserSlash",
        "faReplyAll",
        "faEllipsisV",
        "faThLarge",
        "faSearch",
        "faStar",
        "faGrin",
        "faPaperclip",
        "faPaperPlane",
        "faBell",
        "faTh",
        "faCog",
        "faBars",
        "faUser",
        "faUserPlus",
        "faEnvelope",
        "faPlus",
        "faUserCircle",
        "faUserCog",
        "faBullhorn",
        "faDoorClosed",
        "faVectorSquare",
        "faHeart",
        "faCoins",
        "faFileUpload",
        "faShareSquare",
        "faThumbsUp",
        "faEnvelopeOpenText",
        "faHouseUser",
        "faUserTimes",
        "faCheckSquare",
        "faUserCheck",
        "faFlag",
        "faUserSecret",
        "faKey",
        "faBed",
        "faBuilding",
        "faRulerCombined"
      ]
    }
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "nuxt-ssr-cache",
    "@nuxtjs/auth",
    "@nuxtjs/axios",
    ["nuxt-material-design-icons"]
  ],

  axios: {
    baseURL: "https://polar-cove-31327.herokuapp.com/"
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

  loading: {
    color: "grey"
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
      /^\/$/
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
