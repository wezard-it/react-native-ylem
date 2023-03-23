import React, { useRef, useState } from 'react';
import {
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
  BottomSheet,
  Button,
  Card,
  Checkbox,
  Icon,
  Separator,
  Spinner,
  theme,
  Toggle,
  BottomSheetHandler,
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
  const bottomRef = useRef<BottomSheetHandler>(null);

  const [checkboxActive, setCheckboxActive] = useState(false);
  const [toggleActive, setToggleActive] = useState(true);

  // Methods
  const onShowActionsheet = () => {
    if (actionRef?.current) {
      actionRef?.current?.show();
    }
  };

  const onShowBottomSheet = () => {
    if (bottomRef?.current) {
      bottomRef?.current?.openBottomSheet();
    }
  };

  // Render components
  const renderSection = (children: React.ReactNode) => (
    <View>
      {children}
      <Separator />
    </View>
  );

  const renderActionsheet = (
    <ActionSheet
      ref={actionRef}
      optionsIOS={['Cancel', 'Test']}
      messageIOS="Testing this component"
      optionsAndroid={[{ text: 'Cancel', style: 'cancel' }, { text: 'Test' }]}
      onActionPressed={(id: number | string) => console.log(`perform ${id}`)}
    />
  );

  const renderBottomSheet = (
    <BottomSheet ref={bottomRef} type="fixed" points={['50%']}>
      <ScrollView contentContainerStyle={styles.bottomsheet}>
        <Text>
          Consequat exercitation fugiat et in. Dolore aliqua non ullamco aliqua
          culpa ea fugiat consectetur aute. Nulla consequat dolore irure amet
          non mollit ad sit culpa voluptate ipsum incididunt. Consequat laboris
          minim velit voluptate nostrud fugiat ex consequat laborum labore sunt.
          Irure culpa enim id excepteur nostrud anim aliquip qui eu commodo. Do
          nostrud elit aliqua ea cupidatat eiusmod id consectetur minim laboris
          magna. Id amet eiusmod ad irure officia qui adipisicing mollit tempor.
          Consequat exercitation fugiat et in. Dolore aliqua non ullamco aliqua
          culpa ea fugiat consectetur aute. Nulla consequat dolore irure amet
          non mollit ad sit culpa voluptate ipsum incididunt. Consequat laboris
          minim velit voluptate nostrud fugiat ex consequat laborum labore sunt.
          Irure culpa enim id excepteur nostrud anim aliquip qui eu commodo. Do
          nostrud elit aliqua ea cupidatat eiusmod id consectetur minim laboris
          magna. Id amet eiusmod ad irure officia qui adipisicing mollit tempor.
          Consequat exercitation fugiat et in. Dolore aliqua non ullamco aliqua
          culpa ea fugiat consectetur aute. Nulla consequat dolore irure amet
          non mollit ad sit culpa voluptate ipsum incididunt. Consequat laboris
          minim velit voluptate nostrud fugiat ex consequat laborum labore sunt.
          Irure culpa enim id excepteur nostrud anim aliquip qui eu commodo. Do
          nostrud elit aliqua ea cupidatat eiusmod id consectetur minim laboris
          magna. Id amet eiusmod ad irure officia qui adipisicing mollit tempor.
        </Text>
      </ScrollView>
    </BottomSheet>
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
              <Button
                type="primary"
                variant="text"
                animation="bounce"
                title="Show"
                onPress={onShowActionsheet}
              />
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
          {renderSection(
            <View style={styles.section}>
              <Text type="h3" color={theme.colors.black}>
                Bottomsheet:
              </Text>
              <Button
                type="primary"
                variant="text"
                animation="bounce"
                title="Show"
                onPress={onShowBottomSheet}
              />
            </View>
          )}
          <View style={styles.sectionVertical}>
            <Text type="h3" color={theme.colors.black}>
              Card:
            </Text>
            <Card style={styles.cardContainer}>
              <View style={styles.card}>
                <Text color={theme.colors.black}>Card component</Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
      {renderActionsheet}
      {renderBottomSheet}
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
  sectionVertical: {
    flexDirection: 'column',
    paddingVertical: theme.spacing.s,
  },
  bottomsheet: { paddingHorizontal: 20, paddingVertical: 30 },
  cardContainer: { marginVertical: 10 },
  card: {
    height: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
