export function getPokemon(nameOrId){
    return function (dispatch){
      if(nameOrId)
        {return fetch('http://localhost:3001/pokemons/'+nameOrId)
        .then(response=>response.json())
        .then(json=>{
            dispatch({type:"GET_POKEMON", payload: json})
        })
        .catch(error=>dispatch({type:"GET_POKEMON", payload: 'error'}))
        ;
      }
    };
};

export function bringPokemon(arg){
  if(!arg){var arg=''}

  return function(dispatch){
    console.log('http://localhost:3001/pokemons'+arg)
    return fetch('http://localhost:3001/pokemons'+arg)
      .then (response => response.json())
      .then (json =>{
        dispatch({type: "BRING_POKEMON", payload: json})
      })
  }
};

export function getPokemonDetail(payload) {
    return function(dispatch) {
        return fetch('http://localhost:3001/pokemons?name='+payload)
          .then(response => response.json())
          .then(json => {
            dispatch({ type: "GET_POKEMON_DETAIL", payload: json });
          });
      };
  };

  export function addPokemonBase() {
    console.log('logrando el post')
    return function(dispatch) {
      return  fetch('http://localhost:3001/pokemons', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name : this.state.name,
            imagen : this.state.imagen,
            type1: this.state.type1,
            type2: this.state.type2,
            vida: this.state.vida,
            fuerza: this.state.fuerza,
            defensa: this.state.defensa,
            velocidad: this.state.velocidad,
            altura: this.state.altura,
            peso: this.state.peso,
        })

      })
      .then(response=>console.log(response))
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "ADD_POKEMON_BASE", payload: json });
      });
    };
  };
    
  export function getTypes () {
    return function(dispatch) {
        return fetch('http://localhost:3001/types/')
          .then(response => response.json())
          .then(json => {
            dispatch({ type: "GET_TYPES", payload: json });
          });
      };
  };

  export function getCount (base) {
    return function(dispatch) {
        return fetch('http://localhost:3001/pokemons?count='+base)
          .then(response => response.json())
          .then(json => {
            dispatch({ type: "GET_COUNT", payload: json });
          });
      };
  };

  export function addTypeSent (tipo) {
    return {type: "ADD_TYPE_SENT", payload:tipo};
  };

  export function removeTypeSent (tipo) {
    return {type: "REMOVE_TYPE_SENT", payload:tipo};
  };

  export function changeDisable (boolean) {
    return {type: "CHANGE_DISABLE", payload: boolean};
  };


