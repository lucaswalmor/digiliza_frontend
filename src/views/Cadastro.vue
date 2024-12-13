<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border w-full lg:w-12 mx-auto">
            <div class="col-md-12 text-center mb-2">
                <span class="text-secondary font-bold fs-5">
                    Cadastro
                </span>
            </div>

            <div>
                <div class="mb-2">
                    <label for="nome" class="text-xs text-surface-900 dark:text-surface-0 font-medium block">Nome</label>
                    <InputText :disabled="isLoading" v-model="dados.nome" id="nome" type="text" required placeholder="Seu nome" size="small" class="w-full mb-1" />
                    <span v-if="errors.nome" class="text-xs font-italic">
                        <span class="text-danger">Campo nome é obrigatório</span>
                    </span>
                </div>

                <div class="mb-2">
                    <label for="email" class="text-xs text-surface-900 dark:text-surface-0 font-medium block">Email</label>
                    <InputText :disabled="isLoading" v-model="dados.email" id="email" type="email" required placeholder="Seu email" size="small" class="w-full mb-1" />
                    <span v-if="errors.email" class="text-xs font-italic">
                        <span class="text-danger">{{ errors.email }}</span>
                    </span>
                </div>

                <div class="mb-2">
                    <label for="password" class="text-xs text-surface-900 dark:text-surface-0 font-medium block">Senha</label>
                    <Password :disabled="isLoading" v-model="dados.password" required :feedback="false" class="w-full mb-4" size="small" />
                    <span v-if="errors.password" class="text-xs font-italic">
                        <span class="text-danger">Campo senha é obrigatório</span>
                    </span>
                </div>

                <div class="d-flex gap-2">
                    <Button label="Voltar" severity="secondary" class="text-xs" size="small" @click="$router.back()" />
                    
                    <Button @click="login" :disabled="isLoading" class="text-xs" size="small" >
                        <ProgressSpinner style="width: 25px; height: 25px" v-if="isLoading" />
                        <span v-else>Finalizar Cadastro</span>
                    </Button>
                </div>
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
            errors: [],
        }
    },
    methods: {
        login() {
            this.isLoading = true;

            this.$axios.post(`/cadastro`, this.dados).then(res => {
                if (res.status === 200) {
                    this.isLoading = false;
                    this.$router.push({name: 'login'})
                }
            }).catch(err => {
                this.errors = err.response.data.errors
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