import { api } from "@/api"
import { type Manga } from "@/types"
import { useUserStore } from "@/stores/userStore"

class MangaService {
  constructor() {}
  
  async  all(page = 1, pageSize = 24): Promise<Manga[]> {
    const { data } = await api.get('/mangas', {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        populate: 'cover',
      }
    })
    return data.data
  }

  async get(id: number): Promise<Manga> {
    const { data } = await api.get(`/mangas/${id}`, {
      params: {
        populate: ['cover', 'comments'],
      }
    })
    return data.data
  }

  async delete(id: number): Promise<Manga> {
    const userStore = useUserStore()
    const { data } = await api.delete(`/mangas/${id}`, {
      headers : {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    return data.data
  }

  async create(title: string, price: number, number: number, cover: File): Promise<Manga> {
    const userStore = useUserStore()
    const body = new FormData()
    body.append('files.cover', cover)
    body.append('data', JSON.stringify({
      title,
      price,
      number,
    }))

    const { data } = await api.post('/mangas', body, {
      headers : {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    return data.data
  }

  async update(id: number, title: string, price: number, number: number, cover?: File): Promise<Manga> {
    const userStore = useUserStore()
    type BodyFields = { 
      data: {
        title: string,
        price: number,
        number: number
      }
    }
    const fields = {
      title,
      price,
      number
    }

    let body: BodyFields | FormData = { 
      data: fields
    }
    if(cover) {
      body = new FormData()
      body.append('files.cover', cover)
      body.append('data', JSON.stringify(fields))
    } 
    
    const { data } = await api.put(`/mangas/${id}`, body, {
      headers : {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    return data.data
  }
}

export const mangaService = new MangaService()