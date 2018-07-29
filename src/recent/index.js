const http = require("axios")

import config from "../config"
import { ready, formatTime } from "../utils/util"
import category from "../models/category"
import "./recent.css"

const limit = 6
var $block, $list

function createWrapperEl() {
	let $el = document.createElement("div")
	$el.className = "recent-item"
	return $el
}

function createEl($wrapper, r) {
	let $firstRow = document.createElement("div")
	$firstRow.className = "row"

	let $title = document.createElement("div")
	$title.className = "col col-9 text-truncate"
	$title.innerHTML = r.title

	let $cost = document.createElement("div")
	$cost.className = "col col-3 cost text-right"
	$cost.innerHTML = r.cost

	$firstRow.appendChild($title)
	$firstRow.appendChild($cost)


	let $secondRow = document.createElement("div")
	$secondRow.className = "row"

	var catText = "", mainCat = category.map[r.class]
	if (mainCat) {
		catText += mainCat.name

		var subCat = r.sub_class ? category.map[r.sub_class] : ""
		if (subCat) {
			catText += "-" + subCat.name
		}
	}
	let $cat = document.createElement("div")
	$cat.className = "col col-5"
	$cat.innerHTML = catText

	let $time = document.createElement("div")
	$time.className = "col col-7 text-muted text-right"
	$time.innerHTML = formatTime(r.create_time)

	$secondRow.appendChild($cat)
	$secondRow.appendChild($time)


	$wrapper.appendChild($firstRow)
	$wrapper.appendChild($secondRow)
}

export function getRecent(offset = 0, clear = true) {
	http.get(config.apiBase + "/expense", {
		params: {
			sortby: "create_time",
			order: "desc",
			offset: offset,
			limit: limit
		}
	}).then(resp => {
		if (clear) {
			while ($list.firstChild)
				$list.removeChild($list.firstChild)
		}

		resp.data.forEach((r) => {
			let $wrapper = createWrapperEl()
			createEl($wrapper, r)
			$list.appendChild($wrapper)
		})
	}).catch(e => {
		alert(e)
	})
}

ready(() => {
	console.log("ready - recent")
	$block = document.querySelector("#block-recent")
	$list = $block.querySelector(".recent-list")
	getRecent()
})