import { useState } from 'react';

export default function NewChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [chatType, setChatType] = useState('personal');

  const handleCreate = () => {

    console.log({ chatName, chatType });
    setIsOpen(false);
    setChatName('');
  };

  const users = [
  { id: 1, name: 'Гордійчук Роман Васильович' },
  { id: 2, name: 'Roma Gordiychuk' },
  { id: 3, name: 'Олена Петрівна' },
  { id: 4, name: 'Іван Костюк' },
];

const [dropdownOpen, setDropdownOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState<number | null>(null);

const handleSelect = (id: number) => {
  setSelectedUser(id);
  setDropdownOpen(false);
};


  return (
    <div className="relative">
      {/* Floating "+" Button */}
      <button
        onClick={() => setIsOpen(true)}
        className=" right-6 bg-blue-600 text-white rounded-full w-14 h-14 text-3xl shadow-lg hover:bg-blue-700 transition"
      >
        +
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Створити новий чат</h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Назва чату
            </label>
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Наприклад: Розмова з мамою"
            />

                    {/* Dropdown for selecting user */}
            <div className="mb-6 relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 text-left"
            >
                {selectedUser
                ? users.find((u) => u.id === selectedUser)?.name
                : 'Оберіть користувача'}
            </button>

            {dropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                {users.map((user) => (
                    <li
                    key={user.id}
                    onClick={() => handleSelect(user.id)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                    {user.name}
                    </li>
                ))}
                </ul>
            )}
            </div>


            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
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
