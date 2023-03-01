import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useState} from 'react';
import CustomCallout from '../components/CustomCallout';
import CustomMarker from '../components/CustomMarker';
import {locations} from '../assets/data/data';
import LocationCard from '../components/LocationCard';
import {colors} from '../styles/colors';
import Carousel from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,  
} from 'react-native-responsive-screen-hooks';
import { darkMapStyle, retroMapStyle, silverMapStyle, standardStyle } from '../assets/mapStyle/MapStyles';

const Tabs = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.tab}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MapScreen = () => {
  // const mapRef = useRef(null);

  const [initRegion, setinitRegion] = useState({
    latitude: 25,
    longitude: 82,
    latitudeDelta: 50,
    longitudeDelta: 50,
  });
  const [id, setid] = useState(1);
  const [place, setplace] = useState('');
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [place1, setplace1] = useState('');
  const [latitude1, setlatitude1] = useState(0);
  const [longitude1, setlongitude1] = useState(0);
  const [customStyle, setcustomStyle] = useState(standardStyle);


  useEffect(() => {
    setinitRegion({
      latitudeDelta: 30,
      longitudeDelta: 30,
      latitude: latitude,
      longitude: longitude,
    });
  }, [place]);


  const styletabs = [
    {
      name: 'standardStyle',
      style: standardStyle,
    },
    {
      name: 'darkMapStyle',
      style: darkMapStyle,
    },
    {
      name: 'silverMapStyle',
      style: silverMapStyle,
    },
    {
      name: 'retroMapStyle',
      style: retroMapStyle,
    },
  ];
  

  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={customStyle}
        // ref={mapRef}
        // initialRegion={initRegion}
        style={{flex: 1}}
        region={initRegion}
        // onPoiClick={e => {
        //   console.log(e.nativeEvent);
        //   if (latitude == 0 && longitude == 0) {
        //     setlatitude(e.nativeEvent.coordinate.latitude);
        //     setlongitude(e.nativeEvent.coordinate.longitude);
        //     setplace(e.nativeEvent.name);
        //   } else {
        //     setlatitude1(e.nativeEvent.coordinate.latitude);
        //     setlongitude1(e.nativeEvent.coordinate.longitude);
        //     setplace1(e.nativeEvent.name);
        //   }
        // }}
      >
        {/* <Polyline
          //   lineCap='square'
          strokeColor="blue"
          strokeWidth={4}
          coordinates={[
            {latitude: latitude, longitude: longitude},
            {latitude: latitude1, longitude: longitude1},
          ]}
        /> */}

        {locations.map(item => (
          <Marker
            draggable
            coordinate={{latitude: item.latitude, longitude: item.longitude}}
            title={item.title}
            // onDragEnd={e => {
            //   console.log(e.nativeEvent.coordinate);
            //   setlatitude(e.nativeEvent.coordinate.latitude);
            //   setlongitude(e.nativeEvent.coordinate.longitude);
            //   setplace(e.nativeEvent.name ? e.nativeEvent.name : 'Unknown');
            // }}
          >
            <CustomMarker
              color={item.id == id ? colors.primary_color : colors.black}
            />
            <Callout style={styles.callout} tooltip>
              <CustomCallout title={place} />
            </Callout>
          </Marker>
        ))}
      </MapView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.styleContainer}>{styletabs.map((item)=><Tabs title={item.name} onPress={()=>{
        setcustomStyle(item.style)
      }}/>)}</ScrollView>
      <View style={styles.locationContainer}>
        <Carousel
          onSnapToItem={i => {
            setid(i + 1);
            console.log(i);
            locations.map(item => {
              if (item.id == id) {
                setinitRegion({
                  ...initRegion,
                  latitude: item.latitude,
                  longitude: item.longitude,
                });
              }
            });
          }}
          data={locations}
          renderItem={({item}) => (
            <LocationCard
              item={item}
              onPress={() => {
                setplace(item.title);
                setlatitude(item.latitude);
                setlongitude(item.longitude);
                setid(item.id);
              }}
            />
          )}
          sliderWidth={wp('100')}
          itemWidth={wp('80')}
        />
      </View>
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  callout: {
    // flex: 1,
  },
  locationContainer: {
    position: 'absolute',
    bottom: 10,
  },
  tab: {
    padding: 10,
    borderWidth: 0.3,
    margin: 10,
    borderRadius:20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleContainer:{
    position:'absolute',
    top:30
  }
});

export default MapScreen;
