// Meeting.ts

export type Meeting = {
  id: number
  title: string
  startDate: string   
  ownerId: number
  createdAt: string

  owner: {
    id: number
    name: string
    lastname: string
    avatar: string | null
  }

  invited_users: {
    id: number
    name: string
    lastname: string
    avatar: string | null
  }[]
}
