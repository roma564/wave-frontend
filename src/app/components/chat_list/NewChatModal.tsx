import { useState } from 'react';
import { useGetUsersQuery } from '../../lib/features/api/UserSlice';
import { useCreateChatMutation } from '../../lib/features/api/chatSlice';
import Cookies from 'js-cookie'
import { addChatIdToMode } from '../../lib/features/chatMode/modeSlice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';


export default function NewChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentMode = useAppSelector(state => state.mode.currentMode);

  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [createChat, { isLoading: isCreating }] = useCreateChatMutation();
  const dispatch = useAppDispatch()
   

  const userIdFromCookie = Cookies.get('id')
 const CURRENT_USER_ID: number | undefined = userIdFromCookie
  ? Number(userIdFromCookie)
  : undefined;



  const handleCreate = async () => {
    if (!chatName || !selectedUserId) return;

    try {
        const newChat = await createChat({
            subject: chatName,
            userAId: CURRENT_USER_ID,
            userBId: selectedUserId,
            }).unwrap();

        dispatch(addChatIdToMode({ modeName: 'standartMode', chatId: newChat.id }));


        setIsOpen(false);
        setChatName('');
        setSelectedUserId(null);
    } catch (err) {
        console.error('Помилка створення чату:', err);
    }
    };

  return (
    <div className="relative ">
      {/* Floating "+" Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{ backgroundColor: currentMode.primary_color }}
        className=" right-6 z-50  text-white rounded-full w-14 h-14 text-3xl shadow-lg hover:bg-blue-700 transition"
      >
        +
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0   bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-black text-xl font-semibold mb-4">Створити новий чат</h2>

            {/* Назва чату */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Назва чату
            </label>
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Наприклад: Розмова з мамою"
            />

            {/* Dropdown користувачів */}
            <div className="mb-6 relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                 className={`w-full px-3 py-2 border rounded-md text-left ${selectedUserId ? 'text-blue-700' : 'text-gray-500'
  }`}
              >
                <span className={selectedUserId ? 'text-blue-700' : 'text-gray-500'}>
                  {selectedUserId
                    ? users.find((u) => u.id === selectedUserId)?.name
                    : 'Оберіть користувача'}
                </span>
              </button>

              {dropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {isLoading && (
                    <li className="px-4 py-2 text-gray-500">Завантаження...</li>
                  )}
                  {isError && (
                    <li className="px-4 py-2 text-red-500">Помилка завантаження</li>
                  )}
                  {users.map((user) => (
                    <li
                      key={user.id}
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setDropdownOpen(false);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                        selectedUserId === user.id ? 'bg-blue-200 text-blue-800 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {user.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Кнопки */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-300 transition"
              >
                Скасувати
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Створити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
