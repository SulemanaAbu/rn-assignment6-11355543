import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCartItems = async () => {
            const items = await AsyncStorage.getItem('cart');
            if (items) setCartItems(JSON.parse(items));
        };
        loadCartItems();
    }, []);

    const removeFromCart = async (id) => {
        const updatedCart = cartItems.filter(item => item.id!== id);
        setCartItems(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Image source={require('../assets/Logo1.png')} style={{ width: 200, height: 90, alignSelf: 'center' }} />
                <TouchableOpacity>
                    <Image source={require('../assets/Search.png')} style={{ width: 24, height: 24, marginRight: 10 }} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.underline, { fontSize: 24, textAlign: 'center', marginVertical: 10 }]}>C H E C K O U T</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={item.image} style={{ width: 110, height: 150 }} />
                        </View>
                        <View style={{ flex: 2, marginLeft: 10 }}>
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Text style={{color :"orange", fontSize: 18}}>${item.price}</Text>
                            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={{ alignSelf: 'flex-end' }}>
                                <Image source={require('../assets/remove.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 24 }}>EST. TOTAL</Text>
                <Text style={{ fontSize: 24, color :"orange"}}>$240</Text>
            </View>
            <View style={{ backgroundColor: 'black', padding: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="bag" size={24} color="white" />
                    <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>CHECKOUT</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    underline: {
        textDecorationLine: 'underline',
    },
});

export default CartScreen;