export type Manga = {
  id: number,
  title: string,
  price: number,
  summary ?: string,
  number: number
  cover: Cover
  comments: Comment[]
}

export type Cover = {
  url: string,
  alternativeText: string
}

export type Comment = {
  description: string,
  rating: number,
}

export type User = {
  jwt: string,
  id: number,
  username: string,
  email: string,
  role: string
}