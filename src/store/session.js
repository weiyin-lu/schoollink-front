// sessionStorage操作
const session = {}

session.setValue = (key, value) => {
    if (typeof value == "object") {
        // 如果是对象就转字符串
        value = JSON.stringify(value)
    }
    return window.sessionStorage.setItem(key, value)
}
session.getValue = (key) => {
    const data = window.sessionStorage.getItem(key);
    if (data) {
        let value = data;
        if ((data.indexOf('{') === 0 || data.indexOf('[') === 0)) {
            // 如果是字符串对象，就转对象
            value = JSON.parse(data)
        }
        return value
    } else {
        return false
    }
}
session.cleanValue = (key) => {
    window.sessionStorage.removeItem(key);
}

export default session