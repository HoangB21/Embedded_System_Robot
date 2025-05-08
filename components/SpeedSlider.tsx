import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface SpeedSliderProps {
    speed: number;
    onSpeedChange: (value: number) => void;
}

const SpeedSlider: React.FC<SpeedSliderProps> = ({ speed, onSpeedChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Speed: {speed}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={9}
                step={1}
                value={speed}
                onValueChange={onSpeedChange}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#ccc"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '80%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
});

export default SpeedSlider;