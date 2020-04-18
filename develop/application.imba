import './css-settings.styl'

window:WebSocket = window:WebSocket or window:MozWebSocket

const Connection = WebSocket.new "ws://{ window:location:hostname }:8999"

Connection:onconnect = do|request| Imba.commit console.log 'onconnect', request

Connection:onmessage = do|request| Imba.commit if Connection:collection = JSON.parse request:data
Connection:onerror = do|request| console.log 'onerror', request
Connection:onclose = do|request| console.log 'onclose', request


export tag Application < output
	def setup
		let state = self
		extend tag element
			def application
				state

	def collection
		Connection:collection

	def render
		<self>