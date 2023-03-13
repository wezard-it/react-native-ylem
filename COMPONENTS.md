## Component API

### `<Accordion />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| title               | string              | no | Title                         | Accordion title |
| titleColor          | string              | no | theme.colors.primary          | define the color for the title |
| description         | string              | no | Description                   | Accordion description |
| icon                | boolean             | no | true                          | icon for expand/hide description |
| iconType            | `default`, `custom` | no | default                       | default icon using react-native-vector-icons or custom (custom image must be added as an svg image `ic_name` under images in xcode and in Android studio as a vector) |
| iconColor           | string              | no | theme.colors.primary          | icon color                        |
| iconSize            | number              | no | 18                            | component that will be wrapped inside the ListItem component  |
| backgroundAnimation | boolean             | no | true                          | define there will be a background animation from `defaultColor`  to `animatedColor` |
| defaultColor        | string              | no | theme.colors.white            | default accordion color |
| animatedColor       | string              | no | theme.colors.neutralBorder    | animated accordion color |

### `<ActionSheet />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| optionsIOS      | string[]                      | no | []                   | Actionsheet options (IOS), the first option should always be for handling `cancel` action
| messageIOS      | string                        | no | theme.colors.primary | Actionsheet message (IOS)                        |
| optionsAndroid  | string                        | no | []                   | Actionsheet options (Android), the first option should always be for handling `cancel` action
| androidTitle    | boolean                       | no | true                 | Actionsheet title (Android) |
| androidSubTitle | `default`, `custom`           | no | default              | Actionsheet subtitle (Android)                        |
| onActionPressed | (id: number | string) => void | no | null                 | Event when an action is pressed, return the index of the selected action |

### `<BottomSheet />`

### Props

<!-- | Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- | -->
Working on it...

### `<Button />`

### Props

<!-- | Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- | -->
Working on it...

### `<Card />`

### Props

<!-- | Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- | -->
Working on it...

### `<Checkbox />`

### Props

<!-- | Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- | -->
Working on it...

### `<Icon />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| name           | string          | no       | `sun`   | icon name |
| style          | ImageStyle      | no       | {}      | icon style| 
| size           | number          | no       | 24      | icon size |
| tint           | string          | no       | null    | icon color |
| style          | ImageStyle      | no       | {}      | icon container styles|
| onPress        | () => void      | no       | null    | method triggered when an icon is onActionPressed |

### `<Separator />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| size            | number                     | no       | 1                   | size |
| backgroundColor | string                     | no       | theme.colors.gray2  | color |
| direction       |  `horizontal`, `vertical`  | no       | horizontal          | direction |
| containerStyle  |  StyleProp<ViewStyle>      | no       | null                | container style |

### `<Spinner />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| size    | `number`, `small`, `large`, `undefined`  | no       | small              | size  |
| color   | string                                   | no       | theme.colors.white | color |

### `<Text />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| type           | TextType             | no       | `p-md`     | text type |
| style          | StyleProp<TextStyle> | no       | null       | text style |
| color          | string | no          | true     | text color |
| underlined     | boolean              | no       | false      | define if the text is underlined or not |
| extendedStyle  | StyleProp<TextStyle> | no       | null       | prop that allows to extend the default predefined styles |
| fontFamily     | string               | no       | Avenir     | font family |
| rest           | string[]             | no       | default    | define an array of strings that can be added for extend <Text />|

### `<Toggle />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| active           | boolean              | no                   | false | define if the component is on/off |
| isDisabled       | boolean              | no                   | false      | define if the component is disabled |
| thumbColor       | string| no           | theme.colors.white   | thumb color |
| trackActive      | string | no          | theme.colors.primary | active color |
| trackDefault     | string               | no                   | theme.colors.neutralTextDisabled   | disabled color |
| style            | StyleProp<ViewStyle> | no                   | Allow to customize the component style |