import Penx from 'react-native-vector-icons/FontAwesome5';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Dalivary} from '../App';
import {Trime} from './Lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskList = () => {
  const {list, setList} = useContext(Dalivary);
  const [addListModal, setAddlistModal] = useState(false);
  const [ID, setID] = useState(Number);
  const [listTexts, setListTexts] = useState('');

  const DeleteList = async (id: number, value: any) => {
    let Data = value.filter((item: {id: number}) => item.id !== id);
    await AsyncStorage.setItem('List', JSON.stringify(Data));

    setList(pre => pre.filter(item => item.id !== id));
    //Alert.alert(id.toString());
  };
  const UpdateData = async () => {
    let updateItem = list.map(value =>
      value.id === ID
        ? {id: value.id, title: listTexts, lengths: value.lengths}
        : value,
    );
    setList(updateItem);
    await AsyncStorage.setItem('List', JSON.stringify(updateItem));
    setAddlistModal(false);
  };
  return (
    <ScrollView style={style.TaskCon}>
      {/* ------------------------------ */}
      <Modal
        transparent={true}
        onRequestClose={() => setAddlistModal(false)}
        visible={addListModal}>
        <TouchableWithoutFeedback onPress={() => setAddlistModal(false)}>
          <View style={style.OuterListModal}>
            <View style={style.AddListModal}>
              <TextInput
                value={listTexts}
                placeholder="Add list"
                placeholderTextColor={'#fff'}
                style={style.InputFild}
                onSubmitEditing={UpdateData}
                onChange={e => setListTexts(e.nativeEvent.text)}
              />
              <View style={style.AddBTNarea}>
                <TouchableOpacity
                  style={style.btnArea}
                  onPress={() => setAddlistModal(false)}>
                  <Text style={style.cancleText}>cancile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.btnArea} onPress={UpdateData}>
                  <Text style={style.AddText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {list.map((value, index) => {
        return (
          <View style={style.ItemBox} key={index}>
            <View style={style.ItemMain}>
              <TouchableOpacity>
                <Text style={style.TitleText}>{Trime(value.title)}</Text>
                <Text style={style.titlebottom}>Tasks:{value.lengths}</Text>
              </TouchableOpacity>
              <View style={style.IconBox}>
                <TouchableOpacity
                  onPress={() => {
                    setListTexts(value.title);
                    setAddlistModal(true);
                    setID(value.id);
                  }}>
                  <Penx name="pen" color={'#fff'} size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => DeleteList(value.id, list)}>
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
  InputFild: {
    padding: 0,
    fontSize: 22,
    color: '#fff',
    borderBottomColor: '#12f9fc',
    borderBottomWidth: 1.5,
    height: 40,
    width: 280,
    flexDirection: 'row',
    marginLeft: 25,
  },
  OuterListModal: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerListModal: {
    width: 250,
    height: 'auto',
    elevation: 5,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 2,
    backgroundColor: 'rgba(7, 100, 240, 0.589)',
  },
  ListBar: {
    width: '100%',
    height: 40,
    marginVertical: 1,
    borderRadius: 3,
    backgroundColor: '#384538',
    justifyContent: 'center',
  },
  ActiveListBar: {
    width: '100%',
    height: 40,
    marginVertical: 1,
    borderRadius: 3,
    backgroundColor: '#1ec74b',
    justifyContent: 'center',
  },
  BarText: {
    color: '#fff',
    paddingLeft: 20,
    fontSize: 24,
  },

  AddListModal: {
    alignSelf: 'center',
    marginTop: 200,
    width: 350,
    height: 200,
    backgroundColor: 'rgb(99, 100, 99)',
    borderRadius: 5,
    elevation: 10,
    padding: 10,
  },
  AddBTNarea: {
    width: '100%',
    paddingHorizontal: 20,
    height: 100,
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnArea: {
    height: 50,
    width: 100,
    backgroundColor: '#fff',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancleText: {
    fontSize: 16,
    color: '#d50',
  },
  AddText: {fontSize: 16, color: '#0a3'},
});
export default TaskList;
