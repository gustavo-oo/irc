export default function validateNickName(nickname) {
    if (nickname.length > 9) {
        return false;
    }
    
    if (nickname.match(/^[^a-zA-Z]/)) {
        return false;
    }
    
    return true;
}