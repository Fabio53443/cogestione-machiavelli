<script>
  import AttendanceModal from '$lib/components/AttendanceModal.svelte';
  import { goto } from '$app/navigation';
  export let data;
  const { corso, error } = data;
  let days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

  let showAttendanceModal = false;
  let selectedStudents = [];
  let currentHour;
  let currentDay;

  function barColor(free, total) {
    return free === 0 ? 'bg-red-500' : 'bg-green-500';
  }

  async function openAttendanceModal(dayIndex, timeIndex) {
    currentHour = timeIndex;
    currentDay = dayIndex;
    const response = await fetch(`/api/studenti/attendance/${corso.id}?hour=${currentHour}&day=${currentDay}`);
    if (response.ok) {
      selectedStudents = await response.json();
      showAttendanceModal = true;
    }
  }

  function handleAttendanceUpdate(updatedStudent) {
    selectedStudents = selectedStudents.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    );
  }

  async function fillCourse(id, dayIndex, timeIndex) {
        //show a confirmation dialog
        if (!confirm("Vuoi veramente riempire?")) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/corso/presenze-forcefull`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, dayIndex, timeIndex }),

            });
            const data = await response.json();
            console.log(data.success);
            if (data.success) {
                location.reload();
            }
        } catch (e) {
            console.error(e);
        }
        
  }
</script>

{#if error}
  <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
    {error}
  </div>
{:else if corso}
  <h1 class="text-3xl font-bold text-[#FB773C] mb-4">"{corso.nome}"</h1>
  <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-4 mb-4 flex justify-between items-center">       

    <div>
          <p class="text-gray-600 mb-2 text-xl"><strong>Descrizione:</strong> {corso.descrizione}</p>
    <p class="text-gray-600 mb-2 text-xl"><strong>Aula:</strong> {corso.aula}</p>
    <p class="text-gray-600 mb-2 text-xl"><strong>Durata:</strong> {corso.length}H</p>
    </div>
    <div>
      <button class="bg-[#FB773C] text-white px-3 py-1 rounded hover:bg-yellow-600 mb-4" on:click={() => goto(`/docenti/courses/${corso.id}/edit`)}>
        Modifica Corso
      </button>
    </div>
  </div>

  
  {#if corso.schedule && corso.availability}

    {#each days as day, dayIndex}
      {#if corso.availability.includes(dayIndex)}
      <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-4 mb-4">
        <h2 class="text-xl text-black font-semibold mb-2">{day}</h2>
      <table class="w-full text-base">
            <thead>
              <tr>
                <th class="py-3 w-24 text-left pl-4 text-black">Turno</th>
                <th class="py-3 text-left text-black">Posti occupati</th>
                <th class="py-3 w-24 text-center pr-4 text-black">Azioni</th>
                <th class="py-3 w-24 text-center pr-4 text-black">Riempi</th>
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
                          style="width: {(((hourSeats ?? 0) / corso.numPosti) * 100)}%;"> </div>
                        
                      </div>
                    </div>
                  </td>
                  <td class="py-3 text-right pr-7 pl-7">
                    <button
                      class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      on:click={() => openAttendanceModal(dayIndex, timeIndex)}
                    >
                      Presenze
                    </button>
                  </td>
                  <td class="py-3 text-right pr-7 pl-7">
                    <button
                      class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      on:click={() => fillCourse(corso.id, dayIndex, timeIndex)}
                    >
                      Riempi
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

  <AttendanceModal
    show={showAttendanceModal}
    students={selectedStudents}
    onClose={() => showAttendanceModal = false}
    onUpdateAttendance={handleAttendanceUpdate}
  />
{/if}