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
                    {#if corsi.iscritto}
                      <span class="text-green-500">Iscritto</span>
                      
                    {/if}

                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 mb-4">
                  <p><span class="font-semibold">Aula:</span> {corso.aula}</p>
                </div >
                <div class="flex justify-end">
                  <a href="/studente/corsi/{corso.id}" class="w-full bg-[#FB773C] hover:bg-[#EB3678] text-white text-center font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">
                    
                      Dettagli
                </a>
              </div>

              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>