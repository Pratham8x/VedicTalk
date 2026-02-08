import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 12,
    position: 'relative',
  },
  userRow: {
    alignItems: 'flex-end',
  },
  bubbleWrapper: {
  maxWidth: '80%',
},

metaRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
},

metaUser: {
  alignSelf: 'flex-end',
},

metaAstro: {
  alignSelf: 'flex-start',
},

timestamp: {
  fontSize: 11,
  color: '#999',
},

tickContainer: {
  flexDirection: 'row',
  marginLeft: 8,
},

checkmark: {
  fontSize: 11,
  color: '#4FC3F7',
  marginLeft: -4,
},

  astroRow: {
    alignItems: 'flex-start',
  },
  bubbleContainer: {
    maxWidth: '75%',
  },
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#FFD8A8',
  },
  astroBubble: {
    backgroundColor: '#F1F1F1',
  },
  quotedMessageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingVertical: 6,
  },
  quoteBar: {
    width: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginRight: 8,
    borderRadius: 1.5,
  },
  quoteContent: {
    flex: 1,
  },
  quotedText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#333',
  },
  astroText: {
    color: '#333',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'flex-end',
  },

  replyIconContainer: {
    position: 'absolute',
    right: '78%',
    top: '50%',
    transform: [{ translateY: -10 }],
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  replyIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  replyText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
})