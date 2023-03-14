## Component API

### `<Accordion />`

| Name                | Type                | Default                       | Description                                                                                                |
| ------------------- | ------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| title               | string              | Title                         | Accordion title
| titleColor          | string              | theme.colors.primary          | Define the color for the title
| description         | string              | Description                   | Accordion description
| icon                | boolean             | true                          | Icon for expand/hide description 
| iconType            | `default`, `custom` | default                       | Default icon using react-native-vector-icons or custom (custom image must be added as an svg image `ic_name` under images in xcode and in Android studio as a vector)
| iconColor           | string              | theme.colors.primary          | Icon color
| iconSize            | number              | 18                            | Component that will be wrapped inside the ListItem component
| backgroundAnimation | boolean             | true                          | Define there will be a background animation from `defaultColor`  to `animatedColor`
| defaultColor        | string              | theme.colors.white            | Default accordion color
| animatedColor       | string              | theme.colors.neutralBorder    | Animated accordion color

### `<ActionSheet />`

| Name            | Type                          | Default              | Description                                                   |
| --------------- | ----------------------------- | -------------------- | ------------------------------------------------------------- |
| optionsIOS      | string[]                      | []                   | Actionsheet options (IOS), the first option should always be for handling `cancel` action
| messageIOS      | string                        | theme.colors.primary | Actionsheet message (IOS)                      
| optionsAndroid  | string                        | []                   | Actionsheet options (Android), the first option should always be for handling `cancel` action
| androidTitle    | boolean                       | true                 | Actionsheet title (Android)
| androidSubTitle | `default`, `custom`           | default              | Actionsheet subtitle (Android)                 
| onActionPressed | (id: number | string) => void | noop                 | Event when an action is pressed, return the index of the selected action

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
| onCloseBottomSheet | () => void                       | noop          | Event triggered when bottomsheet is closed

### Usage

This component is handled imperatively, you will need to pass a ref and you'll have access to two methods `openBottomsheet` and `closeBottomSheet`. Check the example to fully understand how to use this.


### `<Button />`

| Name             | Type                                    | Default                   | Description                                                                 |
| ---------------- | --------------------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| type             | `primary`, `secondary`, `custom`        | `primary`                 | Button type
| size             | `sm`, `md`, `lg`, `custom`              | `md`                      | Button type
| variant          | `container`, `outlined`, `soft`, `text` | `container`               | Button variant
| width            | string                                  | auto                      | Button width
| height           | number                                  | undefined                 | Button height
| title            | string                                  | Placeholder               | Button title
| titleStyle       | StyleProp<ViewStyle>                    | null                      | Style for button's title
| icon             | string                                  | undefined                 | Icon name
| iconType         | `default` | `custom`                    | `default`                 | Icon type
| iconSize         | number                                  | 20                        | Icon size
| hasIcon          | boolean                                 | false                     | Define if the icon is visible or not
| iconPosition     | `left`, `right`                         | undefined                 | Icon type
| iconColor        | string                                  | undefined                 | Icon color
| isLoading        | boolean                                 | false                     | Define if the button is in loading state
| spinnerColor     | string                                  | theme.colors.white        | Loading spinner color
| isDisabled       | boolean                                 | false                     | Define if the button is disabled or not
| disabledColor    | string                                  | theme.colors.neutralLight | Button disabled color |
| hasShadow        | boolean                                 | false                     | Define if the shadow is visible 
| shadowType       | `light`, `medium`, `dark`, `custom`     | undefined                 | Shadow type
| shadowStyle      | StyleProp<ViewStyle>                    | null                      | Shadow style
| animation        | `bounce`, `interpolation`, `none`       | `bounce`                  | Define the type of animation for when the button will be pressed
| bounciness       | number                                  | 0.98                      | Define how much the button will scale down when pressed
| interpolationSet | Interpolation<T> = [T, T]               | []                        | Array of colors (must be of 2 elements)
| containerStyle   | StyleProp<ViewStyle>                    | null                      | Button container style
| style            | StyleProp<ViewStyle>                    | null                      | Button style
| fillSpace        | boolean                                 | false                     | Define if the button and its container must fill the parent's space
| custom           | CustomButton                            | undefined                 | Custom configuration for the button, you'll be able to override almost everything
| children         | React.ReactNode                         | undefined                 | Button children
| onPress          | () => void                              | null                      | Method triggered when a button is pressed


### `<Card />`

| Name            | Type                              | Default                   | Description                                                                 |
| --------------- | --------------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| children        | React.ReactNode                   | null                      | Card children
| style           | StyleProp<ViewStyle>              | null                      | Card style
| isDisabled      | boolean                           | false                     | Define if the card is disabled
| backgroundColor | string                            | theme.colors.gray2        | Card background color
| disabledColor   | string                            | theme.colors.gray3        | Card disabled color
| radius          | number                            | 6                         | Card radius
| animation       | `bounce`, `none`                  | `bounce`                  | Define if one card press there will be an animation or not
| bounciness      | number                            | 0.98                      | Define how much will the component scale down when pressed
| shadow          | `light`, `medium`, `dark`, `none` | `none`                    | Define if a shadow will be shown or not
| shadowStyle     | StyleProp<ViewStyle>              | null                      | Shadow style (allow to override the default styles)
| onPress         | () => void                        | noop                      | Event triggered when card component is pressed in
| onPressIn       | () => void                        | noop                      | Event triggered when card component is pressed
| onPressOut      | () => void                        | noop                      | Event triggered when card component is pressed out
| onLayout        | LayoutChangeEvent                 | undefined                 | Event triggered onLayout

### `<Checkbox />`

| Name             | Type                | Default                   | Description                                                                 |
| ---------------- | ------------------- | ------------------------- | --------------------------------------------------------------------------- |
| active           | boolean             | false                     | Define if the checkbox is active or not
| activeColor      | string              | theme.colors.primary      | Active color
| defaultColor     | string              | theme.colors.neutral      | Default color
| defaultColorDark | string              | theme.colors.neutralDark  | Color when the checkbox is pressed
| disabledColor    | string              | theme.colors.primaryLight | Color displayed when the checkbox is disabled
| icon             | string              | `check`                   | Icon name
| iconType         | `default`, `custom` | `default`                 | Icon type
| iconSize         | number              | 12                        | Icon size
| isDisabled       | boolean             | false                     | Define if the checkbox is disabled
| size             | number              | 25                        | Checkbox size
| type             | `round`, `square`   | `square`                  | Checkbox type
| onPress          | () => void          | noop                      | Event triggered when checkbox is pressed

### `<Icon />`

| Name           | Type         | Default | Description                                      |
| -------------- | ------------ | ------- | ------------------------------------------------ |
| name           | string       | `sun`   | Icon name
| style          | ImageStyle   | {}      | Icon style 
| size           | number       | 24      | Icon size
| tint           | string       | null    | Icon color
| style          | ImageStyle   | {}      | Icon container styles
| onPress        | () => void   | noop    | Method triggered when an icon is onActionPressed

### `<Separator />`

| Name            | Type                     |  Default           | Description              |
| --------------- | ------------------------ |  ----------------- | ------------------------ |
| size            | number                   | 1                  | Separator size
| backgroundColor | string                   | theme.colors.gray2 | Separator color
| direction       | `horizontal`, `vertical` | horizontal         | Separator direction
| containerStyle  | StyleProp<ViewStyle>     | null               | Separator container style

### `<Spinner />`

| Name    | Type                                     | Default            | Description   |
| ------- | ---------------------------------------- | ------------------ | ------------- |
| size    | `number`, `small`, `large`, `undefined`  | small              | Spinner size
| color   | string                                   | theme.colors.white | Spinner color

### `<Text />`

| Name          | Type                  | Default            | Description                                                     |
| ------------- | --------------------- | ------------------ | --------------------------------------------------------------- |
| type          | TextType              | `p-md`             | Text type
| style         | StyleProp<TextStyle>  | null               | Text style
| color         | string                | theme.colors.black | Text color
| underlined    | boolean               | false              | Define if the text is underlined or not
| extendedStyle | StyleProp<TextStyle>  | null               | Property that allows to extend the default predefined style
| fontFamily    | string                | Avenir             | Font family
| rest          | string[]              | default            | Define an array of strings that can be added for extend <Text />

### `<Toggle />`

| Name         | Type                 | Default                          | Description                                                   |
| ------------ | -------------------- | -------------------------------- | ------------------------------------------------------------- |
| active       | boolean              | false                            | Define if the component is on/off
| isDisabled   | boolean              | false                            | Define if the component is disabled
| thumbColor   | string               | theme.colors.white               | Thumb color
| trackActive  | string               | theme.colors.primary             | Active color
| trackDefault | string               | theme.colors.neutralTextDisabled | Default color
| style        | StyleProp<ViewStyle> | null                             | Allow to customize the component style
