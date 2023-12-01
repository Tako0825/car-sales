import home from "./home"
import login from "./login"
import space from "./space"
import notice from "./notice"

export default () => {
    return [
        ...home,
        login,
        space,
        notice
    ]
}