/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const photoList = [
  {id: 0, url: 'http://www.getmdl.io/assets/demos/welcome_card.jpg'},
  {id: 1, url: 'http://www.getmdl.io/assets/demos/welcome_card.jpg'},
  {id: 2, url: 'http://www.getmdl.io/assets/demos/welcome_card.jpg'},
  {id: 3, url: 'http://www.getmdl.io/assets/demos/welcome_card.jpg'},
  {id: 4, url: 'http://www.getmdl.io/assets/demos/welcome_card.jpg'},
  {id: 5, url: 'http://www.getmdl.io/assets/demos/welcome_card.jpg'},
  {id: 6, url: 'http://www.getmdl.io/assets/demos/welcome_card.jpg'},
  {id: 7, url: 'http://www.getmdl.io/assets/demos/welcome_card.jpg'},
  {id: 8, url: 'http://www.getmdl.io/assets/demos/welcome_card.jpg'},
];

type Props = {
  name: string,
  photoList: Array<string>,
};

export default function(props: Props) {
  const { name } = props;
  const [selected, setSelected] = useState(photoList[0]);

  const select = (item) => {
    console.log(item);
    setSelected(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>Identify {name || 'Chacha'} from these photos</Text>
        <View style={styles.content}>
          { photoList && photoList.length ? 
            photoList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => select(item)}
                  style={Object.assign({}, styles.photoItem, {
                    borderColor: selected.id == item.id ? '#00D7C6' : '#000'
                  })}>
                  <Image source={{uri: item.url}} style={styles.image} />
                </TouchableOpacity>
              );
            }) : null
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    margin: 16,
    borderRadius: 2,
    backgroundColor: '#000',
  },
  title: {
    padding: 16,
    paddingBottom: 4,
    color: '#fff',
    fontSize: 15,
  },
  content: {
    padding: 12,
    paddingBottom: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoItem: {
    width: 98,
    height: 98,
    borderWidth: 2,
    marginBottom: 12,
    borderRadius: 2,
  },
  image: {
    width: 94,
    height: 94,
    borderRadius: 2,
  },
});