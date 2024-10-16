<script>
    import { onMount } from 'svelte';
  
    export let data;  // Assumiamo che i dati dell'utente vengano passati come prop
  
    let corsi = [];
    let iscrizioni = [];
    let username = data.user.username;
  
    onMount(async () => {
      // Qui dovresti fare le chiamate API per ottenere i dati
      // Per questo esempio, useremo dei dati di esempio
      corsi = [
        { id: 1, nome: 'Matematica', descrizione: 'Corso di matematica avanzata', aula: '4P', numPosti: 30, ora: '14:00', giorno: 'Lunedì', docente: 'Prof. Bianchi' },
        { id: 2, nome: 'Fisica', descrizione: 'Introduzione alla fisica quantistica', aula: '2B', numPosti: 25, ora: '10:00', giorno: 'Martedì', docente: 'Prof. Verdi' },
      ];
      iscrizioni = [1]; // L'ID del corso a cui lo studente è iscritto
    });
  
  </script>
  
  <main class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Dashboard Corsi</h1>
    
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Benvenuto, {username}</h2>
    </section>
  
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">I tuoi corsi</h2>
      <ul class="space-y-4">
        {#each corsi.filter(corso => iscrizioni.includes(corso.id)) as corso (corso.id)}
          <li class="bg-white shadow rounded-lg p-4">
            <h3 class="text-xl font-semibold">{corso.nome}</h3>
            <p class="text-gray-600">{corso.descrizione}</p>
            <p class="mt-2"><strong>Aula:</strong> {corso.aula}</p>
            <p><strong>Orario:</strong> {corso.giorno} alle {corso.ora}</p>
            <p><strong>Docente:</strong> {corso.docente}</p>
          </li>
        {/each}
      </ul>
    </section>
  
    <section>
      <h2 class="text-2xl font-semibold mb-4">Corsi disponibili</h2>
      <ul class="space-y-4">
        {#each corsi.filter(corso => !iscrizioni.includes(corso.id)) as corso (corso.id)}
          <li class="bg-white shadow rounded-lg p-4">
            <h3 class="text-xl font-semibold">{corso.nome}</h3>
            <p class="text-gray-600">{corso.descrizione}</p>
            <p class="mt-2"><strong>Aula:</strong> {corso.aula}</p>
            <p><strong>Orario:</strong> {corso.giorno} alle {corso.ora}</p>
            <p><strong>Docente:</strong> {corso.docente}</p>
            <p><strong>Posti disponibili:</strong> {corso.numPosti - (iscrizioni.filter(id => id === corso.id).length)}</p>

          </li>
        {/each}
      </ul>
    </section>
  </main>
  
  <style>
    /* Puoi aggiungere stili personalizzati qui se necessario */
    main {
        color: black;
    }
    h1, h2 {
        color: aliceblue;
    }
  </style>