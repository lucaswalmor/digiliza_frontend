<template>
    <div class="home">
        <div class="container my-5">
            <h1 class="text-center">Documentação do Sistema de Reservas</h1>

            <section class="mt-5">
              <h2>Descrição do Projeto</h2>
              <p>
                Este sistema permite gerenciar reservas de mesas para um
                restaurante. Ele inclui funcionalidades de login, gestão de
                reservas, validações de horários e administração de dados.
              </p>
            </section>

            <section class="mt-5">
              <h2>Tecnologias Utilizadas</h2>
              <ul>
                  <li>
                      <strong>Frontend:</strong> HTML, CSS, JavaScript, Vue.js, primevue e Bootstrap.
                  </li>
                  <li><strong>Backend:</strong> PHP com Laravel.</li>
                  <li><strong>Banco de Dados:</strong> MySQL.</li>
              </ul>
            </section>

            <section class="mt-5">
              <h2>Funcionalidades Implementadas</h2>
              <ul>
                  <li>Sistema de Login.</li>
                  <li>Cadastro e gerenciamento de reservas.</li>
                  <li>Validação de horários e conflitos de reservas.</li>
                  <li>Painel administrativo com listagem de reservas.</li>
                  <li>
                    Banco de dados configurado com Migrations, Seeds e Factories.
                  </li>
              </ul>
            </section>

            <section class="mt-5">
              <h2>Regras de Negócio</h2>
              <ul>
                  <li>
                      Reservas permitidas das 18:00 às 23:59, exceto aos
                      domingos, quando são permitidas durante o dia todo.
                  </li>
                  <li>Evita reservas com horários conflitantes.</li>
                  <li>Validação de disponibilidade de mesas.</li>
              </ul>
            </section>

            <section class="mt-5">
              <h2>Como Executar</h2>
              <ol>
                <li>
                  Clone o repositório: 
                    <code>git clone https://github.com/lucaswalmor/digiliza_frontend.git</code>
                    <code>git clone https://github.com/lucaswalmor/digiliza_frontend.git</code>
                  </li>
                <li>
                    Instale as dependências: <code>composer install</code> e
                    <code>npm install</code>
                </li>
                <li>
                    Configure o arquivo <code>.env</code> com seu banco de
                    dados.
                </li>
                <li>
                    Execute as migrations e seeds:
                    <code>php artisan migrate --seed</code>
                </li>
                <li>Inicie o servidor: <code>php artisan serve</code></li>
                <li>Acesse: <code>http://localhost:8000</code></li>
              </ol>
            </section>

            <section class="mt-5">
                <h2>Contato</h2>
                <p>
                    Envie sua entrega pelo <strong>GitHub</strong> ou para o
                    e-mail:
                    <a href="mailto:contato@digiliza.com.br"
                        >contato@digiliza.com.br</a
                    >.
                </p>
            </section>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "HomeView",
    components: {},
    methods: {
        ...mapActions(["updateBreadcrumb"]),
        setBreadcrumb() {
            const breadcrumbItems = [{ label: "Home", route: "/home" }];

            this.updateBreadcrumb(breadcrumbItems);
        },
    },
    mounted() {
        this.setBreadcrumb();
    },
};
</script>
