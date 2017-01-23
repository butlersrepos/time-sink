<app>
	<h1>Welcome to a clusterfuck</h1>
	<username-field socket={ socket }></username-field>
	<section class="chat">
		<ul>
			<li each={ players }>{ name || 'Unnamed' } - { position.lat }, { position.lon }</li>
		</ul>
	</section>

	<script>
		this.store = this.opts.store;
		this.socket = this.opts.socket;

		this.store.subscribe(() => {
			this.players = this.store.getState().nearbyPlayers;
			this.update();
		});

		this.join = () => {
			console.log("Should be logging in now.");
		}
	</script>
</app>