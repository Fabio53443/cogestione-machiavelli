<script>
    export let data;
    const { user, corsi, error } = data;
  
    const navigateToCourseCreation = () => {
      window.location.href = '/docenti/courses/new';
    };
  </script>
  
  <div class="container mx-auto flex flex-col items-center justify-start pt-16 px-4">
    <div class="w-full max-w-4xl">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-[#FB773C]">I tuoi corsi</h1>
        <button 
          on:click={navigateToCourseCreation}
          class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">
          Crea un nuovo corso
        </button>
      </div>
  
      <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 class="text-xl font-semibold text-gray-700 mb-6">Benvenuto, {user.username}</h2>
        
        {#if error}
          <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        {:else if corsi.length === 0}
          <div class="text-center py-8">
            <p class="text-gray-600 text-lg mb-4">Non hai ancora creato nessun corso.</p>
            <a 
              href="/docenti/courses/new"
              class="inline-block bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
            >
              Crea un nuovo corso
            </a>
          </div>
        {:else}
          <ul>
            {#each corsi as corso}
              <li class="mb-4">
                <div class="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 class="text-xl font-bold text-gray-800">{corso.nome}</h3>
                  <p class="text-gray-600">{corso.descrizione}</p>
                  <p class="text-gray-600">Aula: {corso.aula}</p>
                  <p class="text-gray-600">Posti disponibili: {corso.postiDisponibili}/{corso.numPosti}</p>
                  <a
                    href={`/docenti/courses/${corso.id}`}
                    class="inline-block mt-2 bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                  >
                    Vedi Dettagli
                  </a>
                </div>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>