import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  ImageSourcePropType,
} from 'react-native'

interface ChatHeaderProps {
  onBackPress: () => void
  onMenuPress: () => void
  onAstroPress: () => void
  astrologerName?: string
  astrologerTitle?: string
  astrologerImage?: ImageSourcePropType
  showBackButton?: boolean
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onBackPress,
  onMenuPress,
  onAstroPress,
  astrologerName = 'Sanjai Maharaj',
  astrologerTitle = 'Vedic Astrologer',
  showBackButton = true,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Back Button */}
        {showBackButton && (
          <Pressable 
            onPress={onBackPress} 
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        )}

        {/* Astrologer Info */}
        <Pressable
          onPress={onAstroPress}
          style={[styles.astroInfo, !showBackButton && styles.astroInfoExpanded]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {/* Avatar/Image Container */}
          <View style={styles.avatarContainer}>
              <Image
                source={require('../../assets/Astro.webp')}
                style={styles.astrologerImage}
              />
     
          </View>

          {/* Name and Title */}
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {astrologerName}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {astrologerTitle}
            </Text>
          </View>
        </Pressable>

        {/* Menu Button */}
        <Pressable
          onPress={onMenuPress}
          style={styles.menuButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.menuIcon}>⋯</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 70,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 28,
    color: '#333',
    fontWeight: '600',
  },
  astroInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  astroInfoExpanded: {
    paddingLeft: 0, // More space when back button is hidden
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    backgroundColor: '#FFB84D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  astrologerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  menuIcon: {
    fontSize: 24,
    color: '#999',
    fontWeight: '600',
  },
})