<script>
    import Alert from "$lib/components/Alert.svelte";
    import Cookies from "js-cookie";
    let showAlert = false;
    let alertMessage = "";
    let alertType;
    const suffix = "@spallanzanitivoli.edu.it";

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value + suffix;
        const password = event.target.elements.password.value;
        try {
            const response = await fetch("/api/studenti/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success) {
                alertType = "success";
                alertMessage = "Login successful!";
                Cookies.set("token", result.token, {
                    expires: 7,
                    secure: true,
                    sameSite: "Strict",
                });
                window.location.href = "/studente/dashboard";
            } else {
                alertType = "error";
                alertMessage = result.message || "Login failed.";
            }
        } catch (error) {
            alertType = "error";
            alertMessage = "An unexpected error occurred.";
        } finally {
            showAlert = true;
        }
    };
</script>

<Alert type={alertType} message={alertMessage} show={showAlert} />

<div
    class="container mx-auto flex flex-col items-center justify-start pt-16 px-4"
>
    <h1 class="text-3xl font-bold text-center text-[#FB773C] mb-8">Accedi</h1>
    <div class="w-full max-w-md bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
    <p class="text-xl text-center text-gray-600 mb-4"> Accedi con il tuo Account Google <b>Istituzionale</b></p>

            <!-- Add a Google SSO button -->
            <div class="flex items-center justify-between mt-4">
                <a
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full text-center"
                    href="/api/studenti/google"
                >
                    Accedi con Google
                </a>
            </div>
            
    </div>
</div>
