// remove original options from a select element then fill with new options
//
// typically select will have the first option as a placeholder
// by default this function will keep it
// if the first should also be removed, set keepFirst to be false 
export function replaceOptions($select, $options, keepFirst = true) {
	if (!keepFirst) {
		while ($select.firstChild) {
			$select.removeChild($select.firstChild)
		}
	} else if ($select.children.length > 1) {
		const nchild = $select.children.length
		for (var i = 1; i < nchild; i++) {
			$select.removeChild($select.children[1])
		}
	}

	$options.forEach($option => {
		$select.appendChild($option)
	})
}