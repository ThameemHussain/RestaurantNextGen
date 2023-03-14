import {View, Text} from 'react-native';
import {NativeBaseProvider, Box, Button, extendTheme} from 'native-base';
import HomeScreen from './Components/HomePage';
import MenuCompo from './Components/MenuCompo';
import Table from './Components/Table';
import AEMenu from './Components/AEMenu';
import ViewMenu from './Components/ViewMenu';
import DownloadMenu from './Components/DownloadMenu';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  const theme = extendTheme({
    colors: {
      amber: {
        400: '#5ebf8f',
      },
    },
  });
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Welcome!'}}
          />
          <Stack.Screen name="Menu" component={MenuCompo} />
          <Stack.Screen name="Table" component={Table} />
          <Stack.Screen name="Add/EditMenu" component={AEMenu} />
          <Stack.Screen name="ViewMenu" component={ViewMenu} />
          <Stack.Screen name="DownloadMenu" component={DownloadMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
