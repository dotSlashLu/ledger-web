const http = require('axios')

import { ready } from "../utils/util"
import { replaceOptions, empty } from "../utils/dom"
import InlineSelector from "../utils/inline_selector"
// import { getRecent } from "../recent"
import category from "../models/category"
import config from "../config"

import "./add.css"

var $form, $price, $cost, 
	$count, $cat, $subCat,
	catSelector, subCatSelector

function bindTotal() {
	$price.onchange = calcTotal
	$count.onchange = calcTotal
}

function calcTotal(e) {
	$cost.value = $price.value * $count.value
}

function bindCat() {
	$cat.onchange = (e) => {
		let catid = e.target.value
		let subCat = category.subCatMap[catid]
		console.log(subCat)
		if (!subCat) {
			replaceOptions($subCat, [])
			return
		}

		replaceOptions($subCat, subCat.map(cat => {
			let $option = document.createElement("option")
			$option.value = cat.id
			$option.innerHTML = cat.name
			return $option
		}))
	}
}

function subCatClick(selector) {
	$form.querySelector("input[name=sub_class]").value = selector.selected
}

function catClick(selector) {
	// reset subcat
	$form.querySelector("input[name=sub_class]").value = ""
	$form.querySelector("input[name=class]").value = selector.selected
	// render subcat
	const selected = selector.selected
	console.log(selected)
	console.log(category.subCatMap)
	let subCat = category.subCatMap[selected],
		kvp = {}
	if (subCat) {
		subCat.forEach(c => {
			kvp[c.name] = c.id
		})
	}
	subCatSelector.fill(kvp)
}

function loadCategories() {
	category.promise.then(() => {
		let cats = {}
		category.raw.forEach(cat => {
			cats[cat.class.name] = cat.class.id
		})
		catSelector = new InlineSelector($cat, catClick)
		subCatSelector = new InlineSelector($subCat, subCatClick)
		console.log(cats)
		catSelector.fill(cats)
	})
}

function bindForm() {
	$form.addEventListener('submit', e => {
		e.preventDefault()
	  	const f = new FormData(e.target);
	  	var data = {}
		for (const [key, value]  of f.entries()) {
		    data[key] = value;
		}
		console.log("submit data", data)
		
		// convert str to int
		data["class"] = data["class"] ? parseInt(data["class"]) : null
		data["sub_class"] = data["sub_class"] ? parseInt(data["sub_class"]) : null
		data["cost"] = data["cost"] ? parseFloat(data["cost"]) : null

		http.post(config.apiBase + "/expense", data)
		.then(function (response) {
			$form.reset()
			window.location.href = "/"
		})
		.catch(function (error) {
			alert(error)
		})
	})
}

function init() {
	$form = document.querySelector("#form-add")
	$price = $form.querySelector("input[name=price]")
	$count = $form.querySelector("input[name=count]")
	$cost = $form.querySelector("input[name=cost]")
	$cat = $form.querySelector("#select-cat")
	$subCat = $form.querySelector("#select-sub_cat")

	bindTotal()
	bindCat()
	loadCategories()
	bindForm()
}

export default init
