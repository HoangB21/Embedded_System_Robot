import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.headerGradient}
      >
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.mainTitle}>How to Use the App</ThemedText>
        </View>
      </LinearGradient>

      <View style={styles.container}>
        {/* Introduction */}
        <View style={styles.introCard}>
          <ThemedText style={styles.introText}>
            Welcome to the Robot Controller App! This app allows you to control your robot via WiFi. Follow the steps below to get started.
          </ThemedText>
        </View>

        {/* Step 1: Connect to the Robot */}
        <View style={styles.card}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumberContainer}>
              <ThemedText style={styles.stepNumber}>1</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Connect to the Robot
            </ThemedText>
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.sectionText}>
              Ensure your device is connected to the same WiFi network as the robot. The app will communicate with the robot over this network.
            </ThemedText>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: "/api/placeholder/100/100" }}
                style={styles.stepIcon}
                alt="Connect icon"
              />
            </View>
          </View>
        </View>

        {/* Step 2: Select a Mode */}
        <View style={styles.card}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumberContainer}>
              <ThemedText style={styles.stepNumber}>2</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Select a Mode
            </ThemedText>
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.sectionText}>
              Use the "Mode Selection" section to choose one of the following modes:
            </ThemedText>
            <View style={styles.modeContainer}>
              <View style={styles.modeCard}>
                <ThemedText type="defaultSemiBold" style={styles.modeTitle}>WiFi Control:</ThemedText>
                <ThemedText style={styles.modeDescription}>Directly control the robot's movement.</ThemedText>
              </View>
              <View style={styles.modeCard}>
                <ThemedText type="defaultSemiBold" style={styles.modeTitle}>Obstacle Avoidance:</ThemedText>
                <ThemedText style={styles.modeDescription}>The robot will automatically avoid obstacles.</ThemedText>
              </View>
              <View style={styles.modeCard}>
                <ThemedText type="defaultSemiBold" style={styles.modeTitle}>Follow:</ThemedText>
                <ThemedText style={styles.modeDescription}>The robot will follow a target.</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Step 3: Adjust Speed */}
        <View style={styles.card}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumberContainer}>
              <ThemedText style={styles.stepNumber}>3</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Adjust Speed
            </ThemedText>
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.sectionText}>
              In "WiFi Control" mode, use the speed slider to adjust the robot's speed. Slide to the right to increase speed or to the left to decrease it.
            </ThemedText>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: "/api/placeholder/100/100" }}
                style={styles.stepIcon}
                alt="Speed icon"
              />
            </View>
          </View>
        </View>

        {/* Step 4: Control the Robot */}
        <View style={styles.card}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumberContainer}>
              <ThemedText style={styles.stepNumber}>4</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Control the Robot
            </ThemedText>
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.sectionText}>
              Use the directional buttons to move the robot:
            </ThemedText>
            <View style={styles.controlGrid}>
              <View style={[styles.controlButton, { width: '32%' }]}>
                <ThemedText type="defaultSemiBold">Forward Left</ThemedText>
              </View>
              <View style={[styles.controlButton, { width: '32%' }]}>
                <ThemedText type="defaultSemiBold">Forward</ThemedText>
              </View>
              <View style={[styles.controlButton, { width: '32%' }]}>
                <ThemedText type="defaultSemiBold">Forward Right</ThemedText>
              </View>
              <View style={[styles.controlButton, { width: '32%' }]}>
                <ThemedText type="defaultSemiBold">Left</ThemedText>
              </View>
              <View style={[styles.controlButton, { width: '32%' }]}>
                <ThemedText type="defaultSemiBold">Stop</ThemedText>
              </View>
              <View style={[styles.controlButton, { width: '32%' }]}>
                <ThemedText type="defaultSemiBold">Right</ThemedText>
              </View>
              <View style={[styles.controlButton, { width: '32%' }]}>
                <ThemedText type="defaultSemiBold">Backward Left</ThemedText>
              </View>
              <View style={[styles.controlButton, { width: '32%' }]}>
                <ThemedText type="defaultSemiBold">Backward</ThemedText>
              </View>
              <View style={[styles.controlButton, { width: '32%' }]}>
                <ThemedText type="defaultSemiBold">Backward Right</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Troubleshooting */}
        <View style={[styles.card, styles.troubleshootingCard]}>
          <View style={styles.stepHeader}>
            <ThemedText type="defaultSemiBold" style={styles.troubleshootingTitle}>
              Troubleshooting
            </ThemedText>
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.sectionText}>
              If you encounter any issues, ensure that:
            </ThemedText>
            <View style={styles.troubleshootingItem}>
              <View style={styles.bulletDot} />
              <ThemedText style={styles.bulletText}>
                Your device is connected to the correct WiFi network.
              </ThemedText>
            </View>
            <View style={styles.troubleshootingItem}>
              <View style={styles.bulletDot} />
              <ThemedText style={styles.bulletText}>
                The robot is powered on and connected to the network.
              </ThemedText>
            </View>
            <View style={styles.troubleshootingItem}>
              <View style={styles.bulletDot} />
              <ThemedText style={styles.bulletText}>
                The app has the necessary permissions to access the network.
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginBottom: 50,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  introCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: -20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  introText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fafafa',
  },
  stepNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4c669f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
  },
  cardContent: {
    padding: 16,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  modeContainer: {
    marginTop: 16,
  },
  modeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4c669f',
  },
  modeTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
    color: '#666',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  stepIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  controlGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  controlButton: {
    width: '48%',
    backgroundColor: '#4c669f',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  troubleshootingCard: {
    backgroundColor: '#fff8e1',
  },
  troubleshootingTitle: {
    fontSize: 18,
    color: '#ff6f00',
  },
  troubleshootingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6f00',
    marginTop: 7,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});