import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import MapView, {
  Callout,
  Circle,
  Marker,
  Overlay,
  PROVIDER_GOOGLE,
  Polygon,
  Polyline,
  UrlTile,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useState} from 'react';
import CustomCallout from '../components/CustomCallout';
import CustomMarker from '../components/CustomMarker';
import {locations} from '../assets/data/data';
import LocationCard from '../components/LocationCard';
import {colors} from '../styles/colors';
import Carousel from 'react-native-snap-carousel';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen-hooks';
import {
  darkMapStyle,
  retroMapStyle,
  silverMapStyle,
  standardStyle,
} from '../assets/mapStyle/MapStyles';

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

  const [initRegion, setinitRegion] = useState({});
  const [id, setid] = useState(0);
  const [place, setplace] = useState('');
  const [latitude, setlatitude] = useState(locations[0].latitude);
  const [longitude, setlongitude] = useState(locations[0].longitude);
  const [place1, setplace1] = useState('');
  const [latitude1, setlatitude1] = useState(0);
  const [longitude1, setlongitude1] = useState(0);
  const [customStyle, setcustomStyle] = useState(standardStyle);

  const [polygonArray, setpolygonArray] = useState([]);

  useEffect(() => {
    setinitRegion({
      longitudeDelta: 10,
      latitudeDelta: 10,
      latitude: latitude,
      longitude: longitude,
    });
  }, [place]);

  const styletabs = [
    {
      name: 'Standard Style',
      style: standardStyle,
    },
    {
      name: 'DarkMap Style',
      style: darkMapStyle,
    },
    {
      name: 'SilverMap Style',
      style: silverMapStyle,
    },
    {
      name: 'RetroMap Style',
      style: retroMapStyle,
    },
  ];

  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={customStyle}
        // mapType='hybrid'
        // ref={mapRef}
        // initialRegion={initRegion}
        style={{flex: 1}}
        region={initRegion}
        onPress={e => {
          setpolygonArray([
            ...polygonArray,
            {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            },
          ]);
        }}
        // onRegionChangeComplete={(reg)=>console.log(reg)}
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
        <Circle
          radius={100000}
          center={{latitude: latitude, longitude: longitude}}
          fillColor="rgba(236, 112, 99 ,0.5)"
          strokeColor={customStyle == darkMapStyle ? 'white' : 'black'}
        />

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
            anchor={{x: 0.1, y: 0.9}}
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
              color={
                item.id == id
                  ? colors.green
                  : customStyle == darkMapStyle
                  ? colors.white
                  : colors.black
              }
            />
            <Callout style={styles.callout} tooltip>
              <CustomCallout title={place} />
            </Callout>
          </Marker>
        ))}

        {/* <UrlTile
          urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
          maximumZ={0}
        /> */}

        {/* <Overlay
          bounds={[
            [18.9667, 72.8333],
            [28.66, 77.23],
          ]}
          image={require('../assets/images/noImg.png')}
        /> */}

        {/* <MapViewDirections
          apikey="AIzaSyCM5c9xL4o4KENma2knCl7bbASgss0j01c"
          destination={{latitude: 30.9083, longitude: 75.8486}}
          origin={{latitude: 18.9667, longitude: 72.8333}}
        /> */}

        <Polygon
          coordinates={
            polygonArray.length == 0
              ? [{latitude: 0, longitude: 0}]
              : polygonArray
          }
          fillColor='blue'
        />
      </MapView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.styleContainer}
        contentInset={{bottom: 0, top: 0, left: 10, right: 10}}>
        {styletabs.map(item => (
          <Tabs
            title={item.name}
            onPress={() => {
              setcustomStyle(item.style);
            }}
          />
        ))}
      </ScrollView>
      <View style={styles.locationContainer}>
        <Carousel
          firstItem={id}
          onSnapToItem={i => {
            // console.log(i);
            locations.map(item => {
              if (item.id == i) {
                setplace(item.title);
                setlatitude(item.latitude);
                setlongitude(item.longitude);
                setid(item.id);
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
      {/* <Button
        title={'Google api'}
        onPress={async () => {
          const res = await fetch(
            'https://maps.googleapis.com/maps/api/directions/json?origin=52.5200066,13.404954&destination=50.1109221,8.6821267&key=AIzaSyCM5c9xL4o4KENma2knCl7bbASgss0j01c',
          );
          const json = await res.json();
          console.log('res ; ', json);
        }}
      /> */}
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
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleContainer: {
    position: 'absolute',
    top: 30,
  },
});

export default MapScreen;
