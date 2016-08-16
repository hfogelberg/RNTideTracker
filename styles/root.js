import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  thirdPagecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange'  
  },
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
    }
});
