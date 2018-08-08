import { empty } from "./dom"

class InlineSelector {
	constructor(target, onSelect) {
		this.target = target
		this.selected = null
		this.onSelect = onSelect
	}

	optClick(e) {
		e.preventDefault()
		let $orig = this.target.querySelector(".active")
		if ($orig) {
			$orig.className = $orig.className.replace("active", "")
		}
		let $selected = e.target
		$selected.className = $selected.className + " active"
		console.log("selected", this.selected, "=>", $selected.getAttribute("attr-value"))
		this.selected = $selected.getAttribute("attr-value")
		if (this.onSelect) {
			this.onSelect(this)
		}
	}

	fill(kvp) {
		empty(this.target)
		Object.entries(kvp).forEach(([k, v]) => {
			let $opt = document.createElement("span")
			$opt.className = "cat"
			$opt.setAttribute("attr-value", v)
			$opt.innerHTML = k
			$opt.addEventListener("click", this.optClick.bind(this))
			this.target.appendChild($opt)
		})
	}
}

export default InlineSelector