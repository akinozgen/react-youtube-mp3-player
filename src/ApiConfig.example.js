const API_CONFIG = {
  yt_api_key: 'YOUR_API_KEY',
  yt_search_endpoint: _ => `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${_.searchQuery}&key=${API_CONFIG.yt_api_key}`,
  yt_video_info_endpoint: _ => `https://www.googleapis.com/youtube/v3/videos?id=${_.videoId}&part=contentDetails&key=${API_CONFIG.yt_api_key}`,
  yt_mp3_endpoint: _ => `YOUR_API_ENDPOINT/get-mp3/${_.videoId}`,
};

export default API_CONFIG;
