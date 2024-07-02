import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {
    const navigation = useNavigation();
    const products = [
        {
            id: 1,
            name: 'Office Wear',
            description: 'Office wear for you office',
            price: 120,
            image: require('../assets/dress1.png'),
        },
        {
            id: 2,
            name: 'Black',
            description: 'reversible angora cardigan',
            price: 120,
            image: require('../assets/dress2.png'),
        },
        {
            id: 3,
            name: 'Church Wear',
            description: 'Recycle Boucle Knit Cardigan Pink',
            price: 120,
            image: require('../assets/dress3.png'),
        },
        {
            id: 4,
            name: 'Lamerei',
            description: 'Recycle Boucle Knit Cardigan Pink',
            price: 120,
            image: require('../assets/dress4.png'),
        },
        {
            id: 5,
            name: '21WN',
            description: 'reversible angora cardigan',
            price: 120,
            image: require('../assets/dress5.png'),
        },
        {
            id: 6,
            name: 'Lopo',
            description: 'reversible angora cardigan',
            price: 120,
            image: require('../assets/dress6.png'),
        },
    ];

    const addToCart = async (item) => {
        const cart = await AsyncStorage.getItem('cart');
        let cartItems = cart ? JSON.parse(cart) : [];
        cartItems.push(item);
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        navigation.navigate('Cart'); // Navigate to CartScreen
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 20 }}>
                <Image source={require('../assets/Menu.png')} style={{ width: 24, height: 24 }} />
                <Image source={require('../assets/Logo1.png')} style={{ width: 200, height: 90, alignSelf: 'center' }} />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <Image source={require('../assets/Search.png')} style={{ width: 24, height: 24, marginRight: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/shoppingBag.png')} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 10 }}>OUR STORY</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <Image source={require('../assets/Listview.png')} style={{ width: 24, height: 24, marginRight: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/Filter.png')} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ margin: 10 }}>
                        <Image source={item.image} style={{ width: 160, height: 200 }} />
                        <TouchableOpacity onPress={() => addToCart(item)}>
                            <Image source={require('../assets/add_circle.png')} />
                        </TouchableOpacity>
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text style={{color :"orange", fontSize: 18}}>${item.price}</Text>
                    </View>
                )}
                numColumns={2}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;