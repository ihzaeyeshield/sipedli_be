const bcrypt = require('bcrypt');

const hashPassword = (password) => bcrypt.hashSync(password,6)
// const ihza = hashPasssword('ihza')
// console.log(ihza);
const comparePassword = (password,hash) => bcrypt.compareSync(password,hash)
// console.log(comparePassword('ihza',ihza));

module.exports={hashPassword,comparePassword}
