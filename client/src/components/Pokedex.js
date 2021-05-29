import React, { Component } from "react";
import { connect } from "react-redux";
import { bringPokemon, getPokemon, getTypes, getCount} from "../actions/Actions";
import { Link } from 'react-router-dom';
import './Pokedex.css';

export class Pokedex extends Component {


  componentDidMount(){this.props.bringPokemon();this.props.getTypes();this.props.getCount(this.state.base)}

  constructor(props) {
    super(props);
    this.state = {
      base: 'both',
      page: 1,
      name: "",
      types: "",
      count: 899,
    };
  }

  pageClick=async function(e){
    console.log(this.state.count/12)
    var base = this.state.base
    var page = this.state.page+parseInt(e.target.value)
    if(base==='both'){
      var arg='?page='+page
    }else{var arg = '?base='+base+'&page='+page}
    this.props.bringPokemon(arg);
    this.setState({page: this.state.page+parseInt(e.target.value)})
  }

  baseClick=async function (e){
    this.props.getCount(e.target.value);
    this.setState({base: e.target.value});
    console.log(this.state.count)
    this.props.bringPokemon('?base='+e.target.value+'&page=1');
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.props.getPokemon(this.state.name.toLowerCase());
    this.setState({ name: "" });
  }

  clickTypeButton = async function(e){
    await this.setState({type: e.target.value})
  }
  
  render(){
    const {name} = this.state;

    return(
      <>
      <div className='wrapper'>
        <div className='hh'>
          <h2>Henrydex</h2>
        </div>
        <form className='form-container' onSubmit={(e)=>this.handleSubmit(e)}>
          <div className="encabezado">
            <label className="label" htmlFor="name">Pokemon: </label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e)=>this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
          {
            <div className="searchContainer">
              {this.props.pokes && this.props.pokes==='error' && (
                <div className="pokeNotLoaded">
                  <div><h4 className="error">Pokemon no encontrado</h4></div>
                  <div><h6 className="option">Intente de nuevo con un nombre o id válido</h6></div>
                  </div>
              )}
              {this.props.pokes.name && (          
                <div className="pokeLoaded" key={this.props.pokes.name}>
                  <h4>
                      <Link to={`/pokemon/${this.props.pokes.name}`}>
                        {this.props.pokes.name}
                      </Link>
                  </h4>
                  <img src={this.props.pokes.imagen} className="SchImg" alt={this.props.pokes.name}/>
                  <div className='tipos'>
                    <div className='tipo'>
                      <div className="titulo">Tipo 1</div>
                      <div className="dato">{this.props.pokes.type.type1}</div>
                    </div>

                    <div className='tipo'>
                      <div className="titulo">Tipo 2 </div>
                      {this.props.pokes.type.type2&&<div className="dato">{this.props.pokes.type.type2}</div>}
                      {!this.props.pokes.type.type2&&<div className="dato">-</div>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
    <div>
        <div className='hh'>
        <h2>Base de datos Pokémon</h2>
          <button value='both' onClick={(e)=>this.baseClick(e)}>Todos</button>
          <button value='api'  onClick={(e)=>this.baseClick(e)}>Canon</button>
          <button value='base'  onClick={(e)=>this.baseClick(e)}>Creados</button>
          <h4>Tipos: <button onClick={e=>this.clickTypeButton(e)} value={null}>Todos</button></h4>
          <div className='filterButtons'>
            {this.props.types && this.props.types.map(type=>
              <div key={type} >
                <button className='typeButton' onClick={e=>this.clickTypeButton(e)} value={type}>{type}</button>
              </div>
            )}
          </div>
        </div>
        <ul>
          {
            this.props.pokeBrought && this.props.pokeBrought.map ((pokemon) => (
              (!this.state.type||this.state.type===pokemon.type1||this.state.type===pokemon.type2)&&(
              <div className="liPoke" key={pokemon.name}>
                <img src={pokemon.imagen} className="liImg" alt={pokemon.name}/>
                    <Link to={`/pokemon/${pokemon.name}`}>
                      <h5>{pokemon.name}</h5>
                    </Link>

                      <div className='tipos'>
                        <div className='tipo'>
                          <div className="titulo">Tipo 1</div>
                          <div className="dato">{pokemon.type1}</div>
                        </div>

                        <div className='tipo'>
                          <div className="titulo">Tipo 2 </div>
                          <div className="dato">{pokemon.type2}</div>
                        </div>
                      </div>                     
              </div>)
              )
          )}
        </ul>
        <div className='paginador'>
        <label className='pagLabel' >
          <button className='pagButton' value={parseInt(1-this.state.page)} onClick={e=>this.pageClick(e)} disabled={this.state.page<2&&true}>Primera</button>
          <button className='pagButton' value={-5} onClick={e=>this.pageClick(e)} disabled={this.state.page<7&&true}>5 menos</button>
          <button className='pagButton' value={-1} onClick={e=>this.pageClick(e)} disabled={this.state.page<=1&&true}>anterior</button>
          pág {this.state.page}
          <button className='pagButton' value={1} onClick={e=>this.pageClick(e)} disabled={this.state.page>Math.ceil(this.state.count/12)-1&&true}>siguiente</button>
          <button className='pagButton' value={5} onClick={e=>this.pageClick(e)} disabled={this.state.page>Math.ceil(this.state.count/12)-6&&true}>5 más</button>
          <button className='pagButton' value={parseInt(Math.ceil(this.state.count/12)-this.state.page)} onClick={e=>this.pageClick(e)} disabled={this.state.page>Math.ceil(this.state.count/12)-1&&true}>Última</button>
          </label>
        </div>
      </div>
      </div>
      </>
    );
  }
};

function mapStateToProps(state) {
  return {
    pokeBrought: state.pokeBrought,
    pokes: state.pokeLoaded,
    types: state.types,
    count: state.count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bringPokemon: pokemon => dispatch(bringPokemon(pokemon)),
    getPokemon: name => dispatch(getPokemon(name)),
    getTypes: types => dispatch(getTypes(types)),
    getCount: count => dispatch(getCount(count))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokedex);