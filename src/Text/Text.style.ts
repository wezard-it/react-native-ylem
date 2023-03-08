import { StyleSheet } from 'react-native';
import { theme } from '..';

const Style = StyleSheet.create({
  h1: { ...theme.typography.h1 },
  h2: { ...theme.typography.h2 },
  h3: { ...theme.typography.h3 },
  h4: { ...theme.typography.h4 },
  titleSm: { ...theme.typography.titleSm },
  titleMd: { ...theme.typography.titleMd },
  titleLg: { ...theme.typography.titleLg },
  titleBold: { ...theme.typography.titleBold },
  pSm: { ...theme.typography.pSm },
  pMd: { ...theme.typography.pMd },
  pLg: { ...theme.typography.pLg },
  linkSm: { ...theme.typography.linkSm },
  linkMd: { ...theme.typography.linkMd },
  linkLg: { ...theme.typography.linkLg },
});

export default Style;
