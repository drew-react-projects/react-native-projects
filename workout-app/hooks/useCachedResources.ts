import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { storeData, getData, containsKey } from '../storage';
import data from '../data.json';

const useCachedResources = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsunc() {
      try {
        if (!containsKey('workout-data')) {
          await console.log('Storing workout-data ...');
          await storeData('workout-data', data);
        }
        await Font.loadAsync({
          montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
          'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        const workoutData = await getData('workout-data');
        console.log('workout-data:', workoutData);

        setIsLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsunc();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
