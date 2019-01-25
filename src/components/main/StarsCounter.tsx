import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from 'resources/Colors';
import Images from 'resources/Images';

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.transparentBlack,
    flexDirection:'row',
    alignItems: 'center',
    padding:5
  },
  text: {
    fontSize:18,
    color: Colors.black,
    marginLeft:5
  },
  star: {
    height: 30,
    width: 30
  }
});

export interface StarsCounterProps {
  numberOfStars: number;
}

const StarsCounter = (props: StarsCounterProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.star} source={Images.starsIcon} />
      <Text style={styles.text}>{props.numberOfStars}</Text>
    </View>
  );
};

export default StarsCounter;
