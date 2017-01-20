<app>
	<h1>Welcome to Stupid Connection Bullshit</h1>
	<input class="connection-name">
	<button class="connect">Set Your Name</button>
	<button class="look-around">Look Around</button>
	<section class="surroundings">
		<ul>
			<li each={ players }>{ name || 'Unnamed' } - { position.lat }, { position.lon }</li>
		</ul>
	</section>

	<script>
		this.store = this.opts.store;

		this.store.subscribe(() => {
			this.players = this.store.getState().nearbyPlayers;
			this.update();
		});
	</script>
</app>