import React, {useEffect, useState, useMemo} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default function ViewMenu({navigation}) {
  const [category, setCategory] = useState([]);
  const [menuData, setMenuData] = useState('');

  useEffect(() => {
    firestore()
      .collection('Diwaniya')
      .doc('CategoryHelper')
      .get()
      .then(documentSnapshot => {
        console.log('Doc exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          const helperData = documentSnapshot.data().helper;
          setCategory(helperData);
          console.log(helperData);
        }
      });
  }, []);

  const section = useMemo(() => {
    const [secDataState, setSecDataState] = useState([]);

    useEffect(() => {
      firestore()
        .collection('Diwaniya')
        .doc('menu')
        .get()
        .then(documentSnapshot => {
          console.log('Doc exists: ', documentSnapshot.exists);

          if (documentSnapshot.exists) {
            const helperData22 = documentSnapshot.data();
            setMenuData(helperData22);
            console.log('menuData:', menuData);
          }
        });
    }, []);

    const sections = category.map(categoryItem => {
      console.log('categoryItem:', categoryItem);

      const sectionData = [];

      if (menuData && menuData[categoryItem]?.Type) {
        console.log('type:', menuData[categoryItem].Type);
        sectionData.push(menuData[categoryItem]?.Type);
      }

      return {
        title: categoryItem,
        data: sectionData,
      };
    });

    return sections;
  }, [category, menuData]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={section}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
}
