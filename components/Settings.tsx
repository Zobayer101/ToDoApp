import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
const Settings = () => {
  return (
    <ScrollView style={style.settingsCon}>
      <Text style={style.titleText}>Genaral</Text>
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>Remove Ads</Text>
        <Text style={style.IteMtitleP}>One payment to memove ads forever</Text>
      </TouchableOpacity>
      {/* ------------------------------------------ */}
      <View style={[style.Items, style.ItemsWithChack]}>
        <TouchableOpacity>
          <Text style={style.ItemTitleText}>Status bar</Text>
          <Text style={style.IteMtitleP}>Enabled</Text>
        </TouchableOpacity>
        <CheckBox value={true} tintColors={{true: 'green', false: '#fff'}} />
      </View>
      {/* ------------------------------------------ */}
      <View style={[style.Items, style.ItemsWithChack]}>
        <TouchableOpacity>
          <Text style={style.ItemTitleText}>Confirm finishing tasks</Text>
          <Text style={style.IteMtitleP}>Disabled</Text>
        </TouchableOpacity>
        <CheckBox value={true} tintColors={{true: 'green', false: '#fff'}} />
      </View>
      {/* ------------------------------------------ */}
      <View style={[style.Items, style.ItemsWithChack]}>
        <TouchableOpacity>
          <Text style={style.ItemTitleText}>Confirm repeating Tasks</Text>
          <Text style={style.IteMtitleP}>Disabled</Text>
        </TouchableOpacity>
        <CheckBox value={true} tintColors={{true: 'green', false: '#fff'}} />
      </View>
      {/* ------------------------------------------ */}
      <View style={[style.Items, style.ItemsWithChack]}>
        <TouchableOpacity>
          <Text style={style.ItemTitleText}>Found in clipboard</Text>
          <Text style={style.IteMtitleP}>Enabled</Text>
        </TouchableOpacity>
        <CheckBox value={true} tintColors={{true: 'green', false: '#fff'}} />
      </View>
      {/* ------------------------------------------ */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>List to show at startup</Text>
        <Text style={style.IteMtitleP}>All Lists</Text>
      </TouchableOpacity>
      {/* ------------------------------------------ */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>First day of week</Text>
        <Text style={style.IteMtitleP}>Sunday</Text>
      </TouchableOpacity>
      {/* ------------------------------------------ */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>Time format </Text>
        <Text style={style.IteMtitleP}>12-hour</Text>
      </TouchableOpacity>
      {/* ------------------------ */}
      <Text style={style.titleText}>Notifications</Text>
      {/* ------------------------------------------ */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>Sound</Text>
        <Text style={style.IteMtitleP}>Ding-Dong</Text>
      </TouchableOpacity>
      {/* ------------------------------------------ */}
      <View style={[style.Items, style.ItemsWithChack]}>
        <TouchableOpacity>
          <Text style={style.ItemTitleText}>Voice</Text>
          <Text style={style.IteMtitleP}>speech synthesizer</Text>
        </TouchableOpacity>
        <CheckBox value={true} tintColors={{true: 'green', false: '#fff'}} />
      </View>
      {/* ------------------------------------------ */}
      <View style={[style.Items, style.ItemsWithChack]}>
        <TouchableOpacity>
          <Text style={style.ItemTitleText}>Vibration</Text>
          <Text style={style.IteMtitleP}>Enabled</Text>
        </TouchableOpacity>
        <CheckBox value={true} tintColors={{true: 'green', false: '#fff'}} />
      </View>
      {/* ------------------------------------------ */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>Task notification </Text>
        <Text style={style.IteMtitleP}>on time</Text>
      </TouchableOpacity>
      {/* ------------------------------------------ */}
      <View style={[style.Items, style.ItemsWithChack]}>
        <TouchableOpacity>
          <Text style={style.ItemTitleText}>Day summary</Text>
          <Text style={style.IteMtitleP}>Enabled</Text>
        </TouchableOpacity>
        <CheckBox value={true} tintColors={{true: 'green', false: '#fff'}} />
      </View>
      {/* ------------------------------------------ */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>Choose time </Text>
        <Text style={style.IteMtitleP}>8:00 am</Text>
      </TouchableOpacity>
      {/* ------------------------------------------ */}
      <Text style={style.titleText}>About</Text>
      {/* ------------------------------------------ */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>Invite Friends to the app</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>send feedback</Text>
      </TouchableOpacity>
      {/* --------------------------- */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>DailyToDo </Text>
        <Text style={style.IteMtitleP}>Version 0.1</Text>
      </TouchableOpacity>
      {/* -------------------------------- */}
      <Text style={style.titleText}>Follow us</Text>
      {/* -------------------------------- */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>Facebook</Text>
      </TouchableOpacity>
      {/* -------------------------------- */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>LindIN</Text>
      </TouchableOpacity>
      {/* -------------------------------- */}
      <TouchableOpacity style={style.Items}>
        <Text style={style.ItemTitleText}>github</Text>
      </TouchableOpacity>
      {/* -------------------------------- */}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  settingsCon: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3616c4',
  },
  titleText: {
    marginLeft: 20,
    marginTop: 30,
    fontSize: 20,
    color: '#4cfafc',
  },
  Items: {
    width: '100%',
    height: 60,
    paddingHorizontal: 30,
    marginTop: 20,
    backgroundColor: '#3716c4',
    elevation: 1,
  },
  ItemsWithChack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ItemTitleText: {
    color: '#fff',
    fontSize: 18,
    padding: 4,
  },
  IteMtitleP: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 7,
  },
});

export default Settings;
