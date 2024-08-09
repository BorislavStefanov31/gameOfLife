import React, { FC } from 'react';
import { Button, View } from 'react-native';
import styles from './_ButtonStyles';

interface ICustomButtonProps {
  title: string;
  onPress: () => void;
}

const _CustomButton: FC<ICustomButtonProps> = (props) => {
  const {
    title,
    onPress
  } = props

  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

export default _CustomButton;
