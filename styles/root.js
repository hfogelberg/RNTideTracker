import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navBar: {
        backgroundColor: '#BD5026',
    },
    navBarText: {
        color: 'white',
        fontSize: 16,
        marginVertical: 10,
    },
    navBarTitleText: {
        fontWeight: '500',
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
      marginTop: 20
    },
    tideItem: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    type: {
      alignItems: 'flex-start',
      fontSize: 32,
    },
    height: {
      fontSize: 20,
    },
    date: {
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
    }
});
