import React from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import GroupIcon from '@mui/icons-material/Group';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

const features = [
  {
    icon: <ChatBubbleOutlineIcon fontSize="large" className="text-white" />,
    title: 'Обмін повідомленнями в реальному часі',
    description: 'Насолоджуйтесь миттєвим обміном повідомленнями з оновленнями в реальному часі.',
  },
  {
    icon: <GroupIcon fontSize="large" className="text-white" />,
    title: 'Групові чати',
    description: 'Створюйте та керуйте груповими чатами для зручного спілкування.',
  },
  {
    icon: <ShieldOutlinedIcon fontSize="large" className="text-white" />,
    title: 'Захищене спілкування',
    description: 'Ваша конфіденційність — понад усе. Спілкуйтесь безпечно завдяки шифруванню.',
  },
];



const KeyFeatures = () => {
  return (
    <section className=" py-16 px-6 text-center">
        
      <h2 className="text-4xl font-bold text-white mb-10">Ключові можливості</h2>
       <p className="text-[#8FADCC] text-lg mb-10">
            Досліджуйте переваги нашого веб-чату.
        </p>
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#304D69] border border-[#8FADCC]  rounded-xl shadow-sm p-6 w-72 hover:shadow-md transition duration-300 text-left"
          >
            <div className="text-5xl mb-4 text-blue-500">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-[#8FADCC] text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
