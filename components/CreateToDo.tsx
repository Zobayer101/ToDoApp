import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Vibration,
  Alert,
} from 'react-native';
import Mic from 'react-native-vector-icons/Ionicons';
import Calender from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dalivary} from '../App';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Trime} from './Lib';

const position = new Animated.ValueXY({x: 500, y: 450});

type RootStackParamList = {
  Home: undefined;
};
type HomeScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
const CreateToDo = () => {
  const [listx, setListx] = useState(false);
  const [date, setDate] = useState(new Date());
  const [listTexts, setListTexts] = useState('');
  const [addListModal, setAddlistModal] = useState(false);
  const [dateTime, setDateTime] = useState({date: '', time: ''});
  const [showpic, setPic] = useState(false);
  const [todo, setTodo] = useState(String);
  const {data, setData, list, setList, selectList, setSelectList} =
    useContext(Dalivary);
  const HomeScreen = useNavigation<HomeScreenNavigation>();
  // useEffect(() => {
  //   const setTime = setTimeout(() => {
  //     Animated.timing(position, {
  //       toValue: {x: 500, y: 450},
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }).start();
  //     setAnimate(false);
  //   }, 3000);
  //   return () => {
  //     clearTimeout(setTime);
  //   };
  // }, [animate]);

  // -----------------animation---------
  const ShowAnimate = () => {
    Animated.sequence([
      Animated.timing(position, {
        toValue: {x: 50, y: 450},
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(position, {
        toValue: {x: 400, y: 450},
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const dateTimePickerset = (_e: any, currentDate: any) => {
    if (dateTime.date) {
      setDate(currentDate || date);
      setDateTime(pre => ({
        ...pre,
        time: currentDate.toLocaleTimeString(),
      }));
      setPic(false);
    } else {
      setDate(currentDate || date);
      setDateTime(pre => ({...pre, date: currentDate.toLocaleDateString()}));
    }

    //if (dateTime.time){ setPic(false);}
  };
  //-----------------------------Save Data-----------------------------------------;
  const SaveData = async () => {
    if (todo && dateTime.date && dateTime.time) {
      Vibration.vibrate(200);
      let stordata = await AsyncStorage.getItem('ToDos');

      if (stordata) {
        let TodoData = JSON.parse(stordata);

        let ID = TodoData.length + 1;
        var newObj = {
          id: ID,
          title: todo,
          listName: selectList,
          YDate: dateTime.date,
          TDate: dateTime.time,
          chack: false,
        };
        let todoNewData = [...TodoData, ...[newObj]];
        if (data[0]) {
          setData((pre: any) => [...pre, newObj]);
          //Alert.alert('Ohoo...');
          HomeScreen.navigate('Home');
        } else {
          //console.log(todoNewData);
          //setData((pre: any) => [...pre, newObj]);
          setData(todoNewData);
          //Alert.alert('bal..');
          HomeScreen.navigate('Home');
        }

        await AsyncStorage.setItem('ToDos', JSON.stringify(todoNewData));
        //console.log(data);

        //Alert.alert('ok');
        //await AsyncStorage.removeItem('ToDos');
      } else {
        //Alert.alert('Not');
        let Obj = [
          {
            id: 1,
            title: todo,
            listName: selectList,
            YDate: dateTime.date,
            TDate: dateTime.time,
            chack: false,
          },
        ];
        await AsyncStorage.setItem('ToDos', JSON.stringify(Obj));
        setData((pre: any) => [...pre, Obj[0]]);
        HomeScreen.navigate('Home');
      }

      setList(pre =>
        pre.map(values =>
          values.title === selectList
            ? {...values, lengths: values.lengths + 1}
            : values,
        ),
      );

      await AsyncStorage.setItem('List', JSON.stringify(list));
    } else {
      ShowAnimate();
      Vibration.vibrate(600);
    }
  };
  //----------------------------------------------------------------------------------
  const AddNewList = async () => {
    if (listTexts) {
      let ListLocalData = await AsyncStorage.getItem('List');
      if (ListLocalData) {
        let LocalArrobj = JSON.parse(ListLocalData);
        let RealObj = {
          id: LocalArrobj[LocalArrobj.length - 1].id + 1,
          title: listTexts,
          lengths: 0,
        };

        setList(pre => [...pre, RealObj]);
        let SaveStoreage = [...ListLocalData, ...[RealObj]];
        await AsyncStorage.setItem('List', JSON.stringify(SaveStoreage));
        setListTexts('');
      }
      setAddlistModal(false);
    } else {
      Alert.alert('Empty list');
    }
  };
  return (
    <View style={style.Contuner}>
      <Text style={style.titleText} onPress={() => console.log(data)}>
        What is to be done?
      </Text>
      <View style={style.InputSection}>
        <TextInput
          placeholder="Enter Task Here"
          placeholderTextColor={'#d1e3e3'}
          style={style.InputFild}
          onSubmitEditing={SaveData}
          value={todo}
          onChange={event => setTodo(event.nativeEvent.text)}
        />
        <Mic name="mic-sharp" color={'#fff'} size={30} style={style.iCon} />
      </View>

      <Text style={style.titleText}>Due date</Text>
      <View style={style.InputSection}>
        <Text style={style.InputFild} onPress={() => setPic(true)}>
          {dateTime.date
            ? `${dateTime.date}-${dateTime.time}`
            : ' Date not set'}
        </Text>
        <Calender
          onPress={() => setPic(true)}
          name="calendar"
          size={30}
          color={'#fff'}
          style={style.iCon}
        />
      </View>

      <Animated.Text style={style.messageText}>
        All filds are required..
      </Animated.Text>

      {showpic && (
        <DateTimePicker
          mode={dateTime.date ? 'time' : 'date'}
          display="spinner"
          value={date}
          onChange={dateTimePickerset}
          minimumDate={!dateTime.date ? new Date() : undefined}
        />
      )}
      <Text style={style.titleText}>Add to List</Text>
      <View style={style.AddListCon}>
        <Text style={style.Texts}>{Trime(selectList.toString())}</Text>
        {/* ----------------------------------modal list add --------------------------------*/}
        <Modal
          transparent={true}
          onRequestClose={() => setListx(false)}
          visible={listx}>
          <TouchableWithoutFeedback onPress={() => setListx(false)}>
            <View style={style.OuterListModal}>
              <View style={style.innerListModal}>
                {list.map((value: any, index: React.Key | null | undefined) => {
                  return (
                    <TouchableOpacity
                      style={
                        selectList === value.title
                          ? style.ActiveListBar
                          : style.ListBar
                      }
                      key={index}
                      onPress={() => {
                        setSelectList(value.title);
                        setListx(false);
                      }}>
                      <Text style={style.BarText}>{Trime(value.title)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {/* Add new List modal  */}
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
                  onChange={e => setListTexts(e.nativeEvent.text)}
                />
                <View style={style.AddBTNarea}>
                  <TouchableOpacity style={style.btnArea}>
                    <Text
                      style={style.cancleText}
                      onPress={() => setAddlistModal(false)}>
                      cancile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.btnArea} onPress={AddNewList}>
                    <Text style={style.AddText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={style.IconSet}>
          <TouchableOpacity onPress={() => setListx(true)}>
            <Calender name="caretdown" color={'#fff'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAddlistModal(true)}>
            <Calender name="bars" color={'#fff'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity style={style.AddToDo} onPress={SaveData}>
          <Calender name="checkcircleo" color={'#fff'} size={50} />
        </TouchableOpacity>
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
  titleText: {
    color: '#4cfafc',
    fontSize: 20,
    marginLeft: 25,
    marginTop: 30,
  },
  InputSection: {
    width: '100%',
    height: 80,
    //backgroundColor: '#f0c',
    flexDirection: 'row',
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
  iCon: {marginLeft: 10},
  AddListCon: {
    marginTop: 10,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    // backgroundColor: '#fce',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Texts: {
    color: '#fff',
    marginLeft: 25,
    fontSize: 20,
  },
  IconSet: {
    width: 100,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  AddToDo: {
    width: 80,
    height: 80,
    position: 'relative',
    backgroundColor: '#02aeba',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    transform: [{translateX: 290}, {translateY: 170}],
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
  messageText: {
    width: 300,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(88, 94, 91, 0.87)',
    borderRadius: 10,
    color: 'rgb(23, 247, 255)',
    fontSize: 16,
    zIndex: 1,
    position: 'absolute',
    elevation: 10,
    transform: [{translateX: position.x}, {translateY: position.y}],
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

export default CreateToDo;
