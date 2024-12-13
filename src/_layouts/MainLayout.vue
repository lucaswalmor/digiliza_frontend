<template>
    <div class="wrapper">
        <div class="sidebar">
            <div class="sidebar-header p-2 d-flex justify-content-center align-items-center">
                <span> 
                    Bem vindo
                </span>
            </div>
    
            <ul class="text-xs">
                <li class="submenu-parent" :class="$route.name == 'home' ? 'menu-home-ativo' : ''" @click.stop="this.$router.push({name: 'home'})">
                    <span class="submenu-toggle flex align-items-center justify-content-between">
                        <div>
                            <i class="fa-solid pe-2 fa-home fa-xl"></i>
                            Home
                        </div>
                    </span>
                </li>
                
                <li class="submenu-parent" :class="$route.name == 'reservas' ? 'menu-reservas-ativo' : ''" @click.stop="this.$router.push({name: 'reservas'})">
                    <span class="submenu-toggle flex align-items-center justify-content-between">
                        <div>
                            <i class="fa-solid pe-2 fa-clock fa-xl"></i>
                            Reservas
                        </div>
                    </span>
                </li>
            </ul>
    
            <ul class="submenu-parent fixed-bottom" style="width: 250px;">
                <li class="text-light cursor-pointer" @click="logout">
                    <i class="fa-solid fa-power-off pe-2"></i>
                    Sair
                </li>
            </ul>
        </div>
        
        <div class="main_content">
            <div class="col-md-12 d-flex p-3 justify-content-between align-items-center" style="background-color: rgb(70, 82, 100); height: 60px;">
                <!-- <div class="btn-menu-bar">
                    <Button @click="visible = true" class="btn-toggle-menu btn-sidebard" style="height: 40px;">
                        <i class="fa-solid fa-bars fa-lg"></i>
                    </Button>
                </div>
    
                <button 
                    class="btn-toggle-menu btn"
                    @click="visible = true"
                >
                    <i class="fa-solid fa-bars text-light"></i>
                </button> -->
            </div>
    
            <Drawer v-model:visible="visible" :header="'Empresa'" class="drawer-dashboard">
                <div class="sidebar w-100">
                    <ul class="text-xs">
                        <li class="submenu-parent" :class="$route.name == 'home' ? 'menu-home-ativo' : ''" @click.stop="this.$router.push({name: 'home'})">
                            <span class="submenu-toggle flex align-items-center justify-content-between">
                                <div>
                                    <i class="fa-solid pe-2 fa-chart-line fa-xl"></i>
                                    Home
                                </div>
                            </span>
                        </li>

                        <li class="submenu-parent" :class="$route.name == 'reservas' ? 'menu-reservas-ativo' : ''" @click.stop="this.$router.push({name: 'reservas'})">
                            <span class="submenu-toggle flex align-items-center justify-content-between">
                                <div>
                                    <i class="fa-solid pe-2 fa-chart-line fa-xl"></i>
                                    Reservas
                                </div>
                            </span>
                        </li>
                    </ul>
    
                    <ul class="fixed-bottom" style="width: 250px;">
                        <li class="text-light cursor-pointer" @click="logout">
                            <i class="fa-solid fa-power-off pe-2"></i>
                            Sair
                        </li>
                    </ul>
                </div>
            </Drawer>
    
            <div class="info">
                <div class="card p-2 border-0 shadow">
                    <div class="infos-menu-bar">
                        <div class="d-flex gap-3 align-items-center">
                            <div>
                                <div class="ms-auto text-xs d-flex gap-1">
                                    <span class="font-bold" style="color: #00ABFF">Data atual:</span>
                                    <span>{{ currentDate }} - {{ currentTime }}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="ms-auto text-xs d-flex gap-1">
                                <span class="font-bold" style="color: #00ABFF">Usuário:</span> 
                                <span>
                                    {{ usuario.nome }}
                                </span>
                            </div>
                            <div class="ms-auto text-xs">
                                <!-- <span class="font-bold" style="color: #00ABFF">Função:</span> <span>{{ usuario.tipo_usuario }}</span> -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-12">
                    <Breadcrumb />
                    <hr>
                </div>
    
                <div class="col-md-12 mt-5">
                    <RouterView />
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import Menubar from 'primevue/menubar';
    import Breadcrumb from '@/components/Breadcrumb.vue';
    import moment from 'moment-timezone';
    import Button from 'primevue/button';
    import Drawer from 'primevue/drawer';
    import { mapState } from 'vuex';
    
    export default {
        inject: ['getUsuario'],
        components: {
            Menubar,
            Breadcrumb,
            Button,
            Drawer,
        },
        data() {
            return {
                estoqueMenuAtivo: false,
                usuario: this.getUsuario(),
                isOpen: false,
                sidebarCollapse: false,
                currentDate: '',
                currentTime: '',
                visible: false,
                usuario: JSON.parse(localStorage.getItem('usuario')),
            }
        },
        methods: {
            toggleSubmenu(menu) {
                this.submenus[menu] = !this.submenus[menu];
                for (const key in this.submenus) {
                    if (key !== menu) {
                        this.submenus[key] = false; // Fecha outros submenus
                    }
                }
            },
            updateDateTime() {
                const brasiliaTime = moment().tz('America/Sao_Paulo');
                this.currentTime = brasiliaTime.format('HH:mm:ss');
                this.currentDate = brasiliaTime.format('DD/MM/YYYY');
            },
            onToggleCollapse(collapsed) {
                this.sidebarCollapse = collapsed
    
                let classe = document.querySelector('.vsm--header')
                // Verifica se o menu está colapsado e ajusta o texto
                if (collapsed) {
                    classe.innerHTML = ''
                } else {
                    classe.innerHTML = 'Lucas Steinbach'
                }
            },
            logout() {
    
                this.axios.post('/logout', null, {
                    headers: {
                        'Authorization': `Bearer ${this.usuario.token}`
                    }
                }).then(res => {
                    if (res.status === 200) {
                        localStorage.removeItem('usuario')
                        localStorage.removeItem('permissoes')
                        sessionStorage.removeItem('avisoProdutos')
                        this.$router.push('/login')
                    }
                });
            },
            abrirPaginaLoja() {
                const empresa = this.usuario.empresa.nome_empresa
                const textoFormatado = empresa.replace(/\s+/g, '').toLowerCase();
                window.open(`/${textoFormatado}?loja=${this.usuario.empresa.empresa_id}`)
            },
        },
        computed: {
            ...mapState(['categoriaEmpresa'])
        },
        mounted() {
            if (window.innerWidth <= 768) {
                console.log('true')
                this.sidebarCollapse = true;
            }
    
            this.updateDateTime();
            setInterval(this.updateDateTime, 1000); 
    
        },
    }
    </script>
    
    <style>
    .sidebar-none {
        display: none !important;
    }
    
    .main_content_full {
        margin: 0 !important;
    }
    
    .infos-menu-bar {
        width: 100%;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: space-between !important;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .navbar-mobile {
        justify-content: space-between !important;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        align-items: center;
    }
    
    .btn-menu-bar {
        display: none;
    }
    
    .btn-toggle-menu {
        background-color: #008FD5 !important;
    }
    
    .drawer-dashboard > .p-drawer-content {
        background: #363F4D !important;
        padding: 0 !important;
    }
    
    .p-drawer-header {
        background-color: #2c333f;
        color: #008FD5;
    }
    
    .p-drawer.p-component.drawer-dashboard {
        border: 0 !important;
    }
    
    .menu-home-ativo,
    .menu-reservas-ativo {
        background: #465264;
        color: #fff;
        font-weight: bold;
    }
    
    .submenu-parent:hover {
        background: #008FD5;
    }
    
    .wrapper{
        display: flex;
        position: relative;
    }
    
    .sidebar{
        width: 250px;
        height: 100%;
        background: #363F4D;
        position: fixed;
        z-index: 1000;
    }
    
    .sidebar-header {
        color: #00ABFF;
        font-weight: bold;
        height: 60px;
        background-color: #2c333f;
    }
    
    .sidebar-header h2{
        margin: 0;
    }
    
    .sidebar ul li{
        padding: 15px;
        border-bottom: 1px solid #00496c;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        /* border-top: 1px solid rgba(255,255,255,0.05); */
    }    
    
    .sidebar ul li {
        color: #fff;
        display: block;
        cursor: pointer;
    }
    
    .sidebar ul li a .fas{
        width: 25px;
    }
        
    .sidebar ul li:hover a{
        color: #fff;
    }
    
    .sidebar .social_media{
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
    }
    
    .sidebar .social_media a{
        display: block;
        width: 40px;
        background: #00496c;
        height: 40px;
        line-height: 45px;
        text-align: center;
        margin: 0 5px;
        color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    
    .main_content{
        width: 100%;
        margin-left: 250px;
    }
    
    .main_content .header{
        padding: 20px;
        background: #fff;
        color: #717171;
        border-bottom: 1px solid #e0e4e8;
    }
    
    .main_content .info{
        margin: 20px;
        color: #717171;
        line-height: 25px;
    }
    
    @media (max-height: 500px){
        .social_media{
            display: none !important;
        }
    }
    
    li {
        list-style: none;
    }
    
    ul {
        margin: 0;
        padding: 0;
    }
    
    .text-fim-plano {
        color: rgb(255 0 24) !important;
    }
    
    .btn-sidebard {
        display: none ;
    }
    
    .btn-sidebard-show {
        display: block !important;
    }
    
    .submenu {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        opacity: 0;
    }
    
    .submenu.open {
        max-height: 200px;
        opacity: 1;
        margin-top: 15px;
    }
    
    .rotate-setinha {
        transform: rotate(180deg);
        transition: transform 0.3s ease;
    }
    </style>