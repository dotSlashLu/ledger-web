const http = require('axios')
import config from "../config"

class Category {
	constructor() {
		this.raw = []
		this.subCatMap = {}
		this.map = {}
		this.loaded = false
		this.promise = this.load()
	}

	load() {
		return http.get(config.apiBase + '/expense_class')
		.then(response => {
			this.raw = response.data
			response.data.map(cat => {
				this.map[cat.class.id] = cat.class
				if (cat.children)
					cat.children.forEach(c => {
						this.map[c.id] = c
					})
				this.subCatMap[cat.class.id] = cat.children
				let $option = document.createElement("option")
				$option.value = cat.class.id
				$option.innerHTML = cat.class.name
				return $option
			})
			console.log("category loaded", this)
			this.loaded = true
		})
		.catch(function (error) {
			alert(error)
		})
	}
}

const cat = new Category()

export default cat