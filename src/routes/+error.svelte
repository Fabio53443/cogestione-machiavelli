<script>
    import { page } from '$app/stores';
</script>

<style>
	/* Styles specific to the error page */
	.container {
		margin: 2rem auto;
		text-align: center;
		max-width: 600px;
		padding: 1rem;
	}
	h1 {
		color: #d32f2f;
		font-size: 2rem;
	}
	p {
		margin: 1rem 0;
		font-size: 1.125rem;
		color: aliceblue;
	}
	a {
		color: #e9e9e9;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
</style>

<div class="container">
	<h1>Errore {$page.status}</h1>
	<p>{$page.error.message}</p>
	<!-- ...optional custom error details... -->
	<p>Ricarica la pagina o vai alla <a href="/">homepage</a>.</p>
</div>