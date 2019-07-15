export default {
    saveUser(user){
        localStorage.setItem('user_key',JSON.stringify(user))
    },
    getUser(user){
       return JSON.parse(localStorage.getItem('user_key')||'{}')
    },
    removeUser(user){
       localStorage.removeItem('user_key')
    }
}