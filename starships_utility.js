
const ShipsGenerator = function (){
  const ships = {
    "CR90 Corvette" : 2,
    "V-wing" : 75,
    "Belbullb-22 Starfigther" : 74,
    "Jedi interceptor" : 65,
    "Star Destroyer" : 3,
    "Trade Fedaration Cruiser" : 59,
    "Solar Sailer" : 58,
    "Republic Attack Cruiser" : 63,
    "A-wing" : 28,
    "B-wing" : 29,
    "Naboo Fighter" : 39,
    "Millenium Falcon" : 10
  }

  const generate = function (starship){
    Object.keys(ships).forEach(function(k){
      let option = document.createElement('OPTION');
      option.appendChild(document.createTextNode(k));
      option.value=ships[k];
      document.getElementById(starship).appendChild(option);
    });
  }

  return generate;

}


const TableRender = function(){

  const table = document.getElementById('table');
  const headers=[
    "",
    "Starship1",
    "StarShip2"
  ];

  const defaultTable = {
    "Name" : [ '', ''],
    "Cost" : [ '', ''],
    "Speed" : [ '', ''],
    "cargo Size" : [ '', ''],
    "Passengers" : [ '', '']
  };

  const reset = function(){
    while(table.hasChildNodes()){
      table.removeChild(table.firstChild);
    }
  }

  function display (data){
    reset();
    const tr = document.createElement('TR');

    headers.forEach(function(header){
      const th = document.createElement('TH');
      th.appendChild(document.createTextNode(header));
      tr.append(th);
    });
    table.append(tr);

    if(! data)
      data = defaultTable;

    Object.keys(data).forEach(function(d){
      const trData = document.createElement('TR');
      const td1 = document.createElement('TD');
      const td2 = document.createElement('TD');
      const td3 = document.createElement('TD');
      td1.appendChild(document.createTextNode(d));
      td2.appendChild(document.createTextNode(data[d][0]));
      td3.appendChild(document.createTextNode(data[d][1]));
      td2.className = '';
      td3.className = '';
      if( ! isNaN(data[d][0]) )
        parseInt(data[d][0]) > parseInt(data[d][1])
        ? td2.className = "red"
        : parseInt(data[d][0]) < parseInt(data[d][1])
          ? td3.className = "red"
          : undefined;

      trData.appendChild(td1);
      trData.appendChild(td2);
      trData.appendChild(td3);
      table.appendChild(trData);
    });


  }

  return display;


}

const ships = ShipsGenerator();
ships('starship1');
ships('starship2');

const tableRender = TableRender();
tableRender();
