import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getTypes, addTypeSent, removeTypeSent, changeDisable, addPokemonBase} from "../actions/Actions";
import './AddNew.css';

if(!typesSent){
        var typesSent=[];
    }
class AddNew extends React.Component{

    componentDidMount(){this.props.getTypes();console.log(this.props.justAdded)}

    constructor(props) {
      super(props);
      this.state = {
          typesSent:[],
          types:[],
          disable:false,
          name:'',
          justAdded:{}
      };
    }

    handleInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
        // console.log(this.state)
      }

    handleSubmit(event) {
        console.log(this.state)
        fetch('http://localhost:3001/pokemons', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name : this.state.name,
                imagen : this.state.imagen,
                type1: this.state.types[0],
                type2: this.state.types[1]&&this.state.types[1],
                vida: this.state.vida,
                fuerza: this.state.fuerza,
                defensa: this.state.defensa,
                velocidad: this.state.velocidad,
                altura: this.state.altura,
                peso: this.state.peso,
            })

        })
    }

    handleChange(event) {
        if(event.target.checked===true){
            this.setState({
                types: this.state.types.concat(event.target.value)
              });
            this.state.typesSent.push(event.target.value)
            this.props.changeDisable(this.state.typesSent.length>=2)
            this.props.addTypeSent(event.target.value)
        }else{
            this.setState({
                types: this.state.types.filter(e=>e!==event.target.value)
              });
            this.state.typesSent=this.state.typesSent.filter(e=>e!==event.target.value)
            this.props.changeDisable(this.state.typesSent.length>=2)
            this.props.removeTypeSent(event.target.value)
        }
        console.log('after click: '+this.state.typesSent)
    }


    // method='post' action='http://localhost:3001/pokemons'
    render(){
        return(
            <div className='formContainerNew'>
                <form className="form-container" onSubmit={(e)=>this.handleSubmit(e)}>
                    <div>
                    <h2 className='addH2'>Crea tu Pokémon</h2>    
                    </div>
                    <div className='nameDiv'>
                        <label className='addLabel'>Nombre </label>
                        <input type='text' name='name'  onChange={(e)=>this.handleInputChange(e)}></input>
                    </div>
                    <div className='typeContainer'>
                        <h3 className='addH3'>Tipos</h3>
                    </div>
                    <h5 className='addH5'>Sólo puedes elegir 2</h5>
                    <div className="form-group">
                        {this.props.types && this.props.types.map(type=>
                            <p key={type} className='inter'>
                            <label><input type="checkbox" onClick={(e)=>this.handleChange(e)} name={this.props.types.findIndex(e=>e===type)} value={type} disabled={this.state.typesSent.includes(type)?false:this.props.disable}/>{type}</label>
                            </p>
                        )}
                    </div>
                    <div className='typeDiv'>
                        {this.props.typesSent[0]&&(
                    <div>
                            <label className='addLabel'>{this.props.typesSent.length>1?'Tipo 1':'Tipo'} </label>
                            <input type='text'
                                name='type1'
                                className='typeIn'
                                value={this.props.typesSent[0]}
                                readOnly={true}
                                onChange={(e)=>this.handleInputChange(e)}></input>
                        </div>)}
                        {this.props.typesSent[1]&&(
                        <div>
                            <label className='addLabel'>Tipo 2 </label>
                            <input type='text'
                                name='type2'
                                className='typeIn' 
                                value={this.props.typesSent[1]}
                                readOnly={true}
                                onChange={(e)=>this.handleInputChange(e)}>
                            </input>
                        </div>)}
                    </div>
                    <div className='typeContainer'>
                        <h3 className='addH3'>Imagen</h3>
                    </div>
                    <div className='imgContainer'>
                        <label className='addLabel'>URL: 
                            <input type='text'
                                name='imagen'
                                placeholder='Copiá aquí la URL de la imagen que tendrá tu pokemon'
                                className='imgIn'
                                onChange={(e)=>this.handleInputChange(e)}>
                            </input>
                        </label>
                        
                    </div>
                    <div className='typeContainer'>
                        <h3 className='addH3'>Estadísticas de Combate</h3>
                    </div>
                    <div className='typeDiv'>
                        <label className='addLabel'>Vida: 
                            <input type='text'
                                name='vida'
                                className='statIn'
                                onChange={(e)=>this.handleInputChange(e)}>
                            </input>
                        </label>
                        <label className='addLabel'>Fuerza: 
                            <input type='text'
                                name='fuerza'
                                className='statIn'
                                onChange={(e)=>this.handleInputChange(e)}>
                            </input>
                        </label>
                        <label className='addLabel'>Defensa: 
                            <input type='text'
                                name='defensa'
                                className='statIn'
                                onChange={(e)=>this.handleInputChange(e)}>
                            </input>
                        </label>
                        <label className='addLabel'>Velocidad: 
                            <input type='text'
                                name='velocidad' 
                                className='statIn'
                                onChange={(e)=>this.handleInputChange(e)}>
                            </input>
                        </label>
                    </div>
                    <div className='typeContainer'>
                        <h3 className='addH3'>Dimensiones</h3>
                    </div>
                    <div className='dimDiv'>
                        <div className='typeDiv'>
                            <label className='addLabel'>Altura: 
                                <input type='text'
                                    name='altura'
                                    className='dimIn'
                                    placeholder='ej: 1.40'
                                    onChange={(e)=>this.handleInputChange(e)}>
                                </input>m
                            </label>
                        </div>
                        <div className='typeDiv'>
                            <label className='addLabel'>Peso: 
                                <input type='text'
                                    name='peso'
                                    className='dimIn'
                                    onChange={(e)=>this.handleInputChange(e)}>
                                </input> kg
                            </label>
                        </div>
                    </div>
                        <input type='submit' value='Crear' className='crear'/>
                </form>
                {this.props.justAdded&&(
                <div className='justAdded'>
                    <img src={this.props.justAdded.imagen}></img>
                </div>)}
            </div>
        )
    };
}
function mapStateToProps(state) {
    return {
      types: state.types,
      typesSent: state.typesSent,
      disable: state.disable,
      justAdded: state.justAdded
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      addPokemonBase:pokemon => dispatch(addPokemonBase(pokemon)),  
      getTypes: type => dispatch(getTypes(type)),
      addTypeSent: type => dispatch(addTypeSent(type)),
      removeTypeSent: type => dispatch(removeTypeSent(type)),
      changeDisable: disable => dispatch(changeDisable(disable))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddNew);