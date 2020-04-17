import './css-settings.styl'

export tag Application < output
	def setup
		let state = self
		extend tag element
			def application
				state

	def collection
		@collection

	def render
		<self>