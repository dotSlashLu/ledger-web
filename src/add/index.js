const http = require('axios')

import { ready } from "../utils/util"
import { replaceOptions } from "../utils/dom"
import { getRecent } from "../recent"
import category from "../models/category"
import config from "../config"

var $form, $price, $cost, 
	$count, $cat, $subCat

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

function loadCategories() {
	category.promise.then(() => {
		replaceOptions($cat, category.raw.map(cat => {
			let $option = document.createElement("option")
			$option.value = cat.class.id
			$option.innerHTML = cat.class.name
			return $option
		}))
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
		data["cost"] = data["cost"] ? parseInt(data["cost"]) : null

		http.post(config.apiBase + "/expense", data)
		.then(function (response) {
			// alert("记录成功")
			getRecent()
		})
		.catch(function (error) {
			alert(error);
		});
	});
}

ready(() => {
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
})