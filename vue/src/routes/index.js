import home from "./home"
import login from "./login"
import space from "./space"

export default () => {
    return [
        ...home,
        login,
        space
    ]
}