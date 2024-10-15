<script>
    const handleRegister = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        // Implement registration logic here (e.g., API call)
        console.log("Registering:", username);
    };
</script>

<div class="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-3xl font-bold text-center text-[#EB3678] mb-4">Registrati</h1>
    <form on:submit={handleRegister} class="max-w-md w-full">
        <input
            type="text"
            name="username"
            placeholder="Nome utente"
            class="border border-gray-300 rounded-lg p-2 w-full mb-4"
            required
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
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
            Registrati
        </button>
    </form>
</div>

<style>
    h1, p, input {
        color: black; /* Change text color to black */
    }
</style>
