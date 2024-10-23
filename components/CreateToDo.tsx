import React, {useContext, useEffect, useState} from 'react';
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
} from 'react-native';
import Mic from 'react-native-vector-icons/Ionicons';
import Calender from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dalivary} from '../App';
const position = new Animated.ValueXY({x: 500, y: 450});
const ShowAnimate = () => {
  Animated.timing(position, {
    toValue: {x: 50, y: 450},
    duration: 1000,
    useNativeDriver: true,
  }).start();
};
ShowAnimate();

const CreateToDo = () => {
  const [list, setList] = useState(false);
  const [date, setDate] = useState(new Date());
  const [animate, setAnimate] = useState(false);
  const [dateTime, setDateTime] = useState({date: '', time: ''});
  const [showpic, setPic] = useState(false);
  const [todo, setTodo] = useState(String);
  const {data, setData} = useContext(Dalivary);
  useEffect(() => {
    const setTime = setTimeout(() => {
      setAnimate(false);
    }, 3000);
    return () => {
      clearTimeout(setTime);
    };
  }, [animate]);
  const dateTimePickerset = (_e: any, currentDate: any) => {
    setDate(currentDate || date);

    if (dateTime.date) {
      setDateTime(pre => ({...pre, time: currentDate.toLocaleTimeString()}));
      setPic(false);
    } else {
      setDateTime(pre => ({...pre, date: currentDate.toLocaleDateString()}));
    }
    //if (dateTime.time){ setPic(false);}
  };
  const SaveData = async () => {
    if (todo && dateTime.date && dateTime.time) {
      Vibration.vibrate(200);
      let stordata = await AsyncStorage.getItem('ToDos');
      if (stordata) {
        let TodoData = JSON.parse(stordata);

        let ID = TodoData.length + 1;
        let newObj = {
          id: ID,
          title: todo,
          listName: 'Default',
          YDate: dateTime.date,
          TDate: dateTime.time,
          chack: false,
        };
        let todoNewData = [...TodoData, ...[newObj]];
        if (data[0]) {
          setData((pre: any) => [...pre, newObj]);
          //Alert.alert('Ohoo...');
        } else {
          //console.log(todoNewData);
          //setData((pre: any) => [...pre, newObj]);
          setData(todoNewData);
          //Alert.alert('bal..');
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
            listName: 'Default',
            YDate: dateTime.date,
            TDate: dateTime.time,
            chack: false,
          },
        ];
        await AsyncStorage.setItem('ToDos', JSON.stringify(Obj));
        setData((pre: any) => [...pre, Obj[0]]);
      }
    } else {
      setAnimate(true);
      Vibration.vibrate(600);
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

      <Animated.Text style={animate ? style.messageText : style.messageStatice}>
        All filds are required..
      </Animated.Text>

      {showpic && (
        <DateTimePicker
          mode={dateTime.date ? 'time' : 'date'}
          display="compact"
          value={date}
          onChange={dateTimePickerset}
        />
      )}
      <Text style={style.titleText}>Add to List</Text>
      <View style={style.AddListCon}>
        <Text style={style.Texts}>Default List</Text>
        {/* -------------------------modal list add ---------------------------*/}
        <Modal
          transparent={true}
          onRequestClose={() => setList(false)}
          visible={list}>
          <TouchableWithoutFeedback onPress={() => setList(false)}>
            <View style={style.OuterListModal}>
              <TouchableWithoutFeedback>
                <View style={style.innerListModal}>
                  {/* ------------------------------ */}
                  <TouchableOpacity style={style.ListBar}>
                    <Text style={style.BarText}>ok</Text>
                  </TouchableOpacity>
                  {/* ------------------------------ */}
                  <TouchableOpacity style={style.ListBar}>
                    <Text style={style.BarText}>ok</Text>
                  </TouchableOpacity>
                  {/* ------------------------------ */}
                  <TouchableOpacity style={style.ListBar}>
                    <Text style={style.BarText}>ok</Text>
                  </TouchableOpacity>
                  {/* ------------------------------ */}
                  <TouchableOpacity style={style.ListBar}>
                    <Text style={style.BarText}>ok</Text>
                  </TouchableOpacity>
                  {/* ------------------------------ */}
                  <TouchableOpacity style={style.ListBar}>
                    <Text style={style.BarText}>ok</Text>
                  </TouchableOpacity>
                  {/* ------------------------------ */}
                  <TouchableOpacity style={style.ListBar}>
                    <Text style={style.BarText}>ok</Text>
                  </TouchableOpacity>
                  {/* ------------------------------ */}
                  <TouchableOpacity style={style.ListBar}>
                    <Text style={style.BarText}>ok</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={style.IconSet}>
          <TouchableOpacity onPress={() => setList(true)}>
            <Calender name="caretdown" color={'#fff'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Calender name="bars" color={'#fff'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={todo ? style.relative : style.AddToDo}
          onPress={SaveData}>
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
  relative: {
    width: 80,
    height: 80,
    position: 'relative',
    backgroundColor: '#02aeba',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    transform: [{translateX: 290}, {translateY: -50}],
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
    backgroundColor: 'rgb(14, 78, 48)',
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
  messageStatice: {
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
    transform: [{translateX: 500}, {translateY: 450}],
  },
});

export default CreateToDo;
