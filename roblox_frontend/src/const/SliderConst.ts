import userAvatarId1 from '../assets/images/UserImgFirst.jpg';
import userAvatarId2 from '../assets/images/UserImgSecond.png';

interface SliderConstI {
  id: number;
  avatar: string;
  nickname: string;
  review: string;
}

export const SliderConst: SliderConstI[] = [
  {
    id: 1,
    avatar: userAvatarId1,
    nickname: 'SteamTim',
    review:
      'Спасибо за быструю отправку,юниты очень крутые, я подарил их своей подруге, она осталась довольна, еще раз спасибо :))',
  },
  {
    id: 2,
    avatar: userAvatarId2,
    nickname: 'Dambon - Roblox',
    review:
      'Через несколько секунд бот выдал мне юнитов. Я думал, что мне придется ждать этого несколько часов, но нет! Отличный сервис, я определенно покупаю здесь не в последний раз!',
  },
];
