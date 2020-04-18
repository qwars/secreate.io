
export class Collection
	prop content default:  Array.new( 20 ).fill(0).map do
		Array.new( 10 ).fill(0).map( do Math.random ).map do |n|
			Math.random * ( Number( n.toFixed 1 ) === 0.5 ? 0 : ( n > 0.5 ? 1 : -1 ) )

	def getContent
		Promise.new do|resolve, reject|
			resolve content

	def setContent data
		@content = data

	def initialize dbi
		@dbi = dbi