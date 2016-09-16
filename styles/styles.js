import { StyleSheet } from 'react-native';
import * as colors from '../constants/colors';
import * as fonts from '../constants/fonts';

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: colors.COLOR_LIGHT_BLUE,
    flex: 1,
  },
  navBar: {
    alignItems: 'center',
    // backgroundColor: colors.COLOR_LIGHT_BLUE
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: fonts.FONT_HEADER_WEIGHT,
    fontSize: 22
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
    // marginTop: 15,
    backgroundColor: colors.COLOR_LIGHT_BLUE,
  },
  searchButton: {
    marginRight: 10,
    justifyContent: 'flex-end'
  },
  titleView: {
    marginTop: 20,
    marginLeft: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: fonts.FONT_HEADER_SIZE,
    color: colors.COLOR_ORANGE,
    fontWeight: fonts.FONT_HEADER_WEIGHT,
    fontFamily: fonts.FONT_HEADER
  },
  locationText: {
    fontFamily: fonts.FONT_LOCATION,
    fontSize: fonts.FONT_LOCATION_SIZE,
    color: colors.COLOR_ORANGE
  },
  tidesContainer: {
    paddingRight: 10,
    paddingLeft: 10,
    flex: 8,
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'stretch',
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  tideItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 8
  },
  tideType: {
    fontFamily: fonts.FONT_TIDE_TYPE,
    fontSize: fonts.FONT_TIDE_TYPE_SIZE,
    textAlign: 'left',
    color: colors.COLOR_TIDE_TEXT
  },
  tideHeight: {
    fontFamily: fonts.FONT_TIDE_HEIGHT,
    textAlign: 'left',
    fontSize: fonts.FONT_TIDE_HEIGHT_SIZE,
    color: colors.COLOR_TIDE_TEXT,
    fontWeight: fonts.FONT_TIDE_HEIGHT_WEIGHT,
  },
  tideDate: {
    fontFamily: fonts.FONT_TIDE_DATE,
    fontSize: fonts.FONT_TIDE_DATE_SIZE,
    alignItems: 'flex-start',
    color: colors.COLOR_TIDE_TEXT
  },
  loadingView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontFamily: fonts.FONT_LOADING_TEXT,
    fontSize: fonts.FONT_LOADING_TEXT_SIZE,
    fontWeight: 'bold',
    color: colors.COLOR_ORANGE,
    textAlign: 'center',
    justifyContent: 'center'
  },
  pullContainer: {
    alignSelf: 'stretch',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10
  },
  pullRightItem: {
    alignItems: 'flex-end'
  },
  pullLeftItem: {

    alignItems: 'flex-start'
  },
  placesSearch: {
    backgroundColor: colors.COLOR_LIGHT_BLUE,
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
    fontFamily: fonts.FONT_ABOUT_HEADER,
    fontSize: fonts.FONT_ABOUT_HEADER_SIZE,
    fontWeight: 'bold'
  },
  aboutText: {
    fontFamily: fonts.FONT_ABOUT_TEXT,
    fontSize: fonts.FONT_ABOUT_SIZE,
    flex: 6,
    marginRight: 20,
    marginLeft: 20
  },
  editContainer: {
    height: 40,
    marginTop: 70,
    marginRight: 10,
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  favoriteContainer: {
    alignSelf: 'stretch',
    marginLeft: 20,
    alignItems: 'stretch'
  },
  favoritesListItem: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginRight: 10
  },
  favoriteName: {
    fontFamily: fonts.FONT_FAVORITE,
    fontSize: fonts.FONT_FAVORITE_SIZE,
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
