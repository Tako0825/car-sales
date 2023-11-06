export const sleep = (duration = 500) => {
    let timer
    return new Promise(resolve => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            resolve()
        }, duration)
    })
}