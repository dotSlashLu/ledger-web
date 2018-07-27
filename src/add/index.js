import { ready } from "../utils/util"

var $form, $price, $cost, $count

function calcTotal(e) {
	$cost.value = $price.value * $count.value
}

ready(() => {
	console.log("bind total")
	$form = document.querySelector("#main-add form")
	$price = $form.querySelector("input[name=price]")
	$count = $form.querySelector("input[name=count]")
	$cost = $form.querySelector("input[name=cost]")

	$price.onchange = calcTotal
	$count.onchange = calcTotal
})

export default () => {

}