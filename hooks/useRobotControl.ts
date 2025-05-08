import { useState } from 'react';
import axios from 'axios';
import { ROBOT_API_URL } from '../constants/api';

// Define the robot status interface based on the updated API
interface RobotStatus {
    mode: number;          // 1: WiFi Control, 2: Obstacle Avoidance, 3: Follow
    mode_name: string;     // Human-readable mode name
    distance: number;      // Distance in cm
    speed: number;         // Current speed setting
    status: string;        // Current robot movement status
}

export const useRobotControl = () => {
    const [robotStatus, setRobotStatus] = useState<RobotStatus | null>(null);
    const [error, setError] = useState<string | null>(null);

    /**
     * Send a command to the robot
     * @param command The command to send (F, B, L, R, S, M1, M2, M3, etc.)
     */
    const sendCommand = async (command: string) => {
        try {
            // Handle mode changes
            if (command.startsWith('M')) {
                // New API format for mode changes
                const modeNumber = command.substring(1);
                await axios.get(`${ROBOT_API_URL}/mode?mode=${modeNumber}`);
                console.log(`Set mode to: ${modeNumber}`);
            } else {
                // Regular commands use the State parameter
                await axios.get(`${ROBOT_API_URL}/?State=${command}`);
                console.log(`Sent command: ${command}`);
            }

            // Fetch status after command to update UI
            setTimeout(fetchStatus, 200);
            setError(null);
        } catch (err) {
            console.error('Error sending command:', err);
            setError('Failed to send command. Check connection.');
        }
    };

    /**
     * Fetch the current status of the robot
     */
    const fetchStatus = async () => {
        try {
            // Use the new status endpoint
            const response = await axios.get(`${ROBOT_API_URL}/status`);

            if (response.data) {
                setRobotStatus(response.data);
            }

            setError(null);
        } catch (err) {
            console.error('Error fetching status:', err);
            setError('Failed to fetch status. Check connection.');
        }
    };

    return {
        sendCommand,
        fetchStatus,
        robotStatus,
        error
    };
};