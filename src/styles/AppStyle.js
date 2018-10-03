import Colors from './Colors';

export default AppStyle = {
  screen: {
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: Colors.background,
    },
  },
  text: {
    small: {
      fontSize: 12,
      color: Colors.text,
    },
    medium: {
      fontSize: 20,
      color: Colors.text,
    },
    title: {
      color: 'red',
      marginBottom: 10,
    }
  },
  button: {
    facebookSocialIcon: {
      padding: 10,
      borderRadius: 5,
    },
    standard: {
      width: 150,
      height: 50,
      marginTop: 20,
      backgroundColor: 'white',
    }
  },
  flexConfig: {
    wrapRowCenter: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
    }
  }
}