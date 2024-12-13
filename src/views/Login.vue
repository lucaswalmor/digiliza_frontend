<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
            <div class="col-md-12 text-center mb-2">
                <span class="text-secondary font-bold fs-5">
                    Login
                </span>
            </div>

            <div>
                <label for="email" class="text-xs text-surface-900 dark:text-surface-0 font-medium mb-2 block">Email</label>
                <InputText :disabled="isLoading" v-model="dados.email" id="email" type="text" placeholder="Email address" size="small" class="w-full mb-4" />

                <label for="password" class="text-xs text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
                <Password :disabled="isLoading" v-model="dados.password" :feedback="false" class="w-full mb-4" size="small" />

                <div class="mb-4 text-xs">
                    <span>Ainda não possuí cadastro? </span>
                    <router-link to="/cadastro">
                        Clique aqui!
                    </router-link>
                </div>

                <Button @click="login" :disabled="isLoading" class="w-full text-xs" size="small">
                    <ProgressSpinner style="width: 25px; height: 25px" v-if="isLoading" />
                    <span v-else>Login</span>
                </Button>
            </div>
        </div>

        <Toast />
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';

export default {
    components: {
        InputText,
        Button,
        Password,
        Toast,
        ProgressSpinner,
    },
    data() {
        return {
            dados: {
                email: '',
                password: '',
            },
            isLoading: false,
        }
    },
    methods: {
        login() {
            this.isLoading = true;

            this.$axios.post(`/login`, this.dados).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
                    this.isLoading = false;
                    this.$router.push({name: 'home'})
                }
            }).catch(err => {
                this.isLoading = false;
                this.$toast.add({ severity: 'error', summary: 'Erro', detail: err.response.data.message, life: 5000 });
            })
        }
    }
};
</script>

<style>
.p-inputtext.p-component.p-password-input {
    width: 100% !important;
}
</style>