<script>
  export let data;
  const { corso, error, days } = data;

  function barColor(free, total) {
    // If no seats are free, show red
    return free === 0 ? 'bg-red-500' : 'bg-green-500';
  }
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
  {#if corso.schedule && corso.availability}
    <script>
      let days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
    </script>

    {#each days as day, dayIndex}
      {#if corso.availability.includes(dayIndex)}
        <section class="mt-6 p-4 rounded shadow">
          <h2 class="text-xl font-semibold mb-4">{day}</h2>
          <table class="w-full text-base">
            <thead>
              <tr>
                <th class="py-3 w-24 text-left pl-4">Ora</th>
                <th class="py-3 text-left">Posti</th>
              </tr>
            </thead>
            <tbody>
              {#each corso.schedule[dayIndex] as hourSeats, timeIndex}
                <tr class="hover:bg-gray-100 hover:bg-opacity-20 transition-colors ">
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
                </tr>
              {/each}
            </tbody>
          </table>
        </section>
      {/if}
    {/each}
  {/if}
{/if}