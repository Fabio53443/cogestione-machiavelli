<script>
    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        // You can handle the search logic here (e.g., redirect, filter, etc.)
        console.log("Searching for:", name);
    };
</script>

<div class="max-w-2xl mx-auto text-center">
    <h1 class="text-4xl font-bold mb-6 text-[#EB3678]">
        Benvenuti alla Cogestione del Liceo Spallanzani di Tivoli
    </h1>
    <p class="text-xl mb-8 text-gray-300">
        La piattaforma per la gestione dei corsi e delle prenotazioni. La cogestione avverrà indicativamente la seconda settimana di febbraio.
    </p>

    <form on:submit={handleSubmit} class="mb-8">
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
                type="text"
                name="name"
                placeholder="Inserisci il tuo nome"
                class="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EB3678] text-gray-800"
                required
            />
            <button
                type="submit"
                class="w-full sm:w-auto px-6 py-2 bg-[#FB773C] text-white rounded-lg hover:bg-[#EB3678] transition duration-200"
            >
                Cerca
            </button>
        </div>
    </form>

    <div class="space-x-4">
        <a href="/login" class="text-[#FB773C] hover:text-[#EB3678] transition duration-200 font-semibold">Accedi</a>
        <span class="text-gray-400">|</span>
        <a href="/register" class="text-[#FB773C] hover:text-[#EB3678] transition duration-200 font-semibold">Registrati</a>
    </div>
</div>