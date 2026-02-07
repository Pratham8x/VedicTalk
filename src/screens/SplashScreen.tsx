import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SplashScreen({ navigation }: any) {
  const [loading] = React.useState(false)



  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Vedic Astrology</Text>
          <Text style={styles.subtitle}>
            Connect with the wisdom of the stars
          </Text>
        </View>

        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Chat")}
            activeOpacity={0.7}
            disabled={loading}
          >
              <Text style={styles.buttonText}>
                Chat with Vedic Astrologer - Sanjai Maharaj
              </Text>
          </TouchableOpacity>


        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FDB813',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FDB813',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  overlay: {
    padding: 20,
    gap: 12,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 8,
    minHeight: 56,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

})