<script>
  export let data;
  const { user, corsi, error } = data;

  const navigateToRegistration = () => {
    window.location.href = '/studente/corsi';
  };
</script>

<div class="container mx-auto flex flex-col items-center justify-start pt-16 px-4">
  <div class="w-full max-w-4xl">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-[#EB3678]">Dashboard Corsi</h1>
      <button 
        on:click={navigateToRegistration}
        class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">
        Registrati ai corsi
      </button>
    </div>

    <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 class="text-2xl font-semibold text-gray-700 mb-6">Benvenuto, {user.username}</h2>
      
      {#if error}
        <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      {:else if corsi.length === 0}
        <div class="text-center py-8">
          <p class="text-gray-600 text-lg mb-4">Non sei ancora iscritto a nessun corso.</p>
          <a 
            href="/studente/corsi"
            class="inline-block bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
          >
            Sfoglia i corsi disponibili
          </a>
        </div>
      {:else}
        <h3 class="text-xl font-semibold text-gray-700 mb-4">I tuoi corsi</h3>
        <ul class="space-y-4">
          {#each corsi as corso (corso.id)}
            <li class="border rounded-lg p-4 hover:shadow-md transition duration-200">
              <h4 class="text-lg font-semibold text-[#EB3678] mb-2">{corso.nome}</h4>
              <p class="text-gray-600 mb-3">{corso.descrizione}</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <p><span class="font-semibold">Aula:</span> {corso.aula}</p>
                <p><span class="font-semibold">Orario:</span> {corso.giorno} alle {corso.ora}</p>
                <p><span class="font-semibold">Docente:</span> {corso.docenteNome}</p>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>