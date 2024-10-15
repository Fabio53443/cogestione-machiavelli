<script>
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        // You can handle the search logic here (e.g., redirect, filter, etc.)
        console.log("Searching for:", name);
    };
</script>

<h1 class="text-2xl font-bold text-center">
    Ciao, questo è il sito della cogestione dello Spallanzani
</h1>
<p class="text-center">
    Accedi per altre funzioni
</p>

<!-- Search Form -->
<form on:submit={handleSubmit} class="text-center my-4">
    <input
        type="text"
        name="name"
        placeholder="Inserisci il tuo nome"
        class="border border-gray-300 rounded-lg p-2 mr-2"
        required
    />
    <button
        type="submit"
        class="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-200"
    >
        Cerca
    </button>
</form>

<!-- Links for Accedi and Registrati -->
<div class="text-center my-4">
    <a href="/login" class="text-blue-600 hover:underline mx-2">Accedi</a>
    <span>|</span>
    <a href="/register" class="text-blue-600 hover:underline mx-2">Registrati</a>
</div>

<style>
    form {
        color: black;
    }
</style>
