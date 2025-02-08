<script>
  export let data;
  const { user, nomeCompleto, email } = data;
  import { EditOutline } from 'flowbite-svelte-icons';

</script>

<div class="container mx-auto flex flex-col items-center justify-start pt-16 px-4">
  <div class="w-full max-w-md">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-[#FB773C]">Il tuo profilo</h1>
      <a href="/studente/profile/edit" class="flex items-center bg-[#FB773C] hover:bg-[#EB3678] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200">
        Modifica
        <EditOutline class="w-5 h-5 ml-2 " />
    </a>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md">
        <div class="mb-4">
            <h2 class="text-lg font-semibold text-gray-700">Nome e Cognome: </h2>
            <p class="text-lg text-gray-600">{nomeCompleto}</p>
            <h2 class="text-lg font-semibold text-gray-700 mt-4">Email: </h2>
            <p class="text-lg text-gray-600">{email}</p>
        </div>
    </div>
  </div>
</div>