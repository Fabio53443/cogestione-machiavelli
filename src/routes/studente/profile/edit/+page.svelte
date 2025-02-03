<script>
    import { goto } from "$app/navigation";
    import Alert from "$lib/components/Alert.svelte";
    import { onMount } from "svelte";

    let showAlert = false;
    let alertMessage = "";
    let alertType = "info";
    let emailInput = "";
    let emailInputElement;

    $: fullEmail = emailInput;

    onMount(() => {
        if (emailInputElement) {
            emailInputElement.addEventListener("input", handleEmailInput);
        }
    });

    const handleEdit = async (event) => {
        event.preventDefault();

        const nomeCompleto = event.target.elements.nome.value;
        const classe = event.target.elements.classe.value;
        const email = event.target.elements.email.value;

        try {

            const response = await fetch("/api/studenti/edit", {


                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeCompleto,
                    email: fullEmail,
                    classe,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alertType = "success";
                alertMessage = "Registration successful!";
                goto("/studente/profile");
            } else {
                alertType = "error";
                alertMessage = result.message || "Registration failed.";
            }
        } catch (error) {
            alertType = "error";
            alertMessage = error.message;
        } finally {
            showAlert = true;
        }
    };

    const handleEmailInput = (event) => {
        emailInput = event.target.value.replace(suffix, "");
    };
</script>

<!-- Use the alert component -->
<Alert type={alertType} message={alertMessage} show={showAlert} />

<div
    class="container mx-auto flex flex-col items-center justify-start pt-16 px-4"
>
    <h1 class="text-3xl font-bold text-center text-[#FB773C] mb-8">
        Modifica il tuo profilo
    </h1>
    <p class=" text-xl text-center text-gray-200 mb-8">
        Non devi necessariamente modificare tutti i campi, solo quelli che desideri cambiare.
    </p>

    <div class="w-full max-w-md">
        <form
            on:submit={handleEdit}
            class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
        <div class="mb-4">
                
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="nome"
            >
                Nome e Cognome
            </label>
            <input
                class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]"
                id="nome"
                type="text"
                name="nome"
                placeholder="Il tuo nome completo, apparirà sull'appello"
                
            />
        </div>
        <div class="mb-4">
                
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="nome"
                
            >
                Classe
            </label>
            <input
                class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]"
                id="classe"
                type="text"
                name="classe"
                placeholder="es. 4E"
                
            />
        </div>
    <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                >
                    Email
                </label>
                <div class="relative">
                    <input
                        bind:this={emailInputElement}
                        class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#EB3678]"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="La tua email"
                        
                        bind:value={emailInput}
                    />
                </div>
            </div>

            <div class="flex items-center justify-between">
                <button
                    class="bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-200"
                    type="submit"
                >
                    Salva
                </button>
            </div>
        </form>
    </div>
</div>
