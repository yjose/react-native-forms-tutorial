import * as React from 'react';
import {View, StyleSheet, Button, Alert, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useForm} from 'react-hook-form';

import {Input, Form, DatePickerInput, SelectInput} from './components';
import validation from './validation';
import Hero from './Hero';

type FormData = {
  name: string;
  email: string;
  password: string;
  date: string;
  gender: string;
};

export default () => {
  const {handleSubmit, register, setValue, errors, watch} = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert('data', JSON.stringify(data));
  };

  React.useEffect(() => {
    register('date', validation.date);
    register('gender', validation.gender);
  }, [register]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        style={{backgroundColor: '#181e34'}}>
        <Hero />
        <View style={styles.formContainer}>
          <Form {...{register, setValue, validation, errors}}>
            <Input name="name" label="Name " />
            <Input name="email" label="Email" />
            <Input name="password" label="Password" secureTextEntry={true} />
          </Form>
          <DatePickerInput
            name="date"
            label="Date "
            watch={watch}
            setValue={setValue}
            error={errors['date']}
          />
          <SelectInput
            label="Gender"
            name="gender"
            watch={watch}
            setValue={setValue}
            error={errors['gender']}
          />
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    backgroundColor: '#181e34',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  formContainer: {
    padding: 8,
    flex: 1,
  },
  button: {
    backgroundColor: 'red',
  },
});
