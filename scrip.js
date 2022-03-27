
var especie;
var evolutionChain;

const li = document.querySelectorAll(".li");
const bloque = document.querySelectorAll(".bloque");

var input = document.getElementById("pokeName");


input.addEventListener("keyup", function(event) {
   
  if (event.keyCode === 13) {
   
   event.preventDefault();
   
   document.getElementById("sbutton").click();
  }
});

li.forEach((cadaLi, i )=>{
    li[i].addEventListener("click",()=>{
        li.forEach((cadaLi, i)=>{
            li[i].classList.remove("activo");
            bloque[i].classList.remove("activo")
        })

        li[i].classList.add("activo");
        bloque[i].classList.add("activo");
    })
})


function fetchPokemon () {
    
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value.toLowerCase();
    console.log(pokeName);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    const pokePeso = document.getElementById("peso");
    const pokeAltura = document.getElementById("altura");
    const pokeAby= document.getElementById("aby");
    const pokeHidaby = document.getElementById("hidaby");
    const pokeMovs = document.getElementById("movs");
    const pokeNameR = document.getElementById("pokeNameR");
    const pokeID = document.getElementById("pokeID");
    const pokeAtk = document.getElementById("atk");
    const pokeDef = document.getElementById("def");
    const pokeHp = document.getElementById("hp");
    const pokeSpatk = document.getElementById("spatk");
    const pokeSpdef = document.getElementById("spdef");
    const pokeSpd = document.getElementById("spd");
    movs.innerHTML ='';
    fetch(url).then((res)=>{
        if (res.status !="200"){
            console.log(res);

        }
        else {
            return res.json();
        }
    }
    ).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeNameR.innerHTML = data.name;

            pokeImage(pokeImg);
            console.log(pokeImg);
            if(data.types.length > 1){
                let pokeTipo = data.types[0].type.name;
                let pokeTipo2 = data.types[1].type.name;
                console.log(pokeTipo);
                pokeType(pokeTipo, 1);
                console.log(pokeTipo2);
                pokeType(pokeTipo2, 2);

            }else{
                let pokeTipo = data.types[0].type.name;
                console.log(pokeTipo);
                pokeType(pokeTipo, 1);
                const pokeType2 = document.getElementById("pokeType2");
                pokeType2.innerHTML = "";
                color(pokeType2)

            }

            pokeHp.innerHTML = data.stats[0].base_stat;
            pokeAtk.innerHTML = data.stats[1].base_stat;
            pokeDef.innerHTML = data.stats[2].base_stat;
            pokeSpatk.innerHTML = data.stats[3].base_stat;
            pokeSpdef.innerHTML = data.stats[4].base_stat;
            pokeSpd.innerHTML = data.stats[5].base_stat;
            const pokeType1 = document.getElementById(`pokeType1`);
            pokeColor(pokeType1.innerHTML);

            pokeID.innerHTML="#"+data.id;

            for(let i=0; i<data.moves.length; i++){
                const move = document.createElement("li");
                pokeMovs.appendChild(move);

                move.innerText = data.moves[i].move.name;
            }
             pokePeso.innerHTML=data.weight;
             pokeAltura.innerHTML=data.height;
             if (data.abilities.length>1){
                pokeAby.innerHTML=data.abilities[0].ability.name;
                pokeHidaby.innerHTML=data.abilities[1].ability.name;
             }else {
                pokeAby.innerHTML=data.abilities[0].ability.name;
                pokeHidaby.innerHTML="";
             }
             

             especie = data.species.url;
             console.log(especie);
             fetchPokemones(especie)
             
             
            
            
        }
    });
}
function fetchPokemones ( especie){
    fetch(especie).then((res)=>{
        return res.json();
    }).then((data)=>{
        const pokeHabitat = document.getElementById("habitat");
        const pokeApodo = document.getElementById("genera");
        const pokeDes = document.getElementById("descrip");
        pokeApodo.innerHTML = data.genera[7].genus;
        if(data.habitat != null){
            pokeHabitat.innerHTML = data.habitat.name;
        }
        
        console.log(data.flavor_text_entries[0].flavor_text);
        pokeDes.innerHTML =data.flavor_text_entries[0].flavor_text;
        evolutionChain = data.evolution_chain.url;
        fetchPokemonEvo(evolutionChain);
    })
}

function fetchPokemonEvo ( evolutionChain){
    fetch(evolutionChain).then((res)=>{
        return res.json();
    }).then((data)=>{
        const pokeEvo1 = document.getElementById("pokeEvo1");
        const pokeEvo2 = document.getElementById("pokeEvo2");
        const pokeEvo3 = document.getElementById("pokeEvo3");
        let nombre = data.chain.species.name;
        

        pokeEvo1.innerHTML = nombre;
        

        fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`).then((res)=>{
            return res.json();
        }).then((data)=>{
            const pokeImgEvo1=document.getElementById("pokeImgEvo1");
            pokeImgEvo1.src = data.sprites.front_default;
        })
        

        if (data.chain.evolves_to.length>0){
            let nombre2 = data.chain.evolves_to[0].species.name;
            let nombre3 = data.chain.evolves_to[0].evolves_to[0].species.name;
            pokeEvo2.innerHTML = nombre2;
            pokeEvo3.innerHTML = nombre3;
            fetch(`https://pokeapi.co/api/v2/pokemon/${nombre2}`).then((res)=>{
                return res.json();
            }).then((data)=>{
                const pokeImgEvo2=document.getElementById("pokeImgEvo2");
                pokeImgEvo2.src = data.sprites.front_default;
            })
            fetch(`https://pokeapi.co/api/v2/pokemon/${nombre3}`).then((res)=>{
                return res.json();
            }).then((data)=>{
                const pokeImgEvo3=document.getElementById("pokeImgEvo3");
                pokeImgEvo3.src = data.sprites.front_default;
            })
        }else {
            const pokeImgEvo2=document.getElementById("pokeImgEvo2");
            pokeImgEvo2.src = "img/pokebola.png";
            const pokeImgEvo3=document.getElementById("pokeImgEvo3");
            pokeImgEvo3.src = "img/pokebola.png";
            pokeEvo2.innerHTML = "";
            pokeEvo3.innerHTML = "";
        }


    })
}

function pokeImage (url) {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

function pokeType (type, number) {
    const pokeType = document.getElementById(`pokeType${number}`);
    
    
    pokeType.innerHTML = type;
    color(pokeType);
}

function pokeColor (tipo){
    if (tipo == 'fire'){
        rec1.style.background = "#fc6f13";
        
    } else if (tipo== 'grass') {
        rec1.style.background = "linear-gradient(#A1F257 ,#7AC74C)";
    } else if (tipo == 'water') {
        rec1.style.background = "#6390F0";   
    } else if (tipo == 'fairy') {
        rec1.style.background = "#D685AD";   
    } else if (tipo == 'steel') {
        rec1.style.background = "#B7B7CE";   
    } else if (tipo == 'dark') {
        rec1.style.background = "#705746";   
    } else if (tipo == 'normal') {
        rec1.style.background = "#A8A77A";   
    } else if (tipo == 'electric') {
        rec1.style.background = "#F7D02C";   
    } else if (tipo == 'ice') {
        rec1.style.background = "#96D9D6";   
    } else if (tipo == 'fighting') {
        rec1.style.background = "#C22E28";   
    } else if (tipo == 'poison') {
        rec1.style.background = "#A33EA1";   
    } else if (tipo == 'ground') {
        rec1.style.background = "#E2BF65";   
    } else if (tipo == 'flying') {
        rec1.style.background = "#A98FF3";   
    } else if (tipo == 'psychic') {
        rec1.style.background = "#F95587";   
    } else if (tipo == 'bug') {
        rec1.style.background = "#A6B91A";   
    } else if (tipo == 'rock') {
        rec1.style.background = "#B6A136";   
    } else if (tipo == 'ghost') {
        rec1.style.background = "#735797";   
    } else if (tipo == 'dragon') {
        rec1.style.background = "#6F35FC";   
    }
}

function color (tipo){
    tipo.className = "tipo";
    if (tipo.innerHTML == 'fire'){
        
        tipo.classList.add("fire");      
    } else if (tipo.innerHTML== 'grass') {
        
        tipo.classList.add("grass");
    } else if (tipo.innerHTML == 'water') {
        
        tipo.classList.add("water");  
    } else if (tipo.innerHTML == 'fairy') {
        
        tipo.classList.add("fairy");   
    } else if (tipo.innerHTML == 'steel') {
        
        tipo.classList.add("steel");    
    } else if (tipo.innerHTML == 'dark') {
        
        tipo.classList.add("dark");    
    } else if (tipo.innerHTML == 'normal') {
        
        tipo.classList.add("normal");  
    } else if (tipo.innerHTML == 'electric') {
        
        tipo.classList.add("electric");    
    } else if (tipo.innerHTML == 'ice') {
        
        tipo.classList.add("ice");    
    } else if (tipo.innerHTML == 'fighting') {
        
        tipo.classList.add("fighting");   
    } else if (tipo.innerHTML == 'poison') {
        
        tipo.classList.add("poison"); 
    } else if (tipo.innerHTML == 'ground') {
        
        tipo.classList.add("ground");  
    } else if (tipo.innerHTML == 'flying') {
        
        tipo.classList.add("flying");    
    } else if (tipo.innerHTML == 'psychic') {
        
        tipo.classList.add("psychic");       
    } else if (tipo.innerHTML == 'bug') {
        
        tipo.classList.add("bug");     
    } else if (tipo.innerHTML == 'rock') {
        
        tipo.classList.add("rock");     
    } else if (tipo.innerHTML == 'ghost') {
        
        tipo.classList.add("ghost");    
    } else if (tipo.innerHTML == 'dragon') {
        
        tipo.classList.add("dragon");    
    }

}

