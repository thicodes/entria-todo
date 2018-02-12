import React, { Component } from 'react'
import { 
    Animated,
    StyleSheet,
    Text,
    Image,
    View 
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

class Splash extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        scaleAnimated: new Animated.Value(2),
    }

    componentDidMount() {
        this.startViewAnimated()
    }

    startViewAnimated = value => {
        const { scaleAnimated } = this.state;
        Animated.sequence([
          Animated.timing(scaleAnimated, {
            duration: 2000,
            toValue: 0.1,
          }),
          Animated.timing(scaleAnimated, {
            duration: 500,
            toValue: 500,
          }),
        ]).start(() => {
            
            this.props.navigation.navigate('TodoList');
        });
      };

    render() {
        return (
            <View>
                <LinearGradient 
                    colors={['#3C1930', '#882758']}
                    style={styles.lineGradient}
                >
                    <View style={styles.containerImage}>
                        <Image 
                            source={require('../../images/Entria.png')}
                            resizeMode="contain"
                        />
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImage: {
        width: width,
        height: height,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    linearGradient: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
})

export default Splash