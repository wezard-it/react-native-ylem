## Component API

### `<Accordion />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| title           | string              | no       | Title | Accordion title
| titleColor | string               | no       | theme.colors.primary      | define the color for the title                        |
| description | string| no       | Description    | Accordion description                                              |
| icon    | boolean | no       | true    | icon for expand/hide description                                                  |
| iconType       | `default`, `custom`              | no       | default   | default icon using react-native-vector-icons or custom (custom image must be added as an svg image `ic_name` under images in xcode and in Android studio as a vector)                             |
| iconColor | string              | no       | theme.colors.primary   | icon color                        |
| iconSize       | number      | no      | 18    | component that will be wrapped inside the ListItem component  |
| backgroundAnimation          | boolean               | no       | true    | define there will be a background animation from `defaultColor`  to `animatedColor`|
| defaultColor          | string               | no       | theme.colors.white    | default accordion color |
| animatedColor          | string               | no       | theme.colors.neutralBorder    | animated accordion color |

### `<ActionSheet />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| optionsIOS           | string[]             | no       | [] | Actionsheet options (IOS), the first option should always be for handling `cancel` action
| messageIOS | string               | no       | theme.colors.primary      | Actionsheet message (IOS)                        |
| optionsAndroid | string| no       | []    | Actionsheet options (Android), the first option should always be for handling `cancel` action
| androidTitle    | boolean | no       | true    | Actionsheet title (Android) |
| androidSubTitle       | `default`, `custom`              | no       | default   | Actionsheet subtitle (Android)                        |
| onActionPressed | (id: number | string) => void | no       |Event when an action is pressed, return the index of the selected action |

### `<BottomSheet />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| optionsIOS           | string[]             | no       | [] | Actionsheet options (IOS), the first option should always be for handling `cancel` action
| messageIOS | string               | no       | theme.colors.primary      | Actionsheet message (IOS)                        |
| optionsAndroid | string| no       | []    | Actionsheet options (Android), the first option should always be for handling `cancel` action
| androidTitle    | boolean | no       | true    | Actionsheet title (Android) |
| androidSubTitle       | `default`, `custom`              | no       | default   | Actionsheet subtitle (Android)                        |
| onActionPressed | (id: number | string) => void | no       |Event when an action is pressed, return the index of the selected action |

### `<Button />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| optionsIOS           | string[]             | no       | [] | Actionsheet options (IOS), the first option should always be for handling `cancel` action
| messageIOS | string               | no       | theme.colors.primary      | Actionsheet message (IOS)                        |
| optionsAndroid | string| no       | []    | Actionsheet options (Android), the first option should always be for handling `cancel` action
| androidTitle    | boolean | no       | true    | Actionsheet title (Android) |
| androidSubTitle       | `default`, `custom`              | no       | default   | Actionsheet subtitle (Android)                        |
| onActionPressed | (id: number | string) => void | no       |Event when an action is pressed, return the index of the selected action |

### `<Card />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| optionsIOS           | string[]             | no       | [] | Actionsheet options (IOS), the first option should always be for handling `cancel` action
| messageIOS | string               | no       | theme.colors.primary      | Actionsheet message (IOS)                        |
| optionsAndroid | string| no       | []    | Actionsheet options (Android), the first option should always be for handling `cancel` action
| androidTitle    | boolean | no       | true    | Actionsheet title (Android) |
| androidSubTitle       | `default`, `custom`              | no       | default   | Actionsheet subtitle (Android)                        |
| onActionPressed | (id: number | string) => void | no       |Event when an action is pressed, return the index of the selected action |

### `<Checkbox />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| optionsIOS           | string[]             | no       | [] | Actionsheet options (IOS), the first option should always be for handling `cancel` action
| messageIOS | string               | no       | theme.colors.primary      | Actionsheet message (IOS)                        |
| optionsAndroid | string| no       | []    | Actionsheet options (Android), the first option should always be for handling `cancel` action
| androidTitle    | boolean | no       | true    | Actionsheet title (Android) |
| androidSubTitle       | `default`, `custom`              | no       | default   | Actionsheet subtitle (Android)                        |
| onActionPressed | (id: number | string) => void | no       |Event when an action is pressed, return the index of the selected action |

### `<Icon />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| optionsIOS           | string[]             | no       | [] | Actionsheet options (IOS), the first option should always be for handling `cancel` action
| messageIOS | string               | no       | theme.colors.primary      | Actionsheet message (IOS)                        |
| optionsAndroid | string| no       | []    | Actionsheet options (Android), the first option should always be for handling `cancel` action
| androidTitle    | boolean | no       | true    | Actionsheet title (Android) |
| androidSubTitle       | `default`, `custom`              | no       | default   | Actionsheet subtitle (Android)                        |
| onActionPressed | (id: number | string) => void | no       |Event when an action is pressed, return the index of the selected action |

### `<Separator />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| size           | number          | no       | 1 | separator size|
| backgroundColor | string               | no       | theme.colors.gray2      | separator color|
| direction |  `horizontal` , `vertical`               | no       | horizontal      | separator direction|
| containerStyle |  StyleProp<ViewStyle>             | no       | null      | separator container style|

### `<Spinner />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| size           | `number` , `small`, `large`, `undefined`          | no       | small | spinner size|
| color | string               | no       | theme.colors.white      | spinner color|

### `<Text />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| type           | TextType             | no       | `p-md` | type of text |
| style | StyleProp<TextStyle> | no       | null    | Text style |
| color    | string | no       | true    | Actionsheet title (Android) |
| underlined       | boolean              | no       | false   | Define if the text is underlined or not|
| extendedStyle       | StyleProp<TextStyle>              | no       | null   | prop that allows to extend the default predefined styles|
| fontFamily       | string              | no       | Avenir   | Font family |
| rest       | string[]              | no       | default   | Define an array of strings that can be added for extend <Text />|

### `<Toggle />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| active           | boolean             | no       | false | define if the component is on/off |
| isDisabled | boolean               | no       | false      | define if the component is disabled                        |
| thumbColor | string| no       | theme.colors.white    | thumb color |
| trackActive    | string | no       | theme.colors.primary    | active color |
| trackDefault       | string              | no       | theme.colors.neutralTextDisabled   | disabled color                        |
| style | StyleProp<ViewStyle> | no       | Allow to customize the component style |