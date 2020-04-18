import './main.styl'
import Pittance as Header from './header'
import Pittance as Footer from './footer'

export Header
export Footer

document:body.addEventListener 'click', do |e|
	Array.from Imba.root.querySelectorAll( '[open]' ), do |item|
		item.setAttribute 'open', null

tag ItemDatails < details
	prop source

	def sumSource
		let sum = for item, i in source
			item += source[ i ? i - 1 : i ]
		sum.reverse[0]

	def selectionState
		if @selection == 'max' then Math:max.apply null, source
		else if @selection == 'min' then Math:min.apply null, source
		else if @selection == 'avg' then sumSource / source:length
		else sumSource

	def selectState state
		@selection = state

	def closeDetails
		Array.from Imba.root.querySelectorAll( "[open]:not( #{ id } )" ), do |item|
			item.setAttribute 'open', null

	def render
		<self :tap.stop.closeDetails>
			<summary>
				<samp> "{ @selection || 'sum' }: "
				<span> selectionState.toFixed 4
			<ul>
				<li :tap.selectState('sum')> "sum"
				<li :tap.selectState('min')> "min"
				<li :tap.selectState('max')> "max"
				<li :tap.selectState('avg')> "avg"

tag ItemElement < tr
	prop name

	def backgroundColor item
		if item < 0 then "rgba(255, 140, 0, { Math.abs item })"
		else if item then "rgba(0, 0, 0, { Math.abs item })"
		else "rgb(255, 255, 255)"

	def render
		<self>
			<td> name
			for item, i in data
				<td css:backgroundColor=backgroundColor( item )> <span .is-light=( 0.5 < Math.abs item )> item.toFixed 4

export tag Pittance  < main
	@classes = []
	def render
		<self>
			<table>
				<tbody> for item, i in application.collection
					<ItemElement[ item ] name="Entity-{ 1 + i }">
				if application.collection and application.collection:length then <tfoot> <tr>
					<th> "ИТОГО: "
					for item, i in application.collection[0]
						<th> <ItemDatails source=( application.collection.map do |item| item[i] ) id="details-{ i }">