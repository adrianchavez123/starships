const  endPoint = "https://swapi.co/api/starships";
const myHeader = new Headers();
myHeader.append("Content-Type", "application/json");

const initObject = {
  method: 'GET',
  mode : 'cors',
  headers: myHeader
};

function run(genFunc){
  const genObject = genFunc();

  function iterate(iteration){
    if(iteration.done)
      return Promise.resolve(iteration.value);
    return Promise.resolve(iteration.value)
      .then(x => iterate(genObject.next(x)))
      .catch(x => iterate(genObject.throw(x)));
  }

  try{
    return iterate(genObject.next());
  }catch(ex){
    return Promise.reject(ex);
  }
}

function* compareShips(){

  let starshipResponse = yield fetch(`${endPoint}/${document.getElementById('starship1').value}/`,initObject);
  const starship1 = yield starshipResponse.json();

  starshipResponse = yield fetch(`${endPoint}/${document.getElementById('starship2').value}/`,initObject);
  const starship2 = yield starshipResponse.json();

  const data = {
    "Name" : [starship1.name, starship2.name],
    "Cost" : [starship1.cost_in_credits, starship2.cost_in_credits],
    "Speed" : [starship1.max_atmosphering_speed, starship2.max_atmosphering_speed],
    "cargo Size" : [starship1.cargo_capacity, starship2.cargo_capacity],
    "Passengers" : [starship1.passengers, starship2.passengers]
  };
  return data;

}


document.getElementById("compare").addEventListener("click",function(){
  run(compareShips)
  .then(function(val){
    const table = TableRender();
    table(val);
  })
  .catch(function(err){
    alert(err.message);
  })
})
