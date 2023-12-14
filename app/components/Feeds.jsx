import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import FeedDetail from './FeedDetail'

const Feeds = ({feeds}) => {
  return (
    <View style={tw`flex-row flex-wrap items-center justify-center`}>
      {feeds?.length > 0 ? (
        <>
          {feeds?.map((item, i) => (
              <FeedDetail key={i} data={item} />
            ))}
        </>
      ) : (
        <View style={tw`w-full h-64 flex items-center justify-center`}>
          <ActivityIndicator size="large" color="teal" />
          <Text>No Data</Text>
        </View>
      )}
    </View>
  )
}

export default Feeds

