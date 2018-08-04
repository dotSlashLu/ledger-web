const http = require("axios")

import config from "../config"
import { ready, formatTime } from "../utils/util"
import category from "../models/category"
import "./recent.css"

const limit = 6
var $block, $list, $rangeSelector

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

const now = new Date()
const timeRangeMap = {
	2: new Date(now.setDate(now.getDate() - 3)),
	3: new Date(now.setDate(now.getDate() - 7))
}

export function getRecent(rangeType = 2, clear = true) {
	let from = timeRangeMap[rangeType].toISOString()
	http.get(config.apiBase + "/expense", {
		params: {
			sortby: "create_time",
			order: "desc",
			// limit: limit,
			query: "create_time:>=:" + from
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
	})
	.catch(e => {
		if (e.response && e.response.status == 405) {
			console.log("unauthorized, should be redirected to login soon")
			return
	    }
	    alert(e)
	})
}

function bindRangeSelector() {
	$rangeSelector.addEventListener("change", e => {
		let rangeType = e.target.value
		getRecent(rangeType, true)
	})
}

function init() {
	console.log("ready - recent")
	$block = document.querySelector("#block-recent")
	$list = $block.querySelector(".recent-list")
	$rangeSelector = document.querySelector(".header-recent .select-range")
	getRecent()
	bindRangeSelector()
}

export default init
