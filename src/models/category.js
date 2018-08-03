const http = require('axios')
import config from "../config"

class Category {
	constructor() {
		this.raw = []
		this.subCatMap = {}
		this.map = {}
		this.loaded = false
		this.load = this.load.bind(this)
	}

	load() {
		console.log("load cat")
		this.promise = http.get(config.apiBase + '/expense_class')
		.then(response => {
			this.raw = response.data
			response.data.map(cat => {
				this.map[cat.class.id] = cat.class
				if (cat.children)
					cat.children.forEach(c => {
						this.map[c.id] = c
					})
				this.subCatMap[cat.class.id] = cat.children
				// let $option = document.createElement("option")
				// $option.value = cat.class.id
				// $option.innerHTML = cat.class.name
				// return $option
			})
			this.loaded = true
		})
		.catch(function (error) {
			if (error.response && error.response.status == 405) {
				console.log("unauthorized, should be redirected to login soon")
				return
		    }
		    alert(error)
		})

		return this.promise
	}
}

const cat = new Category()

export default cat