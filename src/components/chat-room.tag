<chat-room>
	<section class="chat-display">
		<div each={ messages }>{ content }</div>
	</section>
	<div class="input-group">
		<label for="message" class="input-group-label">Message:</label>
		<input type="text" name="message" class="input-group-field" />
		<div class="input-group-button">
			<button class="button send" onclick={ sendMessage }>SEND</button>
		</div>
	</div>

	<script>
		this.store = this.opts.store;
		this.socket = this.opts.socket;

		this.sendMessage = () => {
			
			socket.emit('sendMessage', { content: '' });
			
		};

		this.store.subscribe(() => {
			this.messages = this.store.getState().chatMessages;
		});
	</script>
</chat-room>