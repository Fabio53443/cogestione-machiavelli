<script>
    import "../app.css";
    import favicon from "../favicon.png";
    import { page } from "$app/stores";
    $: pageName = $page.data.pageName;
</script>
<svelte:head>
   <title>{pageName}</title>
</svelte:head>
<main>
    <div class="container mx-auto p-4 overflow-x-hidden">
        <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#4F1787] shadow-md rounded-lg">
            {#if pageName === "Cogestione"}
                <img src={favicon} alt="Logo" class="w-12 h-12 mr-4" />
            {:else}
                <a
                    href="/"
                    class="text-4xl text-gray-100 mr-4 hover:text-[#FB773C] transition-colors duration-200"
                    >🏠</a
                >
            {/if}
            <h1 class="text-4xl font-semibold text-[#EB3678] flex-1 text-center">
                {pageName}
            </h1>
            <nav class="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-4 sm:mt-0">
                <a href="/login" class="text-gray-100 hover:text-[#FB773C] transition-colors duration-200 text-lg py-2">Accedi</a>
                <a href="/register" class="text-gray-100 hover:text-[#FB773C] transition-colors duration-200 text-lg py-2">Registrati</a>
                <a href="/docenti" class="text-gray-100 hover:text-[#FB773C] transition-colors duration-200 text-lg py-2">Portale Docenti</a>
            </nav>
        </div>
    </div>

    <slot></slot>

    <footer class="footer bg-[#4F1787] text-gray-100 p-4">
        <div class="text-center text-sm">
            Copyright &copy; 2024 <a
                href="https://smartlinux.xyz"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#FB773C] hover:underline hover:text-[#EB3678] transition duration-200"
                >Smartlinux.xyz</a
            >. All rights reserved.
        </div>
    </footer>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

    /* body {
        background-color: #180161;
        color: white;
        margin: 0;
        font-family: 'Ubuntu', sans-serif;
    } */

    main {
        /* background-color: #180161; */
        padding-bottom: 60px; /* Prevents content from being hidden behind the footer */
    }

    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #4F1787;
        padding: 15px;
        border-top: 1px solid #ccc;
        text-align: center;
        box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        .footer {
            padding: 12px;
            font-size: 0.9rem;
        }
        h1 {
            font-size: 2rem; /* Adjust font size for smaller screens */
        }
    }
</style>
