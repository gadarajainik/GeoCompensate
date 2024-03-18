import React, {useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Searchbar} from 'react-native-paper';
import {searchPlace} from './services/maps';

const FixedLocationComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [address, setAddress] = useState([]);
  const fixedLocation = {
    latitude: 32.7222,
    longitude: -97.1152,
  }; // Replace with your fixed location

  useEffect(() => {
    // Get the current location
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log({latitude, longitude});
          setCurrentLocation({latitude, longitude});
        },
        error => {
          console.error(error.message);
        },
        {enableHighAccuracy: true},
      );
    };

    // Get the current location when the component mounts
    getCurrentLocation();

    // Set up a timer to get the current location periodically (adjust the interval as needed)
    const locationInterval = setInterval(getCurrentLocation, 5000);

    // Clean up on component unmount
    return () => {
      clearInterval(locationInterval);
    };
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const isApproximatelyEqual = () => {
    if (currentLocation) {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        fixedLocation.latitude,
        fixedLocation.longitude,
      );

      // You can adjust the threshold distance based on your requirements
      const thresholdDistance = 0.5; // in kilometers
      console.log(distance);
      return distance <= thresholdDistance;
    }

    return false;
  };

  const onSearchTextChange = async query => {
    setSearchQuery(query);
    const res = await searchPlace(query);
    let places = res && res.places ? res.places : [];
    setAddress(places);
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentLocation && (
        <Text>
          Current Location: {currentLocation.latitude},{' '}
          {currentLocation.longitude}
        </Text>
      )}
      <Text>
        {isApproximatelyEqual()
          ? 'You are approximately at the fixed location.'
          : 'You are not at the fixed location.'}
      </Text>
      <Searchbar
        placeholder="Search!!"
        onChangeText={onSearchTextChange}
        value={searchQuery}
      />
      {/* <SafeAreaView>
        {address.map(item => {
          <Text>
            {item.shortFormattedAddress}, {item.location.latitude} -
            {item.location.longitude}
          </Text>;
        })}
      </SafeAreaView> */}
      <FlatList
        data={address}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <Text>
            {item.shortFormattedAddress}, {item.location.latitude} -
            {item.location.longitude}
          </Text>
        )}
      />
      {/* <ScrollView style={styles.scrollView}>
        <FlatList
          data={address}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.shortFormattedAddress}, {item.location.latitude} -
              {item.location.longitude}
            </Text>
          )}
        />
        {address.map(item => {
          <Text>
            {item.shortFormattedAddress}, {item.location.latitude} -
            {item.location.longitude}
          </Text>;
        })}
      </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default FixedLocationComponent;
