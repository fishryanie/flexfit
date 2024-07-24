import React from 'react';
import store, {persistor} from 'stores';
import codePush, {CodePushOptions} from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {PortalProvider} from '@gorhom/portal';
import {Provider} from 'react-redux';
import Routes from 'routers';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <PortalProvider>
                <Routes />
              </PortalProvider>
            </GestureHandlerRootView>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

export default codePush(codePushOptions)(App);
