<script>
    let activeView = null;
    let listData = [];
    let loading = false;
    let error = null;

    async function fetchData(type) {
        loading = true;
        error = null;
        try {
            const response = await fetch(`/api/admin/${type}`);
            const data = await response.json();
            if (data.success) {
                listData = data.items;
                activeView = type;
            } else {
                error = data.message;
            }
        } catch (e) {
            error = "Failed to fetch data";
        }
        loading = false;
    }

    async function adminStatus(id) {
        try {
            const response = await fetch(`/api/admin/admin-status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            if (data.success) {
                fetchData(activeView);
            } else {
                error = data.message;
            }
        } catch (e) {
            error = e.message;
        }        
    }

    async function deleteCourse(id) {
        //show a confirmation dialog
        if (!confirm("Vuoi veramente eliminare questo corso?")) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/corso/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            if (data.success) {
                //download the file
                const url = window.URL.createObjectURL(new Blob([data.file]));
                const link = document.createElement('a');
                link.href = url;
                link.download = `corso_${id}_deleted.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                fetchData(activeView);
            } else {
                error = data.message;
            }
        } catch (e) {
            error = e.message;
        }        
    }

    async function getIscrizioni(id) {
        try {
            const response = await fetch(`/api/admin/corso/pdf-iscrizioni`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseId: id }),
            });
            const data = await response.json();
            if (data.success) {
                fetchData(activeView);
            } else {
                error = data.message;
            }
        } catch (e) {
            error = e.message;
        }        

        
    }

    async function deleteDocente(id) {
        //show a confirmation dialog
        if (!confirm("Vuoi veramente eliminare questo organizzatore?")) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/docente`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            if (data.success) {
                fetchData(activeView);
            } else {
                error = data.message;
            }
        } catch (e) {
            error = e.message;
        }        
    }
    

</script>

<div class="container mx-auto px-4 py-8">
    <div class="bg-white shadow-lg rounded-lg p-6">
        <h1 class="text-3xl font-bold text-[#FB773C] mb-8">Dashboard Amministratore</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
                class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                on:click={() => fetchData('students')}>
                Studenti
            </button>
            <button
                class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                on:click={() => fetchData('courses')}>
                Corsi
            </button>
            <button
                class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                on:click={() => fetchData('teachers')}>
                Organizzatori
            </button>
        </div>

        {#if loading}
            <div class="text-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FB773C] mx-auto"></div>
            </div>
        {:else if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        {:else if activeView && listData.length > 0}
            <div class="overflow-x-auto text-gray-700">
                <table class="min-w-full bg-white">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-6 py-3 text-left text-gray-700">ID</th>
                            <th class="px-6 py-3 text-left text-gray-700">Nome</th>
                            {#if activeView === 'students'}
                                <th class="px-6 py-3 text-left text-gray-700">Email</th>
                                <th class="px-6 py-3 text-left text-gray-700">Admin</th>
                                <th class="px-6 py-3 text-left text-gray-700">Gestisci</th>
                            {:else if activeView === 'courses'}
                                <th class="px-6 py-3 text-left text-gray-700">Aula</th>
                                <th class="px-6 py-3 text-left text-gray-700">Gestisci</th>
                                <th class="px-6 py-3 text-left text-gray-700">Elimina</th>
                                <th class="px-6 py-3 text-left text-gray-700">Iscrizioni</th>                                
                            {:else if activeView === 'teachers'}
                            <th class="px-6 py-3 text-left text-gray-700">Email</th>
                                <th class="px-6 py-3 text-left text-gray-700">
                                    <a href="/admin/docenti/create" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                        Aggiungi
                                    </a>
                                </th>
                                <th class="px-6 py-3 text-left text-gray-700">Elimina</th>

                            {/if}
                        </tr>
                    </thead>
                    <tbody>
                        {#each listData as item}
                            <tr class="border-t hover:bg-gray-50">
                                <td class="px-6 py-4 text-gray-700">{item.id}</td>
                                <td class="px-6 py-4 text-gray-700">{item.nomeCompleto || item.nome}</td>
                                {#if activeView === 'students'}
                                    <td class="px-6 py-4" text-gray-700>{item.email}</td>
                                    <td class="px-6 py-4 text-gray-700">
                                        <span class={item.admin ? "text-green-600" : "text-red-600"}>
                                            {item.admin ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <th class="px-6 py-3 text-left text-gray-700 ">
                                        <button
                                            class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded"
                                            on:click={() => adminStatus(item.id)}>
                                            {item.admin ? "Rimuovi da admin" : "Promuovi"}
                                        </button>
                                    </th>
                                {:else if activeView === 'courses'}
                                    <td class="px-6 py-4 text-gray-700">{item.aula}</td>
                                    
                                    <th class="px-6 py-3 text-left text-gray-700 ">
                                        <a href="/admin/corsi/{item.id}" class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded">
                                            Gestisci
                                        </a>
                                    </th>
    
                                    
                                    <th class="px-6 py-3 text-left text-gray-700 ">
                                        <button
                                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                            on:click={() => deleteCourse(item.id)}>
                                            Elimina
                                        </button>
                                    </th>
                                    
                                    <th class="px-6 py-3 text-left text-gray-700 ">
                                        <a href="/api/admin/corso/pdf-iscrizioni/{item.id}" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                            Iscrizioni
                                        </a>
                                    </th>

                                {:else if activeView === 'teachers'}
                                    <td class="px-6 py-4 text-gray-700 ">{item.email}</td>
                                    <th class="px-6 py-3 text-left text-gray-700 ">
                                        <a href="/admin/docenti/{item.id}" class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded">
                                            Iscrizioni
                                        </a>
                                    </th>
                                    <th class="px-6 py-3 text-left text-gray-700 ">
                                        <button
                                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                            on:click={() => deleteDocente(item.id)}>
                                            Elimina
                                        </button>
                                    </th>
    
                                {/if}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else if activeView}
            <div class="text-center py-8 text-gray-600">
                No data available
            </div>
        {/if}
    </div>
</div>
