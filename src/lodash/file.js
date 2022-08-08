const _ =require('lodash');

const month=function(){
   console.log(_.chunk(["jan","feb","march","april","may","june","july","aug","sep","oct","nov","dec"],4));
}
// console.log(_.chunk(month,4))
module.exports.lodash = month