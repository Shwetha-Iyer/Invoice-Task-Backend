function generatePassword(){
    //generates a random password or a string of length 12
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let uppercase = lowercase.toUpperCase();
    let number = "0123456789";
    let pass = "";
    for(i=0;i<4;i++){
        pass+=lowercase.charAt(Math.floor(Math.random() * lowercase.length))+uppercase.charAt(Math.floor(Math.random() * uppercase.length))+number.charAt(Math.floor(Math.random() * number.length));
    }
    return pass.split('').sort(function(){return 0.5-Math.random()}).join('');
}
module.exports = generatePassword;