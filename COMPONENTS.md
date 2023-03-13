## Component API

### `<Accordion />`

### Props

| Name           | Type                 | Required | Default | Description                                                   |
| -------------- | -------------------- | -------- | ------- | ------------------------------------------------------------- |
| title           | string              | no       | Title | Accordion title
| titleColor | string               | no       | theme.colors.primary      | define the color for the title                        |
| description | string| no       | Description    | Accordion description                                              |
| icon    | boolean | no       | true    | icon for expand/hide description                                                  |
| iconType       | default, custom              | no       | default   | default icon using react-native-vector-icons or custom (custom image must be added as an svg image `ic_name` under images in xcode and in Android studio as a vector)                             |
| iconColor | string              | no       | theme.colors.primary   | icon color                        |
| iconSize       | number      | yes      | null    | component that will be wrapped inside the ListItem component  |
| backgroundAnimation          | boolean               | no       | true    | define there will be a background animation from `defaultColor`  to `animatedColor`|
| defaultColor          | string               | no       | theme.colors.white    | default accordion color |
| animatedColor          | string               | no       | theme.colors.neutralBorder    | animated accordion color |

### Events

There are no events for this component.