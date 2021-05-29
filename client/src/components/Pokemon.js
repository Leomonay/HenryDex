import React from 'react';
import {connect} from 'react-redux';
import {getPokemonDetail} from '../actions/Actions';
import './Pokemon.css';

class Pokemon extends React.Component{
    componentDidMount(){
        this.props.getPokemonDetail(
        this.props.match.params.name
        );
    };
    

    render(){
        return(
            <div className='pokemonViewer'>
                {this.props.detail&&(
                <div className="poke-detail">    
                    <div className="name">
                        <h1>{this.props.detail.name[0].toUpperCase()+this.props.detail.name.slice(1)}</h1>
                        <h2>Id: {this.props.detail.id_poke}</h2>
                    </div>
                    <div  className="description">
                        <div>
                            <img className='pokeImg' src={this.props.detail.imagen} alt={this.props.detail.name}/>               
                        </div>
                        <div>
                            <div className='divTipos'>
                                <div className="title">
                                    <h2>Tipos</h2>
                                </div>
                                <div className='stats'>
                                    <div className='type'>{this.props.detail.type.type1}</div>
                                    <div className='type'>{this.props.detail.type.type2}</div>
                                </div>
                            </div>                                
                            <div className="title">
                                <h2>Stats</h2>
                            </div>
                            <div className='stats'>
                                <div className='statsNames'>
                                    <div className='statLife'><h3>Vida</h3></div>
                                    <div className='statCombat'><h3>Fuerza</h3></div>
                                    <div className='statCombat'><h3>Defensa</h3></div>
                                    <div className='statCombat'><h3>Velocidad</h3></div>
                                    <div className='statBody'><h3>Altura</h3></div>
                                    <div className='statBody'><h3>Peso</h3></div>
                                </div>

                                <div className='statValues'>
                                    <div className='valueLife'>{this.props.detail.vida}</div>
                                    <div className='valueCombat'>{this.props.detail.fuerza}</div>
                                    <div className='valueCombat'>{this.props.detail.defensa}</div>
                                    <div className='valueCombat'>{this.props.detail.velocidad}</div>
                                    <div className='valueBody'>{this.props.detail.altura}</div>
                                    <div className='valueBody'>{this.props.detail.peso}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        );
        
    }
}

function mapStateToProps(state) {
    console.log('pokeDetail: '+state.pokeDetail);
    return {
        detail: state.pokeDetail,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
        getPokemonDetail : pokemon => dispatch(getPokemonDetail(pokemon)),
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);