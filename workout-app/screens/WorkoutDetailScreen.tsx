import { View, Text, StyleSheet } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import useWorkoutBySlug from '../hooks/useWorkoutBySlug';
import CustomModal from '../components/styled/CustomModal';
import PressableText from '../components/styled/PressableText';
import { formatSec } from '../utils/time';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import WorkoutItem from '../components/WorkoutItem';
import { SequenceItem } from '../types/data';
import { useCountDown } from '../hooks/useCountDown';

type NavigateParams = {
  route: {
    params: {
      slug: string;
    };
  };
};

type DetailNavigation = NativeStackHeaderProps & NavigateParams;

const WorkoutDetailScreen = ({ route }: DetailNavigation) => {
  // if you place this line below useWorkoutBySlug(), there will be an error: the hook is renderred more time than the previous render
  // const [isModalVisible, setModalVisible] = useState(false);

  // use hook to get workout data based on slug
  const workoutBySlug = useWorkoutBySlug(route.params.slug);

  // state to keep track of sequence belonging to that particular workout
  const [sequence, setSequence] = useState<SequenceItem[]>([]);

  // state to keep track of current index of current sequence item
  const [idxTracker, setIdxTracker] = useState(-1);

  // useCountDown hook usage
  const countDown = useCountDown(
    idxTracker,
    // if idx is the valid array index (starting from 0), return duration otherwise -1
    idxTracker >= 0 ? sequence[idxTracker].duration : -1
  );

  // method to add item to sequence
  const addItemToSequence = (idx: number) => {
    // concat new item to sequence array for counting down
    setSequence([...sequence, workoutBySlug!.sequence[idx]]);

    // update current idx of current sequence item
    setIdxTracker(idx);
  };

  if (!workoutBySlug) return null;

  return (
    <View style={styles.container}>
      {/* use ? because workoutBySlug might be undefined */}
      {/* <Text style={styles.header}>{workoutBySlug.name}</Text> */}
      <WorkoutItem item={workoutBySlug} childStyles={{ marginTop: 10 }}>
        <CustomModal
          activator={({ handleOpen }) => (
            <PressableText onPress={handleOpen} text="Check Sequence" />
          )}
        >
          <View>
            {workoutBySlug.sequence.map((sqItem, idx) => (
              <View key={sqItem.slug} style={styles.sequenceItem}>
                <Text>
                  {sqItem.name} - {sqItem.type} - {formatSec(sqItem.duration)}
                </Text>
                {idx !== workoutBySlug.sequence.length - 1 && (
                  <FontAwesome name="arrow-down" size={20} />
                )}
              </View>
            ))}
          </View>
        </CustomModal>
      </WorkoutItem>
      <View>
        {sequence.length === 0 && (
          <FontAwesome
            name="play-circle-o"
            size={80}
            onPress={() => addItemToSequence(0)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sequenceItem: {
    alignItems: 'center',
  },
});

export default WorkoutDetailScreen;
