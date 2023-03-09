import {View} from 'react-native';
import {Box, Button, Flex, ScrollView, Spacer} from 'native-base';

export default function HomeScreen({navigation}) {
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
            navigation.navigate('Menu');
          }}>
          MENU
        </Button>
        <Spacer />
        <Button
          m="10%"
          size="lg"
          variant="outline"
          width={'70%'}
          onPress={() => {
            navigation.navigate('Table');
          }}>
          TABLES
        </Button>
        <Spacer />
        <Button m="10%" size="lg" variant="outline" width={'70%'}>
          COOK
        </Button>
      </Flex>
    </ScrollView>
  );
}
