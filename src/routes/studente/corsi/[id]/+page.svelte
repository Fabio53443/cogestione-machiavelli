<script>
  import Alert from '$lib/components/Alert.svelte';
  import { goto } from '$app/navigation';
  export let data;
  const { corso, error, iscrizioni } = data;
  let days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];

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

  function barColor(free, total) {
    return free === 0 ? 'bg-red-500' : 'bg-green-500';
  }

  function canEnroll(dayIndex, timeIndex) {
    const courseLength = corso.length;
    if (timeIndex + courseLength > 5) return false; // Ensure the course can fit in the day's schedule
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
    return Math.max(corso.numPosti - usedSeats, 0);
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
    <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-4 mb-4">
      <h2 class="text-xl text-black font-semibold mb-2">Orario del corso</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-base">
          <thead>
            <tr>
              <th class="py-3 w-24 text-left pl-4 text-black">Ora</th>
              {#each days as day}
                <th class="py-3 text-left text-black">{day}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each Array(5 - corso.length + 1).fill(0).map((_, i) => i).filter(i => i % corso.length === 0) as timeIndex}
              <tr class="hover:bg-black-100 hover:bg-opacity-20 transition-colors text-black">
                {#if corso.length > 1}
                  <td class="py-3 text-center">
                    {timeIndex + 1}° - {timeIndex + corso.length}°
                  </td>
                {:else}
                  <td class="py-3 text-center">
                    {timeIndex + 8}:00
                  </td>
                {/if}
                {#each days as _, dayIndex}
                  <td class="py-3 text-center">
                    {#if corso.availability.includes(dayIndex) && canEnroll(dayIndex, timeIndex)}
                      <div class="flex flex-col items-center gap-2 justify-center">
                        <div class="text-base whitespace-nowrap">
                          {computeFreeSeats(dayIndex, timeIndex)}/{corso.numPosti}
                        </div>
                        <button
                          class={`px-3 py-1 rounded mt-2 ${isEnrolled(dayIndex, timeIndex) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                          on:click={() => !isEnrolled(dayIndex, timeIndex) && enroll(dayIndex, timeIndex)}
                          disabled={isEnrolled(dayIndex, timeIndex)}
                        >
                          {isEnrolled(dayIndex, timeIndex) ? 'Iscritto' : 'Iscriviti'}
                        </button>
                        <div class="relative w-full bg-gray-200 h-3 rounded mt-2">
                          <div
                            class={`absolute top-0 left-0 h-3 rounded ${barColor(computeFreeSeats(dayIndex, timeIndex), corso.numPosti)}`}
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
{/if}