<template>
    <div class="col-md-12">
        <div class="card border-0 shadow p-3 mt-3">
            <div class="col-md-12 mb-3 d-flex gap-2">
                <Button label="Filtrar" @click="popoverFiltros($event)" icon="pi pi-filter" class="text-xs" size="small" outlined />
                <Button label="Limpar Filtros" @click="limparFiltros" v-if="hasFiltro" icon="pi pi-filter" class="text-xs" size="small" outlined severity="danger" />
                <Button label="Fazer Reserva" class="text-xs" size="small" outlined severity="help" @click="$router.push({name: 'cadastro-reserva'})" />
            </div>
            
            <ProgressBar mode="indeterminate" v-if="isLoading" style="height: 6px"></ProgressBar>

            <div class="table-responsive" v-else>
                <table class="table table-striped text-xs">
                    <thead>
                        <tr>
                            <th>Colaborador</th>
                            <th>Cliente</th>
                            <th>Data Reserva</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(reserva, index) in reservas" :key="index">
                            <td class="align-middle"> {{ reserva.usuario.nome }} </td>
                            <td class="align-middle"> {{ reserva.cliente.nome }} </td>
                            <td class="align-middle"> {{ reserva.dat_reserva }} </td>
                            <td class="align-middle">
                                <Button severity="info" icon="pi pi-cog" @click="popoverAcoes($event, reserva)" class="p-1" outlined ></Button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagination :currentPage="currentPage" :totalPages="totalPages" @page-changed="getReservas" />
            </div>

            <Popover ref="filtros">
                <div class="col-md-12">
                    <div class="col-md-12 mt-3">
                        <IftaLabel>
                            <InputText size="small" type="text" class="w-full" v-model="filtros.cliente" />
                            <label for="" class="form-label text-xs">Cliente</label>
                        </IftaLabel>
                    </div>

                    <div class="col-md-12 mt-3">
                        <IftaLabel>
                            <InputText size="small" type="text" class="w-full" v-model="filtros.colaborador" />
                            <label for="" class="form-label text-xs">Colaborador</label>
                        </IftaLabel>
                    </div>

                    <div class="col-md-12 mt-3">
                        <IftaLabel>
                            <DatePicker
                                v-model="filtros.dat_inicio"
                                inputId="date"
                                showIcon
                                iconDisplay="input"
                                variant="filled"
                                dateFormat="dd/mm/yy"
                                placeholder="Selecione"
                            />
                            <label for="" class="form-label text-xs">Data Reserva</label>
                        </IftaLabel>
                    </div>

                    <div class="col-md-12 mt-3 d-flex gap-3">
                        <Button outlined label="Filtrar" size="small" severity="info" @click="filtrar" />
                    </div>
                </div>
            </Popover>

            <Popover ref="op">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item cursor-pointer hover:text-blue-400" @click="this.$router.push(`/reservas/editar/${reservaSelecionada.id}`)">
                        <i class="fa-solid fa-pen text-primary pe-1"></i>
                        Editar
                    </li>
                    <li class="list-group-item cursor-pointer hover:text-blue-400" @click="excluir"> 
                        <i class="fa-solid fa-trash text-danger pe-1"></i>
                        Excluir
                    </li>
                </ul>
            </Popover>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import { mapActions } from 'vuex';
import ProgressBar from 'primevue/progressbar';
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import IftaLabel from 'primevue/iftalabel';

export default {
    inject: ['getToken'],
    components: {
        Pagination,
        ProgressBar,
        Button,
        Popover,
        InputText,
        DatePicker,
        IftaLabel,
    },
    data() {
        return {
            isLoading: false,
            hasFiltro: false,
            reservaSelecionada: {},
            reservas: [],
            token: this.getToken(),
            currentPage: 1,
            totalPages: 0,
            filtros: {
                colaborador: '',
                cliente: '',
                dat_inicio: '',
            }
        }
    },
    methods: {
        ...mapActions(["updateBreadcrumb"]),
        setBreadcrumb() {
            const breadcrumbItems = [{ label: "Reservas", route: "/reservas" }];

            this.updateBreadcrumb(breadcrumbItems);
        },
        getReservas(page = 1, query = '') {
            this.isLoading = true;

            this.$axios.get(`/reservas?page=${page}${query}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(res => {
                this.reservas = res.data.data
                this.totalPages = res.data.pagination.last_page;
                this.currentPage = page;
                this.isLoading = false
            }).catch(err => {
                this.isLoading = false
                console.log(err)
            })
        },
        filtrar() {
            let params = [];

            if (this.filtros.cliente != '') {
                params.push(`cliente=${this.filtros.cliente}`);
            }
            if (this.filtros.colaborador != '') {
                params.push(`colaborador=${this.filtros.colaborador}`);
            }
            if (this.filtros.dat_inicio != '') {
                params.push(`dat_inicio=${this.filtros.dat_inicio}`);
            }

            const query = params.length ? `&${params.join('&')}` : '';

            this.hasFiltro = true;

            this.getReservas(1, query);
        },
        limparFiltros() {
            this.filtros = {
                cliente: '',
                colaborador: '',
                dat_inicio: '',
            }

            this.hasFiltro = false;

            this.getReservas(1);
        },
        popoverAcoes(event, reserva) {
            this.reservaSelecionada = reserva
            this.$refs.op.toggle(event);
        },
        popoverFiltros(event) {
            this.$refs.filtros.toggle(event);
        },
        excluir() {
            this.$axios.delete(`/reserva/${this.reservaSelecionada.id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then(res => {
                if (res.status === 200) {
                    this.getReservas()
                    this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: res.data.message, life: 5000 });
                }
            }).catch(err => {
                this.$toast.add({ severity: 'error', summary: 'Erro', detail: err.response.data.message, life: 5000 });
            })
        }
    },
    mounted() {
        this.setBreadcrumb();
        this.getReservas();
    },
};
</script>

<style>
</style>