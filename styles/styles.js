import { StyleSheet } from 'react-native';
import * as colors from '../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.COLOR_LIGHT_BLUE,
    flex: 1,
  },
  navBar: {
    alignItems: 'center'
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    fontSize: 22,
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    padding: 10,
    paddingTop: 5
  },
  scene: {
    flex: 1,
    paddingTop: 63,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center'
  },
  searchbar: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
    backgroundColor: 'gray'
  },
  searchButton: {
    marginRight: 10,
    justifyContent: 'flex-end'
  },
  titleView: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 24,
    color: colors.COLOR_ORANGE,
    fontWeight: '500'
  },
  locationText: {
    fontSize: 12,
    color: colors.COLOR_ORANGE
  },
  tidesContainer: {
    flex: 8,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginTop: 30,
    alignItems: 'stretch'
  },
  tideItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  tideHeight: {
    textAlign: 'left',
    fontSize: 20,
    color: colors.COLOR_MENU_TEXT
  },
  tideDate: {
    fontSize: 16,
    alignItems: 'flex-end',
    color: colors.COLOR_MENU_TEXT
  },
  loadingView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.COLOR_ORANGE,
    textAlign: 'center',
    justifyContent: 'center'
  },
  pullRightContainer: {
    alignSelf: 'stretch',
    marginRight: 30,
    marginBottom: 30
  },
  pullRightItem: {
    alignItems: 'flex-end'
  },
  placesSearch: {
    flex: 1,
    marginTop: 70
  },
  aboutHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  aboutHeaderText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  aboutText: {
    flex: 6,
    marginRight: 20,
    marginLeft: 20
  },
  editContainer: {
    // flex: 1,
    height: 40,
    marginTop: 70,
    marginRight: 20,
    alignSelf: 'stretch'
  },
  favoriteContainer: {
    alignSelf: 'stretch',
    marginLeft: 20,
    alignItems: 'stretch'
  },
  favoritesListItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  favoriteName: {
    fontSize: 22,
    color: colors.COLOR_MENU_TEXT,
  },
  icon: {
    height: 40,
    width: 40
  },
  refreshLocation: {
    height: 32,
    width: 32,
  }
});
