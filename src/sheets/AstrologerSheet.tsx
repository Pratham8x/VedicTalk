import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'

interface AstrologerSheetRef {
  expand: () => void
  collapse: () => void
}

export const AstrologerSheet = React.forwardRef<AstrologerSheetRef, {}>(
  (_, ref) => {
    const snapPoints = [1, Dimensions.get('window').height * 0.55]

    React.useImperativeHandle(ref, () => ({
      expand: () => {
        // Bottom sheet ref can be used to control snap position
        // For now, users can swipe to expand
      },
      collapse: () => {
        // Bottom sheet can be swiped down to collapse
      },
    }))

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          <View style={styles.content}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>SM</Text>
              </View>
            </View>

            {/* Name and Title */}
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

            {/* Info Items */}
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Text style={styles.infoIconText}>♀</Text>
                </View>
                <Text style={styles.infoText}>21+ years of experience</Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Text style={styles.infoIconText}>🎓</Text>
                </View>
                <Text style={styles.infoText}>
                  B.A. Mathematical Honours, Hindu College
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Text style={styles.infoIconText}>👤</Text>
                </View>
                <Text style={styles.infoText}>37 years old</Text>
              </View>
            </View>

            {/* Additional spacing */}
            <View style={{ height: 16 }} />
          </View>
        </ScrollView>
      </BottomSheet>
    )
  }
)

AstrologerSheet.displayName = 'AstrologerSheet'

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
  },
  handleIndicator: {
    backgroundColor: '#CCCCCC',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFB84D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarInitials: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  dividerIcon: {
    marginHorizontal: 16,
    color: '#CCCCCC',
    fontSize: 14,
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD8A8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIconText: {
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
})