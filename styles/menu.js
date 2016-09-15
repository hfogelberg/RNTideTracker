import { StyleSheet } from 'react-native';
import {COLOR_MENU_TEXT, COLOR_MENU_BLUE} from '../constants/colors';
import {FONT_MENU, FONT_MENU_SIZE} from '../constants/fonts';

module.exports = StyleSheet.create({
    container: {
      flex: 1,
        backgroundColor: COLOR_MENU_BLUE
    },
    favoritesList: {
      top: 40
    },
    menuItem: {
        color: COLOR_MENU_TEXT,
        fontFamily: FONT_MENU,
        fontSize: FONT_MENU_SIZE,
        padding: 10,
        textAlign: 'left'
    }
});
