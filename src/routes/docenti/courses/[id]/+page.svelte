<script>
  export let data;
  const { corso, error } = data;
</script>

{#if error}
  <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
    {error}
  </div>
{:else if corso}
  <h1 class="text-3xl font-bold text-[#EB3678] mb-4">Dettagli Corso: {corso.nome}</h1>
  <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
    <p class="text-gray-600 mb-2"><strong>Descrizione:</strong> {corso.descrizione}</p>
    <p class="text-gray-600 mb-2"><strong>Aula:</strong> {corso.aula}</p>
    <p class="text-gray-600 mb-2"><strong>Posti disponibili:</strong> {corso.postiDisponibili}/{corso.numPosti}</p>
  </div>
{/if}