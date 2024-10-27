import React, {createContext, useEffect, useState} from 'react';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateToDo from './components/CreateToDo';
import Searching from './components/Serching';
import Bar from 'react-native-vector-icons/AntDesign';

import {Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Settings from './components/Settings';
import TaskList from './components/Task';
import Batch from './components/BatchMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
//inter fase
interface DalivaryContexType {
  selectList: String;
  setSelectList: React.Dispatch<string>;
  data: {
    id: number;
    title: string;
    listName: string;
    YDate: string;
    TDate: string;
    chack: boolean;
  }[];
  list: {id: number; title: string; lengths: number}[];
  setData: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        title: string;
        listName: string;
        YDate: string;
        TDate: string;
        chack: boolean;
      }[]
    >
  >;
  setList: React.Dispatch<
    React.SetStateAction<{id: number; title: string; lengths: number}[]>
  >;
}

export const Dalivary = createContext<DalivaryContexType>({
  data: [],
  list: [],
  setData: function (): void {
    throw new Error('Function not implemented.');
  },
  setList: function (): void {
    throw new Error('Function not implemented.');
  },
  selectList: 'default',
  setSelectList: function (): void {
    throw new Error('Function not implemented.');
  },
});
const stack = createNativeStackNavigator();
const App = () => {
  const [data, setData] = useState<
    {
      id: number;
      title: string;
      listName: string;
      YDate: string;
      TDate: string;
      chack: boolean;
    }[]
  >([]);
  const [list, setList] = useState<
    {id: number; title: string; lengths: number}[]
    >([]);
  const [selectList, setSelectList] = useState('default');

  useEffect(() => {
    (async () => {
      let storData = await AsyncStorage.getItem('ToDos');
      if (storData) {
        let objDatas = JSON.parse(storData);

        setData(objDatas);
      }
      let ListData = await AsyncStorage.getItem('List');
      if (ListData) {
        let ObjList = JSON.parse(ListData);
        setList(ObjList);
      } else {
        let ArrObj = [
          {
            id: 1,
            title: 'Default',
            lengths: 0,
          },
          {
            id: 2,
            title: 'Holyday',
            lengths: 0,
          },
          {
            id: 3,
            title: 'Personal',
            lengths: 0,
          },
          {
            id: 4,
            title: 'Shopping',
            lengths: 0,
          },
          {
            id: 5,
            title: 'Wishlist',
            lengths: 0,
          },
          {
            id: 6,
            title: 'Finished',
            lengths: 0,
          },
        ];
        setList(ArrObj);
        await AsyncStorage.setItem('List', JSON.stringify(ArrObj));
      }
    })();
  }, []);

  return (
    <Dalivary.Provider
      value={{data, setData, list, setList, selectList, setSelectList}}>
      <NavigationContainer>
        <stack.Navigator initialRouteName="Home">
          <stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              headerShown: false,
            }}
          />
          <stack.Screen
            name="NewTask"
            component={CreateToDo}
            options={{
              title: 'New Task',
              headerStyle: {
                backgroundColor: '#3116f7',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {fontWeight: 'bold', fontSize: 22},
            }}
          />
          <stack.Screen
            name="Serching"
            component={Searching}
            options={{
              // eslint-disable-next-line react/no-unstable-nested-components
              headerTitle: () => (
                <TextInput
                  selectionColor={'#00f220'}
                  style={style.TextInput}
                  placeholder={'Search...'}
                  placeholderTextColor={'#fff'}
                  autoFocus={true}
                />
              ),

              headerStyle: {
                backgroundColor: '#3116f7',
              },
              headerTintColor: '#fff',
              // eslint-disable-next-line react/no-unstable-nested-components
              headerRight: () => {
                return (
                  <TouchableOpacity onPress={() => Alert.alert('ok')}>
                    <Icon name="search" color={'#fff'} size={30} />
                  </TouchableOpacity>
                );
              },
            }}
          />

          <stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'Settings',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#3116f7',
              },
              headerTitleStyle: {fontWeight: 'bold', fontSize: 22},
            }}
          />

          <stack.Screen
            name="Task"
            component={TaskList}
            options={{
              title: 'Task List',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#3116f7',
              },
              headerTitleStyle: {fontWeight: 'bold', fontSize: 22},
              // eslint-disable-next-line react/no-unstable-nested-components
              headerRight: () => {
                return (
                  <TouchableOpacity>
                    <Bar name="bars" color={'#fff'} size={30} />
                  </TouchableOpacity>
                );
              },
            }}
          />

          <stack.Screen
            name="Batch"
            component={Batch}
            options={{
              title: 'Batch',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#3116f7',
              },
              headerTitleStyle: {fontWeight: 'bold', fontSize: 22},
            }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Dalivary.Provider>
  );
};

let style = StyleSheet.create({
  TextInput: {
    backgroundColor: '#5116f7',
    height: 40,
    width: 250,
    color: '#fff',
    fontSize: 20,
    borderRadius: 10,
    padding: 0,
    paddingStart: 10,
  },
});

export default App;
