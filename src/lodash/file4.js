const _ =require('lodash');
const list=[["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
const pairs1=function(){
    console.log(_.fromPairs(list))
}

module.exports.newlist=pairs1