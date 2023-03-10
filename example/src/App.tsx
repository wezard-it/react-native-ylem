import React, { useRef, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  Accordion,
  ActionSheet,
  ActionsheetHandler,
  Button,
  Checkbox,
  Icon,
  Separator,
  Spinner,
  theme,
  Toggle,
} from '@wezard/react-native-ylem';
import Text from './Text/Text';

// Custom icons
const ICONS = {
  check: 'check',
  plus: 'plus',
  sun: 'sun',
  toggleOn: 'toggleOn',
};

export default function App() {
  const actionRef = useRef<ActionsheetHandler>(null);
  const [checkboxActive, setCheckboxActive] = useState(false);
  const [toggleActive, setToggleActive] = useState(true);

  // Methods
  const onShowActionsheet = () => {
    if (actionRef?.current) {
      actionRef?.current?.show();
    }
  };

  // Render components
  const renderSection = (children: React.ReactNode) => (
    <View>
      {children}
      <Separator />
    </View>
  );

  return (
    <View style={styles.safe}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.container}>
          {renderSection(
            <View style={styles.section}>
              <Text type="h3" color={theme.colors.black}>
                Text:
              </Text>
              <Text type="h1" color={theme.colors.black}>
                Text testing
              </Text>
            </View>
          )}
          {renderSection(
            <View style={styles.section}>
              <Text type="h3" color={theme.colors.black}>
                Icon:
              </Text>
              <Icon name={ICONS.sun} />
            </View>
          )}
          {renderSection(
            <View style={styles.section}>
              <Text type="h3" color={theme.colors.black}>
                Checkbox:
              </Text>
              <Checkbox
                iconType="custom"
                active={checkboxActive}
                activeColor={theme.colors.primary}
                onPress={() => setCheckboxActive((prevState) => !prevState)}
              />
            </View>
          )}
          {renderSection(
            <View style={styles.section}>
              <Text type="h3" color={theme.colors.black}>
                Toogle:
              </Text>
              <Toggle
                active={toggleActive}
                onPress={() => setToggleActive((prevState) => !prevState)}
              />
            </View>
          )}
          {renderSection(
            <View style={styles.section}>
              <Text type="h3" color={theme.colors.black}>
                Spinner:
              </Text>
              <Spinner color={theme.colors.primary} />
            </View>
          )}
          {renderSection(
            <View style={styles.section}>
              <Accordion
                title="Accordion component"
                titleColor={theme.colors.black}
                iconType="custom"
                iconColor={theme.colors.black}
                backgroundAnimation={false}
                description="Tempor commodo duis ullamco mollit. Irure cupidatat aute voluptate laborum sunt magna fugiat. Non eu do aliqua eu duis excepteur mollit incididunt. Est amet esse veniam eiusmod. Labore ad elit aute minim reprehenderit anim et fugiat mollit cillum pariatur nostrud laborum. Consequat nisi amet culpa sit aliqua nostrud aute dolore amet ut."
              />
            </View>
          )}
          {renderSection(
            <View style={styles.section}>
              <Text type="h3" color={theme.colors.black}>
                Actionsheet:
              </Text>
              <Pressable style={styles.actionsheet} onPress={onShowActionsheet}>
                <Text color={theme.colors.white}>Show</Text>
              </Pressable>
            </View>
          )}
          {renderSection(
            <View style={styles.section}>
              <Text type="h3" color={theme.colors.black}>
                Button:
              </Text>
              <Button type="primary" animation="bounce" />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <ActionSheet
        ref={actionRef}
        optionsIOS={['Cancel', 'Test']}
        messageIOS="Testing this component"
        optionsAndroid={[{ text: 'Cancel', style: 'cancel' }, { text: 'Test' }]}
        onActionPressed={(id) => console.log(`perform ${id}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.m,
  },
  section: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.s,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsheet: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: theme.radius.s,
  },
});
