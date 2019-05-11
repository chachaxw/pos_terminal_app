/**
 * @format
 * @flow
 */

import React from 'react';
import { ScrollView, SafeArea, Text, View, Image } from 'react-native';
import { getTheme } from 'react-native-material-kit';

const theme = getTheme();
const base64Icon = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';

type Props = {};

export default function(props: Props) {
  return (
    <ScrollView>
      <View style={theme.cardStyle}>
        <Image source={{uri : base64Icon}} style={theme.cardImageStyle} />
        <Text style={theme.cardTitleStyle}>Welcome</Text>
        <Text style={theme.cardContentStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Mauris sagittis pellentesque lacus eleifend lacinia...
        </Text>
        <View style={theme.cardMenuStyle}><Text>Menu</Text></View>
        <Text style={theme.cardActionStyle}>My Action</Text>
      </View>
    </ScrollView>
  );
}