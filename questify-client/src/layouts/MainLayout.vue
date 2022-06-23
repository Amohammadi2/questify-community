<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleleftMenu"
        />

        <q-toolbar-title>
          Questify
        </q-toolbar-title>

        <q-btn flat dense round icon="login"/>
        <q-btn flat dense round icon="app_registration"/>
        <div style="margin: 0 10px">Questify v0.0.0-alpha</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="linkMenuOpen"
      show-if-above
      bordered
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'انجمن ها',
    caption: 'لیست انجمن های دانش آموزی',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'پرسش و پاسخ',
    caption: 'پلتفرم پرسش و پاسخ کوئستیفای',
    icon: 'quiz',
    link: 'https://quasar.dev'
  }
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const linkMenuOpen = ref(false)

    return {
      essentialLinks: linksList,
      linkMenuOpen: linkMenuOpen,
      toggleleftMenu () {
        linkMenuOpen.value = !linkMenuOpen.value
      }
    }
  }
});
</script>
