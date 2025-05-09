import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import ControlButton from '../../components/ControlButton';
import SpeedSlider from '../../components/SpeedSlider';
import { useRobotControl } from '../../hooks/useRobotControl';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

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
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.headerGradient}
        >
          <Text style={styles.title}>Robot Control</Text>
        </LinearGradient>

        <View style={styles.container}>
          {/* Status Cards */}
          <View style={styles.statusContainer}>
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.statusRow}>
              {renderStatusCard('Distance', robotStatus?.distance ? `${robotStatus.distance.toFixed(2)} cm` : null)}
              {renderStatusCard('Action', robotStatus?.status ?? null)}
            </View>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>{error}</Text>
            </View>
          )}

          {/* Mode Selection */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Select Mode</Text>
            <View style={styles.modeButtonsContainer}>
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
          </View>

          {/* Speed Slider (only visible in WiFi control mode) */}
          {robotStatus?.mode === 1 && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Speed Control</Text>
              <View style={styles.sliderContainer}>
                <SpeedSlider speed={speed} onSpeedChange={handleSpeedChange} />
              </View>
            </View>
          )}

          {/* Control Pad (Directional Buttons) - only visible in WiFi control mode */}
          {robotStatus?.mode === 1 && (
            <View style={styles.sectionCard}>
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
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statusContainer: {
    marginTop: -20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#34495e',
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusCard: {
    backgroundColor: '#f8f9fa',
    padding: 14,
    borderRadius: 12,
    width: '48%',
    borderLeftWidth: 4,
    borderLeftColor: '#4c669f',
  },
  statusTitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  errorContainer: {
    marginBottom: 20,
  },
  error: {
    fontSize: 14,
    color: '#e74c3c',
    padding: 15,
    backgroundColor: '#fadbd8',
    width: '100%',
    borderRadius: 10,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  modeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modeButton: {
    flex: 1,
    backgroundColor: '#4c669f',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  modeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  activeMode: {
    backgroundColor: '#192f6a',
    borderLeftWidth: 6,
    borderLeftColor: '#e67e22',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
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
    backgroundColor: '#4c669f',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#3b5998',
  },
  stopButton: {
    backgroundColor: '#e74c3c',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  controlIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});