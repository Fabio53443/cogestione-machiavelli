<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let courseData = {
    nome: '',
    descrizione: '',
    aula: '',
    numPosti: '',
    length: '',
    availability: []
  };

  let days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
  let showAlert = false;
  let alertMessage = "";
  let alertType;

  $: {
    const { corso } = $page.data;
    if (corso) {
      courseData = { ...corso };
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/docenti/newCourse', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
      });

      const result = await response.json();

      if (response.ok) {
        alertType = "success";
        alertMessage = "Corso aggiornato con successo!";
        goto(`/docenti/courses/${courseData.id}`);
      } else {
        alertType = "error";
        alertMessage = result.message || "Aggiornamento corso fallito.";
      }
    } catch (error) {
      alertType = "error";
      alertMessage = "Si è verificato un errore imprevisto.";
    } finally {
      showAlert = true;
    }
  }

  function handleGiornoToggle(giornoId) {
    const index = courseData.availability.indexOf(giornoId);
    if (index === -1) {
      courseData.availability = [...courseData.availability, giornoId];
    } else {
      courseData.availability = courseData.availability.filter(id => id !== giornoId);
    }
  }
</script>


<div class="container mx-auto flex flex-col items-center justify-start pt-16 px-4">
  <h1 class="text-3xl font-bold text-center text-[#FB773C] mb-8">Modifica Corso</h1>
  <div class="w-full max-w-md">
    <form on:submit={handleSubmit} class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="nome">Nome del Corso</label>
        <input class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]" id="nome" type="text" bind:value={courseData.nome} placeholder="Nome del corso" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="descrizione">Descrizione</label>
        <textarea class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]" id="descrizione" bind:value={courseData.descrizione} placeholder="Descrizione del corso" rows="4" required></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="aula">Aula</label>
        <input class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]" id="aula" type="text" bind:value={courseData.aula} placeholder="Numero o nome dell'aula" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="numPosti">Numero di Posti</label>
        <input class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]" id="numPosti" type="number" bind:value={courseData.numPosti} min="1" placeholder="Numero di posti disponibili" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="length">Durata (ore ogni giorno)</label>
        <input class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]" id="length" type="number" bind:value={courseData.length} min="1" max="5" placeholder="La durata in ore di ogni lezione" required />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Tua disponibilità</label>
        <div class="grid grid-cols-2 gap-2">
          {#each days as day, index}
            <label class="inline-flex items-center">
              <input type="checkbox" checked={courseData.availability.includes(index)} on:change={() => handleGiornoToggle(index)} class="form-checkbox h-5 w-5 text-[#FB773C] rounded border-gray-300 focus:ring-[#EB3678]" />
              <span class="ml-2 text-gray-700">{day}</span>
            </label>
          {/each}
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-200" type="submit">Aggiorna Corso</button>
      </div>
    </form>
  </div>
</div>

<style>
  input[type="checkbox"] {
    cursor: pointer;
  }
  
  button:hover {
    cursor: pointer;
  }
</style>