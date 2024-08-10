import React, { FC } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from '../../atoms';
import styles from './_RestoreModalStyles';

interface RestoreModalProps {
  isVisible: boolean;
  onRestore: () => void;
  onNew: () => void;
}

const _RestoreModal: FC<RestoreModalProps> = ({ isVisible, onRestore, onNew }) => {
  return (
    <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.modalContent}>
        <Text style={{color:'black'}}>Do you want to continue with your previous grid or start a new one?</Text>
        <Button title="Continue" onPress={onRestore} />
        <Button title="New" onPress={onNew} />
      </View>
    </Modal>
  );
};

export default _RestoreModal;