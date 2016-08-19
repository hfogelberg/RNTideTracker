import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    // marginTop: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBar: {
    // backgroundColor: '#BD5026',
    alignItems: 'center'
  },
  navBarText: {
    // color: 'white',
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
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 24
  },
  locationText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12
  },
  body: {
    flex: 8,
    alignSelf: 'stretch',
    marginTop: 20,
    alignItems: 'stretch'
  },
  tideItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  tideType: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  tideHeight: {
    textAlign: 'left',
    fontSize: 20,
  },
  tideDate: {
    fontSize: 16,
    alignItems: 'flex-end'
  },
  loadingView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 30
  },
  refreshContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'orange'
  },
  placesSearch: {
    flex: 1,
    marginTop: 70
  },
  about: {
    flex: 1,
    marginTop: 70,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  favoriteContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 10
  },
  favorite: {
    justifyContent: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold'
  }
});
