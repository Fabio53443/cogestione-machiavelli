<script>
  import Alert from '$lib/components/Alert.svelte';
  import { goto } from '$app/navigation';
  export let data;
  const { corso, error } = data;
  let days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];

  let selectedDay = null;
  let selectedHour = null;
  let showAlert = false;
  let alertMessage = '';
  let alertType = '';

  async function enroll(dayIndex, timeIndex) {
    const response = await fetch('/api/studenti/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idCorso: corso.id,
        giorno: dayIndex,
        ora: timeIndex
      })
    });

    const result = await response.json();

    if (response.ok) {
      alertType = 'success';
      alertMessage = 'Iscrizione avvenuta con successo';
      showAlert = true;
      goto(`/studente/corsi/${corso.id}`);
    } else {
      alertType = 'error';
      alertMessage = `Errore: ${result.message}`;
      showAlert = true;
    }
  }

  function barColor(free, total) {
    return free === 0 ? 'bg-red-500' : 'bg-green-500';
  }
</script>

{#if error}
  <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
    {error}
  </div>
{:else if corso}
  <h1 class="text-3xl font-bold text-[#FB773C] mb-4">{corso.nome}</h1>
  <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-4 mb-4 flex justify-between items-center">       

    <div>
      <p class="text-gray-600 mb-2 text-xl"><strong>Descrizione:</strong> {corso.descrizione}</p>
      <p class="text-gray-600 mb-2 text-xl"><strong>Aula:</strong> {corso.aula}</p>
      <p class="text-gray-600 mb-2 text-xl"><strong>Durata:</strong> {corso.length}h</p>
    </div>
  </div>

  <Alert type={alertType} message={alertMessage} show={showAlert} on:close={() => showAlert = false} />

  {#if corso.schedule && corso.availability}
    {#each days as day, dayIndex}
      {#if corso.availability.includes(dayIndex)}
        <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-4 mb-4">
          <h2 class="text-xl text-black font-semibold mb-2">{day}</h2>
          <p class="text-gray-600 mb-2"><strong>Numero di studenti iscritti:</strong> 
            {corso.schedule[dayIndex].reduce((sum, hourSeats) => sum + (corso.numPosti - (hourSeats ?? 0)), 0)}
          </p>
          <table class="w-full text-base">
            <thead>
              <tr>
                <th class="py-3 w-24 text-left pl-4 text-black">Ora</th>
                <th class="py-3 text-left text-black">Posti</th>
                <th class="py-3 w-24 text-center pr-4 text-black">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {#each corso.schedule[dayIndex] as hourSeats, timeIndex}
                <tr class="hover:bg-black-100 hover:bg-opacity-20 transition-colors text-black">
                  <td class="py-3 font-semibold pl-4">{timeIndex + 1}°</td>
                  <td class="py-3">
                    <div class="flex items-center gap-4">
                      <div class="text-base whitespace-nowrap">
                        {(corso.numPosti - (hourSeats ?? 0))}/{corso.numPosti}
                      </div>
                      <div class="relative flex-1 bg-gray-200 h-3 rounded">
                        <div
                          class={`absolute top-0 left-0 h-3 rounded ${barColor((hourSeats ?? 0), corso.numPosti)}`}
                          style="width: {(((hourSeats ?? 0) / corso.numPosti) * 100)}%;"
                        />
                      </div>
                    </div>
                  </td>
                  <td class="py-3 text-right pr-7 pl-7">
                    <button
                      class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      on:click={() => enroll(dayIndex, timeIndex)}
                    >
                      Iscriviti
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    {/each}
  {/if}
{/if}