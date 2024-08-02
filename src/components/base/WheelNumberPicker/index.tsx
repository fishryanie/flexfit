import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

export const WheelPicker = props => {
  const {
    height = 40,
    selectedTextStyle,
    unselectedTextStyle,
    infiniteScroll = true,
    selectedValue,
    onValueChange,
    data = [],
  } = props;

  //makes array infinite(not truly infinite) (array.length >= 3 required)
  const [dataArray] = useState(infiniteScroll ? [...data.slice(data.length - 3), ...data, ...data.slice(0, 3)] : data);
  const [value, setValue] = useState(selectedValue);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!onValueChange) {
      return;
    }
    onValueChange(value);
  }, [value]);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    viewableItems[0]?.item && setValue(viewableItems[0].item.value);
    if (infiniteScroll) {
      if (viewableItems[0]?.index && viewableItems[0].index <= 2) {
        flatListRef.current?.scrollToIndex({
          animated: false,
          index: dataArray.length - 4,
        });
      } else if (viewableItems[0]?.index && viewableItems[0].index >= dataArray.length - 2) {
        flatListRef.current?.scrollToIndex({
          animated: false,
          index: 4,
        });
      }
    }
  }, []);
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {viewAreaCoveragePercentThreshold: 50},
      onViewableItemsChanged: onViewableItemsChanged,
    },
  ]);

  return (
    <View>
      <View style={{width: height * 1.2, height: height}}>
        <FlatList
          data={dataArray}
          pagingEnabled
          initialScrollIndex={infiniteScroll ? selectedValue + 3 : selectedValue}
          getItemLayout={(data, index) => ({
            length: 40,
            offset: 40 * index,
            index,
          })}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={height}
          scrollEventThrottle={16}
          decelerationRate="normal"
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs?.current}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={[{height: height}]}>
                {item.value === value ? (
                  <Text style={[selectedTextStyle]}>{item.label}</Text>
                ) : (
                  <Text style={[unselectedTextStyle]}>{item.label}</Text>
                )}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
