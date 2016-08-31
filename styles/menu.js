import { StyleSheet } from 'react-native';
import * as colors from '../constants/colors';

module.exports = StyleSheet.create({
    container: {
      flex: 1,
        backgroundColor: colors.COLOR_MENU_BLUE
    },
    favoritesList: {
      top: 40
    },
    menuItem: {
        color: colors.COLOR_MENU_TEXT,
        padding: 10,
        textAlign: 'left'
    }
});
