import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { ListItemView } from './ListITemView';
import { useYoutubeData } from './useYoutubeData';
export const ListView : React.FC = () => {
    const {data, loadData, loadMoredata} = useYoutubeData();

    useEffect(() => {
        loadData();
    },[loadData]);

    return (
     <FlatList data={data} renderItem={({item}) => <ListItemView item={item} /> }
     onEndReached={loadMoredata}
     onEndReachedThreshold={0.1}
     />
    );
};
