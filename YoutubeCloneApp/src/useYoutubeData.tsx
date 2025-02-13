import React, { useCallback, useState } from "react";
import { TypeListItem } from "./TypeListItem";
import axios from 'axios';

type TypeVideoListResponse = {
    kind: 'youtube#videoListResponse';
    etag: string;
    nextPageToken: string;
    prevPageToken: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: {
      kind: 'youtube#video';
      etag: string;
      id: string;
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
          [key: string]: {
            url: string;
            width: number;
            height: number;
          };
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
      };
      contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        regionRestriction: {
          allowed: [string];
          blocked: [string];
        };
        contentRating: {
          mpaaRating: string;
          tvpgRating: string;
          bbfcRating: string;
          chvrsRating: string;
          eirinRating: string;
          cbfcRating: string;
          fmocRating: string;
          icaaRating: string;
          acbRating: string;
          oflcRating: string;
          fskRating: string;
          kmrbRating: string;
          djctqRating: string;
          russiaRating: string;
          rtcRating: string;
          ytRating: string;
        };
      };
      statistics: {
        viewCount: number;
        likeCount: number;
        dislikeCount: number;
        favoriteCount: number;
        commentCount: number;
      };
    }[];
  };

const axiosInstance = axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3',

});

const API_KEY = 'AIzaSyBoPKC-_SjNRZyhclAjw3ykb8_89VI7xZQ';
export const useYoutubeData = () => {
    const [data, setData] = useState<TypeListItem[]>([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [nextPageCursor, setNextPageCursor] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        try{
            const videoResults = await axiosInstance.get<TypeVideoListResponse>('/videos',{
                params : {
                    key : API_KEY,
                    part : 'snippet, contentDetails, statistics',
                    chart : 'mostPopular',
                    maxResults : 30,
                    regionCode : 'KR',
                },
            });
            console.log(videoResults.data);
            const videoData = videoResults.data;
            setData(videoData.items.map((item) => {
                return {
                    id : item.id,
                    title : item.snippet.title,
                    description : item.snippet.description,
                    publishedAt : item.snippet.publishedAt,
                    thumbnail : item.snippet.thumbnails.high.url,
                    viewCount : item.statistics.viewCount,
                    channelTitle : item.snippet.channelTitle,
                };
            }))
            setHasNextPage(typeof videoData.nextPageToken !== 'undefined');
            setNextPageCursor(typeof videoData.nextPageToken !== 'undefined' ? videoData.nextPageToken : null);
        }catch(error){
            console.error(error);
        }
    },[]);

    const loadMoredata = useCallback(async() => {
        if(!hasNextPage) {return;}
        try {
            const videoResults = await axiosInstance.get<TypeVideoListResponse>('/videos',{
                params : {
                    key : API_KEY,
                    part : 'snippet, contentDetails, statistics',
                    chart : 'mostPopular',
                    maxResults : 30,
                    regionCode : 'KR',
                    pageToken : nextPageCursor,
                },
            });
            console.log(videoResults.data);
            const videoData = videoResults.data;
            setData(prevData => prevData.concat(
                videoData.items.map((item) => {
                    return {
                        id : item.id,
                        title : item.snippet.title,
                        description : item.snippet.description,
                        publishedAt : item.snippet.publishedAt,
                        thumbnail : item.snippet.thumbnails.high.url,
                        viewCount : item.statistics.viewCount,
                        channelTitle : item.snippet.channelTitle,
                    };
                })
            ));
            setHasNextPage(typeof videoData.nextPageToken !== 'undefined');
            setNextPageCursor(typeof videoData.nextPageToken !== 'undefined' ? videoData.nextPageToken : null);
        }catch(error){
            console.error(error);
        }
    },[hasNextPage, nextPageCursor]);

    return {
        data,
        loadData,
        loadMoredata,
    };
};
