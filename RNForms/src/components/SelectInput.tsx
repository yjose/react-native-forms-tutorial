import React, {useState} from 'react';
import {Pressable} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {FieldError} from 'react-hook-form';
import {View, Text, StyleSheet, TextInputProps} from 'react-native';

type ValueOptions = {
  shouldValidate?: boolean;
};

interface Props extends TextInputProps {
  name: string;
  label: string;
  setValue: (name: string, value: string, options?: ValueOptions) => void;
  watch: any;
  error?: FieldError | undefined;
}

export const SelectInput = ({name, label, setValue, watch, error}: Props) => {
  const value = watch(name);
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label]}>{label}</Text>}
      <View style={styles.input}>
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={(v) => setValue(name, v, {shouldValidate: true})}
          items={[
            {label: 'Female', value: 'female'},
            {label: 'Male', value: 'male'},
            {label: 'Other', value: 'other'},
          ]}
        />
      </View>
      <Text style={styles.textError}>{error && error.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: '#c0cbd3',
    borderColor: '#c0cbd3',
    justifyContent: 'center',
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c0cbd3',
  },
  text: {
    fontSize: 16,
    height: 40,
    paddingTop: 10,
    color: '#c0cbd3',
    paddingLeft: 8,
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
});

function formatDate(date: string) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderStyle: 'solid',
    borderRadius: 5,
    // paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: '#c0cbd3',
    borderColor: '#c0cbd3',
    justifyContent: 'center',
  },
  inputAndroid: {
    borderStyle: 'solid',
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: '#c0cbd3',
    borderColor: '#c0cbd3',
    justifyContent: 'center',
  },
});
