import { StyleSheet } from 'react-native'

export const S = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131016',
    padding: 24
  },

  eventName: {
    color: 'FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 48
  },
  eventDate: {
    color: '#6B6B6B',
    fontSize: 16
  },

  input: {
    backgroundColor: '#1F1E25',
    height: 56,
    borderRadius: 5,
    color: '#FFFFFF',
    padding: 16,
    fontSize: 16
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 24
  },

  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: "#31cf67",
    alignItems: 'center',
    justifyContent: "center"
  }
})
