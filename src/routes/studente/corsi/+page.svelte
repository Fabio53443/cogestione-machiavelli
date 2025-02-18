<script>
    import { enhance } from '$app/forms';
    import Alert from "$lib/components/Alert.svelte";
    
    export let data;
    export let form;
    
    const { user, corsi, error } = data;
    let showAlert = !!form;
    let alertMessage = form?.message || '';
    let alertType = form?.success ? 'success' : 'error';

    const days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];
    let selectedDays = new Set();
    let isDropdownOpen = false;
    let searchQuery = '';

    $: filteredCorsi = corsi
        .filter(corso => {
            const matchesDays = selectedDays.size === 0 || 
                corso.availability.some(day => selectedDays.has(day));
            const matchesSearch = searchQuery === '' || 
                corso.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                corso.descrizione.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDays && matchesSearch;
        });

    const toggleDay = (index) => {
        if (selectedDays.has(index)) {
            selectedDays.delete(index);
        } else {
            selectedDays.add(index);
        }
        selectedDays = selectedDays; // trigger reactivity
    };

    const handleClickOutside = (event) => {
        const dropdown = document.getElementById('dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
            isDropdownOpen = false;
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleDay(index);
        }
    };
</script>

<svelte:window on:click={handleClickOutside} />

<Alert type={alertType} message={alertMessage} show={showAlert} />

<div class="container mx-auto flex flex-col items-center justify-start pt-16 px-4">
    <div class="w-full max-w-4xl">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-[#FB773C]">Corsi Disponibili</h1>
        </div>

        <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <!-- Search Bar -->
                <div class="flex-1">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="search">
                        Cerca corso
                    </label>
                    <input
                        type="text"
                        id="search"
                        bind:value={searchQuery}
                        placeholder="Cerca per nome o descrizione..."
                        class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#FB773C] focus:outline-none transition-colors duration-200"
                    />
                </div>

                <!-- Day Filter -->
                <div class="flex flex-col items-stretch md:items-end">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Filtra per giorno
                    </label>
                    <div class="relative" id="dropdown">
                        <button
                            on:click={() => isDropdownOpen = !isDropdownOpen}
                            class="w-full md:w-64 bg-white border-2 border-gray-200 rounded-lg px-4 py-2.5 flex items-center justify-between text-gray-700 hover:border-[#FB773C] transition-colors duration-200"
                        >
                            <span class="truncate">
                                {selectedDays.size === 0 ? 'Tutti i giorni' : 
                                 Array.from(selectedDays).map(i => days[i]).join(', ')}
                            </span>
                            <svg class="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {#if isDropdownOpen}
                            <div class="absolute z-10 mt-1 w-full md:w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                                {#each days as day, index}
                                    <div
                                        role="menuitem"
                                        tabindex="0"
                                        class="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center border-b last:border-b-0 border-gray-100"
                                        on:click={() => toggleDay(index)}
                                        on:keydown={(e) => handleKeyDown(e, index)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedDays.has(index)}
                                            class="mr-3 w-4 h-4 text-[#FB773C] border-gray-300 rounded focus:ring-[#FB773C]"
                                            on:click|stopPropagation={() => {}}
                                        />
                                        <span class="text-gray-700">{day}</span>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            </div>

            {#if error}
                <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                </div>
            {:else if filteredCorsi.length === 0}
                <div class="text-center py-8">
                    <p class="text-gray-600 text-lg">
                        {selectedDays.size === 0 ? 'Non ci sono corsi disponibili al momento.' : 'Nessun corso disponibile per i giorni selezionati.'}
                    </p>
                </div>
            {:else}
                <div class="grid grid-cols-1 gap-6">
                    {#each filteredCorsi as corso (corso.id)}
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
                                <p><span class="font-semibold">Durata:</span> {corso.length} ore</p>
                                <p><span class="font-semibold">Giorni:</span> {corso.availability.map(d => days[d]).join(', ')}</p>
                            </div>
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