function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let num = 1;
  let flag = true;
  if(max) flag = false; 
  while(num <= max || flag){
    if(num%3 === 0 && num%5 === 0) yield 'Fizz Buzz';
    else if(num%3 === 0) yield 'Fizz';
    else if(num%5 === 0) yield 'Buzz';
    else yield num;
     num++;
  }
}
module.exports = fizzBuzzGenerator;
