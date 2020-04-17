
export class Collection
	def getContent
		Promise.new do|resolve, reject|

	def setContent
		Promise.new do|resolve, reject|

	def initialize dbi
		@dbi = dbi