const container = document.querySelector('.countries');
const neighbors = document.querySelector('.neighbors');
const searchBtn = document.querySelector('.searchBtn');


const renderError = function(msg){
  container.insertAdjacentText("beforeend",msg)
}


const renderCountry= async(data, className ='')=>{
  
    
  let lang = (Object.values(data.languages)).join(' , ')
  let allLang = lang.toString();
    const html = 
    `
    <div class="my-0 max-w-sm mx-auto  px-0 py-0 
    shadow-lg rounded border container ${className}">
    <div class="text-center border-2 border-grey-600"><img src="${data.flags.png}" alt="" class="w-full h-48"></div>
    <div class="py-6  ">
      
      <p class="px-6 font-bold text-2xl">${data.name.common}</p>
      <p class="px-6 pb-4">${data.region}</p>
      <p class="px-6 py-2 font-bold"><span class="pr-4">👩🏼‍🤝‍👩🏻</span>${(+data.population/1000000).toFixed(2)}M people </p> 
      <p class="px-6 py-2 "><span class="pr-4 ">🗣</span>${allLang}</p> 
      <p class="px-6 py-2 font-bold"><span class="pr-4">💰</span>${Object.values(data.currencies)[0].name}</p> 
    </div>
    </div>
    `;
    container.insertAdjacentHTML("beforeend",html);
    container.style.opacity = 1;  
    
    
  }
const renderNeighbor= async(data, className ='')=>{
  
    
  let lang = (Object.values(data.languages)).join(' , ')
  let allLang = lang.toString();
    const html = 
    `
    <div class="my-0 max-w-sm mx-auto  px-0 py-0 
    shadow-lg rounded border container ${className}">
    <div class="text-center border-2 border-grey-600"><img src="${data.flags.png}" alt="" class="w-full h-48"></div>
    <div class="py-6  ">
      
      <p class="px-6 font-bold text-2xl">${data.name.common}</p>
      <p class="px-6 pb-4">${data.region}</p>
      <p class="px-6 py-2 font-bold"><span class="pr-4">👩🏼‍🤝‍👩🏻</span>${(+data.population/1000000).toFixed(2)}M people </p> 
      <p class="px-6 py-2 "><span class="pr-4 ">🗣</span>${allLang}</p> 
      <p class="px-6 py-2 font-bold"><span class="pr-4">💰</span>${Object.values(data.currencies)[0].name}</p> 
    </div>
    </div>
    `;
    neighbors.insertAdjacentHTML("beforeend",html);
    neighbors.style.opacity = 1;  
    
    
  }

  const getJSON = function(url, errorMsg='Something went wrong'){
    return fetch(url).then((response)=>{ if(!response.ok)
      throw new Error(`${errorMsg} (${response.status})`)
    return response.json()})
  }


  const getPosition = function(){
    return new Promise(function (resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve)

    })
    
  }


const whereAmI = async function(){
     try {
      const pos = await getPosition()
      const {latitude:lat, longitude:long} = pos.coords;
       const resGeo = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=786157954621776117703x8160`)
       if(!resGeo.ok) throw new Error('Problem fetching data');
       

      const dataGeo = await resGeo.json()
      // if(!dataGeo.ok) throw new Error('Problem fetching data');
      console.log(dataGeo)

      const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`)
      if(!res.ok) throw new Error('Problem fetching data')
    
    const data = await res.json();

    renderCountry(data[0])
  
    const neighbour = data[0].borders;
      if(!neighbour) throw new Error('No neighbour can be found!');

      if(neighbour.length>1){
        for(let i=0; i<neighbour.length; i++){

         getJSON(`https://restcountries.com/v3.1/alpha/${neighbour[i]}`, "Country not found!")
         .then(data => renderNeighbor(data[0], 'neighbour'));
   
    
        }}}catch (error) { 
      console.error;
      
     };
 
};

searchBtn.onclick = ()=>{
   whereAmI(getPosition);
      }
   
      

  