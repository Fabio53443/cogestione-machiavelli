<script>
    import { enhance } from '$app/forms';
    import Alert from "$lib/components/Alert.svelte";
    
    export let data;
    export let form;
    
    const { user, corsi, error } = data;
    let showAlert = !!form;
    let alertMessage = form?.message || '';
    let alertType = form?.success ? 'success' : 'error';
  </script>
  
  <Alert type={alertType} message={alertMessage} show={showAlert} />
  
  <div class="container mx-auto flex flex-col items-center justify-start pt-16 px-4">
    <div class="w-full max-w-4xl">
      <h1 class="text-3xl font-bold text-[#FB773C] mb-8">Corsi Disponibili</h1>
  
      <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        {#if error}
          <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        {:else if corsi.length === 0}
          <div class="text-center py-8">
            <p class="text-gray-600 text-lg">Non ci sono corsi disponibili al momento.</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 gap-6">
            {#each corsi as corso (corso.id)}
              <div class="border rounded-lg p-6 hover:shadow-md transition duration-200">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-xl font-semibold text-[#FB773C]">{corso.nome}</h3>
                    <p class="text-gray-600 mt-1">{corso.descrizione}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-500">Posti disponibili</p>
                    <p class="text-lg font-bold {corso.postiDisponibili > 5 ? 'text-green-600' : 'text-orange-600'}">
                      {corso.postiDisponibili}/{corso.numPosti}
                    </p>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 mb-4">
                  <p><span class="font-semibold">Aula:</span> {corso.aula}</p>
                  <p><span class="font-semibold">Orario:</span> {corso.giorno} alle {corso.ora}</p>
                  <p><span class="font-semibold">Docente:</span> {corso.docenteNome}</p>
                </div>
  
                {#if corso.iscritto}
                  <button 
                    class="w-full bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-lg cursor-default"
                    disabled
                  >
                    Già iscritto
                  </button>
                {:else if corso.postiDisponibili === 0}
                  <button 
                    class="w-full bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg cursor-default"
                    disabled
                  >
                    Corso al completo
                  </button>
                {:else}
                  <form 
                    method="POST" 
                    action="?/enroll" 
                    use:enhance
                  >
                    <input type="hidden" name="courseId" value={corso.id}>
                    <button 
                      type="submit"
                      class="w-full bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                    >
                      Iscriviti
                    </button>
                  </form>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>