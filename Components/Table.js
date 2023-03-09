import {View} from 'react-native';
import {Box, Button, Flex, ScrollView, Spacer} from 'native-base';

export default function Table({navigation}) {
  return (
    <ScrollView>
      <Flex direction="column" align="center">
        <Button m="10%" mt="10%" size="lg" variant="outline" width={'70%'}>
          Add Table
        </Button>
      </Flex>
    </ScrollView>
  );
}
