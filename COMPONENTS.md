## Component API

### `<Accordion />`

| Name                | Type                | Default                       | Description                                                                                                |
| ------------------- | ------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| title               | string              | Title                         | Accordion title
| titleColor          | string              | theme.colors.primary          | define the color for the title
| description         | string              | Description                   | Accordion description
| icon                | boolean             | true                          | icon for expand/hide description 
| iconType            | `default`, `custom` | default                       | default icon using react-native-vector-icons or custom (custom image must be added as an svg image `ic_name` under images in xcode and in Android studio as a vector)
| iconColor           | string              | theme.colors.primary          | icon color
| iconSize            | number              | 18                            | component that will be wrapped inside the ListItem component
| backgroundAnimation | boolean             | true                          | define there will be a background animation from `defaultColor`  to `animatedColor`
| defaultColor        | string              | theme.colors.white            | default accordion color
| animatedColor       | string              | theme.colors.neutralBorder    | animated accordion color

### `<ActionSheet />`

| Name            | Type                          | Default              | Description                                                   |
| --------------- | ----------------------------- | -------------------- | ------------------------------------------------------------- |
| optionsIOS      | string[]                      | []                   | Actionsheet options (IOS), the first option should always be for handling `cancel` action
| messageIOS      | string                        | theme.colors.primary | Actionsheet message (IOS)                      
| optionsAndroid  | string                        | []                   | Actionsheet options (Android), the first option should always be for handling `cancel` action
| androidTitle    | boolean                       | true                 | Actionsheet title (Android)
| androidSubTitle | `default`, `custom`           | default              | Actionsheet subtitle (Android)                 
| onActionPressed | (id: number | string) => void | null                 | Event when an action is pressed, return the index of the selected action

### `<BottomSheet />`

| Name               | Type                             | Default       | Description                                                                             |
| ------------------ | -------------------------------- | ------------- | --------------------------------------------------------------------------------------- |
| type               | `dynamic`, `fixed`               | `dynamic`     | Bottomsheet type
| config             | WithSpringConfig                 | BOTTOM_CONFIG | Bottomsheet configuration (check `reanimated` WithSpringConfig), velocity param not used
| duration           | number                           | 250           | Bottomsheet duration
| children           | React.ReactNode                  | null          | Bottomsheet children
| header             | React.ReactNode                  | null          | Bottomsheet header
| footer             | React.ReactNode                  | null          | Bottomsheet footer
| points             | string[]                         | undefined     | Bottomsheet snap points (used when type is `fixed`)
| overlayOpacity     | number                           | 0.4           | Bottomsheet backdrop opacity
| backdropType       | `default`, `custom`, `none`      | default       | Bottomsheet backdrop type
| backdrop           | React.ReactNode                  | null          | Bottomsheet backdrop component, if `backdropType` is equal to custom
| handleComponent    | React.FC<BottomSheetHandleProps> | undefined     | Bottomsheet handle component
| props              | Partial<GorhomBottomSheetProps>  | []            | Bottomsheet props, allow to fully extend this component
| onCloseBottomSheet | () => void                       | null          | Event triggered when bottomsheet is closed

### Usage

This component is handled imperatively, you will need to pass a ref and you'll have access to two methods `openBottomsheet` and `closeBottomSheet`. Check the example to fully understand how to use this.


### `<Button />`

| Name             | Type                                    | Default                   | Description                                                                 |
| ---------------- | --------------------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| type             | `primary`, `secondary`, `custom`        | `primary`                 | button type
| size             | `sm`, `md`, `lg`, `custom`              | `md`                      | button type
| variant          | `container`, `outlined`, `soft`, `text` | `container`               | button variant
| width            | string                                  | auto                      | button width
| height           | number                                  | undefined                 | button height
| title            | string                                  | Placeholder               | button's title
| titleStyle       | StyleProp<ViewStyle>                    | null                      | style for button's title
| icon             | string                                  | undefined                 | icon name
| iconType         | `default` | `custom`                    | `default`                 | icon type
| iconSize         | number                                  | 20                        | icon size
| hasIcon          | boolean                                 | false                     | define if the icon is visible or not
| iconPosition     | `left`, `right`                         | undefined                 | icon type
| iconColor        | string                                  | undefined                 | icon color
| isLoading        | boolean                                 | false                     | define if the button is in loading state
| spinnerColor     | string                                  | theme.colors.white        | loading spinner color
| isDisabled       | boolean                                 | false                     | define if the button is disabled or not
| disabledColor    | string                                  | theme.colors.neutralLight | button's disabled color |
| hasShadow        | boolean                                 | false                     | define if the shadow is visible 
| shadowType       | `light`, `medium`, `dark`, `custom`     | undefined                 | shadow type
| shadowStyle      | StyleProp<ViewStyle>                    | null                      | shadow style
| animation        | `bounce`, `interpolation`, `none`       | `bounce`                  | define the type of animation for when the button will be pressed
| bounciness       | number                                  | 0.98                      | define how much the button will scale down when pressed
| interpolationSet | Interpolation<T> = [T, T]               | []                        | the array must be of two elements (strings)
| containerStyle   | StyleProp<ViewStyle>                    | null                      | button container style
| style            | StyleProp<ViewStyle>                    | null                      | button style
| fillSpace        | boolean                                 | false                     | define if the button and its container must fill the parent's space
| custom           | CustomButton                            | undefined                 | custom configuration for the button, you'll be able to override almost everything
| children         | React.ReactNode                         | undefined                 | button children
| onPress          | () => void                              | null                      | method triggered when a button is pressed


### `<Card />`

<!-- | Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- | -->
Working on it...

### `<Checkbox />`

| Name             | Type                | Default                   | Description                                                                 |
| ---------------- | ------------------- | ------------------------- | --------------------------------------------------------------------------- |
| active           | boolean             | false                     | define if the checkbox is active or not
| activeColor      | string              | theme.colors.primary      | active color
| defaultColor     | string              | theme.colors.neutral      | default color
| defaultColorDark | string              | theme.colors.neutralDark  | color when the checkbox is pressed
| disabledColor    | string              | theme.colors.primaryLight | color displayed when the checkbox is disabled
| icon             | string              | `check`                   | icon name
| iconType         | `default`, `custom` | `default`                 | icon type
| iconSize         | number              | 12                        | icon size
| isDisabled       | boolean             | false                     | define if the checkbox is disabled
| size             | number              | 25                        | checkbox size
| type             | `round`, `square`   | `square`                  | checkbox type
| onPress          | () => void          | null                      | event triggered when checkbox is pressed

### `<Icon />`

| Name           | Type         | Default | Description                                      |
| -------------- | ------------ | ------- | ------------------------------------------------ |
| name           | string       | `sun`   | icon name
| style          | ImageStyle   | {}      | icon style 
| size           | number       | 24      | icon size
| tint           | string       | null    | icon color
| style          | ImageStyle   | {}      | icon container styles
| onPress        | () => void   | null    | method triggered when an icon is onActionPressed

### `<Separator />`

| Name            | Type                     |  Default           | Description     |
| --------------- | ------------------------ |  ----------------- | --------------- |
| size            | number                   | 1                  | size
| backgroundColor | string                   | theme.colors.gray2 | color
| direction       | `horizontal`, `vertical` | horizontal         | direction
| containerStyle  | StyleProp<ViewStyle>     | null               | container style

### `<Spinner />`

| Name    | Type                                     | Default            | Description   |
| ------- | ---------------------------------------- | ------------------ | ------------- |
| size    | `number`, `small`, `large`, `undefined`  | small              | spinner size
| color   | string                                   | theme.colors.white | spinner color

### `<Text />`

| Name          | Type                  | Default            | Description                                                     |
| ------------- | --------------------- | ------------------ | --------------------------------------------------------------- |
| type          | TextType              | `p-md`             | text type
| style         | StyleProp<TextStyle>  | null               | text style
| color         | string                | theme.colors.black |text color
| underlined    | boolean               | false              | define if the text is underlined or not
| extendedStyle | StyleProp<TextStyle>  | null               | prop that allows to extend the default predefined style
| fontFamily    | string                | Avenir             | font family
| rest          | string[]              | default            | define an array of strings that can be added for extend <Text />

### `<Toggle />`

| Name         | Type                 | Default                          | Description                                                   |
| ------------ | -------------------- | -------------------------------- | ------------------------------------------------------------- |
| active       | boolean              | false                            | define if the component is on/off
| isDisabled   | boolean              | false                            | define if the component is disabled
| thumbColor   | string               | theme.colors.white               | thumb color
| trackActive  | string               | theme.colors.primary             | active color
| trackDefault | string               | theme.colors.neutralTextDisabled | disabled color
| style        | StyleProp<ViewStyle> | null                             | Allow to customize the component style
