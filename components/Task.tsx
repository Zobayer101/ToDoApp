import Penx from 'react-native-vector-icons/FontAwesome5';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {Dalivary} from '../App';
import {Trime} from './Lib';

const TaskList = () => {
  const {list} = useContext(Dalivary);
  return (
    <ScrollView style={style.TaskCon}>
      {/* ------------------------------ */}

      {list.map((value, index) => {
        return (
          <View style={style.ItemBox} key={index}>
            <View style={style.ItemMain}>
              <TouchableOpacity>
                <Text style={style.TitleText}>{Trime(value.title)}</Text>
                <Text style={style.titlebottom}>Tasks:{value.lengths}</Text>
              </TouchableOpacity>
              <View style={style.IconBox}>
                <TouchableOpacity>
                  <Penx name="pen" color={'#fff'} size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Delete name="delete" color={'#fff'} size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
      {/* ------------------------------- */}
    </ScrollView>
  );
};
const style = StyleSheet.create({
  TaskCon: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3616c4',
  },
  ItemBox: {
    marginVertical: 10,
    width: '100%',
    height: 70,
  },
  ItemMain: {
    marginHorizontal: 30,
    backgroundColor: '#280f7a',
    height: 70,
    width: '85%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  TitleText: {
    color: '#fff',
    fontSize: 20,
  },
  titlebottom: {
    color: '#98d9ae',
  },
  IconBox: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
  },
});
export default TaskList;
