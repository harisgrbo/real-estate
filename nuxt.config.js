export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'real-estate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100&display=swap'}
    ],
    script: [
      { src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPijVFzKPk9M21q2dCj3-_1Yrve0mDx60&center=47.6726318219974,-122.3283706665039&zoom=14&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=480x360"}

    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/styles/global.scss',
    '~assets/styles/custom_components.scss',
    'swiper/css/swiper.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/snackbar/index.js',
    '~plugins/moment.js',
    {
      src: '~plugins/progress.js', mode: 'client'
    },
    { src: '~plugins/swiper.js', mode: 'client' },
    { src: '~plugins/modal.js', mode: 'client' },
    { src: '~plugins/datepicker.js', mode: 'client' },
    { src: '~plugins/infiniteloading.js', mode: 'client' },

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ['@nuxtjs/fontawesome'],
    ['@nuxtjs/laravel-echo', {
      broadcaster: 'pusher',
      authEndpoint: 'https://polar-cove-31327.herokuapp.com/broadcasting/auth',
      key: '273b7047e16aaf0ad6e0',
      cluster: 'eu',
      encrypted: true,
      authModule: true,
      connectOnLogin: true,
      disconnectOnLogout: true,
    }]
  ],

  fontawesome: {
    icons: {
      solid: ['faAngleRight', 'faImages', 'faReply', 'faMinusCircle', 'faUserSlash', 'faReplyAll', 'faEllipsisV', 'faThLarge', 'faSearch', 'faStar', 'faGrin', 'faPaperclip', 'faPaperPlane', 'faBell', 'faCog', 'faBars', 'faUser', 'faUserPlus', 'faEnvelope', 'faPlus', 'faUserCircle', 'faUserCog', 'faHeart', 'faCoins', 'faShareSquare', 'faThumbsUp', 'faEnvelopeOpenText', 'faHouseUser', 'faUserTimes', 'faUserCheck', 'faFlag', 'faUserSecret', 'faKey', 'faBed', 'faBuilding', 'faRulerCombined'],
    }
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    ['nuxt-material-design-icons'],
  ],

  axios: {
    baseURL: 'https://polar-cove-31327.herokuapp.com/'
  },

  auth: {
    redirect: {
      login: '/auth/login',
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/oauth/token', method: 'post', propertyName: 'access_token' },
          logout: false,
          user: { url: '/me', method: 'get', propertyName: 'data' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
        // autoFetchUser: true
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
