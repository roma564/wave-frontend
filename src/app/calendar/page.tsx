'use client'
import React from 'react'
import Layout from '../components/header/Layout'
import ChatsList from '../components/chat_list/ChatsList'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

function Page() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const handleDateSelect = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className="flex flex-row">
        <ChatsList />
        <div>page</div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateCalendar']}>
            <DemoItem label="Controlled calendar">
              <DateCalendar
                value={value}
                onChange={handleDateSelect}
                slotProps={{
                  day: (ownerState) => ({
                    children: (
                      <div className="flex flex-col items-center">
                        
                        <span>{ownerState.day.date()}</span>

                        
                        {value?.isSame(ownerState.day, 'day') && (
                          <div className="mt-1 text-[10px] px-1 rounded bg-blue-600 text-white">
                            вибрано
                          </div>
                        )}
                      </div>
                    ),
                  }),
                }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </Layout>
  );
}

export default Page;
