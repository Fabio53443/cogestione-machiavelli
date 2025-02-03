<script>
    import "../app.css";
    import favicon from "../favicon.png";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { HomeOutline, UserCircleOutline, ArrowLeftToBracketOutline, ArrowRightToBracketOutline, UserSettingsOutline  } from "flowbite-svelte-icons";
    $: pageName = $page.data.pageName;
    $: user = $page.data.user;
</script>

<svelte:head>
    <title>{pageName}</title>
</svelte:head>

<main class="min-h-screen flex flex-col bg-gradient-to-br from-[#1e1e2e] to-[#181825]">
    <header class="bg-gradient-to-r from-[#1e1e2e] via-[#181825] to-[#1e1e2e] shadow-lg shadow-[#11111b]/20">
        <div class="container mx-auto px-4 py-3">
            <div class="flex flex-col sm:flex-row items-center justify-between">

                <div class="flex items-center mb-4 sm:mb-0">
                    {#if pageName != "Autogestione"}
                        <a
                            href="/"
                            class="text-3xl text-[#cdd6f4] mr-4 hover:text-[#f5c2e7] transition-colors duration-300"
                            aria-label="Home"
                        >
                            <HomeOutline class="w-8 h-8" />
                        </a>
                    {/if}
                    
                    <h1 class="text-3xl font-bold text-[#cdd6f4]">
                        {pageName}
                    </h1>
                </div>
                {#if !user}
                <nav class="flex space-x-4">
                    <a
                        href="/login"
                        class="flex items-center text-[#cdd6f4] hover:text-[#f5c2e7] transition-all duration-300 text-lg hover:scale-105"
                        >Accedi <ArrowLeftToBracketOutline class="w-5 h-5 ml-1" /></a
                    >
                    
                    <a
                        href="/docenti"
                        class="flex items-center text-[#cdd6f4] hover:text-[#f5c2e7] transition-all duration-300 text-lg hover:scale-105"
                        >Portale Organizzatori <UserSettingsOutline class="w-5 h-5 ml-1"/> </a
                    >
                </nav>
                {:else if user.role === "studente"}
                <nav class="flex space-x-4">

                    <a
                        href="/logout"
                        class="flex items-center text-[#cdd6f4] hover:text-[#f5c2e7] transition-all duration-300 text-lg hover:scale-105"
                        >Esci <ArrowRightToBracketOutline class="w-5 h-5 ml-1" /></a
                    >

                    <a
                        href="/studente/profile"
                        class="flex items-center text-[#cdd6f4] hover:text-[#f5c2e7] transition-all duration-300 text-lg hover:scale-105"
                        >Profilo <UserCircleOutline class="w-5 h-5 ml-1" /> </a
                    >
                </nav>

                {:else if user.role === "docente"}
                <nav class="flex space-x-4">

                    <a
                        href="/logout"
                        class="text-[#cdd6f4] hover:text-[#f5c2e7] transition-all duration-300 text-lg hover:scale-105"
                        >Esci</a
                    >
                </nav>

                {/if}
            </div>
        </div>
    </header>

    <div class="flex-grow container mx-auto px-4 py-8">
        <slot></slot>
    </div>

    <footer class="bg-gradient-to-r from-[#1e1e2e] via-[#181825] to-[#1e1e2e] text-[#cdd6f4] py-4 mt-auto">
        <div class="container mx-auto px-4 text-center text-sm">
            Copyright &copy; 2025
            <a
                href="https://smartlinux.xyz"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#f5c2e7] hover:text-[#fab387] transition-all duration-300 hover:scale-105"
            >
                Smartlinux.xyz
            </a> +             <a
                href="https://github.com/fabio53443"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#f5c2e7] hover:text-[#fab387] transition-all duration-300 hover:scale-105"
            >
                Fabio53443
            </a>
             
            All rights reserved. <br> <a href="/admin">Admin</a>
        </div>
    </footer>
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

    :global(body) {
        font-family: "Inter", sans-serif;
        color: #4764c2;
        margin: 0;
        background: #1e1e2e;
    }
</style>
