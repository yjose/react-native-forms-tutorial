import React, {useState} from 'react';
import {Pressable} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {FieldError} from 'react-hook-form';
import {View, Text, StyleSheet, TextInputProps} from 'react-native';

type ValueOptions = {
  shouldValidate?: boolean;
};

interface Props {
  name: string;
  label: string;
  setValue: (name: string, value: string, options?: ValueOptions) => void;
  watch: any;
  error?: FieldError | undefined;
}

export const DatePickerInput = ({
  name,
  label,
  setValue,
  watch,
  error,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = watch(name);

  const hideDatePicker = () => {
    setIsOpen(false);
  };

  const handleConfirm = (date: any) => {
    const d = formatDate(date);
    setValue(name, d, {shouldValidate: true});
    hideDatePicker();
  };

  return (
    <Pressable onPress={() => setIsOpen(true)}>
      <View style={styles.container}>
        {label && <Text style={[styles.label]}>{label}</Text>}
        <View style={styles.input}>
          <Text style={styles.text}>{value ? value : 'YYYY-MM-DD'} </Text>
          <DateTimePickerModal
            isVisible={isOpen}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <Text style={styles.textError}>{error && error.message}</Text>
      </View>
    </Pressable>
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
