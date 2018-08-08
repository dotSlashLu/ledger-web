// a (relatively) high performance function to empty a dom element
export function empty($parent) {
    while ($parent.firstChild) {
        $parent.removeChild($parent.firstChild)
    }
}

// remove original options from a select element then fill with new options
//
// typically select will have the first option as a placeholder
// by default this function will keep it
// if the first should also be removed, set keepFirst to be false 
export function replaceOptions($select, $options, keepFirst = true) {
	if (!keepFirst) {
        empty($select)
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

// document.ready
export function ready(callback) {
    // in case the document is already rendered
    if (document.readyState != 'loading') callback()
    // modern browsers
    else if (document.addEventListener)
        document.addEventListener('DOMContentLoaded', callback)
    // IE <= 8
    else document.attachEvent('onreadystatechange', function() {
        if (document.readyState == 'complete') callback()
    })
}

export function readyFor(callback, ...urls) {
    if (arguments.length == 1)
        return ready(callback)

    let pathname = window.location.pathname
    console.log(urls)
    urls.forEach(url => {
        if (pathname.endsWith(url))
            return ready(callback)
    })
}