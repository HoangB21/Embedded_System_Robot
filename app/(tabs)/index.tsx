import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ControlButton from '../../components/ControlButton';
import SpeedSlider from '../../components/SpeedSlider';
import { useRobotControl } from '../../hooks/useRobotControl';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { sendCommand, fetchStatus, robotStatus, error } = useRobotControl();
  const [speed, setSpeed] = useState(5);

  // Fetch status periodically
  useEffect(() => {
    // Initial fetch
    fetchStatus();
  }, []);

  const handleSpeedChange = (value: number) => {
    setSpeed(value);
    sendCommand(value.toString());
  };

  const setMode = (newMode: number) => {
    sendCommand(`M${newMode}`);
  };

  const modeNames = ['WiFi Control', 'Obstacle Avoidance', 'Follow'];

  // Helper function to render status cards
  const renderStatusCard = (title: string, value: string | number | null) => (
    <View style={styles.statusCard}>
      <Text style={styles.statusTitle}>{title}</Text>
      <Text style={styles.statusValue}>{value ?? 'N/A'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Robot Control</Text>

        {/* Status Cards */}
        <View style={styles.statusRow}>
          {renderStatusCard('Distance', robotStatus?.distance ? `${robotStatus.distance.toFixed(2)} cm` : null)}
          {renderStatusCard('Status', robotStatus?.status)}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        {/* Mode Selection */}
        <Text style={styles.sectionTitle}>Select Mode</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              robotStatus?.mode === 1 && styles.activeMode
            ]}
            onPress={() => setMode(1)}
          >
            <Text style={styles.modeButtonText}>WiFi Control</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeButton,
              robotStatus?.mode === 2 && styles.activeMode
            ]}
            onPress={() => setMode(2)}
          >
            <Text style={styles.modeButtonText}>Obstacle Avoidance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeButton,
              robotStatus?.mode === 3 && styles.activeMode
            ]}
            onPress={() => setMode(3)}
          >
            <Text style={styles.modeButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Speed Slider (only visible in WiFi control mode) */}
        {robotStatus?.mode === 1 && (
          <>
            <Text style={styles.sectionTitle}>Speed Control</Text>
            <SpeedSlider speed={speed} onSpeedChange={handleSpeedChange} />
          </>
        )}

        {/* Control Pad (Directional Buttons) - only visible in WiFi control mode */}
        {robotStatus?.mode === 1 && (
          <>
            <Text style={styles.sectionTitle}>Direction Control</Text>
            <View style={styles.controlPad}>
              {/* Advanced Controls Row 1 */}
              <View style={styles.row}>
                <ControlButton
                  title="Forward Left"
                  command="G"
                  isChangeMode={false}
                  sendCommand={sendCommand}
                  style={styles.controlButton}
                />
                <ControlButton
                  title="Forward"
                  command="F"
                  isChangeMode={false}
                  sendCommand={sendCommand}
                  style={[styles.controlButton, styles.primaryButton]}
                />
                <ControlButton
                  title="Forward Right"
                  command="I"
                  isChangeMode={false}
                  sendCommand={sendCommand}
                  style={styles.controlButton}
                />
              </View>

              {/* Main Controls Row */}
              <View style={styles.row}>
                <ControlButton
                  title="Left"
                  command="L"
                  isChangeMode={false}
                  sendCommand={sendCommand}
                  style={[styles.controlButton, styles.primaryButton]}
                />
                <ControlButton
                  title="Stop"
                  command="S"
                  isChangeMode={false}
                  sendCommand={sendCommand}
                  style={[styles.controlButton, styles.stopButton]}
                />
                <ControlButton
                  title="Right"
                  command="R"
                  isChangeMode={false}
                  sendCommand={sendCommand}
                  style={[styles.controlButton, styles.primaryButton]}
                />
              </View>

              {/* Advanced Controls Row 2 */}
              <View style={styles.row}>
                <ControlButton
                  title="Back Left"
                  command="H"
                  isChangeMode={false}
                  sendCommand={sendCommand}
                  style={styles.controlButton}
                />
                <ControlButton
                  title="Backward"
                  command="B"
                  isChangeMode={false}
                  sendCommand={sendCommand}
                  style={[styles.controlButton, styles.primaryButton]}
                />
                <ControlButton
                  title="Back Right"
                  command="J"
                  isChangeMode={false}
                  sendCommand={sendCommand}
                  style={styles.controlButton}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 15,
    marginBottom: 10,
    color: '#34495e',
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  statusCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  error: {
    fontSize: 14,
    color: '#e74c3c',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fadbd8',
    width: '100%',
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  modeButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  modeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activeMode: {
    backgroundColor: '#e67e22',
  },
  controlPad: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 6,
    width: '100%',
  },
  controlButton: {
    margin: 5,
    backgroundColor: '#3498db',
  },
  primaryButton: {
    backgroundColor: '#2980b9',
  },
  stopButton: {
    backgroundColor: '#e74c3c',
  },
});