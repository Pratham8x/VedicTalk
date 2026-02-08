import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native'

interface AstrologerSheetRef {
  expand: () => void
  collapse: () => void
}

export const AstrologerSheet = forwardRef<AstrologerSheetRef, {}>(
  (_, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const { height: screenHeight } = Dimensions.get('window')

    const expand = () => setIsVisible(true)
    const collapse = () => setIsVisible(false)

    useImperativeHandle(ref, () => ({
      expand,
      collapse,
    }))

    return (
      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={collapse}
      >
        <Pressable style={styles.backdrop} onPress={collapse}>
          <View style={[styles.sheetWrapper, { height: screenHeight * 0.55 }]}>
            <SafeAreaView style={styles.safeArea}>
              <Pressable
                style={styles.sheetContainer}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={styles.handle} />

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.content}
                >
                  {/* Avatar */}
                  <View style={styles.avatarContainer}>
                    <Image
                      source={require('../../assets/Astro.webp')}
                      style={styles.avatar}
                    />
                  </View>

                  {/* Name */}
                  <Text style={styles.name}>Sanjai Maharaj</Text>

                  <Text style={styles.description}>
                    Krishnamurti Paddhatti system of Astrology with spiritual guidance
                  </Text>

                  {/* Divider */}
                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerIcon}>✦</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Info */}
                  <View style={styles.infoCard}>
                    <InfoRow icon="✨" text="21+ years of experience" />
                    <InfoRow
                      icon="🎓"
                      text="B.A. Mathematical Honours, Hindu College"
                    />
                    <InfoRow icon="👤" text="37 years old" />
                  </View>
                </ScrollView>
              </Pressable>
            </SafeAreaView>
          </View>
        </Pressable>
      </Modal>
    )
  }
)

const InfoRow = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIcon}>
      <Text>{icon}</Text>
    </View>
    <Text style={styles.infoText}>{text}</Text>
  </View>
)

AstrologerSheet.displayName = 'AstrologerSheet'

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(245, 242, 242, 0.45)',
    justifyContent: 'flex-end',
  },
  sheetWrapper: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 22,
    marginBottom: 12,
    overflow: 'hidden',
  },
  safeArea: { flex: 1 },
  sheetContainer: { flex: 1 },
  handle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DDD',
    alignSelf: 'center',
    marginVertical: 8,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },

  /* Avatar */
  avatarContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },

  /* Text */
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
  },

  description: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
  },

  /* Divider */
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEE',
  },
  dividerIcon: {
    marginHorizontal: 14,
    color: '#CCC',
  },

  /* Info Card */
  infoCard: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    padding: 18,
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE1B5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
})
