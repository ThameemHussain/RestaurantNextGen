import {View} from 'react-native';
import {Box, Button, Flex, ScrollView, Spacer} from 'native-base';

export default function MenuCompo({navigation}) {
  return (
    <ScrollView>
      <Flex direction="column" align="center">
        <Button
          m="10%"
          mt="50%"
          size="lg"
          variant="outline"
          width={'70%'}
          onPress={() => {
            navigation.navigate('ViewMenu');
          }}>
          View Menu
        </Button>
        <Spacer />
        <Button
          m="10%"
          size="lg"
          variant="outline"
          width={'70%'}
          onPress={() => {
            navigation.navigate('Add/EditMenu');
          }}>
          Add/Edit Menu
        </Button>
        <Spacer />
        <Button m="10%" size="lg" variant="outline" width={'70%'}>
          Download Menu
        </Button>
      </Flex>
    </ScrollView>
  );
}
