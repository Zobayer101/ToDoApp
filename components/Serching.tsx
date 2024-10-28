import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';
import React, {useContext} from 'react';
import {Dalivary} from '../App';
import CheckBox from '@react-native-community/checkbox';
const Searching = () => {
  const {data, search, setData} = useContext(Dalivary);
  const SerchItem = search
    ? data.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      )
    : data;
  const SelectAndUpdate = (id: any) => {
    setData(pre =>
      pre.map(item => (item.id === id ? {...item, chack: !item.chack} : item)),
    );

    Vibration.vibrate(100);
  };
  return (
    <ScrollView style={style.OuterBox}>
      {data[0] ? (
        SerchItem.map((value, index) => {
          return !value.chack ? (
            <View key={index}>
              <View style={style.todoCon}>
                {/* <TouchableOpacity
                    onPress={() => SelectAndRemove(value.id)}
                    style={style.Icon}>
                    <Delete name="delete" size={35} color={'#fff'} />
                  </TouchableOpacity> */}
                <TouchableOpacity style={style.Chekbox} onPress={() => ''}>
                  <View style={style.MainTitlecheckbox}>
                    <CheckBox
                      value={value.chack}
                      onChange={() => SelectAndUpdate(value.id)}
                      tintColors={{true: 'green', false: '#fff'}}
                    />
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
          ) : null;
        })
      ) : (
        <TouchableOpacity style={style.EmptyBox}>
          <Text style={style.EmptyText}>Empty Data</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  OuterBox: {
    backgroundColor: '#223da1',
  },
  todoCon: {
    width: '100%',
    marginTop: 10,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  Chekbox: {
    width: 340,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#3c19ff',
    elevation: 8,
    padding: 5,

    //flexDirection: 'row',
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
  dateTime: {
    fontSize: 16,
    marginLeft: 50,
    color: '#03ff9e',
  },
  EmptyBox: {
    width: '100%',
    height: 800,
    backgroundColor: '#0a6173',
    alignItems: 'center',
    justifyContent: 'center',
  },
  EmptyText: {
    fontSize: 25,
    color: '#fff',
  },
});
export default Searching;
