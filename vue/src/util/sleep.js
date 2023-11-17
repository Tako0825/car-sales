let timer = null

export const sleep = (duration = 500) => {
    return new Promise(resolve => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            resolve()
        }, duration)
    })
}