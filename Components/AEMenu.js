import {TextInput, View, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  Box,
  Button,
  Flex,
  ScrollView,
  Spacer,
  Input,
  Stack,
  Select,
  HStack,
  Pressable,
  Badge,
  Text,
  Container,
  VStack,
  Center,
  Heading,
  Divider,
} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import {useState} from 'react';
import {ImageAsset} from './Resources/Resource';

export default function AEMenu({navigation}) {
  const [incategory, setInCategory] = useState('');
  const [Selcategory, setSelCategory] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [showAddPro, setShowAddPro] = useState(false);
  const [showViewPro, setShowViewPro] = useState(false);

  const usersCollection = firestore().collection('Diwaniya');

  const createCategory = () => {
    usersCollection
      .doc('menu')
      .update({Thameem: 'Test'})
      .then(() => {
        console.log('Updated!');
      });
  };

  return (
    <ScrollView>
      <Stack direction="column" alignItems="center" space={'lg'} mt="4" px="8">
        <Input
          w="100%"
          py="0"
          onChangeText={e => {
            setInCategory(e);
          }}
          InputRightElement={
            <Button
              size="md"
              rounded="none"
              variant={'ghost'}
              w="1/4"
              h="full"
              onPress={createCategory}>
              Create
            </Button>
          }
          placeholder="Create New category"
        />
        <Select
          selectedValue={Selcategory}
          placeholder="Choose Category"
          minW="100%"
          onValueChange={value => {
            setSelCategory(value);
            setIsSelected(true);
          }}>
          <Select.Item label="Desert" value="Desert" />
          <Select.Item label="Salads" value="Salad" />
          <Select.Item label="MilkShakes" value="MilkShake" />
          <Select.Item label={incategory} value={incategory} />
        </Select>
        <HStack space={0} justifyContent="center">
          <Button
            m="10%"
            margin={'2%'}
            size="sm"
            variant="subtle"
            bgColor={showViewPro ? 'primary.200' : 'white'}
            isDisabled={!isSelected}
            _pressed={{opacity: 0.7, bgColor: 'primary.200'}}
            onPress={() => {
              setShowAddPro(false);
              setShowViewPro(true);
            }}>
            View Products
          </Button>
          <Button
            m="10%"
            margin={'2%'}
            size="sm"
            variant="subtle"
            bgColor={showAddPro ? 'green.200' : 'white'}
            _text={{
              color: '#5ebf8f',
            }}
            _pressed={{opacity: 0.7, bgColor: 'green.200'}}
            isDisabled={!isSelected}
            onPress={() => {
              setShowViewPro(false);
              setShowAddPro(true);
              console.log(showAddPro);
            }}>
            Add Products
          </Button>
          <Button
            m="10%"
            size="sm"
            margin={'2%'}
            variant="subtle"
            bgColor={'white'}
            _text={{
              color: '#f26868',
            }}
            _pressed={{opacity: 0.7, bgColor: 'red.200'}}
            isDisabled={!isSelected}
            onPress={() => {}}>
            Delete Category
          </Button>
        </HStack>
        <Divider
          my="0"
          _light={{
            bg: 'muted.400',
          }}
          _dark={{
            bg: 'muted.50',
          }}
        />
        <>
          {showAddPro ? (
            <AddProducts Selcategory={Selcategory} />
          ) : (
            showViewPro && <ViewProducts Selcategory={Selcategory} />
          )}
        </>
      </Stack>
    </ScrollView>
  );
}

//ViewProducts View
function ViewProducts({Selcategory}) {
  return (
    <VStack space={3}>
      <Text>{`${Selcategory}`} products</Text>
    </VStack>
  );
}

//AddProducts View
function AddProducts({Selcategory}) {
  const [singleFile, setSingleFile] = useState(null);
  const [imageUri, setImageUri] = useState(
    require('./Resources/dummyImage.jpg'),
  );
  const [isImgset, setIsImgset] = useState(false);
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });

      console.log('res : ' + JSON.stringify(res));
      setSingleFile(res);
      const data = JSON.stringify(res);
      const data2 = JSON.parse(data)[0];
      console.log(data2['uri']);
      setImageUri(data2['uri']);
      setIsImgset(true);
    } catch (err) {
      setSingleFile(null);
      setImageUri(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <VStack space={4}>
      <Heading color={'primary.600'} size={'xl'}>
        {`${Selcategory}`}:
      </Heading>
      <Center borderWidth={0.5} borderColor={'primary.600'}>
        <Image
          style={{width: 300, height: 200, marginTop: 20, marginBottom: 10}}
          resizeMode="contain"
          source={isImgset ? {uri: imageUri} : imageUri}
          alt="Alternate Text"
        />
        <Button
          m="10%"
          size="sm"
          margin={'2%'}
          variant="subtle"
          bgColor={'white'}
          _pressed={{opacity: 0.7, bgColor: 'primary.200'}}
          onPress={selectFile}
          isDisabled={isImgset}>
          Select Image
        </Button>
      </Center>
      <Input w="100%" onChangeText={e => {}} placeholder="Product Title" />
      <Input
        w="100%"
        onChangeText={e => {}}
        placeholder="Product description"
      />
    </VStack>
  );
}

const styles = StyleSheet.create({});
