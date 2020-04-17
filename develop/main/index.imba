import './main.styl'
import Pittance as Header from './header'
import Pittance as Footer from './footer'

export Header
export Footer

tag ItemElement < tr

	def color item
		if item > 0 then "rgba(0, 0, 0, { Math.abs item })"
		else if item < 0 then "rgba(255, 140, 0 { Math.abs item })"
		else "rgba(255, 255, 255)"

	def render
		<self>
			<td> data:id
			for item, i in data:collection
				<td css:backgroundColor=color> item

export tag Pittance  < main
	@classes = []
	def render
		<self>
			<table>
				<tbody> for item, i in application.collection
					<ItemElement[ item ]>
				if application.collection and application.collection:length then <tfoot> <tr>
					<th> "ИТОГО: "