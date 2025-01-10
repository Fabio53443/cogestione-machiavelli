<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { ConsoleLogWriter } from 'drizzle-orm';

  let courseData = {
    nome: '',
    descrizione: '',
    aula: ''
  };

  onMount(() => {
    const { corso } = $page.data;
    if (corso) {
      courseData = { ...corso };
    }
  });

  let showAlert = false;
  let alertMessage = "";
  let alertType;

  async function handleSubmit(event) {
    console.log("submit pressed");
    event.preventDefault();
    const requestData = {
      id: courseData.id,
      nome: courseData.nome,
      descrizione: courseData.descrizione,
      aula: courseData.aula
    };
    try {
      const response = await fetch('/api/docenti/newCourse', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
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
</script>

<div class="container mx-auto flex flex-col items-center justify-start pt-16 px-4">
  <h1 class="text-3xl font-bold text-center text-[#FB773C] mb-8">Modifica Corso</h1>
  <div class="w-full max-w-md">
    <form on:submit|preventDefault={handleSubmit} class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="nome">Nome del Corso</label>
        <input class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]" id="nome" type="text" bind:value={courseData.nome} placeholder="Nome del corso" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="descrizione">Descrizione</label>
        <textarea class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]" id="descrizione" bind:value={courseData.descrizione} placeholder="Descrizione del corso" rows="4" required></textarea>
      </div>

      <div class="mb-4">
        <label for="aula" class="block text-gray-700 text-sm font-bold mb-2">Aula</label>
        <input
          id="aula"
          type="text"
          bind:value={courseData.aula}
          class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]"
          placeholder="Aula del corso"
          required
        />
      </div>

      <div class="flex items-center justify-between">
        <button class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-200" type="submit" on:click={handleSubmit}>Aggiorna Corso</button>
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