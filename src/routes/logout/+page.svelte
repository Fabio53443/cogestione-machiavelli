<script>
    import Cookies from "js-cookie";
    import { onMount } from "svelte";
    const handleLogout = () => {
        Cookies.remove("token");
        window.location.href = "/";
    };
    onMount(() => {
        handleLogout();
    });
</script>


<main
    class="min-h-screen flex flex-col bg-gradient-to-b from-[#180161] to-[#4F1787]"
>
    <div
        class="container mx-auto flex flex-col items-center justify-center px-4"
    >
        <div
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
        >
            <h1 class="text-3xl font-bold mb-4 text-center text-[#EB3678]">
                Logout
            </h1>
            <p class="text-center text-gray-500">Sei sicuro di voler uscire?</p>
            <button
                on:click={handleLogout}
                class="bg-[#FB773C] text-white rounded-lg p-2 w-full mt-4 hover:bg-[#EB3678] transition duration-200"
            >
                Logout
            </button>
        </div>
    </div>
</main>

<style>
    /* Puoi aggiungere stili personalizzati qui se necessario */
    main {
        color: black;
    }
    h1,
    h2 {
        color: aliceblue;
    }
</style>
