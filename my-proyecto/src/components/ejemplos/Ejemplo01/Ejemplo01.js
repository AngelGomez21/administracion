import React, {useState} from 'react';

import "./Ejemplo01.scss";

import {Ejemplo02} from '../Ejemplo02';

//hooks useState

export  function Ejemplo01() {
  const [contador, setContador] = useState(0);

  const incrementarValor=()=>{
    setContador(contador + 1);
  }
  const derementarValor=()=>{
    setContador(contador +-1);
  }

const fondo={
  tema:{
    backgroundColor:'black',
    color: 'white'
  }
}

  return (
    <div>
      <Ejemplo02 contador={contador} 
      incrementar={incrementarValor} 
      decrementar={derementarValor} 
      fondo={fondo}/>
    </div>
  )
}