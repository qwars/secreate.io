
import './header.styl'

const logoQwars = require '../images/Qwars.svg'
const logoSite = require '../images/logo.svg'

export tag Pittance < header
	@classes = []
	def render
		<self>
			<a route-to="/">
				<s> <img src=logoQwars:default>
				<span> <img src=logoSite:default>
			<section>
			<aside>