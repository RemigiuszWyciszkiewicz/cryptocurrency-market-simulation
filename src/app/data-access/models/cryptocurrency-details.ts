import { Cryptocurrency } from './cryptocurrency';

export interface CryptocurrencyDetails extends Cryptocurrency {
  description: string;
  price_change_percentage_7d: string;
  price_change_percentage_30d: string;
  last_updated: string;
  community_data: CommunityData;
  links: CryptocurrencyDetailsLinks;
}

export interface CryptocurrencyDetailsLinks {
  homepage: string;
  subreddit_url: string;
  github: string;
  blockchain_site: string;
  official_forum_url: string;
}

export interface CommunityData {
  facebook_likes: number;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: number;
}
