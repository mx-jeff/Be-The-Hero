import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import { YellowBox } from 'react-native'

import Routes from './src/routes'

export default function App() {

  YellowBox.ignoreWarnings(['Warning: Encountered two children'])

  return (
    <Routes />
  );
}