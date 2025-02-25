<script>
  import Alert from '$lib/components/Alert.svelte';
  import { goto } from '$app/navigation';
  export let data;
  const { corso, error, iscrizioni } = data;
  let days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

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
      //refresh the page
      location.reload();

    } else {
      alertType = 'error';
      alertMessage = `Errore: ${result.message}`;
      showAlert = true;
    }
  }

  async function unenroll(dayIndex, timeIndex) {
    const response = await fetch('/api/studenti/enroll', {
      method: 'DELETE',
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
      alertMessage = 'Disiscrizione avvenuta con successo';
      showAlert = true;
      location.reload();
    } else {
      alertType = 'error';
      alertMessage = `Errore: ${result.message}`;
      showAlert = true;
    }
  }

  function barColor(free, total) {
    return free === 0 ? 'bg-red-500' : 'bg-green-500';
  }

  function canEnroll(dayIndex, timeIndex) {
    const courseLength = corso.length;
    if (timeIndex + courseLength > 6) return false; // Ensure the course can fit in the day's schedule
    if (!corso.schedule || !corso.schedule[dayIndex]) return false;
    for (let i = 0; i < courseLength; i++) {
      if (corso.schedule[dayIndex][timeIndex + i] === undefined) return false;
    }
    return true;
  }

  function isEnrolled(dayIndex, timeIndex) {
    return iscrizioni?.some(iscrizione => 
      iscrizione.giorno === dayIndex && iscrizione.ora === timeIndex && iscrizione.idCorso === corso.id
    );
  }

  function computeFreeSeats(dayIndex, timeIndex) {
    let usedSeats = 0;
    for (let i = 0; i < corso.length; i++) {
      usedSeats += corso.schedule[dayIndex][timeIndex + i] ?? 0;
    }
    if (corso.length > 1) {
      usedSeats/=corso.length;
    }
    return usedSeats; 
  }

  function getSeatsColor(free, total) {
    const percentage = (free / total) * 100;
    if (percentage > 66) return 'text-green-600';
    if (percentage > 33) return 'text-orange-500';
    return 'text-red-500';
  }
</script>

{#if error}
  <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
    {error}
  </div>
{:else if corso}
  <div class="max-w-6xl mx-auto px-4">
    <h1 class="text-4xl font-bold text-[#FB773C] mb-6">{corso.nome}</h1>
    
    <div class="bg-white shadow-lg rounded-xl p-6 mb-8">       
      <div class="grid md:grid-cols-3 gap-6">
        <div class="space-y-3">
          <h3 class="font-semibold text-gray-700">Descrizione</h3>
          <p class="text-gray-600">{corso.descrizione}</p>
        </div>
        <div class="space-y-3">
          <h3 class="font-semibold text-gray-700">Aula</h3>
          <p class="text-gray-600">{corso.aula}</p>
        </div>
        <div class="space-y-3">
          <h3 class="font-semibold text-gray-700">Durata</h3>
          <p class="text-gray-600">2 ore</p>
        </div>
      </div>
    </div>

    <Alert type={alertType} message={alertMessage} show={showAlert} on:close={() => showAlert = false} />

    {#if corso.schedule && corso.availability}
      <div class="bg-white shadow-lg rounded-xl p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Orario del corso</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="bg-gray-50 p-4 border-b-2 border-gray-200 text-left text-gray-700 font-semibold">Ora</th>
                {#each days as day}
                  <th class="bg-gray-50 p-4 border-b-2 border-gray-200 text-left text-gray-700 font-semibold">{day}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each Array(6 - corso.length + 1).fill(0).map((_, i) => i).filter(i => i % corso.length === 0) as timeIndex}
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="p-4 border-b border-gray-200 font-medium">
                    {#if corso.length > 1}
                      {timeIndex+1}° - {timeIndex + corso.length}°
                    {:else}
                      {timeIndex + 1}°
                    {/if}
                  </td>
                  {#each days as _, dayIndex}
                    <td class="p-4 sm:p-2 border-b border-gray-200">
                      {#if corso.availability.includes(dayIndex) && canEnroll(dayIndex, timeIndex)}
                        <div class="flex flex-col gap-2">
                          <div class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                            <span class="font-medium text-gray-700 text-sm sm:text-base whitespace-nowrap flex flex-col items-center sm:items-start">
                              <span>Liberi:</span>
                              <span class={`text-lg font-bold ${getSeatsColor(computeFreeSeats(dayIndex, timeIndex), corso.numPosti)}`}>
                                {computeFreeSeats(dayIndex, timeIndex)}/{corso.numPosti}
                              </span>
                            </span>
                            <button
                              class={`px-2 sm:px-4 py-1 sm:py-2 text-sm rounded-lg font-medium transition-colors w-full sm:w-auto
                                ${isEnrolled(dayIndex, timeIndex) 
                                  ? 'bg-green-500 hover:bg-red-500 text-white group' 
                                  : computeFreeSeats(dayIndex, timeIndex) === 0
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                              on:click={() => isEnrolled(dayIndex, timeIndex) 
                                ? unenroll(dayIndex, timeIndex) 
                                : enroll(dayIndex, timeIndex)}
                              disabled={computeFreeSeats(dayIndex, timeIndex) === 0}
                            >
                              {#if isEnrolled(dayIndex, timeIndex)}
                                <span class="group-hover:hidden">✓</span>
                                <span class="hidden group-hover:inline">Disiscriviti</span>
                              {:else if computeFreeSeats(dayIndex, timeIndex) === 0}
                                N/D
                              {:else}
                                Iscriviti
                              {/if}
                            </button>
                          </div>
                          <div class="relative w-full h-1.5 sm:h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              class={`absolute top-0 left-0 h-full transition-all duration-300 ${barColor(computeFreeSeats(dayIndex, timeIndex), corso.numPosti)}`}
                              style="width: {((computeFreeSeats(dayIndex, timeIndex) / corso.numPosti) * 100)}%;"
                            />
                          </div>
                        </div>
                      {/if}
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </div>
{/if}