export {};

declare global {
    type Character = {
        name: string;
        // type: 'forward'|'support';
        preview: string;
        difficulty: number;
        description: string;
        image: string;
        talents: string[];
        abilities: Ability[];
      }
    type CharHolder = {
      id:number;
      heroRU:Character;
      heroEN?:Character;
      prev?: Character;
      next?: Character;
    }
    type Ability = {
        hotkey: string;
        name: string;
        description: string;
        cd: number;
        passive: boolean;
        image: string;
        video: string;
    }

    type Player = {
        name: string;
        games: number;
        wins: number;
        losses: number;
        draws: number;
        winrate: string;
        pts: number;
        rank: string;
        club: string;
        season: string;
      }
    type User = {
      username: string;
      id: string;
      admin?: boolean;
    }
}