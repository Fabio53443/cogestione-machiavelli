<script>
    const handleLogin = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        // Implement login logic here (e.g., API call)
        console.log("Logging in:", username);
    };
</script>

<div class="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-3xl font-bold text-center text-[#EB3678] mb-4">Accedi</h1>
    <form on:submit={handleLogin} class="max-w-md w-full">
        <input
            type="text"
            name="username"
            placeholder="Nome utente"
            class="border border-gray-300 rounded-lg p-2 w-full mb-4"
            required
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            class="border border-gray-300 rounded-lg p-2 w-full mb-4"
            required
        />
        <button
            type="submit"
            class="bg-[#FB773C] text-white rounded-lg p-2 w-full hover:bg-[#EB3678] transition duration-200"
        >
            Accedi
        </button>
    </form>
</div>

<style>
    h1, p, input {
        color: black; /* Change text color to black */
    }
</style>
