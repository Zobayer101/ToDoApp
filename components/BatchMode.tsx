import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Batch = () => {
  return (
    <View style={style.outerBox}>
      <TouchableOpacity>
        <Text style={style.Texts}>Comming soon..</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  outerBox: {
    backgroundColor: '#223da1',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Texts: {
    color: '#fff',
    fontSize: 26,
  },
});

export default Batch;
