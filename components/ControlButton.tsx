import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ControlButtonProps {
    title: string;
    command: string;
    isChangeMode: boolean;
    sendCommand: (cmd: string) => void;
    color?: string;
    style?: any;
}

const ControlButton: React.FC<ControlButtonProps> = ({ title, command, sendCommand, isChangeMode, color = '#007AFF', style }) => {

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }, style]}
            onPressIn={() => {
                sendCommand(command);
            }}
            onPressOut={() => {
                if (!isChangeMode) {
                    sendCommand('S'); // Stop command
                }
            }}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 50, // Circular button
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ControlButton;