<script>
    const navigateToLogin = () => {
        window.location.href = "/docenti/login";
    };

    const navigateToRegister = () => {
        window.location.href = "/docenti/register";
    };
</script>

<div
    class="container mx-auto flex flex-col items-center justify-center min-h-screen p-4"
>
    <h1 class="text-3xl font-bold text-center text-[#EB3678] mb-4">
        Portale Docenti
    </h1>
    <p class="text-center mt-2 mb-4">
        Sei un docente? Accedi o registrati qui.
    </p>
    <div
        class="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4"
    >
        <button
            on:click={navigateToLogin}
            class="bg-[#FB773C] text-white rounded-lg p-2 w-full sm:w-auto mb-2 sm:mb-0 hover:bg-[#EB3678] transition duration-200"
        >
            Accedi
        </button>
        <button
            on:click={navigateToRegister}
            class="bg-[#FB773C] text-white rounded-lg p-2 w-full sm:w-auto hover:bg-[#EB3678] transition duration-200"
        >
            Registrati
        </button>
    </div>
</div>

<style>
    h1,
    p {
        color: white; /* Change text color to black */
    }
</style>
