import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styled from "styled-components"
import Router from './src/routes/index.routes';

export default function App() {
  return (
    <Router />
  );
}