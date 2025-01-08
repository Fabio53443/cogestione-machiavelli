<script>
    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        // You can handle the search logic here (e.g., redirect, filter, etc.)
        console.log("Searching for:", name);
    };
</script>

<div class="max-w-2xl mx-auto text-center">
    <h1 class="text-4xl font-bold mb-6 text-[#FB773C]">
        Benvenuti alla Cogestione del Liceo Spallanzani di Tivoli
    </h1>
    <p class="text-xl mb-8 text-gray-300">
        La piattaforma per la gestione dei corsi e delle prenotazioni. La cogestione avverrà indicativamente la seconda settimana di febbraio.
    </p>


    <div class="space-x-4">

        <a href="/login" class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-200">Accedi</a>
    </div>
</div>