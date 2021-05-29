// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { removePokemonBase } from "../actions/Actions";
// import { Link } from 'react-router-dom';

// export class ConnectedList extends Component {

//   render() {
//     return (
//       <div>
//         <h2>Base de datos Pokémon</h2>
//         <ul>
//           {
//             this.props.pokeBase && this.props.pokeBase.map ((pokemon) => (
//               <div className="liPoke" key={pokemon.name}>
//                 <img src={pokemon.sprites.other['official-artwork'].front_default} className="liImg" alt={pokemon.name}/>
//                     <Link to={`/pokemon/${pokemon.id}`}>
//                       <h5>{pokemon.name}</h5>
//                     </Link>

//                     <div className='pokeInfo'>
//                       <div className='tipos'>
//                         <div className='tipo'>
//                           <div className="titulo">Tipo 1</div>
//                           <div className="dato">{pokemon.types[0].type.name}</div>
//                         </div>

//                         <div className='tipo'>
//                           <div className="titulo">Tipo 2 </div>
//                           {pokemon.types[1]&&<div className="dato">{pokemon.types[1].type.name}</div>}
//                           {!pokemon.types[1]&&<div className="dato">-</div>}
//                         </div>
//                       </div>

//                       <div className="PokeStats">
//                         <div className='statBox'>
//                           <div className="stat">VIDA</div>
//                           <div className="dato">{pokemon.stats.filter(e=>e.stat.name==="hp")[0].base_stat}</div>
//                         </div>
                        
//                         <div className='statBox'>
//                           <div className="stat">FUERZA</div>
//                           <div className="dato">{pokemon.stats.filter(e=>e.stat.name==="attack")[0].base_stat}</div>
//                         </div>

//                         <div className='statBox'>
//                           <div className="stat">DEFENSA</div>
//                           <div className="dato">{pokemon.stats.filter(e=>e.stat.name==="defense")[0].base_stat}</div>
//                         </div>

//                         <div className='statBox'>
//                           <div className="stat">VELOCIDAD</div>
//                           <div className="dato">{pokemon.stats.filter(e=>e.stat.name==="speed")[0].base_stat}</div>
//                         </div>

//                         <div className='statBox'>
//                           <div className="stat">ALTURA</div>
//                           <div className="dato">{pokemon.height/10+' m'}</div>
//                         </div>

//                         <div className='statBox'>
//                           <div className="stat">PESO</div>
//                           <div className="dato">{pokemon.weight/10+' m'}</div>
//                         </div>
//                       </div>
//                       <div className='statBox'>
//                           <div className="stat">N° POKEDEX NACIONAL</div>
//                           <div className="dato">{pokemon.id}</div>
//                       </div>
//                     </div>

//               <button onClick={() => this.props.removePokemonBase(pokemon.name)}>
//                 X
//               </button>
//               </div>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   console.log('state.pokeBase: '+state.pokeBase)
//   return {
//     pokeBase: state.pokeBase,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     removePokemonBase: (id) => dispatch(removePokemonBase(id)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList);