import { defineNuxtConfig, NuxtConfig } from 'nuxt'
import { ApolloModuleOptions } from '@nuxt3/apollo-module';
import { HttpLink } from '@apollo/client';

interface Options extends NuxtConfig {
  apollo: ApolloModuleOptions
};

const opts: Options = {
  css: [
    'maz-ui/css/main.css',
  ],
  modules: [
    '@nuxt3/apollo-module'
  ],
  build: {
    transpile: ['maz-ui'],
  },
  apollo: {
    clientConfigs: {
      default: {
        authenticationType: 'JWT',
        link: new HttpLink({
          uri: 'http://localhost:8000/graphql',
        })
      }
    }
  }
};
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig(opts)
