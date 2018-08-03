function formatTime(t) {
    if (!t) return ""
    let ret = ""
    if (!(t instanceof Date))
        t = new Date(t)
    let options = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: false
    };

    return t.toLocaleTimeString("zh-cn", options)
}


export {
    formatTime
}