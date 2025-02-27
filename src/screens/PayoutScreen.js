import { useNetInfo } from '@react-native-community/netinfo';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { selectorFamily, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { getPayouts } from '../Api';
import { payoutsRequestIDState } from '../Atoms';
import LoadingComponent from '../components/LoadingComponent';
import PressableCard from '../components/PressableCard';
import { convertMojoToChia } from '../utils/Formatting';
import CustomCard from '../components/CustomCard';

const useRefresh = () => {
  const setRequestId = useSetRecoilState(payoutsRequestIDState());
  return () => setRequestId((id) => id + 1);
};

const query = selectorFamily({
  key: 'payouts',
  get:
    () =>
    async ({ get }) => {
      get(payoutsRequestIDState());
      const response = await getPayouts();
      if (response.error) {
        throw response.error;
      }
      return response;
    },
});

const Item = ({ item, theme, t }) => (
  <CustomCard
    style={{ padding: 8, display: 'flex', marginHorizontal: 8, marginVertical: 2 }}
    onTap={() => {}}
  >
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <Text numberOfLines={1} style={[styles.title, { color: theme.colors.textGrey }]}>
        {t('amount')}
      </Text>
      <Text numberOfLines={1} style={[styles.val, { fontWeight: 'bold' }]}>{`${convertMojoToChia(
        item.amount
      )} XCH`}</Text>
    </View>
    <View style={{ flexDirection: 'row', paddingTop: 8 }}>
      <Text numberOfLines={1} style={[styles.title, { color: theme.colors.textGrey }]}>
        {t('id')}
      </Text>
      <Text numberOfLines={1} style={styles.val}>
        {item.id}
      </Text>
    </View>
    <View style={{ flexDirection: 'row', paddingTop: 8 }}>
      <Text numberOfLines={1} style={[styles.title, { color: theme.colors.textGrey }]}>
        {t('date')}
      </Text>
      <Text numberOfLines={1} style={styles.val}>
        {format(new Date(item.datetime), 'PPpp')}
      </Text>
    </View>
  </CustomCard>
);

const PayoutScreen = () => {
  const refresh = useRefresh();
  const payoutsLoadable = useRecoilValueLoadable(query());
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const netInfo = useNetInfo();
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (payoutsLoadable.state === 'hasValue') {
      setData(payoutsLoadable.contents.results);
      setRefreshing(false);
    }
  }, [payoutsLoadable]);

  const renderItem = ({ item, index }) => <Item item={item} rank={index} theme={theme} t={t} />;

  if (payoutsLoadable.state === 'loading' && !refreshing) {
    return <LoadingComponent />;
  }

  if (payoutsLoadable.state === 'hasError') {
    return (
      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 20, textAlign: 'center', paddingBottom: 16 }}>
          Cant Connect to Network
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            if (netInfo.isConnected) refresh();
          }}
        >
          Retry
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 6 }}
        ListHeaderComponent={<View style={{ paddingTop: 6 }} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refresh();
            }}
          />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    marginEnd: 8,
  },
  val: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
});

export default PayoutScreen;
