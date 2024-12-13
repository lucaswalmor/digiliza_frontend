<template>
    <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm flex-wrap d-flex">
            <!-- Botão Anterior -->
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link text-xs" href="#" @click.prevent="previousPage" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <!-- Primeira página -->
            <li v-if="showFirstPage" class="page-item" :class="{ active: currentPage === 1 }">
                <a class="page-link text-xs" href="#" @click.prevent="changePage(1)">1</a>
            </li>

            <!-- Reticências após as primeiras páginas -->
            <li v-if="showStartEllipsis" class="page-item disabled">
                <span class="page-link text-xs">...</span>
            </li>

            <!-- Páginas vizinhas -->
            <li v-for="page in pagesToShow" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <a class="page-link text-xs" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>

            <!-- Reticências antes das últimas páginas -->
            <li v-if="showEndEllipsis" class="page-item disabled">
                <span class="page-link text-xs">...</span>
            </li>

            <!-- Última página -->
            <li v-if="showLastPage" class="page-item" :class="{ active: currentPage === totalPages }">
                <a class="page-link text-xs" href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
            </li>

            <!-- Botão Próximo -->
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link text-xs" href="#" @click.prevent="nextPage" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    computed: {
        pagesToShow() {
            const pages = [];
            const startPage = Math.max(2, this.currentPage - 2); // Páginas vizinhas antes da página atual
            const endPage = Math.min(this.totalPages - 1, this.currentPage + 2); // Páginas vizinhas após a página atual

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            return pages;
        },
        showFirstPage() {
            // Mostra a primeira página se o total de páginas for maior que 1
            return this.totalPages > 0 && this.currentPage > 0;
        },
        showLastPage() {
            // Mostra a última página se o total de páginas for maior que 1
            return this.totalPages > 1 && this.currentPage < this.totalPages;
        },
        showStartEllipsis() {
            // Mostra as reticências após as primeiras páginas se houver páginas suficientes
            return this.currentPage > 3 && this.totalPages > 5;
        },
        showEndEllipsis() {
            // Mostra as reticências antes das últimas páginas se houver páginas suficientes
            return this.currentPage < this.totalPages - 2 && this.totalPages > 5;
        }
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.$emit('page-changed', this.currentPage - 1);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('page-changed', this.currentPage + 1);
            }
        },
        changePage(page) {
            if (page !== this.currentPage) {
                this.$emit('page-changed', page);
            }
        }
    }
};
</script>

<style scoped>
.page-item.disabled .page-link {
    pointer-events: none;
    opacity: 0.5;
}

.page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}
</style>
