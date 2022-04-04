import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { initWorkouts, getWorkouts, clearWorkouts } from '../storage/workout';

const useCachedResources = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsunc() {
      try {
        await clearWorkouts();
        await initWorkouts();
        await Font.loadAsync({
          'montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
          'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        const workoutData = await getWorkouts();
        console.log('workout-data:', workoutData);

        setIsLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsunc();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
