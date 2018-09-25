import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    txtLike: { 
        borderWidth: 1, 
        borderColor: 'green', 
        color: 'green', 
        fontSize: 32, 
        fontWeight: '800', 
        padding: 10 
    },
    txtDisLike :{
        borderWidth: 1, 
        borderColor: 'red', 
        color: 'red', 
        fontSize: 32, 
        fontWeight: '800', 
        padding: 10
    },
    animatedLike:{
        position: 'absolute', 
        top: 50, 
        left: 40, 
        zIndex: 1000
    },
    animatedDisLike:{
        position: 'absolute', 
        top: 50, 
        right: 40,
        zIndex: 1000
    },
    rotate:{
        rotate: '-30deg'
    },
    img:{ 
        flex: 1,
        height: null, 
        width: null,
        resizeMode: 'cover', 
        borderRadius: 20 
    }
})

export default styles