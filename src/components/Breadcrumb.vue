<template>
    <div class="mt-3 text-xs">
        <!-- <Breadcrumb :home="home" :model="breadcrumbItems" /> -->
        <Breadcrumb :home="home" :model="breadcrumbItems">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']" />
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
    </div>
</template>

<script>
import Breadcrumb from 'primevue/breadcrumb';
import { mapGetters } from 'vuex';

export default {
    components: {
        Breadcrumb,
    },
    data() {
        return {
            home: {
                icon: 'pi pi-home',
                route: '/home'
            },
        }
    },
    computed: {
        ...mapGetters(['getBreadcrumbItems']),

        breadcrumbItems() {
            return this.getBreadcrumbItems;
        }
    }
}
</script>

<style>

</style>