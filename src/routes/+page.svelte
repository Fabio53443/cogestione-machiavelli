
<script>
    import "../app.css";
    import { HomeOutline, UserOutline, ArrowLeftToBracketOutline, ArrowRightToBracketOutline  } from "flowbite-svelte-icons";
</script>

<div class="max-w-2xl mx-auto text-center">
    <h1 class="text-4xl font-bold mb-6 text-[#FB773C]">
        Benvenuto alla Autogestione del Liceo Spallanzani
    </h1>
    <p class="text-xl mb-8 text-gray-300">
        La piattaforma per la gestione dei corsi e delle prenotazioni. Segui <a class="text-[#fb773c] " href="https://instagram.com/rappresentanti_liceospalla"> @rappresentanti_liceospalla</a> per restare aggiornato! Accedi qui:<br /> 
    </p>


    <div class="space-x-4">
        <a href="/login" class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-200">
        Accedi </a>
    </div>
    <div class="mt-8 text-3xl font-bold text-red-600">
        Il termine per registrarsi ai corsi o modificare le prenotazioni è il 20/02 alle 23.59!
    </div>

    <div class="mt-8">
        <h2 class="text-2xl font-bold mb-4 text-[#FB773C]">Come funziona la cogestione?</h2>
    </div>

    <div class="space-y-4 text-left text-gray-300">
        <div>
            <h3 class="font-semibold mb-2">Prima ora (8:00 - 9:00)</h3>
            <p>Gli studenti entreranno nell'istituto e si recheranno nelle rispettive classi per l'appello. Seguirà un momento di confronto con l'insegnante sul programma della giornata o sui temi dell'Educazione Civica.</p>
        </div>

        <div>
            <h3 class="font-semibold mb-2">Svolgimento corsi (9:00 - 13:45)</h3>
            <p>Gli studenti si recheranno nei corsi o nelle aule studio/svago secondo le prenotazioni. I docenti dei corsi si sposteranno nelle aule assegnate, mentre gli altri garantiranno la sorveglianza.</p>
        </div>

        <div>
            <h3 class="font-semibold mb-2">Uscita</h3>
            <p>L'uscita seguirà l'orario settimanale di ogni classe. Gli studenti dovranno utilizzare i varchi assegnati, dove il servizio d'ordine effettuerà il contrappello.</p>
        </div>
    </div>


</div>