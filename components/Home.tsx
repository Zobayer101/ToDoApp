import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Vibration,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import Down from 'react-native-vector-icons/AntDesign';
import Dot from 'react-native-vector-icons/Entypo';
import Mic from 'react-native-vector-icons/Ionicons';
import Homex from 'react-native-vector-icons/Fontisto';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import Check from 'react-native-vector-icons/AntDesign';
//import CheckBox from '@react-native-community/checkbox';
import {Dalivary} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  NewTask: undefined;
  Serching: undefined;
  Settings: undefined;
  Task: undefined;
  Batch: undefined;
};
type NewTaskScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Serching'
>;
type newTaskScreenNavigate = NativeStackNavigationProp<
  RootStackParamList,
  'NewTask'
>;
type settingScreenNavigte = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;
type batchScreenNavigate = NativeStackNavigationProp<
  RootStackParamList,
  'Batch'
>;
type taskScreenNavigate = NativeStackNavigationProp<RootStackParamList, 'Task'>;

const Home = () => {
  //const [datax, setDatax] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [settin, setSetting] = useState(false);
  const [inputText, setInputText] = useState('');
  const navigat = useNavigation<NewTaskScreenNavigationProp>();
  const newNavigate = useNavigation<newTaskScreenNavigate>();
  const SettingNavigate = useNavigation<settingScreenNavigte>();
  const BatchNavigate = useNavigation<batchScreenNavigate>();
  const taskNavigate = useNavigation<taskScreenNavigate>();
  const {data, setData} = useContext(Dalivary);
  const SelectAndRemove = (id: any) => {
    //Alert.alert(JSON.stringify(id));
    const UpdateData = data.filter((item: {id: any}) => item.id !== id);
    setData(UpdateData);
    console.log(UpdateData);
    Vibration.vibrate(100);
  };

  const SaveData = async () => {
    if (inputText) {
      Vibration.vibrate(200);
      let stordata = await AsyncStorage.getItem('ToDos');
      if (stordata) {
        let TodoData = JSON.parse(stordata);

        let ID = TodoData.length + 1;
        let newObj = {
          id: ID,
          title: inputText,
          listName: 'Default',
          YDate: '',
          TDate: '',
          chack: false,
        };
        let todoNewData = [...TodoData, ...[newObj]];
        if (data[0]) {
          setData((pre: any) => [...pre, newObj]);
        } else {
          setData(todoNewData);
        }

        await AsyncStorage.setItem('ToDos', JSON.stringify(todoNewData));
      } else {
        let Obj = [
          {
            id: 1,
            title: inputText,
            listName: 'Default',
            YDate: '',
            TDate: '',
            chack: false,
          },
        ];
        await AsyncStorage.setItem('ToDos', JSON.stringify(Obj));
        setData((pre: any) => [...pre, Obj[0]]);
      }
    }
  };

  return (
    <View style={style.Contuner}>
      <View style={style.Header}>
        <View style={style.HeadeFirst}>
          <Icon
            name="check-circle"
            size={30}
            color={'#fff'}
            style={style.Icons}
          />
          <Text onPress={() => setListModal(true)} style={style.HeaderBoldText}>
            All List
          </Text>
          <TouchableOpacity onPress={() => setListModal(true)}>
            <Down name="caretdown" color={'#fff'} size={18} />
          </TouchableOpacity>
        </View>
        <View style={style.HeaderSocend}>
          <Icon
            onPress={() => navigat.navigate('Serching')}
            name="search"
            size={34}
            color={'#fff'}
          />
          <TouchableOpacity onPress={() => setSetting(true)}>
            <Dot name="dots-three-vertical" size={25} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* List modal */}
      <Modal
        transparent={true}
        visible={listModal}
        animationType="fade"
        onRequestClose={() => setListModal(false)}>
        <TouchableWithoutFeedback onPress={() => setListModal(false)}>
          <View style={style.ListModal}>
            <TouchableWithoutFeedback>
              <View style={style.MainModalList}>
                <TouchableOpacity style={style.ListSelect}>
                  <Homex name="home" size={27} color={'#fff'} />
                  <Text style={style.Texts}>All List</Text>
                  <Text style={style.Texts}>7</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.HomeList}>
                  <Down name="bars" size={30} color={'#fff'} />
                  <Text style={style.Texts}>Default lisht</Text>
                  <Text style={style.Texts}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.HomeList}>
                  <Down name="bars" size={30} color={'#fff'} />
                  <Text style={style.Texts}>Default lisht</Text>
                  <Text style={style.Texts}>9</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.HomeList}>
                  <Down name="bars" size={30} color={'#fff'} />
                  <Text style={style.Texts}>Default lisht</Text>
                  <Text style={style.Texts}>9</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.HomeList}>
                  <Down name="bars" size={30} color={'#fff'} />
                  <Text style={style.Texts}>Default lisht</Text>
                  <Text style={style.Texts}>9</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.HomeList}>
                  <Down name="bars" size={30} color={'#fff'} />
                  <Text style={style.Texts}>Default lisht</Text>
                  <Text style={style.Texts}>9</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* setting modal */}
      <Modal
        transparent={true}
        visible={settin}
        animationType="fade"
        onRequestClose={() => setSetting(false)}>
        <TouchableWithoutFeedback onPress={() => setSetting(false)}>
          <View style={style.ListModal}>
            <TouchableWithoutFeedback>
              <View style={style.SettingModal}>
                <TouchableOpacity style={style.SettingOption}>
                  <Text
                    onPress={() => taskNavigate.navigate('Task')}
                    style={style.SettingText}>
                    Task Lists
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.SettingOption}
                  onPress={() => BatchNavigate.navigate('Batch')}>
                  <Text style={style.SettingText}>Add in Batch Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.SettingOption}>
                  <Text style={style.SettingText}>Send feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.SettingOption}
                  onPress={() => SettingNavigate.navigate('Settings')}>
                  <Text style={style.SettingText}>Settings</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ScrollView style={style.ScrollingArea}>
        {data[0] ? (
          data.map((value: any, index: React.Key | null | undefined) => {
            return (
              <View key={index}>
                <Text style={style.headerTx}>Later</Text>
                <View style={style.todoCon}>
                  <TouchableOpacity
                    onPress={() => SelectAndRemove(value.id)}
                    style={style.Icon}>
                    <Delete name="delete" size={35} color={'#fff'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={style.Chekbox}>
                    <View style={style.MainTitlecheckbox}>
                      {/* <CheckBox
                        value={value.chack}
                        onChange={() => SelectAndRemove(value.id)}
                        tintColors={{true: 'green', false: '#fff'}}
                        /> */}
                      <Text style={style.textTitle}>{value.title}</Text>
                    </View>
                    <View>
                      <Text style={style.dateTime}>
                        {value.YDate + ' ' + value.TDate}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View style={style.emptyCon}>
            <Image
              source={require('./IMG/Beach-Hammock.png')}
              style={style.NoDataImg}
            />
            <Text style={style.Texts}>Nothing to do</Text>
          </View>
        )}
      </ScrollView>
      <Down
        name="pluscircleo"
        color={'#fff'}
        size={40}
        style={style.CreateBTN}
        onPress={() => newNavigate.navigate('NewTask')}
      />
      <View style={style.BottomBar}>
        {!inputText && (
          <TouchableOpacity>
            <Mic name="mic-sharp" color={'#fff'} size={30} />
          </TouchableOpacity>
        )}
        <TextInput
          style={style.inputText}
          placeholder="Enter your task"
          selectionColor={'#14fa07'}
          placeholderTextColor={'#666'}
          value={inputText}
          onChange={e => setInputText(e.nativeEvent.text)}
        />
        {inputText && (
          <TouchableOpacity style={style.CheckInput} onPress={() => SaveData()}>
            <Check name="check" size={35} color={'rgb(36, 255, 83)'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  Contuner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3616c4',
  },
  Header: {
    width: '100%',
    height: 60,
    backgroundColor: '#3116f7',
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  HeadeFirst: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '40%',
    height: 60,
    //backgroundColor: '#0fc',
    flexDirection: 'row',
  },
  HeaderBoldText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  HeaderSocend: {
    width: '30%',
    height: 60,
    //backgroundColor: '#0fc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  Icons: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 25,
    backgroundColor: '#5c21ff',
    width: 50,
    height: 50,
  },
  Texts: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  ScrollingArea: {
    width: '100%',
    height: 'auto',
  },
  BottomBar: {
    width: '100%',
    height: 55,
    bottom: 0,
    backgroundColor: '#3116f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputText: {
    //backgroundColor: '#0cf',
    borderBottomColor: '#aaa',
    borderBottomWidth: 2,
    padding: 0,
    paddingLeft: 4,
    fontSize: 25,
    width: '80%',
    color: '#fff',
  },
  CheckInput: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#f0f',
    zIndex: 2,
  },
  emptyCon: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NoDataImg: {
    width: 150,
    height: 150,
  },
  CreateBTN: {
    height: 80,
    width: 80,
    backgroundColor: '#006c94',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 40,
    position: 'absolute',
    transform: [{translateX: 285}, {translateY: 600}],
    elevation: 10,
  },
  ListModal: {
    width: '100%',
    height: '100%',
  },
  MainModalList: {
    width: 240,
    height: 'auto',
    backgroundColor: '#7447fc',
    transform: [{translateX: 30}, {translateY: 25}],
    borderRadius: 5,
    elevation: 18,
  },
  HomeList: {
    marginTop: 3,
    width: '100%',
    height: 45,
    //backgroundColor: '#157323',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 4,
  },
  ListSelect: {
    marginTop: 3,
    width: '100%',
    height: 45,
    backgroundColor: '#157323',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 4,
  },
  SettingModal: {
    width: 240,
    height: 300,
    backgroundColor: '#7447fc',
    transform: [{translateX: 145}, {translateY: 10}],
    borderRadius: 5,
    elevation: 18,
  },
  SettingOption: {
    width: '100%',
    height: 65,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#643ff5',
    justifyContent: 'center',
  },
  SettingText: {
    color: '#fff',
    fontSize: 20,
    textAlignVertical: 'center',
  },
  todoCon: {
    width: '100%',
    marginTop: 10,
    height: 70,
    //alignItems: 'center',
    flexDirection: 'row',
  },
  Chekbox: {
    width: 290,
    height: 70,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#3c19ff',
    elevation: 8,
    padding: 5,
    // flexDirection: 'row',
  },
  MainTitlecheckbox: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
  },
  Icon: {
    height: '100%',
    width: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#f00',
    marginLeft: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 7,
  },
  headerTx: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 25,
    marginTop: 15,
    fontWeight: '700',
  },
  dateTime: {
    fontSize: 16,
    marginLeft: 50,
    color: '#03ff9e',
  },
});

export default Home;
