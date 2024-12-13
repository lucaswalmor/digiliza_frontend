<template>
    <ProgressBar
        mode="indeterminate"
        v-if="isLoading"
        style="height: 6px"
    ></ProgressBar>

    <div class="col-md-12" v-else>
        <div class="row">
            <div class="col-md-3">
                <IftaLabel>
                    <DatePicker
                        v-model="dados.dat_inicio"
                        inputId="date"
                        showIcon
                        iconDisplay="input"
                        variant="filled"
                        dateFormat="dd/mm/yy"
                        :minDate="minDate"
                        placeholder="Selecione"
                        class="w-full"
                    />
                    <label for="date">Data da reserva</label>
                </IftaLabel>
            </div>

            <div class="col-md-3">
                <IftaLabel>
                    <Select
                        v-model="dados.horario"
                        :options="horarios"
                        filter
                        placeholder="Selecione"
                        class="w-full"
                        :disabled="!dados.dat_inicio"
                    >
                        <template #value="slotProps">
                            <div
                                v-if="slotProps.value"
                                class="flex items-center"
                            >
                                <div>{{ slotProps.value }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <div>{{ slotProps.option }}</div>
                            </div>
                        </template>
                    </Select>
                    <label for="cliente">Horário da reserva</label>
                </IftaLabel>
            </div>

            <div class="col-md-3">
                <IftaLabel>
                    <Select
                        v-model="dados.cliente"
                        :options="clientes"
                        filter
                        optionLabel="nome"
                        placeholder="Selecione"
                        class="w-full"
                    >
                        <template #value="slotProps">
                            <div
                                v-if="slotProps.value"
                                class="flex items-center"
                            >
                                <div>{{ slotProps.value.nome }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <div>{{ slotProps.option.nome }}</div>
                            </div>
                        </template>
                    </Select>
                    <label for="cliente">Cliente</label>
                </IftaLabel>
            </div>

            <div class="col-md-3">
                <IftaLabel>
                    <Select
                        v-model="dados.mesa"
                        :options="mesas"
                        filter
                        optionLabel="numero"
                        placeholder="Selecione"
                        class="w-full"
                    >
                        <template #value="slotProps">
                            <div
                                v-if="slotProps.value"
                                class="flex items-center"
                            >
                                <div>{{ slotProps.value.numero }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <div>{{ slotProps.option.numero }}</div>
                            </div>
                        </template>
                    </Select>
                    <label for="cliente">Mesa</label>
                </IftaLabel>
            </div>
        </div>

        <div class="col-md-12 mt-3 d-flex gap-2">
            <Button label="Voltar" class="text-xs" severity="secondary" size="small" @click="$router.back()" />
            
            <Button @click="salvar" :disabled="isLoadingCadastro" class="text-xs" size="small">
                <ProgressSpinner style="width: 25px; height: 25px" v-if="isLoadingCadastro" />
                <span v-else>Finalizar Reserva</span>
            </Button>
        </div>

        <Toast />
    </div>
</template>

<script>
import { mapActions } from "vuex";
import Select from "primevue/select";
import ProgressBar from "primevue/progressbar";
import ProgressSpinner from "primevue/progressspinner";
import IftaLabel from "primevue/iftalabel";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import Toast from "primevue/toast";

export default {
    inject: ["getToken"],
    components: {
        Select,
        ProgressBar,
        ProgressSpinner,
        IftaLabel,
        DatePicker,
        Button,
        Toast,
    },
    data() {
        return {
            isLoading: false,
            isLoadingCadastro: false,
            token: this.getToken(),
            clientes: [],
            mesas: [],
            dados: {
                dat_inicio: null,
                horario: null,
                cliente: null,
                mesa: null,
            },
            horarios: this.gerarHorarios("18:00", "23:59", 10),
            minDate: new Date(),
        };
    },
    methods: {
        ...mapActions(["updateBreadcrumb"]),
        setBreadcrumb() {
            const breadcrumbItems = [
                { label: "Reservas", route: "/reservas" },
                { label: "Cadastro" },
            ];

            this.updateBreadcrumb(breadcrumbItems);
        },
        getClientes() {
            this.isLoading = true;

            this.$axios
                .get("/clientes", {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((res) => {
                    this.clientes = res.data.data;
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                });
        },
        getMesas() {
            this.isLoading = true;

            this.$axios
                .get("/mesas", {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((res) => {
                    this.mesas = res.data.data;
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                });
        },
        gerarHorarios(inicio, fim, intervalo) {
            const horarios = [];
            const hoje = new Date();
            const diaSemana = hoje.getDay();

            if (diaSemana === 0) {
                inicio = "00:00";
                fim = "23:59";
            }

            let [hora, minuto] = inicio.split(":").map(Number);
            const [fimHora, fimMinuto] = fim.split(":").map(Number);

            while (
                hora < fimHora || 
                (hora === fimHora && minuto <= fimMinuto)
            ) {
                const horaFormatada = `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`;
                horarios.push(horaFormatada);

                minuto += intervalo;
                if (minuto >= 60) {
                    minuto -= 60;
                    hora += 1;
                }
            }

            return horarios;
        },
        formatarData() {
            if (this.dados.dat_inicio) {
                const data = new Date(this.dados.dat_inicio);
                this.dados.dat_inicio = data.toISOString().slice(0, 10);
            }
        },
        salvar() {
            this.$axios.post('/reserva', this.dados, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(res => {
                if (res.status === 201) {
                    this.dados = {
                        dat_inicio: null,
                        horario: null,
                        cliente: null,
                        mesa: null,
                    }
                    
                    this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: res.data.message, life: 5000 });
                }
            }).catch(err => {
                this.$toast.add({ severity: 'error', summary: 'Erro', detail: err.response.data.message, life: 5000 });
            })
        },
    },
    mounted() {
        this.getClientes();
        this.getMesas();
        this.setBreadcrumb();
    },
};
</script>

<style>
</style>