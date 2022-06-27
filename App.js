import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Torch from "react-native-torch";
import imagex from './assets/icons/eco-light.png';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //liga o flash do cel
    Torch.switchState(toggle)
  }, [toggle]);

  useEffect(() => {
    // quando o celular for chacoalhado, mudaremos o toggle
    const subscription = RNShake.addListener(() =>{
      setToggle(oldToggle => !oldToggle);
    });

    // essa func vai ser chamada quando o  componets
    //for ser desmontando   
    return () => subscription.remove();

  },[]);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handChangeToggle}>


        <Image style={toggle ? style.lightImgOn : style.lightImgOff} source={toggle ? imagex :
          require('./assets/icons/eco-light-off.png')} />

        <Image style={style.dioLogo} source={toggle ? require('./assets/icons/logo-dio.png') :
          require('./assets/icons/logo-dio-white.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightImgOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightImgOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },

});

//imagex e requires são duas formas de botar fotos