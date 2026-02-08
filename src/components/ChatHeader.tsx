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
import { useNavigation } from '@react-navigation/native' // Import useNavigation

interface ChatHeaderProps {
  onBackPress?: () => void // Make it optional
  onMenuPress: () => void
  onAstroPress: () => void
  astrologerName?: string
  astrologerTitle?: string
  astrologerImage?: ImageSourcePropType
  showBackButton?: boolean
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onMenuPress,
  onAstroPress,
  astrologerName = 'Sanjai Maharaj',
  astrologerTitle = 'Vedic Astrologer',
  showBackButton = true,
}) => {
  const navigation = useNavigation() 

  const handleBackPress = () => {
  
      navigation.navigate('Splash' as never) 
    
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Back Button */}
        {showBackButton && (
          <Pressable 
            onPress={handleBackPress} // Use the handler
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 15, left: 10, right: 10 }}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        )}

        {/* Rest of your component remains the same */}
        <Pressable
          onPress={onAstroPress}
          style={[styles.astroInfo, !showBackButton && styles.astroInfoExpanded]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/Astro.webp')}
              style={styles.astrologerImage}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {astrologerName}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {astrologerTitle}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={onMenuPress}
          style={styles.menuButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.menuIcon}>𝍄</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

// Styles remain the same
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
    marginTop:10
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 19,
  },
  backIcon: {
    fontSize: 35,
    color: '#333',
    fontWeight: '600',
    alignSelf: "center",
    marginTop:-7
  },
  astroInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  astroInfoExpanded: {
    paddingLeft: 0,
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
  astrologerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
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