import axios from 'axios';
import type { Image } from '../types';

const API_URL = 'https://api.nocodebackend.com';
const API_KEY = 'a98d0c3246c8a7764f03248dd7d4711703417c34b80e316f2b2280654eb0';
const INSTANCE = '42235_simon_ives_photographer';
const PAGE = '1';
const LIMIT = '999';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export async function fetchImages(): Promise<Image[]> {
  try {
    const response = await api.get('/read/images', {
      params: {
        Instance: INSTANCE,
        page: PAGE,
        limit: LIMIT,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      console.error('Invalid API response format:', response.data);
      return [];
    }

    const images = response.data.data;
    const validImages = images
      .filter((item: any) => {
        return (
          item.id &&
          item.imageurl &&
          item.mobileimageurl &&
          item.title &&
          item.location &&
          item.facebookurl &&
          item.instagramurl
        );
      })
      .map((item: any) => ({
        id: item.id,
        imageurl: item.imageurl,
        mobileimageurl: item.mobileimageurl,
        title: item.title,
        location: item.location,
        facebookurl: item.facebookurl,
        instagramurl: item.instagramurl,
      }));

    return validImages.sort((a: Image, b: Image) => b.id - a.id);
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
