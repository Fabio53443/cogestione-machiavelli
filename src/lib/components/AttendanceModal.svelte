<script>
  export let show = false;
  export let students = [];
  export let onClose;
  export let onUpdateAttendance;

  let selectedStudents = new Set();
  let selectAll = false;

  function toggleSelectAll() {
    selectAll = !selectAll;
    selectedStudents.clear();
    if (selectAll) {
      students.forEach(student => selectedStudents.add(student.id));
    }
    selectedStudents = selectedStudents;
  }

  function toggleSelect(studentId) {
    if (selectedStudents.has(studentId)) {
      selectedStudents.delete(studentId);
    } else {
      selectedStudents.add(studentId);
    }
    selectAll = selectedStudents.size === students.length;
    selectedStudents = selectedStudents;
  }

  async function toggleAttendance(student) {
    try {
      const res = await fetch(`/api/studenti/attendance/${student.id}`, {
        method: 'PUT',
        body: JSON.stringify({ 
          studentId: student.id,
          present: !student.presente 
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.ok) {
        const updated = await res.json();
        onUpdateAttendance(updated);
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  }

  async function massUpdateAttendance(present) {
    try {
      const promises = Array.from(selectedStudents).map(studentId => 
        fetch(`/api/studenti/attendance/${studentId}`, {
          method: 'PUT',
          body: JSON.stringify({ studentId, present }),
          headers: { 'Content-Type': 'application/json' }
        })
      );
      
      const results = await Promise.all(promises);
      const updates = await Promise.all(results.map(res => res.json()));
      onUpdateAttendance(updates);
      selectedStudents.clear();
      selectedStudents = selectedStudents;
    } catch (error) {
      console.error('Error in mass update:', error);
    }
  }

  function composeMassEmail() {
    const selectedEmails = students
      .filter(student => selectedStudents.has(student.id))
      .map(student => student.studentEmail)
      .filter(Boolean)
      .join(',');
    
    if (selectedEmails) {
      window.location.href = `mailto:?bcc=${selectedEmails}`;
    }
  }
</script>

{#if show}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div class="bg-white rounded-lg max-w-6xl w-full shadow-lg">
    <!-- Header Bar -->
    <div class="flex items-center justify-between px-6 py-3 border-b bg-gray-50">
      <h2 class="text-xl font-bold text-gray-800">Appello</h2>
      <div class="flex items-center gap-3">
        <div class="flex gap-2">
          <button
            class="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 flex items-center gap-1"
            disabled={selectedStudents.size === 0}
            on:click={composeMassEmail}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email ({selectedStudents.size})
          </button>
          <button
            class="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
            disabled={selectedStudents.size === 0}
            on:click={() => massUpdateAttendance(true)}
          >
            Present
          </button>
          <button
            class="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
            disabled={selectedStudents.size === 0}
            on:click={() => massUpdateAttendance(false)}
          >
            Absent
          </button>
        </div>
        <button 
          on:click={onClose}
          class="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Table Header -->
    <div class="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 text-sm font-medium text-gray-600">
      <div class="col-span-1">
        <input
          type="checkbox"
          checked={selectAll}
          on:change={toggleSelectAll}
          class="w-4 h-4 rounded border-gray-300"
        />
      </div>
      <div class="col-span-3">Name</div>
      <div class="col-span-2">Class</div>
      <div class="col-span-4">Email</div>
      <div class="col-span-2">Status</div>
    </div>

    <!-- Student List -->
    <div class="max-h-[calc(100vh-220px)] overflow-y-auto">
      {#each students as student (student.id)}
        <div class="grid grid-cols-12 gap-4 px-6 py-2.5 border-b hover:bg-gray-50 items-center text-sm">
          <div class="col-span-1">
            <input
              type="checkbox"
              checked={selectedStudents.has(student.id)}
              on:change={() => toggleSelect(student.id)}
              class="w-4 h-4 rounded border-gray-300"
            />
          </div>
          <div class="col-span-3 font-medium text-gray-900">
            {student.studentName || 'N/A'}
          </div>
          <div class="col-span-2">
          </div>
          <div class="col-span-4">
            {#if student.studentEmail}
              <a 
                href="mailto:{student.studentEmail}" 
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {student.studentEmail}
              </a>
            {:else}
              <span class="text-gray-400">No email provided</span>
            {/if}
          </div>
          <div class="col-span-2">
            <button
              class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-1.5"
              class:bg-green-100={student.presente}
              class:text-green-700={student.presente}
              class:hover:bg-green-200={student.presente}
              class:bg-red-100={!student.presente}
              class:text-red-700={!student.presente}
              class:hover:bg-red-200={!student.presente}
              on:click={() => toggleAttendance(student)}
            >
              <span 
                class="h-1.5 w-1.5 rounded-full" 
                class:bg-green-500={student.presente}
                class:bg-red-500={!student.presente}
              />
              {student.presente ? 'Present' : 'Absent'}
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
{/if}