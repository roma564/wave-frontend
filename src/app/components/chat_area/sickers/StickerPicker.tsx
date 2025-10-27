const STICKERS = {
  home: [
    'images/stickers/home/chatting-2.png',
    'images/stickers/home/chatting.png',
    'images/stickers/home/coffee-time.png',
    'images/stickers/home/cooking.png',
    'images/stickers/home/dumbbell.png',
    'images/stickers/home/guitar.png',
    'images/stickers/home/laptop.png',
    'images/stickers/home/listening.png',
    'images/stickers/home/online-training.png',
    'images/stickers/home/play-with-pet.png',
    'images/stickers/home/reading.png',
    'images/stickers/home/stay-at-home.png',
    'images/stickers/home/tea-time.png',
    'images/stickers/home/video-calling.png',
    'images/stickers/home/watering-plants.png',
  ],
  party: [
    'images/stickers/party/dance.png',
    'images/stickers/party/gifts.png',
    'images/stickers/party/glasses.png',
    'images/stickers/party/party-1.png',
    'images/stickers/party/party-2.png',
    'images/stickers/party/party-3.png',
    'images/stickers/party/party-4.png',
    'images/stickers/party/party-5.png',
    'images/stickers/party/party-6.png',
    'images/stickers/party/party-7.png',
  ],
};


type Props = {
  onSelect: (url: string) => void;
};

export default function StickerPicker({ onSelect }: Props) {
  return (
    <div className="space-y-4">
      {Object.entries(STICKERS).map(([category, stickers]) => (
        <div key={category}>
          <h2 className="text-sm font-semibold text-gray-600 mb-2 capitalize">{category}</h2>
          <div className="grid grid-cols-4 gap-2">
            {stickers.map((url) => (
              <img
                key={url}
                src={url}
                alt="sticker"
                className="w-16 h-16 object-contain cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onSelect(url)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
