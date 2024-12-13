import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios';

// PRIMEVUE
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primeflex/themes/primeone-light.css'
import ToastService from 'primevue/toastservice';

// BOOTSTRA 5.3.3
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const customTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.provide('getToken', () => localStorage.getItem('token'));
app.provide('getUsuario', () => JSON.parse(localStorage.getItem('usuario')));
app.use(PrimeVue, {
    theme: {
        preset: customTheme,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    },
    locale: {
        dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar',
        emptyMessage: 'Nenhuma opção disponível',
        pending: 'Aguardando',
        noFileChosenMessage: 'Nenhum arquivo selecionado',
        emptySearchMessage: 'Nenhuma opção disponível',
    }
});
app.use(ToastService);
app.use(store)
app.use(router)
app.mount('#app')
