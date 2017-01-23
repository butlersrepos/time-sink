<username-field>
	<div class="input-group">
		<label for="name" class="input-group-label">Username:</label>
		<input class="input-group-field connection-name" name="name" ref="name" type="text">
		<div class="input-group-button">
			<button class="button connect" onclick={ join }>JOIN</button>
		</div>
	</div>

	<script>
		this.socket = this.opts.socket;

		this.join = () => {
			let chosenName = this.refs.name.value;
			this.socket.emit('join-chat', {name: chosenName});
		};
	</script>
</username-field>