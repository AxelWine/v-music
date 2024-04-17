const i18next = require('i18next');
const backend = require('i18next-node-fs-backend');

i18next
  .use(backend)
  .init({
    fallbackLng: 'es',
    backend: {
      loadPath: __dirname + '/locales/{{lng}}.json'
    }
  });