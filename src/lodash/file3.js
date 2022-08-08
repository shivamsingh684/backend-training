const _ =require('lodash');

const array1=[2,5,7,6,8,1,3,4,9,4]
const array2=[5,22,47,6,85,14,6,72]
const array3=[25,45,45,85,22,6,14]
const array4=[5,7,14,36,25,15,48,95]
const array5=[85,47,15,5,4,6,9,4,1]

const final=function(){
    console.log(_.union(array1,array2,array3,array4,array5))
}
module.exports.manyarr=final